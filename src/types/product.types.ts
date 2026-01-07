/**
 * 产品数据相关的TypeScript类型定义
 */

/**
 * 双语文本接口
 */
export interface BilingualText {
    zh: string;  // 中文
    en: string;  // 英文
}

/**
 * 产品规格参数
 */
export interface ProductSpec {
    label: BilingualText;  // 参数名称（如"材质"、"尺寸"）
    value: BilingualText;  // 参数值
}

/**
 * 产品接口
 */
export interface Product {
    id: number;                      // 产品唯一标识
    categoryId: string;              // 分类ID (all, daily, home, furniture, hardware, bags)

    // 图片相关（支持多图）
    images: string[];                // 产品图片数组（支持多张图片）
    image?: string;                  // 兼容旧格式：单张图片
    thumbnail?: string;              // 可选：缩略图URL

    // 文本信息
    title: BilingualText;            // 双语标题
    description: BilingualText;      // 双语基础描述
    shortDesc?: BilingualText;       // 可选：简短描述（用于卡片显示）
    detailDesc?: BilingualText;      // 可选：详细描述（用于详情页）

    // 产品规格
    specs?: ProductSpec[];           // 可选：产品规格参数列表
}

/**
 * 产品数据集合接口
 */
export interface ProductData {
    version: string;                 // 数据版本
    lastUpdate: string;              // 最后更新时间 (YYYY-MM-DD)
    products: Product[];             // 产品列表
}

/**
 * 产品分类接口
 */
export interface Category {
    id: string;
    label: BilingualText;
}
