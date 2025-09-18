class StandaloneAdmin {
    constructor() {
        this.credentials = {
            username: 'admin',
            password: 'admin123'
        };
        this.storageKey = 'fastener_database'; // Use same key as website
        this.isLoggedIn = false;
        this.currentTab = 'companies';
        this.editingCompany = null;
        this.editingProduct = null;
        this.editingFeatured = null;
        this.database = null;
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
        // Handle form submission
        const loginForm = document.getElementById('loginForm');
        if (loginForm) {
            // Remove any existing event listeners
            const newForm = loginForm.cloneNode(true);
            loginForm.parentNode.replaceChild(newForm, loginForm);
            
            // Add new submit handler
            newForm.onsubmit = (e) => {
                e.preventDefault();
                this.handleLogin();
                return false;
            };
            
            // Also handle button click directly
            const loginBtn = newForm.querySelector('.login-btn');
            if (loginBtn) {
                loginBtn.onclick = (e) => {
                    e.preventDefault();
                    this.handleLogin();
                    return false;
                };
            }
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
        // Always show login panel first for testing
        this.showLoginPanel();
        
        // Uncomment below for normal session behavior
        // const session = localStorage.getItem('adminSession');
        // if (session) {
        //     this.showAdminPanel();
        // } else {
        //     this.showLoginPanel();
        // }
    }

    handleLogin() {
        try {
            console.log('handleLogin called');
            
            // Directly get elements by ID
            const usernameInput = document.getElementById('username');
            const passwordInput = document.getElementById('password');
            const rememberMe = document.getElementById('rememberMe')?.checked;
            
            if (!usernameInput || !passwordInput) {
                console.error('Username or password input not found');
                this.showError('Erreur: Champs de connexion introuvables');
                return;
            }
            
            const username = usernameInput.value.trim();
            const password = passwordInput.value;
            
            console.log('Login attempt with:', { username, password });
            
            // Simple validation
            if (!username || !password) {
                this.showError('Veuillez remplir tous les champs');
                return;
            }
            
            // Check credentials
            if (username === this.credentials.username && password === this.credentials.password) {
                console.log('Login successful');
                this.createSession(rememberMe);
                this.showAdminPanel();
            } else {
                console.log('Login failed - invalid credentials');
                this.showError('Nom d\'utilisateur ou mot de passe invalide');
            }
        } catch (error) {
            console.error('Error in handleLogin:', error);
            this.showError('Une erreur est survenue lors de la connexion');
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
        console.error('Login error:', message);
        const errorElement = document.getElementById('loginError');
        const errorMessage = document.getElementById('errorMessage');
        if (errorElement && errorMessage) {
            errorMessage.textContent = message;
            errorElement.classList.remove('hidden');
            errorElement.style.display = 'flex';
        }
    }

    hideError() {
        const errorElement = document.getElementById('loginError');
        if (errorElement) {
            errorElement.classList.add('hidden');
            errorElement.style.display = 'none';
        }
    }

    loadData() {
        // Initialize database if not exists
        if (typeof Database !== 'undefined') {
            this.database = new Database();
            const data = this.database.getData();
            this.companies = data.companies || [];
        } else {
            // Fallback to direct localStorage access
            const savedData = localStorage.getItem(this.storageKey);
            if (savedData) {
                const data = JSON.parse(savedData);
                this.companies = data.companies || [];
            } else {
                // Initialize with empty array - database will handle defaults
                this.companies = [];
            }
        }
    }

    saveData() {
        const data = {
            companies: this.companies,
            lastUpdated: new Date().toISOString()
        };
        
        if (this.database) {
            // Use database methods to save
            this.database.saveData(data);
        } else {
            // Fallback to direct localStorage
            localStorage.setItem(this.storageKey, JSON.stringify(data));
        }
        
        // Trigger data update event for website synchronization
        this.triggerDataUpdate();
    }
    
    triggerDataUpdate() {
        // Dispatch custom event to notify website of data changes
        window.dispatchEvent(new CustomEvent('adminDataUpdated', {
            detail: { companies: this.companies }
        }));
        
        // Also trigger storage event for cross-tab communication
        window.dispatchEvent(new StorageEvent('storage', {
            key: this.storageKey,
            newValue: JSON.stringify({ companies: this.companies }),
            storageArea: localStorage
        }));
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
                        <button class="edit-btn" onclick="admin.editCompany('${company.id}')" title="Modifier">
                            <svg class="action-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                            </svg>
                        </button>
                        <button class="delete-btn" onclick="admin.deleteCompany('${company.id}')" title="Supprimer">
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
                title.textContent = 'Modifier la société';
                document.getElementById('companyId').value = company.id;
                document.getElementById('companyName').value = company.name;
                this.editingCompany = company;
            }
        } else {
            title.textContent = 'Ajouter une société';
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
                    companyName: company.name,
                    companyImage: company.image || 'https://via.placeholder.com/40' // Default image if none provided
                });
            });
        });

        allProducts.forEach(product => {
            const row = document.createElement('tr');
            row.className = 'hover:bg-gray-50';
            row.innerHTML = `
                <td class="px-4 py-3">
                    <div class="flex items-center">
                        <div class="flex-shrink-0 h-10 w-10">
                            <img class="h-10 w-10 rounded-full object-cover" src="${product.companyImage}" alt="${product.companyName} logo">
                        </div>
                        <div class="ml-4">
                            <div class="text-sm font-medium text-gray-900">${product.name}</div>
                            <div class="text-sm text-gray-500">#${product.id}</div>
                        </div>
                    </div>
                </td>
                <td class="px-4 py-3">
                    <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                        ${product.category}
                    </span>
                </td>
                <td class="px-4 py-3 text-sm text-gray-500">
                    ${product.companyName}
                </td>
                <td class="px-4 py-3 text-sm text-gray-500">
                    ${product.price || 'da'}
                </td>
                <td class="px-4 py-3 text-right text-sm font-medium">
                    <div class="flex items-center justify-end space-x-2">
                        <button class="p-1.5 rounded-full text-blue-600 hover:bg-blue-100" onclick="admin.editProduct('${product.id}')" title="Modifier">
                            <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                            </svg>
                        </button>
                        <button class="p-1.5 rounded-full text-red-600 hover:bg-red-100" onclick="admin.deleteProduct('${product.id}')" title="Supprimer">
                            <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
        
        // Hide description and specifications fields
        const descriptionGroup = document.querySelector('.form-group:nth-child(4)');
        const specsGroup = document.querySelector('.form-group:nth-child(5)');
        if (descriptionGroup) descriptionGroup.style.display = 'none';
        if (specsGroup) specsGroup.style.display = 'none';
        
        if (productId) {
            const product = this.getProduct(productId);
            if (product) {
                title.textContent = 'Modifier le produit';
                document.getElementById('productId').value = product.id;
                document.getElementById('productName').value = product.name;
                document.getElementById('productCategory').value = product.category;
                document.getElementById('productCompany').value = product.companyId || this.getCompanyIdByProduct(productId);
                // Don't set price field as it's always 'da'
                this.editingProduct = product;
            }
        } else {
            title.textContent = 'Ajouter un produit';
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
        
        select.innerHTML = '<option value="">Sélectionner une société</option>';
        
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
            customAlerts.showAlert('Veuillez remplir tous les champs obligatoires.', 'Erreur de validation', 'warning');
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
        
        const action = companyId ? 'mise à jour' : 'ajout';
        customAlerts.success(`Société ${action} avec succès !`);
    }

    updateCompany(companyId, formData) {
        const company = this.getCompany(companyId);
        if (company) {
            company.name = formData.name;
            company.image = formData.image;
            this.saveData();
        }
        
        const modal = document.getElementById('companyModal');
        if (modal) {
            modal.classList.remove('hidden');
            document.body.style.overflow = 'hidden';
        }
    }

    getCompany(companyId) {
        return this.companies.find(company => company.id === companyId);
    }

    addProduct(formData) {
        try {
            if (!formData || !formData.companyId) {
                throw new Error('Données du produit ou ID de la société manquants');
            }
            
            const companyIndex = this.companies.findIndex(c => c.id === formData.companyId);
            if (companyIndex === -1) {
                throw new Error('Société non trouvée');
            }
            
            if (!formData.name || !formData.category) {
                customAlerts.showAlert('Veuillez remplir tous les champs obligatoires.', 'Erreur de validation', 'warning');
                return;
            }
            
            const newProduct = {
                id: this.generateId(),
                name: formData.name,
                category: formData.category,
                price: 'da',
                stock: 0,
                description: '',
                specifications: '',
                createdAt: new Date().toISOString()
            };
            
            // Initialize products array if it doesn't exist
            if (!this.companies[companyIndex].products) {
                this.companies[companyIndex].products = [];
            }
            
            // Add the product
            this.companies[companyIndex].products.push(newProduct);
            this.saveData();
            
            // Update UI
            this.renderProducts();
            this.updateStats();
            this.populateCompanySelect();
            customAlerts.success('Produit ajouté avec succès !');
            
        } catch (error) {
            console.error('Erreur lors de l\'ajout du produit:', error);
            customAlerts.showAlert(
                'Une erreur est survenue lors de l\'ajout du produit.',
                'Erreur',
                'error'
            );
        }
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
        customAlerts.showConfirm('Êtes-vous sûr de vouloir réinitialiser toutes les données ? Cette action est irréversible.', 'Réinitialiser les données', 'danger').then((confirmed) => {
            if (confirmed) {
                // Clear localStorage and reinitialize database
                if (this.database) {
                    this.database.clearDatabase();
                    const data = this.database.getData();
                    this.companies = data.companies || [];
                } else {
                    localStorage.removeItem(this.storageKey);
                    this.companies = [];
                }
                this.saveData();
                this.renderCompanies();
                this.renderProducts();
                this.updateStats();
                this.populateCompanySelect();
                customAlerts.success('Les données ont été réinitialisées aux valeurs par défaut !');
            }
        });
    }
}

// Initialize the admin panel when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Check for logout parameter in URL
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('logout') === 'true') {
        localStorage.removeItem('adminSession');
    }
    
    // Create and initialize the admin instance
    const admin = new StandaloneAdmin();
    
    // Make it available globally for HTML event handlers
    window.admin = admin;
    
    // Debug log
    console.log('Admin panel initialized');
});

// Global function wrappers for HTML onclick events
function logout() {
    if (window.admin) {
        window.admin.logout();
    }
}

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
    }
}

function openFeaturedModal() {
    if (window.admin) {
        window.admin.openFeaturedModal();
    }
}

function closeFeaturedModal() {
    if (window.admin) {
        window.admin.closeFeaturedModal();
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

function saveFeaturedProduct(event) {
    if (window.admin) {
        window.admin.saveFeaturedProduct(event);
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
