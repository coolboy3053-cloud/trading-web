import React, { useState } from 'react';
import styles from './Navbar.module.css';
import { Menu, X, Globe } from 'lucide-react';
import { useI18n } from '../context/I18nContext';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { t, language, toggleLanguage } = useI18n();

    return (
        <nav className={styles.navbar}>
            <div className={styles.container}>
                <div className={styles.logo} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                    <img
                        src={language === 'zh' ? '/logo_zh.png' : '/logo_en.png'}
                        alt="Baisheng Logo"
                        className={styles.logoImg}
                    />
                </div>

                <div className={`${styles.navLinks} ${isOpen ? styles.active : ''}`}>
                    <a href="#home" onClick={() => setIsOpen(false)}>{t('nav.home')}</a>
                    <a href="#services" onClick={() => setIsOpen(false)}>{t('nav.services')}</a>
                    <a href="#products" onClick={() => setIsOpen(false)}>{t('nav.products')}</a>
                    <a href="#about" onClick={() => setIsOpen(false)}>{t('nav.about')}</a>

                    <button className={styles.langBtn} onClick={toggleLanguage}>
                        {language === 'zh' ? 'EN' : '中文'}
                    </button>

                    <a href="#contact" className={styles.contactBtn} onClick={() => setIsOpen(false)}>{t('nav.contact')}</a>
                </div>

                <button className={styles.mobileMenuBtn} onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
