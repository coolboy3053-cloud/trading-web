import React, { useState } from 'react';
import styles from './ImageCarousel.module.css';

interface ImageCarouselProps {
    images: string[];
    alt: string;
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({ images, alt }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    // 如果没有图片，返回占位符
    if (!images || images.length === 0) {
        return (
            <div className={styles.carousel}>
                <div className={styles.placeholder}>
                    <span>暂无图片</span>
                </div>
            </div>
        );
    }

    const goToPrev = () => {
        setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    };

    const goToNext = () => {
        setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    };

    const goToIndex = (index: number) => {
        setCurrentIndex(index);
    };

    return (
        <div className={styles.carousel}>
            {/* 主图区域 */}
            <div className={styles.mainImageWrapper}>
                <img
                    src={images[currentIndex]}
                    alt={`${alt} - ${currentIndex + 1}`}
                    className={styles.mainImage}
                    decoding="async"
                />

                {/* 左右箭头 - 仅在有多张图片时显示 */}
                {images.length > 1 && (
                    <>
                        <button
                            className={`${styles.navButton} ${styles.prevButton}`}
                            onClick={goToPrev}
                            aria-label="上一张"
                        >
                            ‹
                        </button>
                        <button
                            className={`${styles.navButton} ${styles.nextButton}`}
                            onClick={goToNext}
                            aria-label="下一张"
                        >
                            ›
                        </button>
                    </>
                )}

                {/* 图片计数器 */}
                {images.length > 1 && (
                    <div className={styles.counter}>
                        {currentIndex + 1} / {images.length}
                    </div>
                )}
            </div>

            {/* 缩略图列表 - 仅在有多张图片时显示 */}
            {images.length > 1 && (
                <div className={styles.thumbnailsWrapper}>
                    <div className={styles.thumbnails}>
                        {images.map((image, index) => (
                            <button
                                key={index}
                                className={`${styles.thumbnail} ${index === currentIndex ? styles.active : ''
                                    }`}
                                onClick={() => goToIndex(index)}
                                aria-label={`查看第 ${index + 1} 张图片`}
                            >
                                <img
                                    src={image}
                                    alt={`${alt} 缩略图 ${index + 1}`}
                                    loading="lazy"
                                    decoding="async"
                                />
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ImageCarousel;
