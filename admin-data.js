class AdminDataManager {
    constructor() {
        this.storageKey = 'adminData';
        this.init();
    }

    init() {
        this.loadData();
    }

    loadData() {
        const savedData = localStorage.getItem(this.storageKey);
        if (savedData) {
            const data = JSON.parse(savedData);
            window.companies = data.companies || this.getDefaultCompanies();
        } else {
            window.companies = this.getDefaultCompanies();
            this.saveData();
        }
    }

    saveData() {
        const data = {
            companies: window.companies,
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
            },
            {
                id: '3',
                name: 'Industrial Fasteners Ltd',
                image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDMwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMjAwIiBmaWxsPSJ1cmwoI2dyYWRpZW50KSIvPgo8dGV4dCB4PSIxNTAiIHk9IjEwNSIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjE4IiBmb250LXdlaWdodD0iYm9sZCIgZmlsbD0id2hpdGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiPkluZHVzdHJpYWwgRmFzdGVuZXJzPC90ZXh0Pgo8ZGVmcz4KPGxpbmVhckdyYWRpZW50IGlkPSJncmFkaWVudCIgeDE9IjAlIiB5MT0iMCUiIHgyPSIxMDAlIiB5Mj0iMTAwJSI+CjxzdG9wIG9mZnNldD0iMCUiIHN0b3AtY29sb3I9IiNGRkI2MjciLz4KPHN0b3Agb2Zmc2V0PSIxMDAlIiBzdG9wLWNvbG9yPSIjRkY2QjM1Ii8+CjwvbGluZWFyR3JhZGllbnQ+CjwvZGVmcz4KPC9zdmc+',
                products: [
                    { 
                        id: 'a1', 
                        name: 'Precision Bolts', 
                        category: 'Bolts', 
                        company: 'Industrial Fasteners Ltd',
                        price: 22.50,
                        description: 'High-precision bolts for critical applications',
                        specifications: 'Material: Grade 8 Steel, Size: M12, Length: 80mm, Tolerance: ±0.1mm'
                    }
                ]
            }
        ];
    }

    addCompany(companyData) {
        const newId = this.generateId();
        const newCompany = {
            id: newId,
            name: companyData.name,
            image: companyData.image,
            products: []
        };
        window.companies.push(newCompany);
        this.saveData();
        return newCompany;
    }

    updateCompany(id, companyData) {
        const index = window.companies.findIndex(c => c.id === id);
        if (index !== -1) {
            window.companies[index] = {
                ...window.companies[index],
                name: companyData.name,
                image: companyData.image
            };
            window.companies[index].products.forEach(product => {
                product.company = companyData.name;
            });
            this.saveData();
            return window.companies[index];
        }
        return null;
    }

    deleteCompany(id) {
        const index = window.companies.findIndex(c => c.id === id);
        if (index !== -1) {
            const deletedCompany = window.companies.splice(index, 1)[0];
            this.saveData();
            return deletedCompany;
        }
        return null;
    }

    getCompany(id) {
        return window.companies.find(c => c.id === id);
    }

    addProduct(productData) {
        const company = this.getCompany(productData.companyId);
        if (!company) return null;

        const newId = this.generateId();
        const newProduct = {
            id: newId,
            name: productData.name,
            category: productData.category,
            company: company.name,
            price: parseFloat(productData.price),
            description: productData.description || '',
            specifications: productData.specifications || ''
        };
        
        company.products.push(newProduct);
        this.saveData();
        return newProduct;
    }

    updateProduct(id, productData) {
        for (let company of window.companies) {
            const productIndex = company.products.findIndex(p => p.id === id);
            if (productIndex !== -1) {
                const targetCompany = this.getCompany(productData.companyId);
                if (!targetCompany) return null;

                const product = company.products.splice(productIndex, 1)[0];
                
                product.name = productData.name;
                product.category = productData.category;
                product.company = targetCompany.name;
                product.price = parseFloat(productData.price);
                product.description = productData.description || '';
                product.specifications = productData.specifications || '';
                
                targetCompany.products.push(product);
                
                this.saveData();
                return product;
            }
        }
        return null;
    }

    deleteProduct(id) {
        for (let company of window.companies) {
            const productIndex = company.products.findIndex(p => p.id === id);
            if (productIndex !== -1) {
                const deletedProduct = company.products.splice(productIndex, 1)[0];
                this.saveData();
                return deletedProduct;
            }
        }
        return null;
    }

    getProduct(id) {
        for (let company of window.companies) {
            const product = company.products.find(p => p.id === id);
            if (product) return product;
        }
        return null;
    }

    getAllProducts() {
        return window.companies.flatMap(company => company.products);
    }

    generateId() {
        return 'id_' + Math.random().toString(36).substr(2, 9) + Date.now().toString(36);
    }

    getStats() {
        const totalCompanies = window.companies.length;
        const totalProducts = this.getAllProducts().length;
        const avgProductsPerCompany = totalCompanies > 0 ? (totalProducts / totalCompanies).toFixed(1) : 0;
        
        return {
            totalCompanies,
            totalProducts,
            avgProductsPerCompany
        };
    }

    exportData() {
        const data = {
            companies: window.companies,
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

    importData(jsonData) {
        try {
            const data = JSON.parse(jsonData);
            if (data.companies && Array.isArray(data.companies)) {
                window.companies = data.companies;
                this.saveData();
                return true;
            }
            return false;
        } catch (error) {
            console.error('Import error:', error);
            return false;
        }
    }

    resetData() {
        window.companies = this.getDefaultCompanies();
        this.saveData();
    }
}

const adminDataManager = new AdminDataManager();
window.adminDataManager = adminDataManager;
