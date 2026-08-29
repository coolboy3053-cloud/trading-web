# 柏盛贸易网站

东莞市柏盛贸易有限公司官方网站 - 专业的进出口贸易综合服务商

## 📋 项目简介

这是一个现代化的企业展示网站，使用React + TypeScript + Vite构建，支持中英文双语切换，展示公司业务、产品和服务信息。

### ✨ 主要特性

- 🌍 **双语支持**: 中文/英文自由切换
- 📱 **响应式设计**: 完美适配各种设备
- 🚀 **动态产品加载**: 产品数据通过JSON文件管理，易于维护
- 💾 **智能缓存**: 产品数据本地缓存，提升加载速度
- 🎨 **现代UI**: 优雅的用户界面和流畅的交互体验
- 🔍 **产品分类**: 支持按分类筛选产品

## 🛠️ 技术栈

- **前端框架**: React 18
- **语言**: TypeScript
- **构建工具**: Vite
- **路由**: React Router
- **图标**: Lucide React
- **样式**: CSS Modules
- **部署**: Docker / GitHub Pages

## 📁 项目结构

```
baishengtrading/
├── src/
│   ├── components/          # React组件
│   │   ├── Navbar.tsx       # 导航栏
│   │   ├── Hero.tsx         # 首屏
│   │   ├── ProductShowcase.tsx  # 产品展示
│   │   ├── ProductModal.tsx     # 产品详情弹窗
│   │   ├── Services.tsx     # 服务介绍
│   │   ├── About.tsx        # 关于我们
│   │   └── ...
│   ├── context/             # React Context
│   │   └── I18nContext.tsx  # 国际化上下文
│   ├── utils/               # 工具函数
│   │   └── dataLoader.ts    # 数据加载工具
│   ├── types/               # TypeScript类型定义
│   │   └── product.types.ts # 产品数据类型
│   └── ...
├── public/
│   ├── data/                # 数据文件
│   │   └── products.json    # 产品数据
│   └── images/              # 图片资源
├── utils/                   # 项目工具脚本
│   └── migrate_data.py      # 数据迁移工具
├── docs/                    # 文档
└── ...
```

## 🚀 快速开始

### 环境要求

- Node.js >= 16
- npm 或 yarn

### 安装依赖

```bash
npm install
```

### 开发模式

```bash
npm run dev
```

访问 http://localhost:5173

### 生产构建

```bash
npm run build
```

构建产物在 `dist/` 目录

### 预览构建

```bash
npm run preview
```

## 📝 产品数据管理

产品数据存储在 `/public/data/products.json`，支持动态加载和缓存。

### ✨ 多图支持（新功能）

产品详情页现已支持多张图片展示：
- 📸 图片轮播（缩略图 + 箭头切换）
- 📋 结构化产品规格参数
- 🔄 向后兼容旧的单图格式

### 数据结构

**新格式（推荐）**：
```json
{
  "id": 100,
  "categoryId": "daily",
  "images": ["img1.jpg", "img2.jpg", "img3.jpg"],  // 多图
  "thumbnail": "thumb.jpg",  // 可选
  "title": { "zh": "产品名", "en": "Product Name" },
  "shortDesc": { "zh": "简短描述", "en": "Short desc" },  // 可选
  "description": { "zh": "产品描述", "en": "Description" },
  "detailDesc": { "zh": "详细描述", "en": "Detail" },  // 可选
  "specs": [  // 可选
    {
      "label": { "zh": "材质", "en": "Material" },
      "value": { "zh": "不锈钢", "en": "Stainless Steel" }
    }
  ]
}
```

**旧格式（仍支持）**：
```json
{
  "id": 100,
  "categoryId": "daily",
  "image": "product.jpg",  // 单图
  "title": { "zh": "产品名", "en": "Product Name" },
  "description": { "zh": "产品描述", "en": "Description" }
}
```

### 添加新产品

编辑 `public/data/products.json`，添加新产品对象：

```json
{
  "id": 100,
  "categoryId": "daily",
  "image": "https://cdn.example.com/product.jpg",
  "title": {
    "zh": "产品名称",
    "en": "Product Name"
  },
  "description": {
    "zh": "产品描述",
    "en": "Product description"
  }
}
```

详细文档请参考: [产品数据管理指南](./PUBLIC_DATA_README.md)

## 🌐 部署

### Docker部署

```bash
# 开发环境
docker-compose up

# 生产环境
docker-compose -f docker-compose.prod.yml up -d
```

### GitHub Pages

项目配置了自动部署到GitHub Pages，推送到主分支即可自动部署。

## 📚 文档

- [开发规范](./docs/development_standards.md)
- [产品数据管理指南](./PUBLIC_DATA_README.md)
- [实施计划](./docs/implementation_plan.md)

## 🔧 配置

### 环境变量

创建 `.env` 文件：

```env
VITE_API_BASE_URL=https://api.example.com
VITE_IMAGE_CDN=https://cdn.example.com
```

### 图床配置

推荐使用 jsDelivr CDN：

```
https://cdn.jsdelivr.net/gh/username/repo@main/images/product.jpg
```

## 🤝 贡献

欢迎提交 Issue 和 Pull Request

## 📄 许可证

Copyright © 东莞市柏盛贸易有限公司

## 📞 联系方式

- 地址: 东莞市石龙镇东江大道石龙段西80号533室
- 电话: 0769-86291786
- 网站: https://baishengtrading.com

---

**技术支持**: 基于 React + TypeScript + Vite 构建
