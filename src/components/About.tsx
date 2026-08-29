import React from 'react';
import styles from './About.module.css';
import { useI18n } from '../context/I18nContext';

const About = () => {
    const { t, language } = useI18n();

    return (
        <section className={styles.about} id="about">
            <div className={styles.container}>
                <div className={styles.grid}>
                    <div className={styles.imageSide}>
                        <img
                            src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1000"
                            alt={t('about.imageAlt')}
                            className={styles.image}
                        />
                        <div className={styles.experience}>
                            <span className={styles.years}>2020</span>
                            <span className={styles.expText}>{t('about.experience')}</span>
                        </div>
                    </div>
                    <div className={styles.contentSide}>
                        <h4 className={styles.preTitle}>{t('about.pretitle')}</h4>
                        <h2 className={`${styles.title} ${language === 'en' ? styles.titleEnglish : ''}`}>
                            {t('about.title')}
                        </h2>
                        <div className={styles.underline}></div>
                        <p className={styles.description}>
                            {t('about.desc1')}
                        </p>
                        <p className={styles.description}>
                            {t('about.desc2')}
                        </p>
                        <div className={styles.stats}>
                            <div className={styles.statItem}>
                                <span className={styles.statNumber}>1000+</span>
                                <span className={styles.statLabel}>{t('about.stat1')}</span>
                            </div>
                            <div className={styles.statItem}>
                                <span className={styles.statNumber}>20+</span>
                                <span className={styles.statLabel}>{t('about.stat2')}</span>
                            </div>
                            <div className={styles.statItem}>
                                <span className={styles.statNumber}>100%</span>
                                <span className={styles.statLabel}>{t('about.stat3')}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};


export default About;
