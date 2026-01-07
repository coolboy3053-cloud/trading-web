import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'zh' | 'en';

interface Translations {
    [key: string]: {
        [key: string]: string;
    };
}

const translations: Translations = {
    zh: {
        // 导航栏
        'nav.home': '首页',
        'nav.services': '业务领域',
        'nav.products': '产品展示',
        'nav.about': '关于我们',
        'nav.contact': '联系我们',

        // Hero区域
        'hero.badge': '东莞市柏盛贸易有限公司',
        'hero.title.part1': '柏盛品质',
        'hero.title.part2': '简单生活',
        'hero.desc': '柏盛品质，让生活变得更简单！我们致力于连接全球优质供应链，为 20 多个国家提供多元化的进出口贸易解决方案。',
        'hero.cta.consult': '立即咨询',
        'hero.cta.more': '了解更多',

        // 页脚
        'footer.desc': '成立于 2020 年，专业从事日用品、工业用品、机械设备等多元化商品的进出口贸易与供应链服务。',
        'footer.links': '快捷链接',
        'footer.contact': '联系我们',
        'footer.address': '东莞市石龙镇东江大道石龙段西80号533室',
        'footer.copyright': '© 2025 东莞市柏盛贸易有限公司 (Dongguan Baisheng Trading). All rights reserved.',

        // 业务领域
        'services.title': '业务领域',
        'services.subtitle': '全方位的贸易解决方案，助力全球贸易更简单',
        'services.item1.title': '进出口贸易',
        'services.item1.desc': '专业从事各类商品的进出口业务，涵盖日用品、五金、机械设备等多个领域。',
        'services.item2.title': '专业采购支持',
        'services.item2.desc': '依托 1000 多家专业供应商，提供高效的全球采购与寻源服务。',
        'services.item3.title': '质量控制 (QC)',
        'services.item3.desc': '严格的品质检测流程，确保每一件交付客户的产品都符合国际质量标准。',
        'services.item4.title': '全球物流配送',
        'services.item4.desc': '完善的国际物流网络，为全球 20 多个国家提供安全、迅捷的货物配送。',
        'services.item5.title': '保修与维护',
        'services.item5.desc': '提供全面的售后保修与技术支持服务，解决客户的后顾之忧。',

        // 产品展示 - 仅保留UI相关翻译
        'products.title': '产品展示',

        // 产品分类
        'products.cat.all': '全部',
        'products.cat.daily': '日用品系列',
        'products.cat.home': '家居系列',
        'products.cat.furniture': '家具系列',
        'products.cat.bags': '箱包系列',
        'products.cat.hardware': '五金系列',

        // 产品详情Modal
        'modal.material': '材质',
        'modal.feature': '特点',
        'modal.lining': '里料',
        'modal.usage': '用途',
        'modal.grade': '等级',
        'modal.finish': '表面处理',
        'modal.standard': '执行标准',
        'modal.origin': '产地',
        'modal.moq': '起订量',
        'modal.delivery': '交货周期',
        'modal.longDescPlaceholder': '此产品采用高品质原材料精心制造，经过严格的质量检测，确保耐用性和安全性。我们提供多种规格和定制选项，以满足您的不同需求。欢迎联系我们获取详细报价和样品。',
        'modal.specsTitle': '产品规格',
        'modal.inquire': '立即咨询',

        // 关于我们
        'about.pretitle': '关于我们',
        'about.title': '东莞市柏盛贸易有限公司',
        'about.stat1': '优质供应商',
        'about.stat2': '服务国家',
        'about.stat3': '客户满意度',
        'about.desc1': '东莞市柏盛贸易有限公司成立于 2020 年，是一家专业从事多元化商品进出口贸易的综合服务商。我们扎根于全球制造业中心——东莞，依托深厚的供应链资源与卓越的贸易服务能力，致力于将中国优质产品推向全球，同时引进国际精品满足国内多元化需求。',
        'about.desc2': '我们的业务涵盖日用品、工业用品、五金工具、服装鞋帽、化妆品及工程设备等多个领域。目前，我们已与全球 1000 多家专业供应商建立了长期稳定的战略合作关系，服务范围覆盖美国、德国、意大利、南非等 20 多个国家和地区。',

        // CTA
        'cta.title': '准备好与我们合作了吗？',
        'cta.desc': '无论您是寻找优质商品的采购商，还是寻求开拓市场的供应商，柏盛贸易都是您值得信赖的选择。'
    },
    en: {
        // Navigation
        'nav.home': 'Home',
        'nav.services': 'Services',
        'nav.products': 'Products',
        'nav.about': 'About Us',
        'nav.contact': 'Contact Us',

        // Hero
        'hero.badge': 'Dongguan Baisheng Trading Co., Ltd.',
        'hero.title.part1': 'Baisheng Quality',
        'hero.title.part2': 'Simple Life',
        'hero.desc': 'Baisheng quality, making life simpler! We are committed to connecting global high-quality supply chains, providing diversified import and export trade solutions for more than 20 countries.',
        'hero.cta.consult': 'Consult Now',
        'hero.cta.more': 'Learn More',

        // Footer
        'footer.desc': 'Established in 2020, specializing in import and export trade and supply chain services for daily necessities, industrial supplies, machinery and equipment, etc.',
        'footer.links': 'Quick Links',
        'footer.contact': 'Contact Us',
        'footer.address': 'Room 533, No. 80 West, Shilong Section, Dongjiang Avenue, Shilong Town, Dongguan City',
        'footer.copyright': '© 2025 Dongguan Baisheng Trading Co., Ltd. All rights reserved.',

        // Services
        'services.title': 'Our Services',
        'services.subtitle': 'Comprehensive trade solutions to make global trade easier',
        'services.item1.title': 'Import & Export',
        'services.item1.desc': 'Professional import and export services covering daily necessities, hardware, machinery, and other fields.',
        'services.item2.title': 'Procurement Support',
        'services.item2.desc': 'Relying on 1000+ professional suppliers to provide efficient global procurement and sourcing services.',
        'services.item3.title': 'Quality Control (QC)',
        'services.item3.desc': 'Strict quality inspection processes ensure that every product delivered meets international standards.',
        'services.item4.title': 'Global Logistics',
        'services.item4.desc': 'A comprehensive international logistics network providing safe and fast delivery to over 20 countries.',
        'services.item5.title': 'Warranty & Maintenance',
        'services.item5.desc': 'Providing comprehensive after-sales warranty and technical support to resolve customer concerns.',

        // Products - UI only
        'products.title': 'Product Showcase',

        // Product Categories
        'products.cat.all': 'All',
        'products.cat.daily': 'Daily Necessities',
        'products.cat.home': 'Home Series',
        'products.cat.furniture': 'Furniture Series',
        'products.cat.bags': 'Bags & Luggage',
        'products.cat.hardware': 'Hardware Series',

        // Product Modal
        'modal.material': 'Material',
        'modal.feature': 'Features',
        'modal.lining': 'Lining',
        'modal.usage': 'Usage',
        'modal.grade': 'Grade',
        'modal.finish': 'Finish',
        'modal.standard': 'Standard',
        'modal.origin': 'Origin',
        'modal.moq': 'MOQ',
        'modal.delivery': 'Lead Time',
        'modal.longDescPlaceholder': 'Expertly crafted using high-quality materials and rigorous quality control to ensure durability and safety. Available in various specifications and customization options to meet your specific needs. Contact us for detailed quotes and samples.',
        'modal.specsTitle': 'Specifications',
        'modal.inquire': 'Inquire Now',

        // About
        'about.pretitle': 'ABOUT US',
        'about.title': 'Dongguan Baisheng Trading Co., Ltd.',
        'about.stat1': 'Suppliers',
        'about.stat2': 'Countries',
        'about.stat3': 'Satisfaction',
        'about.desc1': 'Dongguan Baisheng Trading Co., Ltd. was established in 2020 as a comprehensive service provider specializing in diversified import and export trade. Rooted in Dongguan, the global manufacturing hub, we rely on deep supply chain resources and excellent trade service capabilities to promote high-quality Chinese products globally while introducing international boutiques to meet domestic needs.',
        'about.desc2': 'Our business covers multiple fields including daily necessities, industrial supplies, hardware tools, clothing and footwear, cosmetics, and engineering equipment. We have established long-term and stable strategic cooperative relationships with over 1000 professional suppliers worldwide, serving more than 20 countries and regions including the USA, Germany, Italy, and South Africa.',

        // CTA
        'cta.title': 'Ready to work with us?',
        'cta.desc': 'Whether you are a buyer looking for quality products or a supplier seeking to expand your market, Baisheng Trading is your trusted choice.'
    }
};

interface I18nContextType {
    language: Language;
    t: (key: string) => string;
    toggleLanguage: () => void;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export const I18nProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [language, setLanguage] = useState<Language>('zh');

    const t = (key: string) => {
        return translations[language][key] || key;
    };

    const toggleLanguage = () => {
        setLanguage(prev => (prev === 'zh' ? 'en' : 'zh'));
    };

    return (
        <I18nContext.Provider value={{ language, t, toggleLanguage }}>
            {children}
        </I18nContext.Provider>
    );
};

export const useI18n = () => {
    const context = useContext(I18nContext);
    if (!context) {
        throw new Error('useI18n must be used within an I18nProvider');
    }
    return context;
};
