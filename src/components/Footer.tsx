import React from 'react';
import styles from './Footer.module.css';
import { Mail, Phone, MapPin } from 'lucide-react';
import { useI18n } from '../context/I18nContext';

const Footer = () => {
    const { t, language } = useI18n();

    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <div className={styles.grid}>
                    <div className={styles.brand}>
                        <div className={styles.logo}>
                            <img
                                src={language === 'zh' ? '/logo_zh.png' : '/logo_en.png'}
                                alt="Baisheng Logo"
                                className={styles.logoImg}
                            />
                        </div>
                        <p className={styles.brandDesc}>
                            {t('footer.desc')}
                        </p>
                    </div>

                    <div className={styles.links}>
                        <h3>{t('footer.links')}</h3>
                        <ul>
                            <li><a href="#home">{t('nav.home')}</a></li>
                            <li><a href="#services">{t('nav.services')}</a></li>
                            <li><a href="#products">{t('nav.products')}</a></li>
                            <li><a href="#about">{t('nav.about')}</a></li>
                        </ul>
                    </div>

                    <div className={styles.contact}>
                        <h3>{t('footer.contact')}</h3>
                        <ul>
                            <li><Phone size={18} /> <span>0769-86291786</span></li>
                            <li><Mail size={18} /> <span>sales@baishengtrading.com</span></li>
                            <li><MapPin size={18} /> <span>{t('footer.address')}</span></li>
                        </ul>
                    </div>
                </div>
                <div className={styles.bottom}>
                    <p>{t('footer.copyright')}</p>
                </div>

            </div>
        </footer>
    );
};

export default Footer;

