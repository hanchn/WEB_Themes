# Shop Default - 电商主题

一套现代化的电商网站主题，包含完整的购物流程和用户体验。

## 🛍️ 主题特性

- **响应式设计**: 完美适配桌面端、平板和移动设备
- **现代化UI**: 简洁美观的界面设计
- **完整购物流程**: 从浏览商品到支付完成的全流程支持
- **高性能**: 优化的代码结构和加载速度
- **SEO友好**: 良好的搜索引擎优化

## 📁 文件结构

```
shop_default/
├── assets/
│   ├── css/
│   │   ├── main.css
│   │   ├── components.css
│   │   └── responsive.css
│   ├── js/
│   │   ├── main.js
│   │   ├── cart.js
│   │   └── wishlist.js
│   └── images/
│       ├── logo.svg
│       └── icons/
├── components/
│   ├── header.html
│   ├── footer.html
│   ├── navigation.html
│   └── product-card.html
├── pages/
│   ├── index.html          # 首页
│   ├── collection.html     # 商品列表页
│   ├── product.html        # 商品详情页(PDP)
│   ├── cart.html           # 购物车
│   ├── wishlist.html       # 心愿单
│   ├── checkout.html       # 支付页
│   ├── success.html        # 支付成功页
│   └── 404.html           # 404错误页
├── config/
│   └── theme.json
└── README.md
```

## 🎨 设计风格

- **配色方案**: 现代简约，主色调为深蓝色配白色
- **字体**: 系统字体栈，确保最佳兼容性
- **布局**: Grid + Flexbox 混合布局
- **动画**: 微交互动画提升用户体验

## 📱 页面说明

### 首页 (index.html)
- Hero Banner 轮播图
- 热门商品推荐
- 分类导航
- 品牌展示
- 新闻资讯

### 商品列表页 (collection.html)
- 商品筛选器
- 排序功能
- 分页导航
- 商品网格布局

### 商品详情页 (product.html)
- 商品图片画廊
- 商品信息详情
- 规格选择器
- 相关商品推荐
- 用户评价

### 购物车 (cart.html)
- 商品列表
- 数量调整
- 优惠券输入
- 价格计算

### 心愿单 (wishlist.html)
- 收藏商品列表
- 快速加入购物车
- 分享功能

### 支付页 (checkout.html)
- 收货地址
- 支付方式选择
- 订单确认

### 支付成功页 (success.html)
- 订单确认信息
- 继续购物引导

### 404页面 (404.html)
- 友好的错误提示
- 返回首页引导

## 🛠️ 技术栈

- **HTML5**: 语义化标签
- **CSS3**: Flexbox, Grid, CSS Variables
- **JavaScript**: ES6+, 模块化开发
- **图标**: SVG图标系统

## 🚀 使用方法

1. 下载主题文件
2. 根据需要修改配置文件
3. 自定义样式和内容
4. 部署到服务器

## 🎯 自定义配置

主题配置文件 `config/theme.json` 包含：
- 颜色配置
- 字体设置
- 布局参数
- 功能开关

## 📞 技术支持

如有问题或建议，请联系开发团队。

---

**版本**: 1.0.0  
**更新时间**: 2024年  
**兼容性**: 现代浏览器 (Chrome 60+, Firefox 60+, Safari 12+, Edge 79+)