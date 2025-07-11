// ===== Cart JavaScript for Shop Default Theme =====

// Cart specific functionality
document.addEventListener('DOMContentLoaded', function() {
    if (window.location.pathname.includes('cart')) {
        initializeCartPage();
    }
});

// ===== Cart Page Initialization =====
function initializeCartPage() {
    renderCartItems();
    updateCartSummary();
    initializeCartControls();
    initializeCouponCode();
    initializeShippingCalculator();
}

// ===== Render Cart Items =====
function renderCartItems() {
    const cartContainer = document.querySelector('.cart-items');
    if (!cartContainer) return;
    
    if (cart.length === 0) {
        cartContainer.innerHTML = `
            <div class="empty-cart">
                <div class="empty-cart-icon">
                    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <circle cx="9" cy="21" r="1"></circle>
                        <circle cx="20" cy="21" r="1"></circle>
                        <path d="m1 1 4 4 2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                    </svg>
                </div>
                <h3>购物车为空</h3>
                <p>您还没有添加任何商品到购物车</p>
                <a href="/" class="btn btn-primary">继续购物</a>
            </div>
        `;
        return;
    }
    
    const cartHTML = cart.map(item => `
        <div class="cart-item" data-product-id="${item.id}">
            <div class="cart-item-image">
                <img src="${item.image}" alt="${item.title}" loading="lazy">
            </div>
            <div class="cart-item-details">
                <h3 class="cart-item-title">
                    <a href="${item.url}">${item.title}</a>
                </h3>
                <div class="cart-item-meta">
                    <span class="cart-item-sku">SKU: ${item.sku || item.id}</span>
                    ${item.variant ? `<span class="cart-item-variant">${item.variant}</span>` : ''}
                </div>
                <div class="cart-item-price">
                    <span class="current-price">${item.price}</span>
                    ${item.originalPrice ? `<span class="original-price">${item.originalPrice}</span>` : ''}
                </div>
            </div>
            <div class="cart-item-actions">
                <div class="quantity-controls">
                    <button class="quantity-btn quantity-decrease" data-product-id="${item.id}">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <line x1="5" y1="12" x2="19" y2="12"></line>
                        </svg>
                    </button>
                    <input type="number" class="quantity-input" value="${item.quantity}" min="1" data-product-id="${item.id}">
                    <button class="quantity-btn quantity-increase" data-product-id="${item.id}">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <line x1="12" y1="5" x2="12" y2="19"></line>
                            <line x1="5" y1="12" x2="19" y2="12"></line>
                        </svg>
                    </button>
                </div>
                <div class="cart-item-total">
                    ${formatPrice(parseFloat(item.price.replace(/[^\d.]/g, '')) * item.quantity)}
                </div>
                <button class="cart-item-remove" data-product-id="${item.id}" title="移除商品">
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
    
    cartContainer.innerHTML = cartHTML;
}

// ===== Cart Controls =====
function initializeCartControls() {
    // Quantity controls
    document.addEventListener('click', function(e) {
        if (e.target.closest('.quantity-decrease')) {
            const productId = e.target.closest('.quantity-decrease').getAttribute('data-product-id');
            const item = cart.find(item => item.id === productId);
            if (item && item.quantity > 1) {
                updateCartQuantity(productId, item.quantity - 1);
            }
        }
        
        if (e.target.closest('.quantity-increase')) {
            const productId = e.target.closest('.quantity-increase').getAttribute('data-product-id');
            const item = cart.find(item => item.id === productId);
            if (item) {
                updateCartQuantity(productId, item.quantity + 1);
            }
        }
        
        if (e.target.closest('.cart-item-remove')) {
            const productId = e.target.closest('.cart-item-remove').getAttribute('data-product-id');
            const item = cart.find(item => item.id === productId);
            if (item && confirm(`确定要移除 "${item.title}" 吗？`)) {
                removeFromCart(productId);
            }
        }
    });
    
    // Quantity input changes
    document.addEventListener('change', function(e) {
        if (e.target.classList.contains('quantity-input')) {
            const productId = e.target.getAttribute('data-product-id');
            const newQuantity = parseInt(e.target.value);
            if (newQuantity > 0) {
                updateCartQuantity(productId, newQuantity);
            } else {
                e.target.value = 1;
            }
        }
    });
    
    // Clear cart button
    const clearCartBtn = document.querySelector('.clear-cart');
    if (clearCartBtn) {
        clearCartBtn.addEventListener('click', function() {
            if (confirm('确定要清空购物车吗？')) {
                clearCart();
            }
        });
    }
}

// ===== Cart Summary =====
function updateCartSummary() {
    const summaryContainer = document.querySelector('.cart-summary');
    if (!summaryContainer) return;
    
    const subtotal = getCartSubtotal();
    const shipping = getShippingCost();
    const tax = getTaxAmount(subtotal);
    const discount = getDiscountAmount(subtotal);
    const total = subtotal + shipping + tax - discount;
    
    const summaryHTML = `
        <div class="cart-summary-content">
            <h3>订单摘要</h3>
            <div class="summary-line">
                <span>商品小计 (${cart.reduce((total, item) => total + item.quantity, 0)} 件)</span>
                <span>${formatPrice(subtotal)}</span>
            </div>
            ${discount > 0 ? `
                <div class="summary-line discount">
                    <span>优惠折扣</span>
                    <span>-${formatPrice(discount)}</span>
                </div>
            ` : ''}
            <div class="summary-line">
                <span>运费</span>
                <span>${shipping > 0 ? formatPrice(shipping) : '免费'}</span>
            </div>
            <div class="summary-line">
                <span>税费</span>
                <span>${formatPrice(tax)}</span>
            </div>
            <div class="summary-line total">
                <span>总计</span>
                <span>${formatPrice(total)}</span>
            </div>
            <div class="cart-actions">
                <button class="btn btn-secondary btn-lg w-full update-cart">更新购物车</button>
                <button class="btn btn-primary btn-lg w-full checkout-btn">去结算</button>
            </div>
        </div>
    `;
    
    summaryContainer.innerHTML = summaryHTML;
    
    // Checkout button
    const checkoutBtn = summaryContainer.querySelector('.checkout-btn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', function() {
            window.location.href = '/checkout';
        });
    }
    
    // Update cart button
    const updateBtn = summaryContainer.querySelector('.update-cart');
    if (updateBtn) {
        updateBtn.addEventListener('click', function() {
            renderCartItems();
            updateCartSummary();
            showNotification('购物车已更新', 'success');
        });
    }
}

// ===== Coupon Code =====
function initializeCouponCode() {
    const couponForm = document.querySelector('.coupon-form');
    if (couponForm) {
        couponForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const couponInput = this.querySelector('.coupon-input');
            const couponCode = couponInput.value.trim();
            
            if (couponCode) {
                applyCoupon(couponCode);
            }
        });
    }
}

function applyCoupon(code) {
    // Simulate coupon validation
    const validCoupons = {
        'SAVE10': { type: 'percentage', value: 10, description: '10% 折扣' },
        'SAVE50': { type: 'fixed', value: 50, description: '满减 ¥50' },
        'FREESHIP': { type: 'shipping', value: 0, description: '免运费' }
    };
    
    const coupon = validCoupons[code.toUpperCase()];
    
    if (coupon) {
        // Store applied coupon
        localStorage.setItem('appliedCoupon', JSON.stringify(coupon));
        showNotification(`优惠券已应用: ${coupon.description}`, 'success');
        updateCartSummary();
    } else {
        showNotification('无效的优惠券代码', 'error');
    }
}

function getDiscountAmount(subtotal) {
    const appliedCoupon = JSON.parse(localStorage.getItem('appliedCoupon') || 'null');
    if (!appliedCoupon) return 0;
    
    switch (appliedCoupon.type) {
        case 'percentage':
            return subtotal * (appliedCoupon.value / 100);
        case 'fixed':
            return Math.min(appliedCoupon.value, subtotal);
        default:
            return 0;
    }
}

// ===== Shipping Calculator =====
function initializeShippingCalculator() {
    const shippingForm = document.querySelector('.shipping-calculator');
    if (shippingForm) {
        shippingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const formData = new FormData(this);
            const shippingData = {
                country: formData.get('country'),
                state: formData.get('state'),
                city: formData.get('city'),
                zipcode: formData.get('zipcode')
            };
            
            calculateShipping(shippingData);
        });
    }
}

function calculateShipping(shippingData) {
    // Simulate shipping calculation
    const shippingRates = {
        'standard': { name: '标准配送', price: 10, days: '5-7个工作日' },
        'express': { name: '快速配送', price: 25, days: '2-3个工作日' },
        'overnight': { name: '次日达', price: 50, days: '1个工作日' }
    };
    
    // Store shipping data
    localStorage.setItem('shippingAddress', JSON.stringify(shippingData));
    
    // Show shipping options
    showShippingOptions(shippingRates);
}

function showShippingOptions(rates) {
    const container = document.querySelector('.shipping-options');
    if (!container) return;
    
    const optionsHTML = Object.entries(rates).map(([key, rate]) => `
        <div class="shipping-option">
            <input type="radio" id="shipping-${key}" name="shipping" value="${key}" data-price="${rate.price}">
            <label for="shipping-${key}">
                <div class="shipping-info">
                    <span class="shipping-name">${rate.name}</span>
                    <span class="shipping-time">${rate.days}</span>
                </div>
                <span class="shipping-price">${rate.price > 0 ? formatPrice(rate.price) : '免费'}</span>
            </label>
        </div>
    `).join('');
    
    container.innerHTML = `
        <h4>选择配送方式</h4>
        ${optionsHTML}
    `;
    
    // Handle shipping option selection
    container.addEventListener('change', function(e) {
        if (e.target.name === 'shipping') {
            const selectedPrice = parseFloat(e.target.getAttribute('data-price'));
            localStorage.setItem('selectedShipping', JSON.stringify({
                method: e.target.value,
                price: selectedPrice
            }));
            updateCartSummary();
        }
    });
}

// ===== Cart Calculations =====
function getCartSubtotal() {
    return cart.reduce((total, item) => {
        const price = parseFloat(item.price.replace(/[^\d.]/g, ''));
        return total + (price * item.quantity);
    }, 0);
}

function getShippingCost() {
    const appliedCoupon = JSON.parse(localStorage.getItem('appliedCoupon') || 'null');
    if (appliedCoupon && appliedCoupon.type === 'shipping') {
        return 0;
    }
    
    const selectedShipping = JSON.parse(localStorage.getItem('selectedShipping') || 'null');
    return selectedShipping ? selectedShipping.price : 10; // Default shipping
}

function getTaxAmount(subtotal) {
    const taxRate = 0.08; // 8% tax rate
    return subtotal * taxRate;
}

// ===== Cart Utilities =====
function clearCart() {
    cart = [];
    saveCart();
    updateCartCount();
    renderCartItems();
    updateCartSummary();
    showNotification('购物车已清空', 'info');
}

function getCartItemCount() {
    return cart.reduce((total, item) => total + item.quantity, 0);
}

function isInCart(productId) {
    return cart.some(item => item.id === productId);
}

// ===== Cart Persistence =====
function saveCartToServer() {
    // This would typically sync cart with server
    // For now, we'll just use localStorage
    saveCart();
}

function loadCartFromServer() {
    // This would typically load cart from server
    // For now, we'll just use localStorage
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
    }
}

// ===== Cart Analytics =====
function trackCartEvent(event, data) {
    // Track cart events for analytics
    console.log('Cart Event:', event, data);
    
    // Example: Google Analytics tracking
    if (typeof gtag !== 'undefined') {
        gtag('event', event, {
            event_category: 'ecommerce',
            event_label: data.productId || '',
            value: data.value || 0
        });
    }
}

// ===== Export cart functions =====
window.CartModule = {
    renderCartItems,
    updateCartSummary,
    clearCart,
    getCartSubtotal,
    getShippingCost,
    getTaxAmount,
    applyCoupon,
    calculateShipping
};