import React, { useCallback, useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import styles from './ProductShowcase.module.css';
import { useI18n } from '../context/I18nContext';
import ProductModal from './ProductModal';
import { loadProducts } from '../utils/dataLoader';
import type { Product } from '../types/product.types';

// 扩展的产品接口,添加categoryLabel用于显示
interface DisplayProduct extends Product {
    categoryLabel: string;
}

const PAGE_SIZE = 12;

const ProductShowcase = () => {
    const { t, language: currentLang } = useI18n();
    const [activeCategoryId, setActiveCategoryId] = useState('all');
    const [selectedProduct, setSelectedProduct] = useState<DisplayProduct | null>(null);
    const [products, setProducts] = useState<DisplayProduct[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const openProduct = useCallback((product: DisplayProduct) => {
        setSelectedProduct(product);
        const url = new URL(window.location.href);
        url.searchParams.set('product', String(product.id));
        window.history.replaceState(window.history.state, '', url);
    }, []);

    const closeProduct = useCallback(() => {
        setSelectedProduct(null);
        const url = new URL(window.location.href);
        url.searchParams.delete('product');
        window.history.replaceState(window.history.state, '', url);
    }, []);

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

                const data = await loadProducts('/data/products.json', { useCache: false });

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
                setError(t('products.loadError'));
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

    useEffect(() => {
        const syncProductFromUrl = () => {
            const productId = new URL(window.location.href).searchParams.get('product');
            setSelectedProduct(productId ? products.find(product => String(product.id) === productId) || null : null);
        };

        syncProductFromUrl();
        window.addEventListener('popstate', syncProductFromUrl);
        return () => window.removeEventListener('popstate', syncProductFromUrl);
    }, [products]);

    useEffect(() => {
        setVisibleCount(PAGE_SIZE);
    }, [activeCategoryId, searchQuery]);

    const normalizedQuery = searchQuery.trim().toLocaleLowerCase();
    const filteredProducts = products.filter(product => {
        const categoryMatches = activeCategoryId === 'all' || product.categoryId === activeCategoryId;
        if (!categoryMatches || !normalizedQuery) return categoryMatches;

        const searchableText = [
            product.title.zh,
            product.title.en,
            product.shortDesc?.zh,
            product.shortDesc?.en,
            product.description.zh,
            product.description.en
        ].filter(Boolean).join(' ').toLocaleLowerCase();

        return searchableText.includes(normalizedQuery);
    });
    const visibleProducts = filteredProducts.slice(0, visibleCount);

    // 加载状态
    if (loading) {
        return (
            <section className={styles.showcase} id="products">
                <div className={styles.container}>
                    <div className={styles.header}>
                        <h2 className={styles.title}>{t('products.title')}</h2>
                        <div className={styles.underline}></div>
                    </div>
                    <div className={styles.statusMessage} role="status">
                        <p>{t('products.loading')}</p>
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
                    <div className={`${styles.statusMessage} ${styles.errorMessage}`} role="alert">
                        <p>{error}</p>
                        <button
                            onClick={() => window.location.reload()}
                            className={styles.retryBtn}
                        >
                            {t('products.retry')}
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
                            aria-pressed={activeCategoryId === cat.id}
                        >
                            {cat.label}
                        </button>
                    ))}
                </div>

                <div className={styles.productTools}>
                    <label className={styles.searchBox}>
                        <Search size={19} aria-hidden="true" />
                        <span className={styles.srOnly}>{t('products.searchLabel')}</span>
                        <input
                            type="search"
                            value={searchQuery}
                            onChange={event => setSearchQuery(event.target.value)}
                            placeholder={t('products.searchPlaceholder')}
                            className={styles.searchInput}
                        />
                    </label>
                    <span className={styles.resultCount} aria-live="polite">
                        {t('products.showing')} {visibleProducts.length} / {filteredProducts.length}
                    </span>
                </div>

                <div className={styles.scrollContainer}>
                    <div className={styles.grid}>
                        {visibleProducts.map(product => {
                            // 兼容多图格式：优先使用thumbnail，否则使用第一张图片，最后回退到image
                            const displayImage = product.thumbnail || (product.images && product.images[0]) || product.image || '';
                            const shortDescription = product.shortDesc || product.description;

                            return (
                                <div
                                    key={product.id}
                                    className={styles.productCard}
                                    onClick={() => openProduct(product)}
                                    onKeyDown={event => {
                                        if (event.key === 'Enter' || event.key === ' ') {
                                            event.preventDefault();
                                            openProduct(product);
                                        }
                                    }}
                                    role="button"
                                    tabIndex={0}
                                >
                                    <div className={styles.imageWrapper}>
                                        <img
                                            src={displayImage}
                                            alt={product.title[currentLang]}
                                            className={styles.image}
                                            loading="lazy"
                                            decoding="async"
                                            width={600}
                                            height={500}
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

                    {filteredProducts.length === 0 && (
                        <div className={styles.emptyState} role="status">
                            {t('products.noResults')}
                        </div>
                    )}

                    {visibleProducts.length < filteredProducts.length && (
                        <div className={styles.loadMoreWrapper}>
                            <button
                                type="button"
                                className={styles.loadMoreBtn}
                                onClick={() => setVisibleCount(count => count + PAGE_SIZE)}
                            >
                                {t('products.loadMore')}
                            </button>
                        </div>
                    )}
                </div>
            </div>

            <ProductModal
                product={selectedProduct}
                onClose={closeProduct}
            />
        </section>
    );
};

export default ProductShowcase;
