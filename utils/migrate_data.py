#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
产品数据迁移工具
从 I18nContext.tsx 中提取产品数据并生成 products.json
"""

import re
import json
import os
import sys
from datetime import datetime

# 设置输出编码
if sys.platform == 'win32':
    import io
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

# Paths
base_dir = r"d:\work\project\baishengtrading"
i18n_path = os.path.join(base_dir, "src", "context", "I18nContext.tsx")
showcase_path = os.path.join(base_dir, "src", "components", "ProductShowcase.tsx")
output_path = os.path.join(base_dir, "public", "data", "products.json")

print("=" * 60)
print("产品数据迁移工具")
print("=" * 60)

# 1. Parse I18nContext.tsx to get translations
print("\n[1/3] 正在解析 I18nContext.tsx...")
translations = {'zh': {}, 'en': {}}
current_lang = None

with open(i18n_path, 'r', encoding='utf-8') as f:
    lines = f.readlines()
    
    for line in lines:
        line_stripped = line.strip()
        if "zh: {" in line_stripped:
            current_lang = 'zh'
        elif "en: {" in line_stripped:
            current_lang = 'en'
        
        # Match pattern: 'key': 'value',
        match = re.match(r"'([^']+)':\s*'([^']*)'\s*,?", line_stripped) or \
                re.match(r"'([^']+)':\s*\"([^\\\"]*)\"\s*,?", line_stripped)
        if match and current_lang:
            key = match.group(1)
            value = match.group(2)
            translations[current_lang][key] = value

print(f"   [OK] 成功解析 {len(translations['zh'])} 个中文翻译")
print(f"   [OK] 成功解析 {len(translations['en'])} 个英文翻译")

# 2. Parse ProductShowcase.tsx to get product definitions
print("\n[2/3] 正在解析 ProductShowcase.tsx...")
products = []

with open(showcase_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Extract the 'products' array content
products_block_match = re.search(r"const products = \[(.*?)\];", content, re.DOTALL)
if not products_block_match:
    print("   [ERROR] 错误: 无法找到产品数组")
    exit(1)

products_block = products_block_match.group(1)

# Split by objects (assuming they are separated by },)
raw_items = products_block.split('},')

for item in raw_items:
    if not item.strip():
        continue
    
    # Extract fields
    id_match = re.search(r"id:\s*(\d+)", item)
    cat_match = re.search(r"categoryId:\s*'([^']+)'", item)
    image_match = re.search(r"image:\s*'([^']+)'", item)
    
    # Extract keys for title and desc
    title_key_match = re.search(r"title:\s*t\('([^']+)'\)", item)
    desc_key_match = re.search(r"description:\s*t\('([^']+)'\)", item)
    
    if id_match and cat_match:
        p_id = int(id_match.group(1))
        cat = cat_match.group(1)
        img = image_match.group(1) if image_match else ""
        title_key = title_key_match.group(1) if title_key_match else ""
        desc_key = desc_key_match.group(1) if desc_key_match else ""
        
        # Lookup translations
        title_zh = translations['zh'].get(title_key, title_key)
        title_en = translations['en'].get(title_key, title_key)
        desc_zh = translations['zh'].get(desc_key, desc_key)
        desc_en = translations['en'].get(desc_key, desc_key)
        
        # Skip if translations not found
        if title_key == title_zh or title_key == title_en:
            print(f"   [WARN] 警告: 产品 ID {p_id} 缺少标题翻译")
            continue
        
        products.append({
            "id": p_id,
            "categoryId": cat,
            "image": img,
            "title": {
                "zh": title_zh,
                "en": title_en
            },
            "description": {
                "zh": desc_zh,
                "en": desc_en
            }
        })

print(f"   [OK] 成功解析 {len(products)} 个产品")

# 按 ID 排序
products.sort(key=lambda x: x['id'])

# 3. Create output structure
print("\n[3/3] 正在生成 products.json...")
output_data = {
    "version": "1.0.0",
    "lastUpdate": datetime.now().strftime("%Y-%m-%d"),
    "products": products
}

# Ensure output directory exists
os.makedirs(os.path.dirname(output_path), exist_ok=True)

# Write to JSON with proper formatting
with open(output_path, 'w', encoding='utf-8') as f:
    json.dump(output_data, f, ensure_ascii=False, indent=2)

print(f"   [OK] 成功生成 {output_path}")
print("\n" + "=" * 60)
print(f"[SUCCESS] 迁移完成! 共导出 {len(products)} 个产品")
print(f"   版本: {output_data['version']}")
print(f"   更新时间: {output_data['lastUpdate']}")
print("=" * 60)

# Statistics
print("\n[STATS] 统计信息:")
categories = {}
for product in products:
    cat = product['categoryId']
    categories[cat] = categories.get(cat, 0) + 1

for cat, count in sorted(categories.items()):
    print(f"   - {cat}: {count} 个产品")
