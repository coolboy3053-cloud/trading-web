import React from 'react';
import styles from './Services.module.css';
import { ShoppingCart, ShieldCheck, Truck, Wrench, Globe } from 'lucide-react';
import { useI18n } from '../context/I18nContext';

const Services = () => {
    const { t } = useI18n();

    const services = [
        {
            icon: <Globe size={40} />,
            title: t('services.item1.title'),
            description: t('services.item1.desc')
        },
        {
            icon: <ShoppingCart size={40} />,
            title: t('services.item2.title'),
            description: t('services.item2.desc')
        },
        {
            icon: <ShieldCheck size={40} />,
            title: t('services.item3.title'),
            description: t('services.item3.desc')
        },
        {
            icon: <Truck size={40} />,
            title: t('services.item4.title'),
            description: t('services.item4.desc')
        },
        {
            icon: <Wrench size={40} />,
            title: t('services.item5.title'),
            description: t('services.item5.desc')
        }
    ];

    return (
        <section className={styles.services} id="services">
            <div className={styles.container}>
                <div className={styles.header}>
                    <h2 className={styles.title}>{t('services.title')}</h2>
                    <div className={styles.underline}></div>
                    <p className={styles.subtitle}>
                        {t('services.subtitle')}
                    </p>
                </div>
                <div className={styles.grid}>
                    {services.map((service, index) => (
                        <div key={index} className={styles.card}>
                            <div className={styles.icon}>{service.icon}</div>
                            <h3 className={styles.cardTitle}>{service.title}</h3>
                            <p className={styles.cardDesc}>{service.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Services;

