import React, { useState, useEffect } from 'react';
import styles from './FloatingWidgets.module.css';
import { MessageSquare, ArrowUp, Phone, X } from 'lucide-react';

const FloatingWidgets = () => {
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
            <div className={styles.widgetItem} onMouseEnter={() => setShowQR(true)} onMouseLeave={() => setShowQR(false)}>
                <MessageSquare size={24} />
                <span className={styles.tooltip}>微信咨询</span>
                {showQR && (
                    <div className={styles.qrPopup}>
                        <img src="/wechat_qr.png" alt="WeChat QR" className={styles.qrImage} />
                        <p className={styles.qrText}>扫码咨询官方客服</p>
                    </div>
                )}
            </div>

            <a href="tel:0769-86291786" className={styles.widgetItem}>
                <Phone size={24} />
                <span className={styles.tooltip}>电话联系</span>
            </a>

            {showScrollTop && (
                <button className={`${styles.widgetItem} ${styles.scrollTop}`} onClick={scrollToTop}>
                    <ArrowUp size={24} />
                    <span className={styles.tooltip}>返回顶部</span>
                </button>
            )}
        </div>
    );
};

export default FloatingWidgets;
