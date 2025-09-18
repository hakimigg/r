
function loadFeaturedProducts() {
    const featuredContainer = document.getElementById('featuredProducts');
    if (!featuredContainer) return;
    
    const stored = localStorage.getItem('featuredProducts');
    const featuredProducts = stored ? JSON.parse(stored) : [
        {
            id: 'p1',
            name: 'Hex Bolts M8',
            company: 'TechBolt Solutions',
            price: 12.99,
            description: 'High-quality hex bolts made from stainless steel for industrial applications.'
        },
        {
            id: 'd1',
            name: 'Socket Screws',
            company: 'TechBolt Solutions', 
            price: 8.50,
            description: 'Precision socket head cap screws for demanding industrial use.'
        },
        {
            id: 'c1',
            name: 'Washers Set',
            company: 'TechBolt Solutions',
            price: 15.75,
            description: 'Complete set of flat and lock washers in various sizes.'
        }
    ];
    
    featuredContainer.innerHTML = featuredProducts.map(product => `
        <div class="featured-product">
            <div class="featured-image">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path>
                </svg>
            </div>
            <div class="featured-content">
                <h3 class="featured-title">${product.name}</h3>
                <p class="featured-company">${product.company}</p>
                <div class="featured-price">${typeof product.price === 'number' ? '$' + product.price.toFixed(2) : product.price}</div>
                <p class="featured-description">${product.description}</p>
                <button class="featured-btn" onclick="openProductModal('${product.id}')">
                    View Details
                </button>
            </div>
        </div>
    `).join('');
}

function addScrollAnimations() {
    const animatedElements = document.querySelectorAll('.stat-card, .testimonial-card, .featured-product');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        loadFeaturedProducts();
        addScrollAnimations();
    }, 100);
});
