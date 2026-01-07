import React, { useState, useEffect } from 'react';
import styles from './ProductShowcase.module.css';
import { useI18n } from '../context/I18nContext';
import ProductModal from './ProductModal';
import { loadProducts } from '../utils/dataLoader';
import type { Product } from '../types/product.types';

// 扩展的产品接口,添加categoryLabel用于显示
interface DisplayProduct extends Product {
    categoryLabel: string;
}

const ProductShowcase = () => {
    const { t, language: currentLang } = useI18n();
    const [activeCategoryId, setActiveCategoryId] = useState('all');
    const [selectedProduct, setSelectedProduct] = useState<DisplayProduct | null>(null);
    const [products, setProducts] = useState<DisplayProduct[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const categories = [
        { id: 'all', label: t('products.cat.all') },
        { id: 'daily', label: t('products.cat.daily') },
        { id: 'home', label: t('products.cat.home') },
        // Furniture merged into Home
        { id: 'hardware', label: t('products.cat.hardware') },
        { id: 'bags', label: t('products.cat.bags') }
    ];

    // 加载产品数据
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                setError(null);

                const data = await loadProducts(`/data/products.json`, { forceRefresh: true });

                // 为每个产品添加categoryLabel
                const productsWithLabels: DisplayProduct[] = data.products.map(product => {
                    const category = categories.find(c => c.id === product.categoryId);
                    return {
                        ...product,
                        categoryLabel: category ? category.label : product.categoryId
                    };
                });

                setProducts(productsWithLabels);
            } catch (err) {
                console.error('加载产品数据失败:', err);
                setError('无法加载产品数据，请刷新页面重试。');
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    // 当语言切换时，更新产品的categoryLabel
    useEffect(() => {
        if (products.length > 0) {
            const updatedProducts = products.map(product => ({
                ...product,
                categoryLabel: t(`products.cat.${product.categoryId}`)
            }));
            setProducts(updatedProducts);
        }
    }, [currentLang]);

    const filteredProducts = activeCategoryId === 'all'
        ? products
        : products.filter(p => p.categoryId === activeCategoryId);

    // 加载状态
    if (loading) {
        return (
            <section className={styles.showcase} id="products">
                <div className={styles.container}>
                    <div className={styles.header}>
                        <h2 className={styles.title}>{t('products.title')}</h2>
                        <div className={styles.underline}></div>
                    </div>
                    <div style={{ textAlign: 'center', padding: '60px 20px', color: '#666' }}>
                        <p>正在加载产品数据...</p>
                    </div>
                </div>
            </section>
        );
    }

    // 错误状态
    if (error) {
        return (
            <section className={styles.showcase} id="products">
                <div className={styles.container}>
                    <div className={styles.header}>
                        <h2 className={styles.title}>{t('products.title')}</h2>
                        <div className={styles.underline}></div>
                    </div>
                    <div style={{ textAlign: 'center', padding: '60px 20px', color: '#d32f2f' }}>
                        <p>{error}</p>
                        <button
                            onClick={() => window.location.reload()}
                            style={{
                                marginTop: '20px',
                                padding: '10px 20px',
                                backgroundColor: '#ff6b35',
                                color: 'white',
                                border: 'none',
                                borderRadius: '4px',
                                cursor: 'pointer'
                            }}
                        >
                            刷新页面
                        </button>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className={styles.showcase} id="products">
            <div className={styles.container}>
                <div className={styles.header}>
                    <h2 className={styles.title}>{t('products.title')}</h2>
                    <div className={styles.underline}></div>
                </div>

                <div className={styles.filterBar}>
                    {categories.map(cat => (
                        <button
                            key={cat.id}
                            className={`${styles.filterBtn} ${activeCategoryId === cat.id ? styles.active : ''}`}
                            onClick={() => setActiveCategoryId(cat.id)}
                        >
                            {cat.label}
                        </button>
                    ))}
                </div>

                <div className={styles.scrollContainer}>
                    <div className={styles.grid}>
                        {filteredProducts.map(product => {
                            // 兼容多图格式：优先使用thumbnail，否则使用第一张图片，最后回退到image
                            const displayImage = product.thumbnail || (product.images && product.images[0]) || product.image || '';
                            const shortDescription = product.shortDesc || product.description;

                            return (
                                <div
                                    key={product.id}
                                    className={styles.productCard}
                                    onClick={() => setSelectedProduct(product)}
                                    role="button"
                                    tabIndex={0}
                                >
                                    <div className={styles.imageWrapper}>
                                        <img
                                            src={displayImage}
                                            alt={product.title[currentLang]}
                                            className={styles.image}
                                        />
                                        <div className={styles.categoryBadge}>{product.categoryLabel}</div>
                                    </div>
                                    <div className={styles.info}>
                                        <h3 className={styles.productTitle}>
                                            {product.title[currentLang]}
                                        </h3>
                                        <p className={styles.description}>
                                            {shortDescription[currentLang]}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            <ProductModal
                product={selectedProduct}
                onClose={() => setSelectedProduct(null)}
            />
        </section>
    );
};

export default ProductShowcase;
