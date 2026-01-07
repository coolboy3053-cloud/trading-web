import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { X, MessageSquare, Phone, CheckCircle } from 'lucide-react';
import styles from './ProductModal.module.css';
import { useI18n } from '../context/I18nContext';
import ImageCarousel from './ImageCarousel';
import type { Product, ProductSpec } from '../types/product.types';

interface DisplayProduct extends Product {
    categoryLabel: string;
}

interface ProductModalProps {
    product: DisplayProduct | null;
    onClose: () => void;
}

const ProductModal: React.FC<ProductModalProps> = ({ product, onClose }) => {
    const { t, language: currentLang } = useI18n();

    useEffect(() => {
        if (product) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [product]);

    if (!product) return null;

    // 获取产品图片数组（兼容旧格式）
    const productImages = product.images || (product.image ? [product.image] : []);

    // 获取当前语言的原始描述
    const rawDetailDesc = (product.detailDesc || product.description)[currentLang];

    // 动态解析规格并分离描述文本
    let displaySpecs: ProductSpec[] = product.specs || [];
    let displayDescription = rawDetailDesc;

    // 如果没有预定义规格，尝试从描述中解析
    if (!product.specs || product.specs.length === 0) {
        const lines = rawDetailDesc.split('\n');
        const specLines: string[] = [];
        const descLines: string[] = [];

        lines.forEach(line => {
            const trimmed = line.trim();
            if (!trimmed) return;
            // 简单判断：包含冒号的视为规格，否则视为普通描述
            if (trimmed.includes('：') || trimmed.includes(':')) {
                specLines.push(trimmed);
            } else {
                descLines.push(trimmed);
            }
        });

        const parsedSpecs = specLines.map(line => {
            const separator = line.includes('：') ? '：' : ':';
            const [label, ...values] = line.split(separator);
            const value = values.join(separator).trim();
            return {
                label: { zh: label.trim(), en: label.trim() },
                value: { zh: value, en: value }
            };
        }).filter(spec => spec.label.zh.length < 50);

        // 更新规格显示
        if (parsedSpecs.length > 0) {
            displaySpecs = parsedSpecs;
            // 关键修改：displayDescription 只保留非规格行，避免重复显示
            displayDescription = descLines.join('\n\n');
        }
    }

    return ReactDOM.createPortal(
        <div className={styles.overlay} onClick={onClose}>
            <div className={styles.modal} onClick={e => e.stopPropagation()}>
                <button className={styles.closeBtn} onClick={onClose}>
                    <X size={24} />
                </button>

                <div className={styles.content}>
                    {/* Left: Image Carousel */}
                    <div className={styles.imageSection}>
                        <ImageCarousel
                            images={productImages}
                            alt={product.title[currentLang]}
                        />
                    </div>

                    {/* Right: Details */}
                    <div className={styles.infoSection}>
                        <div className={styles.header}>
                            <span className={styles.badge}>{product.categoryLabel}</span>
                            <h2 className={styles.title}>{product.title[currentLang]}</h2>
                        </div>

                        {/* Only show description if there is remaining text */}
                        {displayDescription && (
                            <div className={styles.description}>
                                <p className={styles.longDesc} style={{ whiteSpace: 'pre-line' }}>
                                    {displayDescription}
                                </p>
                            </div>
                        )}

                        {/* Specs Section - Now using dynamic displaySpecs */}
                        {displaySpecs.length > 0 && (
                            <div className={styles.specs}>
                                <h3 className={styles.specsTitle}>{t('modal.specsTitle')}</h3>
                                <div className={styles.specsGrid}>
                                    {displaySpecs.map((spec, index) => (
                                        <div key={index} className={styles.specItem}>
                                            <CheckCircle size={18} className={styles.specIcon} />
                                            <span className={styles.specLabel}>{spec.label[currentLang] || spec.label.zh}:</span>
                                            <span className={styles.specValue}>{spec.value[currentLang] || spec.value.zh}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        <div className={styles.actions}>
                            <button className={`${styles.actionBtn} ${styles.primary}`}>
                                <MessageSquare size={18} />
                                <span>{t('modal.inquire')}</span>
                            </button>
                            <div className={styles.contactHint}>
                                <Phone size={14} /> <span>Sales: 0769-86291786</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>,
        document.body
    );
};

export default ProductModal;
