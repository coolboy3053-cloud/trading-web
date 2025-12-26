import React from 'react';
import styles from './Hero.module.css';
import { ArrowRight } from 'lucide-react';
import { useI18n } from '../context/I18nContext';

const Hero = () => {
    const { t } = useI18n();

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section className={styles.hero} id="home">
            <div className={styles.overlay}></div>
            <div className={styles.content}>
                <div className={styles.badge}>{t('hero.badge')}</div>
                <h1 className={styles.title}>
                    {t('hero.title.part1')} <span className={styles.highlight}>{t('hero.title.part2')}</span>
                </h1>
                <p className={styles.description}>
                    {t('hero.desc')}
                </p>
                <div className={styles.actions}>
                    <button className={styles.primaryBtn} onClick={() => scrollToSection('contact')}>
                        {t('hero.cta.consult')} <ArrowRight size={18} />
                    </button>
                    <button className={styles.secondaryBtn} onClick={() => scrollToSection('services')}>
                        {t('hero.cta.more')}
                    </button>
                </div>
            </div>
        </section>
    );
};


export default Hero;
