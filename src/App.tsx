import React, { useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import ProductShowcase from './components/ProductShowcase';
import About from './components/About';
import Footer from './components/Footer';
import FloatingWidgets from './components/FloatingWidgets';
import { useI18n } from './context/I18nContext';

function App() {
    const { t } = useI18n();

    useEffect(() => {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('reveal-visible');
                }
            });
        }, observerOptions);

        const elements = document.querySelectorAll('.reveal');
        elements.forEach(el => observer.observe(el));

        return () => observer.disconnect();
    }, []);

    return (
        <div className="app-container">
            <Navbar />
            <main>
                <div className="reveal">
                    <Hero />
                </div>
                <div className="reveal">
                    <Services />
                </div>
                <div className="reveal">
                    <ProductShowcase />
                </div>
                <div className="reveal">
                    <About />
                </div>

                {/* Contact CTA Section */}
                <section id="contact" className="reveal" style={{ padding: '6rem 2rem', backgroundColor: 'var(--slate-900)', color: 'var(--white)', textAlign: 'center' }}>
                    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                        <h2 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '1.5rem' }}>{t('cta.title')}</h2>
                        <p style={{ color: 'var(--slate-400)', marginBottom: '3rem', fontSize: '1.25rem' }}>
                            {t('cta.desc')}
                        </p>
                        <a
                            href="mailto:sales@baishengtrading.com"
                            style={{
                                display: 'inline-block',
                                backgroundColor: 'var(--accent)',
                                color: 'var(--white)',
                                padding: '1rem 2.5rem',
                                borderRadius: 'var(--radius)',
                                textDecoration: 'none',
                                fontWeight: 700,
                                fontSize: '1.125rem',
                                transition: 'var(--transition)'
                            }}
                            onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'var(--accent-light)'}
                            onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'var(--accent)'}
                        >
                            {t('nav.contact')}
                        </a>
                    </div>
                </section>
            </main>
            <Footer />
            <FloatingWidgets />
        </div>
    );
}

export default App;
