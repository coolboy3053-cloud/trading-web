/**
 * 产品数据加载工具
 * 负责从本地或远程加载产品数据，并提供缓存机制
 */

import type { ProductData, Product } from '../types/product.types';

// 缓存键名
const CACHE_KEY = 'baisheng_products_cache';
const CACHE_VERSION_KEY = 'baisheng_products_version';
const CACHE_EXPIRY_HOURS = 24; // 缓存有效期（小时）

/**
 * 数据加载选项
 */
interface LoadOptions {
    useCache?: boolean;      // 是否使用缓存，默认true
    forceRefresh?: boolean;  // 是否强制刷新，默认false
}

/**
 * 验证产品数据格式是否正确
 */
function validateProductData(data: any): data is ProductData {
    if (!data || typeof data !== 'object') return false;

    // 检查必需字段
    if (!data.version || !data.lastUpdate || !Array.isArray(data.products)) {
        console.error('产品数据缺少必需字段');
        return false;
    }

    // 验证每个产品
    for (const product of data.products) {
        if (!product.id || !product.categoryId) {
            console.error('产品数据缺少ID或分类:', product);
            return false;
        }

        // 兼容单图和多图格式
        if (!product.image && (!product.images || !Array.isArray(product.images))) {
            console.warn('产品缺少图片信息 (但这不会阻止加载):', product.id);
        }

        // 验证双语字段
        if (!product.title?.zh || !product.title?.en) {
            console.error('产品标题缺少中英文:', product);
            return false;
        }

        if (!product.description?.zh || !product.description?.en) {
            console.error('产品描述缺少中英文:', product);
            return false;
        }
    }

    return true;
}

/**
 * 适配产品数据，确保向后兼容
 * 将旧格式数据转换为新格式
 */
function adaptProductData(product: any): any {
    return {
        ...product,
        // 如果是旧格式（单图），转换为数组格式
        images: product.images || (product.image ? [product.image] : []),
        // 如果没有缩略图，使用第一张图片
        thumbnail: product.thumbnail || product.image || (product.images && product.images[0]),
        // 确保有shortDesc，如果没有则使用description
        shortDesc: product.shortDesc || product.description,
        // 确保有detailDesc
        detailDesc: product.detailDesc || product.description,
        // 确保specs是数组
        specs: product.specs || []
    };
}

/**
 * 从缓存中获取产品数据
 */
function getCachedProducts(): ProductData | null {
    try {
        const cachedData = localStorage.getItem(CACHE_KEY);
        const cachedVersion = localStorage.getItem(CACHE_VERSION_KEY);
        const cachedTime = localStorage.getItem(`${CACHE_KEY}_time`);

        if (!cachedData || !cachedTime) return null;

        // 检查缓存是否过期
        const cacheAge = Date.now() - parseInt(cachedTime, 10);
        const cacheExpiry = CACHE_EXPIRY_HOURS * 60 * 60 * 1000;

        if (cacheAge > cacheExpiry) {
            console.log('缓存已过期');
            return null;
        }

        const data = JSON.parse(cachedData);

        if (validateProductData(data)) {
            console.log('从缓存加载产品数据，版本:', cachedVersion);
            return data;
        }

        return null;
    } catch (error) {
        console.error('读取缓存失败:', error);
        return null;
    }
}

/**
 * 保存产品数据到缓存
 */
function setCachedProducts(data: ProductData): void {
    try {
        localStorage.setItem(CACHE_KEY, JSON.stringify(data));
        localStorage.setItem(CACHE_VERSION_KEY, data.version);
        localStorage.setItem(`${CACHE_KEY}_time`, Date.now().toString());
        console.log('产品数据已缓存，版本:', data.version);
    } catch (error) {
        console.error('保存缓存失败:', error);
    }
}

/**
 * 清除缓存
 */
export function clearProductsCache(): void {
    localStorage.removeItem(CACHE_KEY);
    localStorage.removeItem(CACHE_VERSION_KEY);
    localStorage.removeItem(`${CACHE_KEY}_time`);
    console.log('产品数据缓存已清除');
}

/**
 * 加载产品数据
 * @param source 数据源路径（相对于public目录）
 * @param options 加载选项
 * @returns Promise<ProductData> 产品数据
 */
export async function loadProducts(
    source: string = '/data/products.json',
    options: LoadOptions = {}
): Promise<ProductData> {
    const { useCache = true, forceRefresh = false } = options;

    // 如果不强制刷新且允许使用缓存，尝试从缓存读取
    if (!forceRefresh && useCache) {
        const cachedData = getCachedProducts();
        if (cachedData) {
            return cachedData;
        }
    }

    try {
        console.log('正在加载产品数据:', source);

        // 添加时间戳避免浏览器缓存
        const timestamp = forceRefresh ? `?t=${Date.now()}` : '';
        const response = await fetch(`${source}${timestamp}`);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        // 验证数据格式
        if (!validateProductData(data)) {
            throw new Error('产品数据格式验证失败');
        }

        // 适配产品数据以确保向后兼容
        data.products = data.products.map(adaptProductData);

        // 保存到缓存
        if (useCache) {
            setCachedProducts(data);
        }

        console.log(`成功加载 ${data.products.length} 个产品，版本: ${data.version}`);
        return data;

    } catch (error) {
        console.error('加载产品数据失败:', error);

        // 如果加载失败，尝试使用缓存数据
        if (useCache && !forceRefresh) {
            const cachedData = getCachedProducts();
            if (cachedData) {
                console.warn('使用缓存的产品数据作为降级方案');
                return cachedData;
            }
        }

        throw error;
    }
}

/**
 * 按分类过滤产品
 * @param products 产品列表
 * @param categoryId 分类ID，'all'表示全部
 * @returns 过滤后的产品列表
 */
export function filterProductsByCategory(
    products: Product[],
    categoryId: string
): Product[] {
    if (categoryId === 'all') {
        return products;
    }
    return products.filter(p => p.categoryId === categoryId);
}

/**
 * 按ID查找产品
 * @param products 产品列表
 * @param id 产品ID
 * @returns 产品对象或undefined
 */
export function findProductById(
    products: Product[],
    id: number
): Product | undefined {
    return products.find(p => p.id === id);
}
