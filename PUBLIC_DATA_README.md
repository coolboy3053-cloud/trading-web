# 产品数据管理指南

本指南说明如何添加、修改和删除产品数据。

## 📁 文件位置

- **产品数据文件**: `/public/data/products.json`
- **产品图片**: `/public/images/products/` 或图床URL
- **数据迁移工具**: `/utils/migrate_data.py`

## 🔧 产品数据结构

每个产品包含以下字段：

```json
{
  "id": 1,
  "categoryId": "bags",
  "image": "images/products/product_name.jpg",
  "title": {
    "zh": "中文产品名称",
    "en": "English Product Name"
  },
  "description": {
    "zh": "中文产品描述",
    "en": "English product description"
  }
}
```

### 字段说明

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `id` | number | ✅ | 产品唯一标识，必须唯一 |
| `categoryId` | string | ✅ | 分类ID: `all`, `daily`, `home`, `furniture`, `hardware`, `bags` |
| `image` | string | ✅ | 图片URL（本地相对路径或CDN完整URL） |
| `title.zh` | string | ✅ | 中文产品名称 |
| `title.en` | string | ✅ | 英文产品名称 |
| `description.zh` | string | ✅ | 中文产品描述 |
| `description.en` | string | ✅ | 英文产品描述 |

## ➕ 添加新产品

### 方式一：直接编辑JSON文件 (推荐)

1. 打开 `/public/data/products.json`
2. 在 `products` 数组中添加新产品对象：

```json
{
  "version": "1.0.0",
  "lastUpdate": "2025-12-26",
  "products": [
    // ... 其他产品
    {
      "id": 89,
      "categoryId": "daily",
      "image": "https://cdn.jsdelivr.net/gh/username/repo@main/products/new_product.jpg",
      "title": {
        "zh": "新产品名称",
        "en": "New Product Name"
      },
      "description": {
        "zh": "这是一个新产品的描述",
        "en": "This is a description of the new product"
      }
    }
  ]
}
```

3. 确保新产品的ID是唯一的
4. 保存文件后刷新浏览器即可看到新产品

### 方式二：使用迁移工具 (从I18nContext提取)

如果产品数据仍在 `I18nContext.tsx` 和 `ProductShowcase.tsx` 中：

```bash
python utils/migrate_data.py
```

## 📝 修改现有产品

1. 在 `/public/data/products.json` 中找到对应产品（通过ID查找）
2. 修改需要更改的字段
3. 保存文件
4. 清除浏览器缓存或硬刷新（Ctrl+F5）

**示例**：修改产品名称

```json
{
  "id": 7,
  "categoryId": "bags",
  "image": "images/products/nylon_backpack.jpg",
  "title": {
    "zh": "高端尼龙双肩包",  // 修改此处
    "en": "Premium Nylon Backpack"  // 修改此处
  },
  "description": {
    "zh": "高密度尼龙材质，防水耐磨。",
    "en": "High-density nylon, waterproof and durable."
  }
}
```

## 🗑️ 删除产品

1. 在 `/public/data/products.json` 中找到要删除的产品
2. 删除整个产品对象（连同逗号）
3. 保存文件

**注意**: 删除产品后，其ID不应该被重新使用。

## 🖼️ 管理产品图片

### 本地图片

1. 将图片放在 `/public/images/products/` 目录
2. 在products.json中使用相对路径：

```json
"image": "images/products/your_product.jpg"
```

### 使用jsDelivr CDN (推荐)

1. 将图片上传到GitHub仓库（例如: `your-username/baisheng-images`）
2. 使用jsDelivr URL：

```json
"image": "https://cdn.jsdelivr.net/gh/your-username/baisheng-images@main/products/your_product.jpg"
```

#### jsDelivr优点:
- ✅ 全球CDN加速
- ✅ 免费无限流量
- ✅ 自动缓存优化
- ✅ 支持版本控制

### 图片命名规范

- 使用小写字母和下划线
- 语义化命名
- 示例: `nylon_backpack.jpg`, `leather_boots.jpg`

### 推荐图片规格

- **格式**: WebP (首选) / JPEG / PNG
- **尺寸**: 800x800px 或 1000x1000px
- **文件大小**: < 200KB (压缩后)
- **比例**: 正方形 (1:1)

## 🔄 更新版本信息

每次修改产品数据后，建议更新版本信息：

```json
{
  "version": "1.0.1",  // 递增版本号
  "lastUpdate": "2025-12-26",  // 更新日期
  "products": [ /* ... */ ]
}
```

## 📦 数据缓存管理

产品数据会被缓存24小时。如果需要立即看到更新：

### 方法一：清除浏览器缓存
- Chrome/Edge: `Ctrl + Shift + Delete`
- 或硬刷新: `Ctrl + F5`

### 方法二：更新版本号
修改 `/public/data/products.json` 中的 `version` 字段，系统会自动检测到版本变化并刷新缓存。

### 方法三：使用浏览器控制台
```javascript
// 打开浏览器控制台（F12），执行：
localStorage.removeItem('baisheng_products_cache');
localStorage.removeItem('baisheng_products_version');
localStorage.removeItem('baisheng_products_cache_time');
location.reload();
```

## ✅ 数据验证

添加或修改产品后，确保：

- [ ] 所有产品ID唯一
- [ ] categoryId 是有效的值: `daily`, `home`, `furniture`, `hardware`, `bags`
- [ ] title 同时包含 zh 和 en 字段
- [ ] description 同时包含 zh 和 en 字段
- [ ] image 路径正确，图片可访问
- [ ] JSON 格式正确（可使用 [JSONLint](https://jsonlint.com/) 验证）

## 🚀 发布流程

1. 修改 `/public/data/products.json`
2. 测试本地效果：`npm run dev`
3. 验证所有产品正确显示
4. 提交更改到Git
5. 部署到生产环境

## 🆘 常见问题

### Q: 修改后页面没有更新？
A: 清除浏览器缓存或使用硬刷新（Ctrl+F5）

### Q: 产品图片显示不出来？
A: 
1. 检查图片路径是否正确
2. 如果使用CDN，确保URL可访问
3. 检查图片文件是否存在

### Q: 如何批量添加产品？
A: 编辑 `products.json` 文件,直接添加多个产品对象

### Q: 能否使用其他图床服务？
A: 可以，只需将 `image` 字段设置为完整的图片URL即可

## 📖 示例

完整的产品示例：

```json
{
  "version": "1.0.0",
  "lastUpdate": "2025-12-26",
  "products": [
    {
      "id": 100,
      "categoryId": "bags",
      "image": "https://cdn.jsdelivr.net/gh/yourname/images@main/products/travel_backpack.jpg",
      "title": {
        "zh": "多功能旅行背包",
        "en": "Multi-functional Travel Backpack"
      },
      "description": {
        "zh": "大容量设计，多层分隔，适合长途旅行使用。",
        "en": "Large capacity design with multi-layer compartments, perfect for long trips."
      }
    }
  ]
}
```

## 📞 技术支持

如有问题，请参考：
- 开发规范: `/artifacts/development_standards.md`
- 实施计划: `/artifacts/implementation_plan.md`
