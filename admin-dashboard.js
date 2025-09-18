class AdminDashboard {
    constructor() {
        this.currentTab = 'companies';
        this.editingCompany = null;
        this.editingProduct = null;
        this.init();
    }

    init() {
        if (!adminAuth.requireAuth()) return;

        this.updateStats();
        this.renderCompanies();
        this.renderProducts();
        this.renderFeaturedProducts();
        this.setupEventListeners();
        
        const session = adminAuth.getSession();
        if (session) {
            document.getElementById('userName').textContent = session.username;
        }
    }

    setupEventListeners() {
        document.getElementById('companyForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.saveCompany();
        });

        document.getElementById('productForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.saveProduct();
        });

        document.getElementById('featuredForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.saveFeaturedProduct();
        });

        document.querySelectorAll('.modal').forEach(modal => {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    this.closeAllModals();
                }
            });
        });
    }

    updateStats() {
        const stats = adminDataManager.getStats();
        document.getElementById('totalCompanies').textContent = stats.totalCompanies;
        document.getElementById('totalProducts').textContent = stats.totalProducts;
        document.getElementById('avgProductsPerCompany').textContent = stats.avgProductsPerCompany;
    }

    showTab(tabName) {
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        event.target.classList.add('active');

        document.querySelectorAll('.tab-content').forEach(content => {
            content.classList.add('hidden');
        });

        document.getElementById(tabName + 'Tab').classList.remove('hidden');
        this.currentTab = tabName;
    }

    renderCompanies() {
        const tbody = document.getElementById('companiesTableBody');
        tbody.innerHTML = '';

        window.companies.forEach(company => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${company.id}</td>
                <td>${company.name}</td>
                <td>${company.image}</td>
                <td>${company.products.length}</td>
                <td>
                    <div class="action-buttons">
                        <button class="edit-btn" onclick="dashboard.editCompany('${company.id}')" title="Edit">
                            <svg class="action-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                            </svg>
                        </button>
                        <button class="delete-btn" onclick="dashboard.deleteCompany('${company.id}')" title="Delete">
                            <svg class="action-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                            </svg>
                        </button>
                    </div>
                </td>
            `;
            tbody.appendChild(row);
        });
    }

    openCompanyModal(companyId = null) {
        const modal = document.getElementById('companyModal');
        const title = document.getElementById('companyModalTitle');
        const form = document.getElementById('companyForm');
        
        form.reset();
        
        if (companyId) {
            const company = adminDataManager.getCompany(companyId);
            if (company) {
                title.textContent = 'Edit Company';
                document.getElementById('companyId').value = company.id;
                document.getElementById('companyName').value = company.name;
                document.getElementById('companyImage').value = company.image;
                this.editingCompany = company;
            }
        } else {
            title.textContent = 'Add Company';
            this.editingCompany = null;
        }
        
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }

    closeCompanyModal() {
        document.getElementById('companyModal').classList.add('hidden');
        document.body.style.overflow = 'auto';
        this.editingCompany = null;
    }

    editCompany(id) {
        this.openCompanyModal(id);
    }

    saveCompany() {
        const formData = {
            name: document.getElementById('companyName').value.trim(),
            image: document.getElementById('companyImage').value.trim()
        };

        if (!formData.name || !formData.image) {
            alert('Please fill in all required fields.');
            return;
        }

        const companyId = document.getElementById('companyId').value;
        
        if (companyId) {
            adminDataManager.updateCompany(companyId, formData);
        } else {
            adminDataManager.addCompany(formData);
        }

        this.closeCompanyModal();
        this.renderCompanies();
        this.renderProducts();
        this.updateStats();
        this.populateCompanySelect();
    }

    deleteCompany(id) {
        const company = adminDataManager.getCompany(id);
        if (!company) return;

        const hasProducts = company.products.length > 0;
        const message = hasProducts 
            ? `Are you sure you want to delete "${company.name}"? This will also delete ${company.products.length} product(s).`
            : `Are you sure you want to delete "${company.name}"?`;

        if (confirm(message)) {
            adminDataManager.deleteCompany(id);
            this.renderCompanies();
            this.renderProducts();
            this.updateStats();
            this.populateCompanySelect();
        }
    }

    renderProducts() {
        const tbody = document.getElementById('productsTableBody');
        tbody.innerHTML = '';

        const allProducts = adminDataManager.getAllProducts();
        
        allProducts.forEach(product => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${product.id}</td>
                <td>${product.name}</td>
                <td>${product.category}</td>
                <td>${product.company}</td>
                <td>$${product.price ? product.price.toFixed(2) : '0.00'}</td>
                <td>
                    <div class="action-buttons">
                        <button class="edit-btn" onclick="dashboard.editProduct('${product.id}')" title="Edit">
                            <svg class="action-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                            </svg>
                        </button>
                        <button class="delete-btn" onclick="dashboard.deleteProduct('${product.id}')" title="Delete">
                            <svg class="action-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                            </svg>
                        </button>
                    </div>
                </td>
            `;
            tbody.appendChild(row);
        });
    }

    populateCompanySelect() {
        const select = document.getElementById('productCompany');
        select.innerHTML = '<option value="">Select a company</option>';
        
        window.companies.forEach(company => {
            const option = document.createElement('option');
            option.value = company.id;
            option.textContent = company.name;
            select.appendChild(option);
        });
    }

    openProductModal(productId = null) {
        const modal = document.getElementById('productModal');
        const title = document.getElementById('productModalTitle');
        const form = document.getElementById('productForm');
        
        form.reset();
        this.populateCompanySelect();
        
        if (productId) {
            const product = adminDataManager.getProduct(productId);
            if (product) {
                title.textContent = 'Edit Product';
                document.getElementById('productId').value = product.id;
                document.getElementById('productName').value = product.name;
                document.getElementById('productCategory').value = product.category;
                document.getElementById('productPrice').value = product.price || '';
                document.getElementById('productDescription').value = product.description || '';
                document.getElementById('productSpecifications').value = product.specifications || '';
                
                const company = window.companies.find(c => c.name === product.company);
                if (company) {
                    document.getElementById('productCompany').value = company.id;
                }
                
                this.editingProduct = product;
            }
        } else {
            title.textContent = 'Add Product';
            this.editingProduct = null;
        }
        
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }

    closeProductModal() {
        document.getElementById('productModal').classList.add('hidden');
        document.body.style.overflow = 'auto';
        this.editingProduct = null;
    }

    editProduct(id) {
        this.openProductModal(id);
    }

    saveProduct() {
        const formData = {
            name: document.getElementById('productName').value.trim(),
            category: document.getElementById('productCategory').value.trim(),
            companyId: document.getElementById('productCompany').value,
            price: document.getElementById('productPrice').value,
            description: document.getElementById('productDescription').value.trim(),
            specifications: document.getElementById('productSpecifications').value.trim()
        };

        if (!formData.name || !formData.category || !formData.companyId || !formData.price) {
            alert('Please fill in all required fields.');
            return;
        }

        const productId = document.getElementById('productId').value;
        
        if (productId) {
            adminDataManager.updateProduct(productId, formData);
        } else {
            adminDataManager.addProduct(formData);
        }

        this.closeProductModal();
        this.renderProducts();
        this.updateStats();
    }

    deleteProduct(id) {
        const product = adminDataManager.getProduct(id);
        if (!product) return;

        if (confirm(`Are you sure you want to delete "${product.name}"?`)) {
            adminDataManager.deleteProduct(id);
            this.renderProducts();
            this.updateStats();
        }
    }

    closeAllModals() {
        this.closeCompanyModal();
        this.closeProductModal();
        this.closeFeaturedModal();
    }

    renderFeaturedProducts() {
        const tbody = document.getElementById('featuredTableBody');
        if (!tbody) return;
        
        tbody.innerHTML = '';
        const featuredProducts = this.getFeaturedProducts();
        
        featuredProducts.forEach((product, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${product.id}</td>
                <td>${product.name}</td>
                <td>${product.company}</td>
                <td>$${product.price.toFixed(2)}</td>
                <td>
                    <div class="action-buttons">
                        <button class="edit-btn" onclick="dashboard.openFeaturedModal(${index})" title="Edit">
                            <svg class="action-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                            </svg>
                        </button>
                        <button class="delete-btn" onclick="dashboard.deleteFeaturedProduct(${index})" title="Delete">
                            <svg class="action-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                            </svg>
                        </button>
                    </div>
                </td>
            `;
            tbody.appendChild(row);
        });
    }

    getFeaturedProducts() {
        const stored = localStorage.getItem('featuredProducts');
        return stored ? JSON.parse(stored) : [
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
    }

    saveFeaturedProducts(products) {
        localStorage.setItem('featuredProducts', JSON.stringify(products));
    }

    openFeaturedModal(index = null) {
        const modal = document.getElementById('featuredModal');
        const title = document.getElementById('featuredModalTitle');
        const form = document.getElementById('featuredForm');
        
        form.reset();
        
        if (index !== null) {
            const featuredProducts = this.getFeaturedProducts();
            const product = featuredProducts[index];
            if (product) {
                title.textContent = 'Edit Featured Product';
                document.getElementById('featuredIndex').value = index;
                document.getElementById('featuredProductId').value = product.id;
                document.getElementById('featuredProductName').value = product.name;
                document.getElementById('featuredCompany').value = product.company;
                document.getElementById('featuredPrice').value = product.price;
                document.getElementById('featuredDescription').value = product.description;
                
                this.editingFeatured = index;
            }
        } else {
            title.textContent = 'Add Featured Product';
            this.editingFeatured = null;
        }
        
        modal.classList.remove('hidden');
    }

    closeFeaturedModal() {
        const modal = document.getElementById('featuredModal');
        if (modal) {
            modal.classList.add('hidden');
        }
        this.editingFeatured = null;
    }

    saveFeaturedProduct() {
        const featuredProducts = this.getFeaturedProducts();
        const index = this.editingFeatured;
        
        const productData = {
            id: document.getElementById('featuredProductId').value,
            name: document.getElementById('featuredProductName').value,
            company: document.getElementById('featuredCompany').value,
            price: parseFloat(document.getElementById('featuredPrice').value),
            description: document.getElementById('featuredDescription').value
        };
        
        if (index !== null) {
            featuredProducts[index] = productData;
        } else {
            featuredProducts.push(productData);
        }
        
        this.saveFeaturedProducts(featuredProducts);
        this.renderFeaturedProducts();
        this.closeFeaturedModal();
        
        CustomAlerts.showAlert(
            index !== null ? 'Featured product updated successfully!' : 'Featured product added successfully!',
            'Success',
            'success'
        );
    }

    deleteFeaturedProduct(index) {
        CustomAlerts.showConfirm(
            'Are you sure you want to remove this featured product?',
            'Confirm Deletion',
            'warning'
        ).then((confirmed) => {
            if (confirmed) {
                const featuredProducts = this.getFeaturedProducts();
                featuredProducts.splice(index, 1);
                this.saveFeaturedProducts(featuredProducts);
                this.renderFeaturedProducts();
                
                CustomAlerts.showAlert('Featured product removed successfully!', 'Success', 'success');
            }
        });
    }

    exportData() {
        adminDataManager.exportData();
    }

    importData(event) {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            const success = adminDataManager.importData(e.target.result);
            if (success) {
                alert('Data imported successfully!');
                this.renderCompanies();
                this.renderProducts();
                this.updateStats();
                this.populateCompanySelect();
            } else {
                alert('Failed to import data. Please check the file format.');
            }
        };
        reader.readAsText(file);
        
        event.target.value = '';
    }

    resetData() {
        if (confirm('Are you sure you want to reset all data? This action cannot be undone.')) {
            adminDataManager.resetData();
            this.renderCompanies();
            this.renderProducts();
            this.updateStats();
            this.populateCompanySelect();
            alert('Data has been reset to default values.');
        }
    }
}

function showTab(tabName) {
    dashboard.showTab(tabName);
}

function openCompanyModal() {
    dashboard.openCompanyModal();
}

function closeCompanyModal() {
    dashboard.closeCompanyModal();
}

function openProductModal() {
    dashboard.openProductModal();
}

function closeProductModal() {
    dashboard.closeProductModal();
}

function exportData() {
    dashboard.exportData();
}

function importData(event) {
    dashboard.importData(event);
}

function resetData() {
    dashboard.resetData();
}

function openFeaturedModal() {
    dashboard.openFeaturedModal();
}

function closeFeaturedModal() {
    dashboard.closeFeaturedModal();
}

document.addEventListener('DOMContentLoaded', function() {
    window.dashboard = new AdminDashboard();
});
