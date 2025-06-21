document.addEventListener('DOMContentLoaded', function() {
    setupNavigation();
    setupButtons();
    setupFilters();
    setupCart();
});

function setupNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
            filterProducts(this.textContent.toLowerCase());
        });
    });
}

function setupButtons() {
    const herButton = document.querySelector('.btn-secondary');
    const shopButton = document.querySelector('.btn-primary');
    
    herButton?.addEventListener('click', () => {
        document.querySelector('.products').scrollIntoView({ behavior: 'smooth' });
        showNotification('Showing products for HER');
    });
    
    shopButton?.addEventListener('click', () => {
        document.querySelector('.products').scrollIntoView({ behavior: 'smooth' });
        showNotification('Welcome to our store!');
    });
    
    document.querySelectorAll('.btn').forEach(btn => {
        if (btn.textContent.includes('Add to Cart')) {
            btn.addEventListener('click', () => addToCart(btn));
        }
        if (btn.textContent.includes('Explore')) {
            btn.addEventListener('click', () => exploreDeals(btn));
        }
    });
}

function setupFilters() {
    const filterPill = document.querySelector('.filter-pill');
    
    filterPill?.addEventListener('click', function() {
        this.classList.toggle('active');
        if (this.classList.contains('active')) {
            this.style.background = '#e9a8b8';
            this.style.color = 'white';
        } else {
            this.style.background = '#f8f9fa';
            this.style.color = '#333';
        }
    });
}

function setupCart() {
    const cartIcon = document.querySelector('.fa-shopping-cart');
    let cartCount = 0;
    
    const badge = document.createElement('span');
    badge.style.cssText = `
        position: absolute;
        top: -8px;
        right: -8px;
        background: #e74c3c;
        color: white;
        border-radius: 50%;
        width: 20px;
        height: 20px;
        font-size: 12px;
        display: none;
        align-items: center;
        justify-content: center;
    `;
    cartIcon.parentNode.style.position = 'relative';
    cartIcon.parentNode.appendChild(badge);
    
    window.updateCartBadge = function(count) {
        cartCount = count;
        badge.textContent = count;
        badge.style.display = count > 0 ? 'flex' : 'none';
    };
}

function filterProducts(category) {
    const cards = document.querySelectorAll('.product-card');
    cards.forEach(card => {
        card.style.display = 'block';
        card.style.opacity = '0';
        setTimeout(() => {
            card.style.opacity = '1';
        }, Math.random() * 300);
    });
}

function addToCart(button) {
    const card = button.closest('.product-card');
    const productName = card.querySelector('h3').textContent;
    
    button.style.background = '#27ae60';
    button.textContent = '✓ Added';
    
    setTimeout(() => {
        button.style.background = '';
        button.textContent = 'Add to Cart';
    }, 1500);
    
    updateCartBadge(parseInt(document.querySelector('.cart-badge')?.textContent || 0) + 1);
    showNotification(`${productName} added to cart!`);
}

function exploreDeals(button) {
    const card = button.closest('.product-card, .sponsored-item');
    const storeName = card.querySelector('h3').textContent;
    
    button.textContent = 'Loading...';
    button.disabled = true;
    
    setTimeout(() => {
        button.textContent = 'Explore Deals';
        button.disabled = false;
        showNotification(`Found deals at ${storeName}!`);
    }, 2000);
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #27ae60;
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        z-index: 9999;
        transform: translateX(300px);
        transition: transform 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => notification.style.transform = 'translateX(0)', 100);
    setTimeout(() => {
        notification.style.transform = 'translateX(300px)';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}