# 产品数据多图支持使用指南

本指南说明如何使用新的多图支持功能。

## 📸 新功能概览

### 多图支持
- ✅ 每个产品支持多张图片
- ✅ 自动图片轮播（缩略图 + 箭头切换）
- ✅ 产品规格参数结构化管理
- ✅ 完全向后兼容旧数据格式

---

## 📋 数据结构说明

### 完整的产品数据格式

```json
{
  "id": 25,
  "categoryId": "daily",
  
  // 图片（支持多图）
  "images": [
    "images/products/facial_tissue_1.jpg",
    "images/products/facial_tissue_2.jpg",
    "images/products/facial_tissue_3.jpg"
  ],
  "thumbnail": "images/products/facial_tissue_thumb.jpg",  // 可选
  
  // 标题和描述
  "title": {
    "zh": "抽取式纸巾",
    "en": "Facial Tissue"
  },
  "shortDesc": {  // 可选：卡片上显示的简短描述
    "zh": "密韧，不掉屑，3色可选",
    "en": "Dense and tough, no debris, 3 colors available"
  },
  "description": {
    "zh": "柔软亲肤，抽取方便。",
    "en": "Soft and skin-friendly, easy to extract."
  },
  "detailDesc": {  // 可选：详情页显示的详细描述
    "zh": "采用优质原生木浆制造...",
    "en": "Made from premium virgin wood pulp..."
  },
  
  // 产品规格
  "specs": [  // 可选
    {
      "label": { "zh": "材质", "en": "Material" },
      "value": { "zh": "100%原生木浆", "en": "100% Virgin Wood Pulp" }
    },
    {
      "label": { "zh": "层数", "en": "Layers" },
      "value": { "zh": "3层", "en": "3 Layers" }
    }
  ]
}
```

---

## 🔄 向后兼容说明

### 旧格式（仍然支持）
```json
{
  "id": 7,
  "categoryId": "bags",
  "image": "images/products/nylon_backpack.jpg",  // 单张图片
  "title": {
    "zh": "尼龙双肩包",
    "en": "Nylon Backpack"
  },
  "description": {
    "zh": "高密度尼龙材质，防水耐磨。",
    "en": "High-density nylon, waterproof and durable."
  }
}
```

### 自动适配逻辑
系统会自动将旧格式转换为新格式：
- `image` → `images: [image]`
- `description` → `shortDesc` 和 `detailDesc`
- 自动生成默认的 `specs`

---

## 📝 使用示例

### 示例1: 单图产品（旧格式）
```json
{
  "id": 100,
  "categoryId": "bags",
  "image": "images/products/backpack.jpg",
  "title": {
    "zh": "旅行背包",
    "en": "Travel Backpack"
  },
  "description": {
    "zh": "大容量设计，适合长途旅行",
    "en": "Large capacity design for long trips"
  }
}
```
**效果**: 显示单张图片，没有轮播

### 示例2: 多图产品（新格式）
```json
{
  "id": 101,
  "categoryId": "bags",
  "images": [
    "images/products/backpack_front.jpg",
    "images/products/backpack_side.jpg",
    "images/products/backpack_inside.jpg"
  ],
  "thumbnail": "images/products/backpack_thumb.jpg",
  "title": {
    "zh": "专业旅行背包",
    "en": "Professional Travel Backpack"
  },
  "shortDesc": {
    "zh": "45L大容量，防水耐磨",
    "en": "45L capacity, waterproof"
  },
  "description": {
    "zh": "专为长途旅行设计的高品质背包",
    "en": "High-quality backpack for long trips"
  },
  "detailDesc": {
    "zh": "采用高强度尼龙材质，配备多个分层收纳空间，背负系统符合人体工程学，长时间背负也不会疲劳。",
    "en": "Made with high-strength nylon, multiple compartments, ergonomic carrying system for comfortable long-term use."
  },
  "specs": [
    {
      "label": { "zh": "容量", "en": "Capacity" },
      "value": { "zh": "45L", "en": "45L" }
    },
    {
      "label": { "zh": "材质", "en": "Material" },
      "value": { "zh": "高强度尼龙", "en": "High-strength Nylon" }
    },
    {
      "label": { "zh": "尺寸", "en": "Size" },
      "value": { "zh": "55x35x20cm", "en": "55x35x20cm" }
    }
  ]
}
```
**效果**: 
- 卡片显示缩略图
- 详情页显示3张图片轮播
- 显示详细规格参数

---

## 🎨 前端显示说明

### 产品卡片（列表页）
- 显示：`thumbnail` 或 `images[0]` 或 `image`
- 标题：`title[currentLang]`
- 描述：`shortDesc[currentLang]` 或 `description[currentLang]`

### 产品详情（Modal）
- **左侧**: 图片轮播组件
  - 主图区域（可缩放）
  - 缩略图列表（点击切换）
  - 左右箭头（切换图片）
  - 图片计数器（如 1/3）
- **右侧**: 产品信息
  - 标题和分类标签
  - 简短描述
  - 详细描述
  - 产品规格表格
  - 咨询按钮

---

## 📊 字段优先级

### 图片显示
1. 列表页：`thumbnail` → `images[0]` → `image`
2. 详情页：`images` → `[image]` （数组）

### 描述显示
1. 卡片简述：`shortDesc` → `description`
2. 详情描述：`detailDesc` → `description`

### 产品规格
1. 自定义：使用 `specs` 数组
2. 默认：根据 `categoryId` 生成默认规格

---

## ✅ 最佳实践

### 1. 图片建议
- **数量**: 3-5张最佳
- **第一张**: 产品主视图
- **后续**: 细节图、使用场景、包装等
- **格式**: WebP (首选) / JPEG
- **尺寸**: 800x800px 或 1000x1000px

### 2. 描述文案
- **shortDesc**: 1-2句话，突出核心卖点
- **description**: 简洁的产品介绍
- **detailDesc**: 详细的材质、工艺、使用说明等

### 3. 产品规格
- 按重要程度排序
- 5-8条最佳，避免过多
- 使用统一的单位格式

---

## 🔧 迁移指南

### 从旧格式升级到新格式

1. **添加多张图片**:
   ```json
   // 之前
   "image": "images/products/product.jpg"
   
   // 之后
   "images": [
     "images/products/product_1.jpg",
     "images/products/product_2.jpg",
     "images/products/product_3.jpg"
   ],
   "thumbnail": "images/products/product_thumb.jpg"
   ```

2. **拆分描述**:
   ```json
   // 之前
   "description": {
     "zh": "高品质产品",
     "en": "High quality product"
   }
   
   // 之后
   "shortDesc": {
     "zh": "高品质产品",
     "en": "High quality product"
   },
   "detailDesc": {
     "zh": "采用优质材料制造，经过严格质检...",
     "en": "Made with premium materials, strictly quality controlled..."
   }
   ```

3. **添加规格**:
   ```json
   "specs": [
     {
       "label": { "zh": "材质", "en": "Material" },
       "value": { "zh": "不锈钢", "en": "Stainless Steel" }
     }
   ]
   ```

---

## 🚀 实际使用

### 更新现有产品
直接编辑 `/public/data/products.json`，添加 `images` 数组：

```bash
# 找到产品ID
# 添加images字段
# 保存并刷新浏览器
```

### 添加新产品
复制示例模板，修改字段值。

### 批量更新
使用脚本工具（如Python）批量转换。

---

## 📞 技术支持

遇到问题？检查：
1. 图片路径是否正确
2. JSON格式是否有效
3. 双语字段是否完整
4. 浏览器控制台是否有错误

详细开发文档：[开发规范](../development_standards.md)
