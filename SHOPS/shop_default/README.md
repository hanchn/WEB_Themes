# Shop Default - 电商主题

一个现代化、响应式的电商网站主题，提供完整的在线购物体验。

## 🌟 特性

- **响应式设计** - 完美适配桌面、平板和移动设备
- **现代化UI** - 简洁美观的用户界面设计
- **完整功能** - 包含电商网站所需的全部页面和功能
- **高性能** - 优化的代码结构和资源加载
- **易于定制** - 模块化的CSS和JavaScript架构
- **SEO友好** - 优化的HTML结构和元数据

## 📁 文件结构

```
shop_default/
├── assets/
│   ├── css/
│   │   ├── main.css           # 主样式文件
│   │   ├── components.css     # 组件样式
│   │   └── responsive.css     # 响应式样式
│   ├── js/
│   │   ├── main.js           # 主JavaScript文件
│   │   ├── cart.js           # 购物车功能
│   │   └── wishlist.js       # 心愿单功能
│   └── images/
│       └── logo.svg          # 网站Logo
├── components/
│   ├── header.html           # 公共头部组件
│   └── footer.html           # 公共底部组件
├── index.html                # 首页
├── collection.html           # 商品列表页
├── product.html              # 商品详情页
├── cart.html                 # 购物车页面
├── wishlist.html             # 心愿单页面
├── checkout.html             # 结算页面
├── success.html              # 支付成功页面
├── 404.html                  # 404错误页面
└── README.md                 # 项目说明文档
```

## 🚀 快速开始

### 1. 下载主题

将主题文件下载到您的Web服务器目录中。

### 2. 配置Web服务器

确保您的Web服务器支持静态文件服务。推荐使用：

- **Apache** - 确保启用mod_rewrite模块
- **Nginx** - 配置静态文件服务
- **本地开发** - 使用Python、Node.js或PHP内置服务器

#### 本地开发服务器示例：

```bash
# Python 3
python -m http.server 8000

# Node.js (需要安装http-server)
npx http-server -p 8000

# PHP
php -S localhost:8000
```

### 3. 访问网站

在浏览器中访问 `http://localhost:8000` 查看主题效果。

## 📄 页面说明

### 首页 (index.html)
- 轮播图展示
- 特色功能介绍
- 商品分类导航
- 推荐商品展示
- 邮件订阅

### 商品列表页 (collection.html)
- 商品筛选功能
- 排序选项
- 网格/列表视图切换
- 分页导航
- 面包屑导航

### 商品详情页 (product.html)
- 商品图片画廊
- 商品信息展示
- 规格选择
- 数量选择
- 添加到购物车/心愿单
- 商品评价
- 相关商品推荐

### 购物车页面 (cart.html)
- 购物车商品列表
- 数量修改
- 商品删除
- 优惠券应用
- 运费计算
- 价格汇总

### 心愿单页面 (wishlist.html)
- 收藏商品列表
- 批量操作
- 添加到购物车
- 商品分享
- 库存状态检查

### 结算页面 (checkout.html)
- 联系信息
- 收货地址管理
- 配送方式选择
- 支付方式选择
- 订单确认

### 支付成功页面 (success.html)
- 订单确认信息
- 订单状态跟踪
- 发票下载
- 客服联系
- 推荐商品

### 404错误页面 (404.html)
- 友好的错误提示
- 搜索功能
- 导航链接
- 热门页面推荐

## 🎨 自定义主题

### 修改颜色主题

在 `assets/css/main.css` 中修改CSS变量：

```css
:root {
  --primary-color: #667eea;     /* 主色调 */
  --secondary-color: #764ba2;   /* 辅助色 */
  --accent-color: #10B981;      /* 强调色 */
  --text-color: #1f2937;        /* 文字颜色 */
  --background-color: #ffffff;   /* 背景色 */
}
```

### 修改Logo

替换 `assets/images/logo.svg` 文件，或在CSS中修改logo样式。

### 添加自定义样式

在 `assets/css/main.css` 文件末尾添加您的自定义CSS代码。

### 修改JavaScript功能

主要的JavaScript文件：
- `assets/js/main.js` - 通用功能
- `assets/js/cart.js` - 购物车功能
- `assets/js/wishlist.js` - 心愿单功能

## 🔧 功能配置

### 购物车设置

在 `assets/js/cart.js` 中可以配置：

```javascript
const CART_CONFIG = {
    maxQuantity: 99,           // 最大购买数量
    freeShippingThreshold: 99, // 免运费门槛
    defaultShippingFee: 10,    // 默认运费
    taxRate: 0.1               // 税率
};
```

### 心愿单设置

在 `assets/js/wishlist.js` 中可以配置：

```javascript
const WISHLIST_CONFIG = {
    maxItems: 100,             // 最大收藏数量
    enableSharing: true,       // 启用分享功能
    enableQuickView: true      // 启用快速查看
};
```

## 📱 响应式断点

主题使用以下响应式断点：

```css
/* 移动设备 */
@media (max-width: 767px) { ... }

/* 平板设备 */
@media (min-width: 768px) and (max-width: 1023px) { ... }

/* 桌面设备 */
@media (min-width: 1024px) { ... }

/* 大屏设备 */
@media (min-width: 1200px) { ... }
```

## 🔍 SEO优化

主题已包含基本的SEO优化：

- 语义化HTML结构
- Meta标签优化
- Open Graph标签
- Twitter Card标签
- 结构化数据（可根据需要添加）
- 友好的URL结构

## 🌐 浏览器支持

- Chrome 60+
- Firefox 60+
- Safari 12+
- Edge 79+
- iOS Safari 12+
- Android Chrome 60+

## 📊 性能优化

### 已实现的优化：

1. **CSS优化**
   - 模块化CSS架构
   - 关键CSS内联
   - 响应式图片

2. **JavaScript优化**
   - 模块化代码结构
   - 事件委托
   - 防抖和节流

3. **图片优化**
   - SVG格式Logo
   - 响应式图片
   - 懒加载（可添加）

### 建议的进一步优化：

1. **启用Gzip压缩**
2. **设置浏览器缓存**
3. **使用CDN加速**
4. **图片懒加载**
5. **代码压缩**

## 🔒 安全考虑

1. **输入验证** - 所有用户输入都应进行验证
2. **XSS防护** - 避免直接插入用户内容
3. **CSRF防护** - 表单提交应包含CSRF令牌
4. **HTTPS** - 生产环境应使用HTTPS

## 🛠️ 开发工具

推荐的开发工具：

- **代码编辑器**: VS Code, Sublime Text, Atom
- **浏览器开发工具**: Chrome DevTools, Firefox Developer Tools
- **版本控制**: Git
- **包管理**: npm, yarn（如需要）
- **构建工具**: Webpack, Gulp, Parcel（可选）

## 📝 更新日志

### v1.0.0 (2024-01-01)
- 初始版本发布
- 包含所有基础页面和功能
- 响应式设计实现
- 购物车和心愿单功能

## 🤝 贡献

欢迎提交Issue和Pull Request来改进这个主题。

### 贡献指南：

1. Fork项目
2. 创建功能分支
3. 提交更改
4. 推送到分支
5. 创建Pull Request

## 📄 许可证

本项目采用MIT许可证。详情请查看LICENSE文件。

## 📞 支持

如果您在使用过程中遇到问题，可以通过以下方式获取帮助：

- 提交GitHub Issue
- 发送邮件至：support@shopdefault.com
- 查看在线文档

## 🙏 致谢

感谢所有为这个项目做出贡献的开发者和设计师。

---

**Shop Default** - 让电商网站开发变得简单高效！