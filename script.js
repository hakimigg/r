function loadCompaniesData() {
    const adminData = localStorage.getItem('adminData');
    if (adminData) {
        try {
            const data = JSON.parse(adminData);
            return data.companies || getFallbackData();
        } catch (error) {
            console.error('Error loading admin data:', error);
            return getFallbackData();
        }
    }
    return getFallbackData();
}

function getFallbackData() {
    return [
        {
            id: '1',
            name: 'TechBolt Solutions',
            image: '',
            products: [
                { 
                    id: 'p1', 
                    name: 'Hex Bolts M8', 
                    category: 'Bolts', 
                    company: 'TechBolt Solutions',
                    price: 12.99,
                    description: 'High-quality hex bolts made from stainless steel',
                    specifications: 'Material: Stainless Steel, Size: M8, Length: 50mm, Thread: Metric'
                },
                { 
                    id: 'd1', 
                    name: 'Socket Screws', 
                    category: 'Screws', 
                    company: 'TechBolt Solutions',
                    price: 8.50,
                    description: 'Precision socket head cap screws for industrial use',
                    specifications: 'Material: Alloy Steel, Size: M6, Length: 30mm, Head Type: Socket'
                },
                { 
                    id: 'c1', 
                    name: 'Washers Set', 
                    category: 'Washers', 
                    company: 'TechBolt Solutions',
                    price: 15.75,
                    description: 'Complete set of flat and lock washers',
                    specifications: 'Material: Steel, Sizes: M6-M12, Quantity: 100 pieces'
                }
            ]
        },
        {
            id: '2',
            name: 'Premium Hardware Co',
            image: '',
            products: [
                { 
                    id: 'x1', 
                    name: 'Stainless Bolts', 
                    category: 'Bolts', 
                    company: 'Premium Hardware Co',
                    price: 18.99,
                    description: 'Corrosion-resistant stainless steel bolts',
                    specifications: 'Material: 316 Stainless Steel, Size: M10, Length: 60mm'
                },
                { 
                    id: 'y1', 
                    name: 'Wing Nuts', 
                    category: 'Nuts', 
                    company: 'Premium Hardware Co',
                    price: 6.25,
                    description: 'Easy-grip wing nuts for quick assembly',
                    specifications: 'Material: Zinc Plated Steel, Size: M8, Thread: Metric'
                }
            ]
        }
    ];
}

let companies = loadCompaniesData();

function getAllProducts() {
    return companies.flatMap(company => company.products);
}

function searchProducts(query, companyId = null) {
    const products = companyId 
        ? companies.find(c => c.id === companyId)?.products || []
        : getAllProducts();
        
    if (!query.trim()) return products;
    
    return products.filter(product =>
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.category.toLowerCase().includes(query.toLowerCase())
    );
}

function createCompanyCard(company) {
    return `
        <div class="company-card" onclick="showCompanyProducts('${company.id}')">
            <div class="company-info">
                <h3 class="company-name">${company.name}</h3>
                <p class="company-products-count">${company.products.length} products available</p>
                <button class="company-view-btn">View Products</button>
            </div>
        </div>
    `;
}

function createProductCard(product) {
    return `
        <div class="product-card" onclick="openProductModal('${product.id}')">
            <h3 class="product-name">${product.name}</h3>
            <span class="product-category">${product.category}</span>
            <p class="product-company">${product.company}</p>
        </div>
    `;
}

function renderCompanies() {
    const companiesGrid = document.getElementById('companiesGrid');
    companiesGrid.innerHTML = companies.map(createCompanyCard).join('');
}

function renderAllProducts() {
    const allProductsGrid = document.getElementById('allProductsGrid');
    const allProducts = getAllProducts();
    allProductsGrid.innerHTML = allProducts.map(createProductCard).join('');
}

function renderSearchResults(results) {
    const searchGrid = document.getElementById('searchGrid');
    const resultsCount = document.getElementById('resultsCount');
    const noResults = document.getElementById('noResults');
    
    resultsCount.textContent = results.length;
    
    if (results.length > 0) {
        searchGrid.innerHTML = results.map(createProductCard).join('');
        searchGrid.classList.remove('hidden');
        noResults.classList.add('hidden');
    } else {
        searchGrid.classList.add('hidden');
        noResults.classList.remove('hidden');
    }
}

function showSearchResults() {
    document.getElementById('searchResults').classList.remove('hidden');
    document.getElementById('defaultContent').classList.add('hidden');
}

function showDefaultContent() {
    document.getElementById('searchResults').classList.add('hidden');
    document.getElementById('defaultContent').classList.remove('hidden');
}

function showCompanyProducts(companyId) {
    const company = companies.find(c => c.id === companyId);
    if (company) {
        const searchInput = document.getElementById('searchInput');
        searchInput.value = `company:${company.name}`;
        handleSearch(`company:${company.name}`);
        showReturnButton();
    }
}

function showReturnButton() {
    document.getElementById('returnButton').classList.remove('hidden');
}

function hideReturnButton() {
    document.getElementById('returnButton').classList.add('hidden');
}

function returnToHome() {
    clearSearch();
    hideReturnButton();
}

function handleSearch(query) {
    if (!query) query = document.getElementById('searchInput').value;
    
    if (query.trim()) {
        let results;
        
        // Check if it's a company-specific search
        if (query.startsWith('company:')) {
            const companyName = query.replace('company:', '').trim();
            const company = companies.find(c => c.name.toLowerCase() === companyName.toLowerCase());
            if (company) {
                results = company.products;
            } else {
                results = [];
            }
        } else {
            results = searchProducts(query);
        }
        
        renderSearchResults(results);
        showSearchResults();
    } else {
        showDefaultContent();
    }
}

function clearSearch() {
    document.getElementById('searchInput').value = '';
    showDefaultContent();
    hideReturnButton();
}

function openProductModal(productId) {
    const product = getAllProducts().find(p => p.id === productId);
    if (!product) return;
    
    document.getElementById('modalProductName').textContent = product.name;
    document.getElementById('modalProductCategory').textContent = product.category;
    document.getElementById('modalProductCompany').textContent = product.company;
    
    const price = product.price ? product.price.toFixed(2) : (Math.random() * 50 + 5).toFixed(2);
    document.getElementById('modalProductPrice').textContent = `$${price}`;
    
    const descriptionEl = document.getElementById('modalProductDescription');
    const specificationsEl = document.getElementById('modalProductSpecifications');
    
    if (descriptionEl && product.description) {
        descriptionEl.textContent = product.description;
        descriptionEl.style.display = 'block';
    }
    
    if (specificationsEl && product.specifications) {
        specificationsEl.textContent = product.specifications;
        specificationsEl.style.display = 'block';
    }
    
    const modal = document.getElementById('productModal');
    modal.style.display = 'flex';
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
}

function closeProductModal() {
    const modal = document.getElementById('productModal');
    modal.style.display = 'none';
    modal.classList.add('hidden');
    document.body.style.overflow = 'auto'; // Restore scrolling
}

function buyProduct() {
    const productName = document.getElementById('modalProductName').textContent;
    const price = document.getElementById('modalProductPrice').textContent;
    
    alert(`Thank you for your purchase!\n\nProduct: ${productName}\nPrice: ${price}\n\nYour order has been placed successfully!`);
    
    closeProductModal();
}

function checkAdminAccess() {
    const currentHash = window.location.hash;
    const currentSearch = window.location.search;
    
    if (currentHash === '#admin' || 
        currentSearch.includes('admin=true')) {
        window.location.href = 'admin-login.html';
    }
}

function handleHashChange() {
    if (window.location.hash === '#admin') {
        window.location.href = 'admin-login.html';
    }
}

document.addEventListener('DOMContentLoaded', function() {
    checkAdminAccess();
    
    renderCompanies();
    renderAllProducts();
    
    loadFeaturedProducts();
    
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');
    
    searchBtn.addEventListener('click', () => handleSearch());
    
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            handleSearch();
        }
    });
    
    searchInput.addEventListener('input', function(e) {
        if (e.target.value === '') {
            clearSearch();
        }
    });
    
    window.addEventListener('hashchange', handleHashChange);
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            if (this.getAttribute('href') === '#admin') {
                return;
            }
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('load', function() {
            this.style.opacity = '1';
        });
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.3s ease-in-out';
    });
    
    const footerLinks = document.querySelectorAll('.footer-links li');
    footerLinks.forEach(link => {
        link.addEventListener('click', function() {
            console.log('Clicked:', this.textContent);
        });
    });
});
