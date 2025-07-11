// ===== Wishlist JavaScript for Shop Default Theme =====

// Wishlist specific functionality
document.addEventListener('DOMContentLoaded', function() {
    if (window.location.pathname.includes('wishlist')) {
        initializeWishlistPage();
    }
});

// ===== Wishlist Page Initialization =====
function initializeWishlistPage() {
    renderWishlistItems();
    initializeWishlistControls();
    initializeWishlistFilters();
    initializeWishlistSharing();
}

// ===== Render Wishlist Items =====
function renderWishlistItems() {
    const wishlistContainer = document.querySelector('.wishlist-items');
    if (!wishlistContainer) return;
    
    if (wishlist.length === 0) {
        wishlistContainer.innerHTML = `
            <div class="empty-wishlist">
                <div class="empty-wishlist-icon">
                    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                    </svg>
                </div>
                <h3>心愿单为空</h3>
                <p>您还没有添加任何商品到心愿单</p>
                <a href="/" class="btn btn-primary">去购物</a>
            </div>
        `;
        return;
    }
    
    const wishlistHTML = wishlist.map(item => `
        <div class="wishlist-item" data-product-id="${item.id}">
            <div class="wishlist-item-image">
                <img src="${item.image}" alt="${item.title}" loading="lazy">
                <div class="wishlist-item-overlay">
                    <button class="btn btn-sm btn-primary quick-add-to-cart" data-product-id="${item.id}">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <circle cx="9" cy="21" r="1"></circle>
                            <circle cx="20" cy="21" r="1"></circle>
                            <path d="m1 1 4 4 2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                        </svg>
                        加入购物车
                    </button>
                    <button class="btn btn-sm btn-secondary quick-view" data-product-id="${item.id}">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                            <circle cx="12" cy="12" r="3"></circle>
                        </svg>
                        快速查看
                    </button>
                </div>
            </div>
            <div class="wishlist-item-info">
                <h3 class="wishlist-item-title">
                    <a href="${item.url}">${item.title}</a>
                </h3>
                <div class="wishlist-item-meta">
                    <span class="wishlist-item-category">${item.category || '商品'}</span>
                    <span class="wishlist-item-date">添加于 ${formatDate(item.addedDate || new Date())}</span>
                </div>
                <div class="wishlist-item-price">
                    <span class="current-price">${item.price}</span>
                    ${item.originalPrice ? `<span class="original-price">${item.originalPrice}</span>` : ''}
                    ${item.discount ? `<span class="discount-badge">${item.discount}</span>` : ''}
                </div>
                <div class="wishlist-item-status">
                    ${getStockStatus(item)}
                </div>
            </div>
            <div class="wishlist-item-actions">
                <button class="btn btn-primary add-to-cart-btn" data-product-id="${item.id}">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <circle cx="9" cy="21" r="1"></circle>
                        <circle cx="20" cy="21" r="1"></circle>
                        <path d="m1 1 4 4 2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                    </svg>
                    加入购物车
                </button>
                <button class="btn btn-secondary share-item" data-product-id="${item.id}" title="分享商品">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <circle cx="18" cy="5" r="3"></circle>
                        <circle cx="6" cy="12" r="3"></circle>
                        <circle cx="18" cy="19" r="3"></circle>
                        <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
                        <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
                    </svg>
                </button>
                <button class="btn btn-secondary remove-from-wishlist" data-product-id="${item.id}" title="移除">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polyline points="3,6 5,6 21,6"></polyline>
                        <path d="m19,6v14a2,2 0 0,1 -2,2H7a2,2 0 0,1 -2,-2V6m3,0V4a2,2 0 0,1 2,-2h4a2,2 0 0,1 2,2v2"></path>
                        <line x1="10" y1="11" x2="10" y2="17"></line>
                        <line x1="14" y1="11" x2="14" y2="17"></line>
                    </svg>
                </button>
            </div>
        </div>
    `).join('');
    
    wishlistContainer.innerHTML = wishlistHTML;
}

// ===== Wishlist Controls =====
function initializeWishlistControls() {
    // Add to cart from wishlist
    document.addEventListener('click', function(e) {
        if (e.target.closest('.add-to-cart-btn') || e.target.closest('.quick-add-to-cart')) {
            const productId = e.target.closest('button').getAttribute('data-product-id');
            const product = wishlist.find(item => item.id === productId);
            if (product) {
                addToCart(product);
                // Optionally remove from wishlist after adding to cart
                // removeFromWishlist(productId);
            }
        }
        
        if (e.target.closest('.remove-from-wishlist')) {
            const productId = e.target.closest('.remove-from-wishlist').getAttribute('data-product-id');
            const product = wishlist.find(item => item.id === productId);
            if (product && confirm(`确定要从心愿单移除 "${product.title}" 吗？`)) {
                removeFromWishlist(productId);
            }
        }
        
        if (e.target.closest('.quick-view')) {
            const productId = e.target.closest('.quick-view').getAttribute('data-product-id');
            showQuickView(productId);
        }
        
        if (e.target.closest('.share-item')) {
            const productId = e.target.closest('.share-item').getAttribute('data-product-id');
            shareWishlistItem(productId);
        }
    });
    
    // Clear wishlist button
    const clearWishlistBtn = document.querySelector('.clear-wishlist');
    if (clearWishlistBtn) {
        clearWishlistBtn.addEventListener('click', function() {
            if (confirm('确定要清空心愿单吗？')) {
                clearWishlist();
            }
        });
    }
    
    // Move all to cart button
    const moveAllToCartBtn = document.querySelector('.move-all-to-cart');
    if (moveAllToCartBtn) {
        moveAllToCartBtn.addEventListener('click', function() {
            moveAllToCart();
        });
    }
}

// ===== Wishlist Filters =====
function initializeWishlistFilters() {
    const filterButtons = document.querySelectorAll('.wishlist-filter');
    const sortSelect = document.querySelector('.wishlist-sort');
    
    // Filter by category/status
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            filterWishlist(filter);
            
            // Update active state
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // Sort wishlist
    if (sortSelect) {
        sortSelect.addEventListener('change', function() {
            const sortBy = this.value;
            sortWishlist(sortBy);
        });
    }
}

function filterWishlist(filter) {
    const items = document.querySelectorAll('.wishlist-item');
    
    items.forEach(item => {
        const productId = item.getAttribute('data-product-id');
        const product = wishlist.find(p => p.id === productId);
        
        let shouldShow = true;
        
        switch (filter) {
            case 'all':
                shouldShow = true;
                break;
            case 'in-stock':
                shouldShow = product && product.inStock !== false;
                break;
            case 'out-of-stock':
                shouldShow = product && product.inStock === false;
                break;
            case 'on-sale':
                shouldShow = product && product.onSale === true;
                break;
            default:
                shouldShow = true;
        }
        
        item.style.display = shouldShow ? 'block' : 'none';
    });
}

function sortWishlist(sortBy) {
    const container = document.querySelector('.wishlist-items');
    const items = Array.from(container.querySelectorAll('.wishlist-item'));
    
    items.sort((a, b) => {
        const productA = wishlist.find(p => p.id === a.getAttribute('data-product-id'));
        const productB = wishlist.find(p => p.id === b.getAttribute('data-product-id'));
        
        switch (sortBy) {
            case 'name-asc':
                return productA.title.localeCompare(productB.title);
            case 'name-desc':
                return productB.title.localeCompare(productA.title);
            case 'price-asc':
                return parseFloat(productA.price.replace(/[^\d.]/g, '')) - parseFloat(productB.price.replace(/[^\d.]/g, ''));
            case 'price-desc':
                return parseFloat(productB.price.replace(/[^\d.]/g, '')) - parseFloat(productA.price.replace(/[^\d.]/g, ''));
            case 'date-asc':
                return new Date(productA.addedDate || 0) - new Date(productB.addedDate || 0);
            case 'date-desc':
                return new Date(productB.addedDate || 0) - new Date(productA.addedDate || 0);
            default:
                return 0;
        }
    });
    
    // Re-append sorted items
    items.forEach(item => container.appendChild(item));
}

// ===== Wishlist Sharing =====
function initializeWishlistSharing() {
    const shareWishlistBtn = document.querySelector('.share-wishlist');
    if (shareWishlistBtn) {
        shareWishlistBtn.addEventListener('click', function() {
            shareEntireWishlist();
        });
    }
}

function shareWishlistItem(productId) {
    const product = wishlist.find(item => item.id === productId);
    if (!product) return;
    
    const shareData = {
        title: product.title,
        text: `查看这个商品: ${product.title}`,
        url: product.url
    };
    
    if (navigator.share) {
        navigator.share(shareData).catch(err => {
            console.log('分享失败:', err);
            fallbackShare(shareData);
        });
    } else {
        fallbackShare(shareData);
    }
}

function shareEntireWishlist() {
    const wishlistUrl = `${window.location.origin}/wishlist/shared/${generateShareId()}`;
    const shareData = {
        title: '我的心愿单',
        text: `查看我的心愿单，共 ${wishlist.length} 件商品`,
        url: wishlistUrl
    };
    
    if (navigator.share) {
        navigator.share(shareData).catch(err => {
            console.log('分享失败:', err);
            fallbackShare(shareData);
        });
    } else {
        fallbackShare(shareData);
    }
}

function fallbackShare(shareData) {
    // Copy to clipboard as fallback
    const textToCopy = `${shareData.title}\n${shareData.text}\n${shareData.url}`;
    
    if (navigator.clipboard) {
        navigator.clipboard.writeText(textToCopy).then(() => {
            showNotification('链接已复制到剪贴板', 'success');
        });
    } else {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = textToCopy;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        showNotification('链接已复制到剪贴板', 'success');
    }
}

function generateShareId() {
    // Generate a unique share ID for the wishlist
    return Math.random().toString(36).substr(2, 9);
}

// ===== Wishlist Utilities =====
function removeFromWishlist(productId) {
    const index = wishlist.findIndex(item => item.id === productId);
    if (index > -1) {
        const removedItem = wishlist.splice(index, 1)[0];
        saveWishlist();
        updateWishlistCount();
        renderWishlistItems();
        showNotification(`${removedItem.title} 已从心愿单移除`, 'info');
    }
}

function clearWishlist() {
    wishlist = [];
    saveWishlist();
    updateWishlistCount();
    renderWishlistItems();
    showNotification('心愿单已清空', 'info');
}

function moveAllToCart() {
    if (wishlist.length === 0) {
        showNotification('心愿单为空', 'warning');
        return;
    }
    
    const itemsToMove = [...wishlist];
    itemsToMove.forEach(item => {
        addToCart(item);
    });
    
    clearWishlist();
    showNotification(`${itemsToMove.length} 件商品已添加到购物车`, 'success');
}

function getStockStatus(item) {
    if (item.inStock === false) {
        return '<span class="stock-status out-of-stock">缺货</span>';
    } else if (item.lowStock) {
        return '<span class="stock-status low-stock">库存不足</span>';
    } else {
        return '<span class="stock-status in-stock">有库存</span>';
    }
}

function isInWishlist(productId) {
    return wishlist.some(item => item.id === productId);
}

function getWishlistItemCount() {
    return wishlist.length;
}

// ===== Wishlist Analytics =====
function trackWishlistEvent(event, data) {
    console.log('Wishlist Event:', event, data);
    
    // Example: Google Analytics tracking
    if (typeof gtag !== 'undefined') {
        gtag('event', event, {
            event_category: 'wishlist',
            event_label: data.productId || '',
            value: data.value || 0
        });
    }
}

// ===== Date Formatting =====
function formatDate(date) {
    const d = new Date(date);
    const now = new Date();
    const diffTime = Math.abs(now - d);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) {
        return '昨天';
    } else if (diffDays < 7) {
        return `${diffDays} 天前`;
    } else if (diffDays < 30) {
        const weeks = Math.floor(diffDays / 7);
        return `${weeks} 周前`;
    } else {
        return d.toLocaleDateString('zh-CN');
    }
}

// ===== Wishlist Notifications =====
function setupWishlistNotifications() {
    // Check for price drops
    wishlist.forEach(item => {
        if (item.originalPrice && item.priceDropNotification) {
            checkPriceDrop(item);
        }
    });
    
    // Check for back in stock
    wishlist.forEach(item => {
        if (item.inStock === false && item.stockNotification) {
            checkBackInStock(item);
        }
    });
}

function checkPriceDrop(item) {
    // This would typically check against current price from API
    // For demo purposes, we'll simulate
    const currentPrice = parseFloat(item.price.replace(/[^\d.]/g, ''));
    const originalPrice = parseFloat(item.originalPrice.replace(/[^\d.]/g, ''));
    
    if (currentPrice < originalPrice) {
        showNotification(`${item.title} 降价了！现价 ${item.price}`, 'success');
    }
}

function checkBackInStock(item) {
    // This would typically check stock status from API
    // For demo purposes, we'll simulate
    if (Math.random() > 0.8) { // 20% chance of being back in stock
        item.inStock = true;
        saveWishlist();
        showNotification(`${item.title} 重新有库存了！`, 'success');
    }
}

// ===== Export wishlist functions =====
window.WishlistModule = {
    renderWishlistItems,
    removeFromWishlist,
    clearWishlist,
    moveAllToCart,
    shareWishlistItem,
    shareEntireWishlist,
    isInWishlist,
    getWishlistItemCount
};