class StandaloneAdmin {
    constructor() {
        this.credentials = {
            username: 'admin',
            password: 'admin123'
        };
        this.storageKey = 'adminData';
        this.isLoggedIn = false;
        this.currentTab = 'companies';
        this.editingCompany = null;
        this.editingProduct = null;
        this.editingFeatured = null;
        this.init();
    }

    init() {
        this.loadData();
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                this.setupEventListeners();
                this.checkLoginStatus();
            });
        } else {
            this.setupEventListeners();
            this.checkLoginStatus();
        }
    }

    setupEventListeners() {
        const loginForm = document.getElementById('loginForm');
        if (loginForm) {
            loginForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleLogin();
            });
        }

        const companyForm = document.getElementById('companyForm');
        if (companyForm) {
            companyForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.saveCompany();
            });
        }

        const productForm = document.getElementById('productForm');
        if (productForm) {
            productForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.saveProduct();
            });
        }

        const featuredForm = document.getElementById('featuredForm');
        if (featuredForm) {
            featuredForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.saveFeaturedProduct();
            });
        }

        document.querySelectorAll('.modal').forEach(modal => {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    this.closeAllModals();
                }
            });
        });
    }

    checkLoginStatus() {
        const session = localStorage.getItem('adminSession');
        if (session) {
            this.showAdminPanel();
        } else {
            this.showLoginPanel();
        }
    }

    handleLogin() {
        const username = document.getElementById('username').value.trim();
        const password = document.getElementById('password').value;
        const rememberMe = document.getElementById('rememberMe').checked;
        
        this.hideError();
        
        if (username === this.credentials.username && password === this.credentials.password) {
            this.createSession(rememberMe);
            this.showAdminPanel();
        } else {
            this.showError('Invalid username or password');
        }
    }

    createSession(rememberMe) {
        const sessionData = {
            username: this.credentials.username,
            loginTime: new Date().toISOString(),
            rememberMe: rememberMe
        };
        
        localStorage.setItem('adminSession', JSON.stringify(sessionData));
        this.isLoggedIn = true;
    }

    showLoginPanel() {
        document.getElementById('loginSection').classList.remove('hidden');
        document.getElementById('adminSection').classList.add('hidden');
    }

    showAdminPanel() {
        document.getElementById('loginSection').classList.add('hidden');
        document.getElementById('adminSection').classList.remove('hidden');
        this.isLoggedIn = true;
        this.updateStats();
        this.renderCompanies();
        this.renderProducts();
        this.renderFeaturedProducts();
    }

    logout() {
        localStorage.removeItem('adminSession');
        this.isLoggedIn = false;
        this.showLoginPanel();
        document.getElementById('loginForm').reset();
    }

    showError(message) {
        const errorDiv = document.getElementById('loginError');
        const errorMessage = document.getElementById('errorMessage');
        
        if (errorDiv && errorMessage) {
            errorMessage.textContent = message;
            errorDiv.classList.remove('hidden');
        }
    }

    hideError() {
        const errorDiv = document.getElementById('loginError');
        if (errorDiv) {
            errorDiv.classList.add('hidden');
        }
    }

    loadData() {
        const savedData = localStorage.getItem(this.storageKey);
        if (savedData) {
            const data = JSON.parse(savedData);
            this.companies = data.companies || this.getDefaultCompanies();
        } else {
            this.companies = this.getDefaultCompanies();
            this.saveData();
        }
    }

    saveData() {
        const data = {
            companies: this.companies,
            lastUpdated: new Date().toISOString()
        };
        localStorage.setItem(this.storageKey, JSON.stringify(data));
    }

    getDefaultCompanies() {
        return [
            {
                id: '1',
                name: 'TechBolt Solutions',
                image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDMwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMjAwIiBmaWxsPSJ1cmwoI2dyYWRpZW50KSIvPgo8dGV4dCB4PSIxNTAiIHk9IjEwNSIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjI0IiBmb250LXdlaWdodD0iYm9sZCIgZmlsbD0id2hpdGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiPkJvbHQgU29sdXRpb25zPC90ZXh0Pgo8ZGVmcz4KPGxpbmVhckdyYWRpZW50IGlkPSJncmFkaWVudCIgeDE9IjAlIiB5MT0iMCUiIHgyPSIxMDAlIiB5Mj0iMTAwJSI+CjxzdG9wIG9mZnNldD0iMCUiIHN0b3AtY29sb3I9IiNGRjZCMzUiLz4KPHN0b3Agb2Zmc2V0PSIxMDAlIiBzdG9wLWNvbG9yPSIjRjc5MzFFIi8+CjwvbGluZWFyR3JhZGllbnQ+CjwvZGVmcz4KPC9zdmc+',
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
                image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDMwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMjAwIiBmaWxsPSJ1cmwoI2dyYWRpZW50KSIvPgo8dGV4dCB4PSIxNTAiIHk9IjEwNSIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjIwIiBmb250LXdlaWdodD0iYm9sZCIgZmlsbD0id2hpdGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiPlByZW1pdW0gSGFyZHdhcmU8L3RleHQ+CjxkZWZzPgo8bGluZWFyR3JhZGllbnQgaWQ9ImdyYWRpZW50IiB4MT0iMCUiIHkxPSIwJSIgeDI9IjEwMCUiIHkyPSIxMDAlIj4KPHN0b3Agb2Zmc2V0PSIwJSIgc3RvcC1jb2xvcj0iIzJFODZBQiIvPgo8c3RvcCBvZmZzZXQ9IjEwMCUiIHN0b3AtY29sb3I9IiNBMjNCNzIiLz4KPC9saW5lYXJHcmFkaWVudD4KPC9kZWZzPgo8L3N2Zz4=',
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

    updateStats() {
        const totalCompanies = this.companies.length;
        const totalProducts = this.getAllProducts().length;
        const avgProductsPerCompany = totalCompanies > 0 ? (totalProducts / totalCompanies).toFixed(1) : 0;
        
        document.getElementById('totalCompanies').textContent = totalCompanies;
        document.getElementById('totalProducts').textContent = totalProducts;
        document.getElementById('avgProductsPerCompany').textContent = avgProductsPerCompany;
    }

    getAllProducts() {
        return this.companies.flatMap(company => company.products);
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

        this.companies.forEach(company => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${company.id}</td>
                <td>${company.name}</td>
                <td>${company.products.length}</td>
                <td>
                    <div class="action-buttons">
                        <button class="edit-btn" onclick="admin.editCompany('${company.id}')" title="Edit">
                            <svg class="action-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                            </svg>
                        </button>
                        <button class="delete-btn" onclick="admin.deleteCompany('${company.id}')" title="Delete">
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
            const company = this.getCompany(companyId);
            if (company) {
                title.textContent = 'Edit Company';
                document.getElementById('companyId').value = company.id;
                document.getElementById('companyName').value = company.name;
                this.editingCompany = company;
            }
        } else {
            title.textContent = 'Add Company';
            this.editingCompany = null;
        }
        
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }

    renderProducts() {
        const tbody = document.getElementById('productsTableBody');
        if (!tbody) return;
        
        tbody.innerHTML = '';

        const allProducts = [];
        this.companies.forEach(company => {
            company.products.forEach(product => {
                allProducts.push({
                    ...product,
                    companyName: company.name
                });
            });
        });

        allProducts.forEach(product => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${product.id}</td>
                <td>${product.name}</td>
                <td>${product.category}</td>
                <td>${product.companyName}</td>
                <td>$${parseFloat(product.price).toFixed(2)}</td>
                <td>
                    <div class="action-buttons">
                        <button class="edit-btn" onclick="admin.editProduct('${product.id}')" title="Edit">
                            <svg class="action-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                            </svg>
                        </button>
                        <button class="delete-btn" onclick="admin.deleteProduct('${product.id}')" title="Delete">
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

    openProductModal(productId = null) {
        const modal = document.getElementById('productModal');
        const title = document.getElementById('productModalTitle');
        const form = document.getElementById('productForm');
        
        form.reset();
        this.populateCompanySelect();
        
        if (productId) {
            const product = this.getProduct(productId);
            if (product) {
                title.textContent = 'Edit Product';
                document.getElementById('productId').value = product.id;
                document.getElementById('productName').value = product.name;
                document.getElementById('productCategory').value = product.category;
                document.getElementById('productCompany').value = product.companyId || this.getCompanyIdByProduct(productId);
                document.getElementById('productPrice').value = product.price;
                document.getElementById('productDescription').value = product.description || '';
                document.getElementById('productSpecifications').value = product.specifications || '';
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
        const modal = document.getElementById('productModal');
        modal.classList.add('hidden');
        document.body.style.overflow = 'auto';
        this.editingProduct = null;
    }

    getProduct(productId) {
        for (let company of this.companies) {
            const product = company.products.find(p => p.id === productId);
            if (product) {
                return product;
            }
        }
        return null;
    }

    getCompanyIdByProduct(productId) {
        for (let company of this.companies) {
            if (company.products.find(p => p.id === productId)) {
                return company.id;
            }
        }
        return null;
    }

    editProduct(productId) {
        this.openProductModal(productId);
    }

    populateCompanySelect() {
        const select = document.getElementById('productCompany');
        if (!select) return;
        
        select.innerHTML = '<option value="">Select a company</option>';
        
        this.companies.forEach(company => {
            const option = document.createElement('option');
            option.value = company.id;
            option.textContent = company.name;
            select.appendChild(option);
        });
    }

    closeCompanyModal() {
        const modal = document.getElementById('companyModal');
        modal.classList.add('hidden');
        document.body.style.overflow = 'auto';
        this.editingCompany = null;
    }

    editCompany(companyId) {
        this.openCompanyModal(companyId);
    }

    saveCompany() {
        const formData = {
            name: document.getElementById('companyName').value.trim(),
            image: ''
        };

        if (!formData.name) {
            customAlerts.showAlert('Please fill in all required fields.', 'Validation Error', 'warning');
            return;
        }

        const companyId = document.getElementById('companyId').value;
        
        if (companyId) {
            // Update existing company
            this.updateCompany(companyId, formData);
        } else {
            // Add new company
            this.addCompany(formData);
        }

        this.closeAllModals();
        this.renderCompanies();
        this.updateStats();
        this.populateCompanySelect();
        
        const action = companyId ? 'updated' : 'added';
        customAlerts.success(`Company ${action} successfully!`);
    }

    updateCompany(companyId, formData) {
        const company = this.getCompany(companyId);
        if (company) {
            company.name = formData.name;
            company.image = formData.image;
            this.saveData();
        }
    }

    getCompany(companyId) {
        return this.companies.find(company => company.id === companyId);
    }

    addProduct(formData) {
        const company = this.getCompany(formData.companyId);
        if (!company) return;

        const newProduct = {
            id: this.generateId(),
            name: formData.name,
            category: formData.category,
            price: parseFloat(formData.price),
            description: formData.description,
            specifications: formData.specifications
        };

        company.products.push(newProduct);
        this.saveData();
    }

    updateProduct(productId, formData) {
        const product = this.getProduct(productId);
        if (!product) return;

        const oldCompanyId = this.getCompanyIdByProduct(productId);
        if (oldCompanyId !== formData.companyId) {
            const oldCompany = this.getCompany(oldCompanyId);
            if (oldCompany) {
                const productIndex = oldCompany.products.findIndex(p => p.id === productId);
                if (productIndex !== -1) {
                    oldCompany.products.splice(productIndex, 1);
                }
            }
        }

        product.name = formData.name;
        product.category = formData.category;
        product.price = parseFloat(formData.price);
        product.description = formData.description;
        product.specifications = formData.specifications;

        if (oldCompanyId !== formData.companyId) {
            const newCompany = this.getCompany(formData.companyId);
            if (newCompany) {
                newCompany.products.push(product);
            }
        }

        this.saveData();
    }

    deleteProduct(productId) {
        const product = this.getProduct(productId);
        if (!product) return;

        customAlerts.showConfirm(`Are you sure you want to delete "${product.name}"?`, 'Delete Product', 'danger').then((confirmed) => {
            if (confirmed) {
                for (let company of this.companies) {
                    const productIndex = company.products.findIndex(p => p.id === productId);
                    if (productIndex !== -1) {
                        company.products.splice(productIndex, 1);
                        this.saveData();
                        this.renderProducts();
                        this.updateStats();
                        customAlerts.success('Product deleted successfully!');
                        break;
                    }
                }
            }
        });
    }

    deleteCompany(companyId) {
        const company = this.getCompany(companyId);
        if (!company) return;

        customAlerts.showConfirm(`Are you sure you want to delete "${company.name}" and all its products?`, 'Delete Company', 'danger').then((confirmed) => {
            if (confirmed) {
                const index = this.companies.findIndex(c => c.id === companyId);
                if (index !== -1) {
                    this.companies.splice(index, 1);
                    this.saveData();
                    this.renderCompanies();
                    this.renderProducts();
                    this.updateStats();
                    this.populateCompanySelect();
                    customAlerts.success('Company deleted successfully!');
                }
            }
        });
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
            customAlerts.showAlert('Please fill in all required fields.', 'Validation Error', 'warning');
            return;
        }

        const productId = document.getElementById('productId').value;
        
        if (productId) {
            // Update existing product
            this.updateProduct(productId, formData);
        } else {
            // Add new product
            this.addProduct(formData);
        }

        this.closeProductModal();
        this.renderProducts();
        this.updateStats();
        
        const action = productId ? 'updated' : 'added';
        customAlerts.success(`Product ${action} successfully!`);
    }

    addCompany(companyData) {
        const newId = this.generateId();
        const newCompany = {
            id: newId,
            name: companyData.name,
            image: '',
            products: []
        };
        this.companies.push(newCompany);
        this.saveData();
        return newCompany;
    }

    updateCompany(id, companyData) {
        const index = this.companies.findIndex(c => c.id === id);
        if (index !== -1) {
            this.companies[index] = {
                ...this.companies[index],
                name: companyData.name,
                image: ''
            };
            this.companies[index].products.forEach(product => {
                product.company = companyData.name;
            });
            this.saveData();
            return this.companies[index];
        }
        return null;
    }

    deleteCompany(id) {
        const company = this.getCompany(id);
        if (!company) return;

        const hasProducts = company.products.length > 0;
        const message = hasProducts 
            ? `Are you sure you want to delete "${company.name}"? This will also delete ${company.products.length} product(s).`
            : `Are you sure you want to delete "${company.name}"`;

        customAlerts.showConfirm(message, 'Delete Company', 'danger').then((confirmed) => {
            if (confirmed) {
                const index = this.companies.findIndex(c => c.id === id);
                if (index !== -1) {
                    this.companies.splice(index, 1);
                    this.saveData();
                    this.renderCompanies();
                    this.renderProducts();
                    this.updateStats();
                    this.populateCompanySelect();
                    customAlerts.success('Company deleted successfully!');
                }
            }
        });
    }

    deleteProduct(id) {
        const product = this.getProduct(id);
        if (!product) return;

        customAlerts.showConfirm(`Are you sure you want to delete "${product.name}"?`, 'Delete Product', 'danger').then((confirmed) => {
            if (confirmed) {
                for (let company of this.companies) {
                    const productIndex = company.products.findIndex(p => p.id === id);
                    if (productIndex !== -1) {
                        company.products.splice(productIndex, 1);
                        this.saveData();
                        this.renderProducts();
                        this.updateStats();
                        customAlerts.success('Product deleted successfully!');
                        break;
                    }
                }
            }
        });
    }

    getProduct(id) {
        for (let company of this.companies) {
            const product = company.products.find(p => p.id === id);
            if (product) return product;
        }
        return null;
    }

    closeAllModals() {
        const companyModal = document.getElementById('companyModal');
        const productModal = document.getElementById('productModal');
        
        if (companyModal && !companyModal.classList.contains('hidden')) {
            this.closeCompanyModal();
        }
        
        if (productModal && !productModal.classList.contains('hidden')) {
            this.closeProductModal();
        }
    }

    generateId() {
        return 'id_' + Math.random().toString(36).substr(2, 9) + Date.now().toString(36);
    }

    exportData() {
        const data = {
            companies: this.companies,
            exportDate: new Date().toISOString(),
            version: '1.0'
        };
        
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `company-products-${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    importData(event) {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const data = JSON.parse(e.target.result);
                if (data.companies && Array.isArray(data.companies)) {
                    this.companies = data.companies;
                    this.saveData();
                    this.renderCompanies();
                    this.renderProducts();
                    this.updateStats();
                    this.populateCompanySelect();
                    customAlerts.success('Data imported successfully!');
                } else {
                    customAlerts.error('Invalid file format. Please check the file.', 'Import Error');
                }
            } catch (error) {
                customAlerts.error('Failed to import data. Please check the file format.', 'Import Error');
            }
        };
        reader.readAsText(file);
        
        event.target.value = '';
    }

    resetData() {
        customAlerts.showConfirm('Are you sure you want to reset all data? This action cannot be undone.', 'Reset All Data', 'danger').then((confirmed) => {
            if (confirmed) {
                this.companies = this.getDefaultCompanies();
                this.saveData();
                this.renderCompanies();
                this.renderProducts();
                this.updateStats();
                this.populateCompanySelect();
                customAlerts.success('Data has been reset to default values!');
            }
        });
    }
}

document.addEventListener('DOMContentLoaded', function() {
    window.admin = new StandaloneAdmin();
});

function showTab(tabName) {
    if (window.admin) {
        window.admin.showTab(tabName);
    }
}

function openCompanyModal() {
    if (window.admin) {
        window.admin.openCompanyModal();
    }
}

function closeCompanyModal() {
    if (window.admin) {
        window.admin.closeCompanyModal();
    } else {
        const modal = document.getElementById('companyModal');
        if (modal) {
            modal.classList.add('hidden');
            document.body.style.overflow = 'auto';
        }
    }
}

function openProductModal() {
    if (window.admin) {
        window.admin.openProductModal();
    }
}

function closeProductModal() {
    if (window.admin) {
        window.admin.closeProductModal();
    } else {
        const modal = document.getElementById('productModal');
        if (modal) {
            modal.classList.add('hidden');
            document.body.style.overflow = 'auto';
        }
    }
}

function logout() {
    if (window.admin) {
        window.admin.logout();
    }
}

function exportData() {
    if (window.admin) {
        window.admin.exportData();
    }
}

function importData(event) {
    if (window.admin) {
        window.admin.importData(event);
    }
}

function resetData() {
    if (window.admin) {
        window.admin.resetData();
    }
}

function openFeaturedModal(index = null) {
    if (window.admin) {
        window.admin.openFeaturedModal(index);
    }
}

function closeFeaturedModal() {
    if (window.admin) {
        window.admin.closeFeaturedModal();
    }
}

function saveFeaturedProduct(event) {
    if (event) event.preventDefault();
    if (window.admin) {
        window.admin.saveFeaturedProduct();
    }
}

function deleteFeaturedProduct(index) {
    if (window.admin) {
        window.admin.deleteFeaturedProduct(index);
    }
}
