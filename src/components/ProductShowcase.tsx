import React, { useState } from 'react';
import styles from './ProductShowcase.module.css';
import { useI18n } from '../context/I18nContext';

const ProductShowcase = () => {
    const { t } = useI18n();
    const [activeCategoryId, setActiveCategoryId] = useState('all');
    const [visibleCount, setVisibleCount] = useState(8);

    const categories = [
        { id: 'all', label: t('products.cat.all') },
        { id: 'daily', label: t('products.cat.daily') },
        { id: 'home', label: t('products.cat.home') },
        { id: 'furniture', label: t('products.cat.furniture') },
        { id: 'hardware', label: t('products.cat.hardware') },
        { id: 'bags', label: t('products.cat.bags') }
    ];

    const products = [
        // Bags category
        {
            id: 7,
            title: t('products.bags.item1.title'),
            categoryId: 'bags',
            categoryLabel: t('products.cat.bags'),
            image: 'images/products/nylon_backpack.jpg',
            description: t('products.bags.item1.desc')
        },
        {
            id: 8,
            title: t('products.bags.item2.title'),
            categoryId: 'bags',
            categoryLabel: t('products.cat.bags'),
            image: 'images/products/oxford_backpack.jpg',
            description: t('products.bags.item2.desc')
        },
        {
            id: 9,
            title: t('products.bags.item3.title'),
            categoryId: 'bags',
            categoryLabel: t('products.cat.bags'),
            image: 'images/products/backpack_standard.jpg',
            description: t('products.bags.item3.desc')
        },
        {
            id: 10,
            title: t('products.bags.item4.title'),
            categoryId: 'bags',
            categoryLabel: t('products.cat.bags'),
            image: 'images/products/mens_backpack.jpg',
            description: t('products.bags.item4.desc')
        },
        {
            id: 11,
            title: t('products.bags.item5.title'),
            categoryId: 'bags',
            categoryLabel: t('products.cat.bags'),
            image: 'images/products/double_open_suitcase.jpg',
            description: t('products.bags.item5.desc')
        },
        {
            id: 12,
            title: t('products.bags.item6.title'),
            categoryId: 'bags',
            categoryLabel: t('products.cat.bags'),
            image: 'images/products/retro_suitcase.jpg',
            description: t('products.bags.item6.desc')
        },
        {
            id: 13,
            title: t('products.bags.item7.title'),
            categoryId: 'bags',
            categoryLabel: t('products.cat.bags'),
            image: 'images/products/candy_color_suitcase.jpg',
            description: t('products.bags.item7.desc')
        },
        {
            id: 14,
            title: t('products.bags.item8.title'),
            categoryId: 'bags',
            categoryLabel: t('products.cat.bags'),
            image: 'images/products/large_capacity_suitcase.jpg',
            description: t('products.bags.item8.desc')
        },
        {
            id: 15,
            title: t('products.bags.item9.title'),
            categoryId: 'bags',
            categoryLabel: t('products.cat.bags'),
            image: 'images/products/parent_child_suitcase.jpg',
            description: t('products.bags.item9.desc')
        },
        {
            id: 16,
            title: t('products.bags.item10.title'),
            categoryId: 'bags',
            categoryLabel: t('products.cat.bags'),
            image: 'images/products/multi_functional_suitcase.jpg',
            description: t('products.bags.item10.desc')
        },
        {
            id: 17,
            title: t('products.bags.item11.title'),
            categoryId: 'bags',
            categoryLabel: t('products.cat.bags'),
            image: 'images/products/jewelry_box_bj015.jpg',
            description: t('products.bags.item11.desc')
        },
        {
            id: 18,
            title: t('products.bags.item12.title'),
            categoryId: 'bags',
            categoryLabel: t('products.cat.bags'),
            image: 'images/products/jewelry_box_bj0433.jpg',
            description: t('products.bags.item12.desc')
        },
        {
            id: 19,
            title: t('products.bags.item13.title'),
            categoryId: 'bags',
            categoryLabel: t('products.cat.bags'),
            image: 'images/products/jewelry_box_bj1229.jpg',
            description: t('products.bags.item13.desc')
        },
        {
            id: 20,
            title: t('products.bags.item14.title'),
            categoryId: 'bags',
            categoryLabel: t('products.cat.bags'),
            image: 'images/products/double_layer_glasses_case.jpg',
            description: t('products.bags.item14.desc')
        },
        {
            id: 21,
            title: t('products.bags.item15.title'),
            categoryId: 'bags',
            categoryLabel: t('products.cat.bags'),
            image: 'images/products/glasses_case_bj1442.jpg',
            description: t('products.bags.item15.desc')
        },
        {
            id: 22,
            title: t('products.bags.item16.title'),
            categoryId: 'bags',
            categoryLabel: t('products.cat.bags'),
            image: 'images/products/glasses_case_bg1442.jpg',
            description: t('products.bags.item16.desc')
        },
        {
            id: 23,
            title: t('products.bags.item17.title'),
            categoryId: 'bags',
            categoryLabel: t('products.cat.bags'),
            image: 'images/products/glasses_case_bj1441.jpg',
            description: t('products.bags.item17.desc')
        },
        // Daily Necessities category
        {
            id: 24,
            title: t('products.daily.item1.title'),
            categoryId: 'daily',
            categoryLabel: t('products.cat.daily'),
            image: 'images/products/creative_horn_cup.jpg',
            description: t('products.daily.item1.desc')
        },
        {
            id: 25,
            title: t('products.daily.item2.title'),
            categoryId: 'daily',
            categoryLabel: t('products.cat.daily'),
            image: 'images/products/facial_tissue.jpg',
            description: t('products.daily.item2.desc')
        },
        {
            id: 26,
            title: t('products.daily.item3.title'),
            categoryId: 'daily',
            categoryLabel: t('products.cat.daily'),
            image: 'images/products/womens_fashion_scarf.jpg',
            description: t('products.daily.item3.desc')
        },
        {
            id: 27,
            title: t('products.daily.item4.title'),
            categoryId: 'daily',
            categoryLabel: t('products.cat.daily'),
            image: 'images/products/modern_kitchen_cutting_board.jpg',
            description: t('products.daily.item4.desc')
        },
        {
            id: 28,
            title: t('products.daily.item5.title'),
            categoryId: 'daily',
            categoryLabel: t('products.cat.daily'),
            image: 'images/products/fashion_umbrella.png',
            description: t('products.daily.item5.desc')
        },
        {
            id: 29,
            title: t('products.daily.item6.title'),
            categoryId: 'daily',
            categoryLabel: t('products.cat.daily'),
            image: 'images/products/blue_rim_ceramic_plate.jpg',
            description: t('products.daily.item6.desc')
        },
        {
            id: 30,
            title: t('products.daily.item7.title'),
            categoryId: 'daily',
            categoryLabel: t('products.cat.daily'),
            image: 'images/products/solid_wood_dinner_plate.png',
            description: t('products.daily.item7.desc')
        },
        {
            id: 31,
            title: t('products.daily.item8.title'),
            categoryId: 'daily',
            categoryLabel: t('products.cat.daily'),
            image: 'images/products/high_capacity_power_bank.jpg',
            description: t('products.daily.item8.desc')
        },
        {
            id: 32,
            title: t('products.daily.item9.title'),
            categoryId: 'daily',
            categoryLabel: t('products.cat.daily'),
            image: 'images/products/bluetooth_wireless_headphones.jpg',
            description: t('products.daily.item9.desc')
        },
        {
            id: 33,
            title: t('products.daily.item10.title'),
            categoryId: 'daily',
            categoryLabel: t('products.cat.daily'),
            image: 'images/products/phone_case.jpg',
            description: t('products.daily.item10.desc')
        },
        {
            id: 34,
            title: t('products.daily.item11.title'),
            categoryId: 'daily',
            categoryLabel: t('products.cat.daily'),
            image: 'images/products/retro_creative_wall_clock.jpg',
            description: t('products.daily.item11.desc')
        },
        {
            id: 35,
            title: t('products.daily.item12.title'),
            categoryId: 'daily',
            categoryLabel: t('products.cat.daily'),
            image: 'images/products/fashion_leather_boots.jpg',
            description: t('products.daily.item12.desc')
        },
        {
            id: 36,
            title: t('products.daily.item13.title'),
            categoryId: 'daily',
            categoryLabel: t('products.cat.daily'),
            image: 'images/products/mock_neck_long_sleeve_shirt.jpg',
            description: t('products.daily.item13.desc')
        },
        {
            id: 37,
            title: t('products.daily.item14.title'),
            categoryId: 'daily',
            categoryLabel: t('products.cat.daily'),
            image: 'images/products/avocado_jam_spatula.jpg',
            description: t('products.daily.item14.desc')
        },
        {
            id: 38,
            title: t('products.daily.item15.title'),
            categoryId: 'daily',
            categoryLabel: t('products.cat.daily'),
            image: 'images/products/laundry_basket_1.jpg',
            description: t('products.daily.item15.desc')
        },
        {
            id: 39,
            title: t('products.daily.item16.title'),
            categoryId: 'daily',
            categoryLabel: t('products.cat.daily'),
            image: 'images/products/leather_shoulder_bag.jpg',
            description: t('products.daily.item16.desc')
        },
        {
            id: 40,
            title: t('products.daily.item17.title'),
            categoryId: 'daily',
            categoryLabel: t('products.cat.daily'),
            image: 'images/products/warm_cotton_slippers.jpg',
            description: t('products.daily.item17.desc')
        },
        {
            id: 41,
            title: t('products.daily.item18.title'),
            categoryId: 'daily',
            categoryLabel: t('products.cat.daily'),
            image: 'images/products/high_end_tableware.jpg',
            description: t('products.daily.item18.desc')
        },
        {
            id: 42,
            title: t('products.daily.item19.title'),
            categoryId: 'daily',
            categoryLabel: t('products.cat.daily'),
            image: 'images/products/jewelry_storage_box.jpg',
            description: t('products.daily.item19.desc')
        },
        {
            id: 43,
            title: t('products.daily.item20.title'),
            categoryId: 'daily',
            categoryLabel: t('products.cat.daily'),
            image: 'images/products/woven_straw_basket.jpg',
            description: t('products.daily.item20.desc')
        },
        {
            id: 44,
            title: t('products.daily.item21.title'),
            categoryId: 'daily',
            categoryLabel: t('products.cat.daily'),
            image: 'images/products/laundry_basket_2.jpg',
            description: t('products.daily.item21.desc')
        },
        {
            id: 45,
            title: t('products.daily.item22.title'),
            categoryId: 'daily',
            categoryLabel: t('products.cat.daily'),
            image: 'images/products/winter_home_slippers.jpg',
            description: t('products.daily.item22.desc')
        },
        {
            id: 46,
            title: t('products.daily.item23.title'),
            categoryId: 'daily',
            categoryLabel: t('products.cat.daily'),
            image: 'images/products/long_handle_automatic_umbrella.jpg',
            description: t('products.daily.item23.desc')
        },
        {
            id: 47,
            title: t('products.daily.item24.title'),
            categoryId: 'daily',
            categoryLabel: t('products.cat.daily'),
            image: 'images/products/european_style_thermos.jpg',
            description: t('products.daily.item24.desc')
        },
        {
            id: 48,
            title: t('products.daily.item25.title'),
            categoryId: 'daily',
            categoryLabel: t('products.cat.daily'),
            image: 'images/products/turtleneck_cashmere_sweater.jpg',
            description: t('products.daily.item25.desc')
        },
        {
            id: 49,
            title: t('products.daily.item26.title'),
            categoryId: 'daily',
            categoryLabel: t('products.cat.daily'),
            image: 'images/products/loose_bomber_jacket.png',
            description: t('products.daily.item26.desc')
        },
        {
            id: 50,
            title: t('products.daily.item27.title'),
            categoryId: 'daily',
            categoryLabel: t('products.cat.daily'),
            image: 'images/products/creative_mug.jpg',
            description: t('products.daily.item27.desc')
        },
        {
            id: 51,
            title: t('products.daily.item28.title'),
            categoryId: 'daily',
            categoryLabel: t('products.cat.daily'),
            image: 'images/products/lazy_futon_cushion.jpg',
            description: t('products.daily.item28.desc')
        },
        {
            id: 52,
            title: t('products.daily.item29.title'),
            categoryId: 'daily',
            categoryLabel: t('products.cat.daily'),
            image: 'images/products/creative_ceramic_bowl.jpg',
            description: t('products.daily.item29.desc')
        },
        {
            id: 53,
            title: t('products.daily.item30.title'),
            categoryId: 'daily',
            categoryLabel: t('products.cat.daily'),
            image: 'images/products/new_martin_boots.jpg',
            description: t('products.daily.item30.desc')
        },
        {
            id: 54,
            title: t('products.daily.item31.title'),
            categoryId: 'daily',
            categoryLabel: t('products.cat.daily'),
            image: 'images/products/stainless_steel_frying_pan.png',
            description: t('products.daily.item31.desc')
        },
        {
            id: 55,
            title: t('products.daily.item32.title'),
            categoryId: 'daily',
            categoryLabel: t('products.cat.daily'),
            image: 'images/products/flannel_slippers.jpg',
            description: t('products.daily.item32.desc')
        },
        {
            id: 56,
            title: t('products.daily.item33.title'),
            categoryId: 'daily',
            categoryLabel: t('products.cat.daily'),
            image: 'images/products/retro_dress.jpg',
            description: t('products.daily.item33.desc')
        },
        {
            id: 57,
            title: t('products.daily.item34.title'),
            categoryId: 'daily',
            categoryLabel: t('products.cat.daily'),
            image: 'images/products/mini_backpack.jpg',
            description: t('products.daily.item34.desc')
        },
        {
            id: 58,
            title: t('products.daily.item35.title'),
            categoryId: 'daily',
            categoryLabel: t('products.cat.daily'),
            image: 'images/products/british_style_leather_shoes.jpg',
            description: t('products.daily.item35.desc')
        },
        {
            id: 59,
            title: t('products.daily.item36.title'),
            categoryId: 'daily',
            categoryLabel: t('products.cat.daily'),
            image: 'images/products/retro_knit_sweater_dress.jpg',
            description: t('products.daily.item36.desc')
        },
        {
            id: 60,
            title: t('products.daily.item37.title'),
            categoryId: 'daily',
            categoryLabel: t('products.cat.daily'),
            image: 'images/products/portable_carpet.jpg',
            description: t('products.daily.item37.desc')
        },
        {
            id: 61,
            title: t('products.daily.item38.title'),
            categoryId: 'daily',
            categoryLabel: t('products.cat.daily'),
            image: 'images/products/trendy_creative_crossbody_bag.jpg',
            description: t('products.daily.item38.desc')
        },
        {
            id: 62,
            title: t('products.daily.item39.title'),
            categoryId: 'daily',
            categoryLabel: t('products.cat.daily'),
            image: 'images/products/rectangular_dinner_plate.jpg',
            description: t('products.daily.item39.desc')
        },
        {
            id: 63,
            title: t('products.daily.item40.title'),
            categoryId: 'daily',
            categoryLabel: t('products.cat.daily'),
            image: 'images/products/colored_glaze_plate.png',
            description: t('products.daily.item40.desc')
        },
        {
            id: 64,
            title: t('products.daily.item41.title'),
            categoryId: 'daily',
            categoryLabel: t('products.cat.daily'),
            image: 'images/products/animal_creative_pajamas.jpg',
            description: t('products.daily.item41.desc')
        },
        {
            id: 65,
            title: t('products.daily.item42.title'),
            categoryId: 'daily',
            categoryLabel: t('products.cat.daily'),
            image: 'images/products/ceramic_plate.jpg',
            description: t('products.daily.item42.desc')
        },
        {
            id: 66,
            title: t('products.daily.item43.title'),
            categoryId: 'daily',
            categoryLabel: t('products.cat.daily'),
            image: 'images/products/laundry_hamper.jpg',
            description: t('products.daily.item43.desc')
        },
        // Home Series category
        {
            id: 67,
            title: t('products.home.item1.title'),
            categoryId: 'home',
            categoryLabel: t('products.cat.home'),
            image: 'images/products/retro_creative_wall_clock.jpg',
            description: t('products.home.item1.desc')
        },
        {
            id: 68,
            title: t('products.home.item2.title'),
            categoryId: 'furniture',
            categoryLabel: t('products.cat.furniture'),
            image: 'images/products/solid_wood_cabinet.jpg',
            description: t('products.home.item2.desc')
        },
        {
            id: 69,
            title: t('products.home.item3.title'),
            categoryId: 'furniture',
            categoryLabel: t('products.cat.furniture'),
            image: 'images/products/oak_coffee_table.jpg',
            description: t('products.home.item3.desc')
        },
        {
            id: 70,
            title: t('products.home.item4.title'),
            categoryId: 'furniture',
            categoryLabel: t('products.cat.furniture'),
            image: 'images/products/american_style_sofa.jpg',
            description: t('products.home.item4.desc')
        },
        {
            id: 71,
            title: t('products.home.item5.title'),
            categoryId: 'furniture',
            categoryLabel: t('products.cat.furniture'),
            image: 'images/products/bedroom_storage_cabinet.jpg',
            description: t('products.home.item5.desc')
        },
        {
            id: 72,
            title: t('products.home.item6.title'),
            categoryId: 'furniture',
            categoryLabel: t('products.cat.furniture'),
            image: 'images/products/floor_coat_rack.jpg',
            description: t('products.home.item6.desc')
        },
        {
            id: 73,
            title: t('products.home.item7.title'),
            categoryId: 'furniture',
            categoryLabel: t('products.cat.furniture'),
            image: 'images/products/foldable_leisure_sofa.jpg',
            description: t('products.home.item7.desc')
        },
        {
            id: 74,
            title: t('products.home.item8.title'),
            categoryId: 'furniture',
            categoryLabel: t('products.cat.furniture'),
            image: 'images/products/simple_mattress.jpg',
            description: t('products.home.item8.desc')
        },
        {
            id: 75,
            title: t('products.home.item9.title'),
            categoryId: 'furniture',
            categoryLabel: t('products.cat.furniture'),
            image: 'images/products/mini_round_table.jpg',
            description: t('products.home.item9.desc')
        },
        {
            id: 76,
            title: t('products.home.item10.title'),
            categoryId: 'furniture',
            categoryLabel: t('products.cat.furniture'),
            image: 'images/products/small_coffee_table.jpg',
            description: t('products.home.item10.desc')
        },
        {
            id: 77,
            title: t('products.home.item11.title'),
            categoryId: 'home',
            categoryLabel: t('products.cat.home'),
            image: 'images/products/dolphin_ornament.jpg',
            description: t('products.home.item11.desc')
        },
        {
            id: 78,
            title: t('products.home.item12.title'),
            categoryId: 'home',
            categoryLabel: t('products.cat.home'),
            image: 'images/products/dome_mosquito_net.jpg',
            description: t('products.home.item12.desc')
        },
        {
            id: 79,
            title: t('products.home.item13.title'),
            categoryId: 'home',
            categoryLabel: t('products.cat.home'),
            image: 'images/products/vase_dried_flowers.jpg',
            description: t('products.home.item13.desc')
        },
        {
            id: 80,
            title: t('products.home.item14.title'),
            categoryId: 'furniture',
            categoryLabel: t('products.cat.furniture'),
            image: 'images/products/small_round_table.jpg',
            description: t('products.home.item14.desc')
        },
        {
            id: 81,
            title: t('products.home.item15.title'),
            categoryId: 'home',
            categoryLabel: t('products.cat.home'),
            image: 'images/products/office_ornament_yoga_girl.jpg',
            description: t('products.home.item15.desc')
        },
        // Hardware category
        {
            id: 82,
            title: t('products.hardware.item1.title'),
            categoryId: 'hardware',
            categoryLabel: t('products.cat.hardware'),
            image: 'images/products/plastic_expansion_bolt.jpg',
            description: t('products.hardware.item1.desc')
        },
        {
            id: 83,
            title: t('products.hardware.item2.title'),
            categoryId: 'hardware',
            categoryLabel: t('products.cat.hardware'),
            image: 'images/products/expansion_bolt.jpg',
            description: t('products.hardware.item2.desc')
        },
        {
            id: 84,
            title: t('products.hardware.item3.title'),
            categoryId: 'hardware',
            categoryLabel: t('products.cat.hardware'),
            image: 'images/products/stainless_steel_clip.jpg',
            description: t('products.hardware.item3.desc')
        },
        {
            id: 85,
            title: t('products.hardware.item4.title'),
            categoryId: 'hardware',
            categoryLabel: t('products.cat.hardware'),
            image: 'images/products/3m_sticker.jpg',
            description: t('products.hardware.item4.desc')
        },
        {
            id: 86,
            title: t('products.hardware.item5.title'),
            categoryId: 'hardware',
            categoryLabel: t('products.cat.hardware'),
            image: 'images/products/multicolor_angle_steel.jpg',
            description: t('products.hardware.item5.desc')
        },
        {
            id: 87,
            title: t('products.hardware.item6.title'),
            categoryId: 'hardware',
            categoryLabel: t('products.cat.hardware'),
            image: 'images/products/black_spiral_with_nut.jpg',
            description: t('products.hardware.item6.desc')
        },
        {
            id: 88,
            title: t('products.hardware.item7.title'),
            categoryId: 'hardware',
            categoryLabel: t('products.cat.hardware'),
            image: 'images/products/tool_mounting_board.jpg',
            description: t('products.hardware.item7.desc')
        }
    ];

    const filteredProducts = activeCategoryId === 'all'
        ? products
        : products.filter(p => p.categoryId === activeCategoryId);

    const shownProducts = filteredProducts.slice(0, visibleCount);
    const hasMore = visibleCount < filteredProducts.length;

    const handleLoadMore = () => {
        setVisibleCount(prev => prev + 4);
    };

    const handleCategoryChange = (id: string) => {
        setActiveCategoryId(id);
        setVisibleCount(8); // Reset visible count when category changes
    };

    return (
        <section className={styles.showcase} id="products">
            <div className={styles.container}>
                <div className={styles.header}>
                    <h2 className={styles.title}>{t('products.title')}</h2>
                    <div className={styles.underline}></div>
                </div>

                <div className={styles.filterBar}>
                    {categories.map(cat => (
                        <button
                            key={cat.id}
                            className={`${styles.filterBtn} ${activeCategoryId === cat.id ? styles.active : ''}`}
                            onClick={() => handleCategoryChange(cat.id)}
                        >
                            {cat.label}
                        </button>
                    ))}
                </div>

                <div className={styles.grid}>
                    {shownProducts.map(product => (
                        <div key={product.id} className={styles.productCard}>
                            <div className={styles.imageWrapper}>
                                <img src={product.image} alt={product.title} className={styles.image} />
                                <div className={styles.categoryBadge}>{product.categoryLabel}</div>
                            </div>
                            <div className={styles.info}>
                                <h3 className={styles.productTitle}>{product.title}</h3>
                                <p className={styles.description}>{product.description}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {hasMore && (
                    <div className={styles.loadMoreContainer}>
                        <button className={styles.loadMoreBtn} onClick={handleLoadMore}>
                            {t('hero.cta.more')}
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
};

export default ProductShowcase;
