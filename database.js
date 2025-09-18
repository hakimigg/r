class Database {
    constructor() {
        this.storageKey = 'fastener_database';
        this.init();
    }

    init() {
        const existingData = localStorage.getItem(this.storageKey);
        if (!existingData) {
            const defaultData = {
                companies: [
                    {
                        id: '1',
                        name: 'c1',
                        image: 'https://images.pexels.com/photos/1108101/pexels-photo-1108101.jpeg?auto=compress&cs=tinysrgb&w=800',
                        createdAt: new Date().toISOString(),
                        products: [
                            { id: 'p1', name: 'p1', category: 'Bolts', price: 15.99, stock: 100, createdAt: new Date().toISOString() },
                            { id: 'p2', name: 'p2', category: 'Screws', price: 12.50, stock: 75, createdAt: new Date().toISOString() },
                            { id: 'p3', name: 'p3', category: 'Washers', price: 8.99, stock: 200, createdAt: new Date().toISOString() },
                            { id: 'p4', name: 'p4', category: 'Nuts', price: 10.25, stock: 150, createdAt: new Date().toISOString() },
                            { id: 'p5', name: 'p5', category: 'Bolts', price: 22.99, stock: 50, createdAt: new Date().toISOString() },
                            { id: 'p6', name: 'p6', category: 'Bolts', price: 18.75, stock: 80, createdAt: new Date().toISOString() },
                            { id: 'p7', name: 'p7', category: 'Screws', price: 14.30, stock: 120, createdAt: new Date().toISOString() },
                            { id: 'p8', name: 'p8', category: 'Washers', price: 9.99, stock: 180, createdAt: new Date().toISOString() }
                        ]
                    },
                    {
                        id: '2',
                        name: 'c2',
                        image: 'https://images.pexels.com/photos/162553/keys-workshop-mechanic-tools-162553.jpeg?auto=compress&cs=tinysrgb&w=800',
                        createdAt: new Date().toISOString(),
                        products: [
                            { id: 'p9', name: 'p9', category: 'Bolts', price: 25.99, stock: 60, createdAt: new Date().toISOString() },
                            { id: 'p10', name: 'p10', category: 'Nuts', price: 11.50, stock: 90, createdAt: new Date().toISOString() },
                            { id: 'p11', name: 'p11', category: 'Washers', price: 7.25, stock: 250, createdAt: new Date().toISOString() },
                            { id: 'p12', name: 'p12', category: 'Screws', price: 16.99, stock: 45, createdAt: new Date().toISOString() },
                            { id: 'p13', name: 'p13', category: 'Nuts', price: 13.75, stock: 70, createdAt: new Date().toISOString() },
                            { id: 'p14', name: 'p14', category: 'Bolts', price: 19.99, stock: 35, createdAt: new Date().toISOString() }
                        ]
                    },
                    {
                        id: '3',
                        name: 'c3',
                        image: 'https://images.pexels.com/photos/1108101/pexels-photo-1108101.jpeg?auto=compress&cs=tinysrgb&w=800',
                        createdAt: new Date().toISOString(),
                        products: [
                            { id: 'p15', name: 'p15', category: 'Bolts', price: 28.50, stock: 40, createdAt: new Date().toISOString() },
                            { id: 'p16', name: 'p16', category: 'Screws', price: 15.25, stock: 85, createdAt: new Date().toISOString() },
                            { id: 'p17', name: 'p17', category: 'Washers', price: 9.75, stock: 160, createdAt: new Date().toISOString() },
                            { id: 'p18', name: 'p18', category: 'Nuts', price: 17.99, stock: 55, createdAt: new Date().toISOString() },
                            { id: 'p19', name: 'p19', category: 'Screws', price: 13.50, stock: 95, createdAt: new Date().toISOString() },
                            { id: 'p20', name: 'p20', category: 'Bolts', price: 21.25, stock: 30, createdAt: new Date().toISOString() },
                            { id: 'p21', name: 'p21', category: 'Washers', price: 8.50, stock: 220, createdAt: new Date().toISOString() }
                        ]
                    },
                    {
                        id: '4',
                        name: 'c4',
                        image: 'https://images.pexels.com/photos/162553/keys-workshop-mechanic-tools-162553.jpeg?auto=compress&cs=tinysrgb&w=800',
                        createdAt: new Date().toISOString(),
                        products: [
                            { id: 'p22', name: 'p22', category: 'Bolts', price: 35.99, stock: 25, createdAt: new Date().toISOString() },
                            { id: 'p23', name: 'p23', category: 'Screws', price: 18.75, stock: 65, createdAt: new Date().toISOString() },
                            { id: 'p24', name: 'p24', category: 'Nuts', price: 14.99, stock: 110, createdAt: new Date().toISOString() },
                            { id: 'p25', name: 'p25', category: 'Bolts', price: 42.50, stock: 20, createdAt: new Date().toISOString() },
                            { id: 'p26', name: 'p26', category: 'Screws', price: 12.25, stock: 140, createdAt: new Date().toISOString() },
                            { id: 'p27', name: 'p27', category: 'Washers', price: 10.50, stock: 175, createdAt: new Date().toISOString() },
                            { id: 'p28', name: 'p28', category: 'Rods', price: 24.99, stock: 45, createdAt: new Date().toISOString() },
                            { id: 'p29', name: 'p29', category: 'Nuts', price: 16.75, stock: 80, createdAt: new Date().toISOString() }
                        ]
                    },
                    {
                        id: '5',
                        name: 'c5',
                        image: 'https://images.pexels.com/photos/1108101/pexels-photo-1108101.jpeg?auto=compress&cs=tinysrgb&w=800',
                        createdAt: new Date().toISOString(),
                        products: [
                            { id: 'p30', name: 'p30', category: 'Bolts', price: 32.99, stock: 30, createdAt: new Date().toISOString() },
                            { id: 'p31', name: 'p31', category: 'Screws', price: 19.50, stock: 75, createdAt: new Date().toISOString() },
                            { id: 'p32', name: 'p32', category: 'Nuts', price: 13.25, stock: 100, createdAt: new Date().toISOString() },
                            { id: 'p33', name: 'p33', category: 'Bolts', price: 26.75, stock: 40, createdAt: new Date().toISOString() },
                            { id: 'p34', name: 'p34', category: 'Screws', price: 11.99, stock: 200, createdAt: new Date().toISOString() },
                            { id: 'p35', name: 'p35', category: 'Washers', price: 8.75, stock: 150, createdAt: new Date().toISOString() }
                        ]
                    }
                ],
                lastUpdated: new Date().toISOString()
            };
            this.saveData(defaultData);
        }
    }

    saveData(data) {
        data.lastUpdated = new Date().toISOString();
        localStorage.setItem(this.storageKey, JSON.stringify(data));
    }

    getData() {
        const data = localStorage.getItem(this.storageKey);
        return data ? JSON.parse(data) : { companies: [], lastUpdated: new Date().toISOString() };
    }

    getAllCompanies() {
        return this.getData().companies;
    }

    getCompanyById(id) {
        const companies = this.getAllCompanies();
        return companies.find(company => company.id === id);
    }

    addCompany(companyData) {
        const data = this.getData();
        const newCompany = {
            id: this.generateId(),
            name: companyData.name,
            image: companyData.image || 'https://images.pexels.com/photos/1108101/pexels-photo-1108101.jpeg?auto=compress&cs=tinysrgb&w=800',
            createdAt: new Date().toISOString(),
            products: []
        };
        data.companies.push(newCompany);
        this.saveData(data);
        return newCompany;
    }

    updateCompany(id, updates) {
        const data = this.getData();
        const companyIndex = data.companies.findIndex(company => company.id === id);
        if (companyIndex !== -1) {
            data.companies[companyIndex] = { ...data.companies[companyIndex], ...updates };
            this.saveData(data);
            return data.companies[companyIndex];
        }
        return null;
    }

    deleteCompany(id) {
        const data = this.getData();
        const companyIndex = data.companies.findIndex(company => company.id === id);
        if (companyIndex !== -1) {
            const deletedCompany = data.companies.splice(companyIndex, 1)[0];
            this.saveData(data);
            return deletedCompany;
        }
        return null;
    }

    getAllProducts() {
        const companies = this.getAllCompanies();
        return companies.flatMap(company => 
            company.products.map(product => ({
                ...product,
                companyId: company.id,
                companyName: company.name
            }))
        );
    }

    getProductById(productId) {
        const companies = this.getAllCompanies();
        for (const company of companies) {
            const product = company.products.find(p => p.id === productId);
            if (product) {
                return {
                    ...product,
                    companyId: company.id,
                    companyName: company.name
                };
            }
        }
        return null;
    }

    addProduct(companyId, productData) {
        const data = this.getData();
        const companyIndex = data.companies.findIndex(company => company.id === companyId);
        if (companyIndex !== -1) {
            const newProduct = {
                id: this.generateId(),
                name: productData.name,
                category: productData.category,
                price: parseFloat(productData.price) || 0,
                stock: parseInt(productData.stock) || 0,
                createdAt: new Date().toISOString()
            };
            data.companies[companyIndex].products.push(newProduct);
            this.saveData(data);
            return newProduct;
        }
        return null;
    }

    updateProduct(productId, updates) {
        const data = this.getData();
        for (const company of data.companies) {
            const productIndex = company.products.findIndex(p => p.id === productId);
            if (productIndex !== -1) {
                company.products[productIndex] = { ...company.products[productIndex], ...updates };
                this.saveData(data);
                return company.products[productIndex];
            }
        }
        return null;
    }

    deleteProduct(productId) {
        const data = this.getData();
        for (const company of data.companies) {
            const productIndex = company.products.findIndex(p => p.id === productId);
            if (productIndex !== -1) {
                const deletedProduct = company.products.splice(productIndex, 1)[0];
                this.saveData(data);
                return deletedProduct;
            }
        }
        return null;
    }

    searchProducts(query, companyId = null) {
        let products = companyId ? 
            this.getCompanyById(companyId)?.products || [] : 
            this.getAllProducts();

        if (!query.trim()) return products;

        return products.filter(product =>
            product.name.toLowerCase().includes(query.toLowerCase()) ||
            product.category.toLowerCase().includes(query.toLowerCase())
        );
    }

    getProductsByCategory(category) {
        return this.getAllProducts().filter(product => 
            product.category.toLowerCase() === category.toLowerCase()
        );
    }

    getStats() {
        const companies = this.getAllCompanies();
        const products = this.getAllProducts();
        
        const categories = [...new Set(products.map(p => p.category))];
        const totalStock = products.reduce((sum, p) => sum + (p.stock || 0), 0);
        const totalValue = products.reduce((sum, p) => sum + ((p.price || 0) * (p.stock || 0)), 0);

        const categoryStats = categories.map(category => {
            const categoryProducts = products.filter(p => p.category === category);
            return {
                category,
                count: categoryProducts.length,
                stock: categoryProducts.reduce((sum, p) => sum + (p.stock || 0), 0)
            };
        });

        return {
            totalCompanies: companies.length,
            totalProducts: products.length,
            totalCategories: categories.length,
            totalStock,
            totalValue,
            categoryStats,
            lowStockProducts: products.filter(p => (p.stock || 0) < 20)
        };
    }

    generateId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }

    exportData() {
        return JSON.stringify(this.getData(), null, 2);
    }

    importData(jsonData) {
        try {
            const data = JSON.parse(jsonData);
            this.saveData(data);
            return true;
        } catch (error) {
            console.error('Import failed:', error);
            return false;
        }
    }

    clearDatabase() {
        localStorage.removeItem(this.storageKey);
        this.init();
    }
}

window.database = new Database();

if (typeof module !== 'undefined' && module.exports) {
    module.exports = Database;
}
