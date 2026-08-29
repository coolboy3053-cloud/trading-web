import React, { useState, useEffect } from 'react';
import styles from './FloatingWidgets.module.css';
import { MessageSquare, ArrowUp, Phone, X } from 'lucide-react';
import { useI18n } from '../context/I18nContext';

const FloatingWidgets = () => {
    const { t } = useI18n();
    const [showScrollTop, setShowScrollTop] = useState(false);
    const [showQR, setShowQR] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setShowScrollTop(window.scrollY > 400);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className={styles.widgets}>
            <div className={styles.widgetWrapper} onMouseEnter={() => setShowQR(true)} onMouseLeave={() => setShowQR(false)}>
                <button
                    type="button"
                    className={styles.widgetItem}
                    onClick={() => setShowQR(value => !value)}
                    aria-expanded={showQR}
                    aria-controls="wechat-qr-popup"
                    aria-label={t('widgets.wechat')}
                >
                    <MessageSquare size={24} />
                    <span className={styles.tooltip}>{t('widgets.wechat')}</span>
                </button>
                {showQR && (
                    <div className={styles.qrPopup} id="wechat-qr-popup" role="dialog" aria-label={t('widgets.wechat')}>
                        <button
                            type="button"
                            className={styles.qrClose}
                            onClick={() => setShowQR(false)}
                            aria-label={t('widgets.closeQr')}
                        >
                            <X size={16} />
                        </button>
                        <img src="wechat_qr.png" alt={t('widgets.qrAlt')} className={styles.qrImage} />
                        <p className={styles.qrText}>{t('widgets.qrHint')}</p>
                    </div>
                )}
            </div>

            <a href="tel:0769-86291786" className={styles.widgetItem} aria-label={t('widgets.phone')}>
                <Phone size={24} />
                <span className={styles.tooltip}>{t('widgets.phone')}</span>
            </a>

            {showScrollTop && (
                <button className={`${styles.widgetItem} ${styles.scrollTop}`} onClick={scrollToTop} aria-label={t('widgets.backToTop')}>
                    <ArrowUp size={24} />
                    <span className={styles.tooltip}>{t('widgets.backToTop')}</span>
                </button>
            )}
        </div>
    );
};

export default FloatingWidgets;
