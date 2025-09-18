import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { SearchBar } from '../components/SearchBar';
import { ProductCard } from '../components/ProductCard';
import { companies, searchProducts, type Product } from '../data/mockData';
import { ArrowLeft, Wrench, Package, Grid3X3 } from 'lucide-react';

export const CompanyPage: React.FC = () => {
  const { companyId } = useParams<{ companyId: string }>();
  const navigate = useNavigate();
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const company = companies.find(c => c.id === companyId);

  if (!company) {
    return (
      <div className="min-h-screen gradient-bg flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Company not found</h1>
          <button
            onClick={() => navigate('/')}
            className="text-orange-400 hover:text-orange-300 font-medium"
          >
            Return to homepage
          </button>
        </div>
      </div>
    );
  }

  const handleSearch = (query: string) => {
    if (query.trim()) {
      setIsSearching(true);
      const results = searchProducts(query, companyId);
      setFilteredProducts(results);
    } else {
      setIsSearching(false);
      setFilteredProducts([]);
    }
  };

  const productsToShow = isSearching ? filteredProducts : company.products;

  return (
    <div className="min-h-screen gradient-bg">
      <header className="bg-white/90 backdrop-blur-lg shadow-2xl border-b border-gray-300/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex items-center mb-8">
            <button
              onClick={() => navigate('/')}
              className="mr-6 p-3 rounded-xl bg-green-100 hover:bg-green-200 transition-all duration-200 hover:scale-105 shadow-md"
            >
              <ArrowLeft className="h-6 w-6 text-green-600" />
            </button>
            
            <div className="flex items-center flex-1">
              <div className="industrial-gradient rounded-3xl p-5 mr-6 shadow-2xl">
                <Wrench className="h-12 w-12 text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-green-200 bg-clip-text text-transparent mb-2">
                  {company.name}
                </h1>
              </div>
            </div>
          </div>
          
          <SearchBar
            onSearch={handleSearch}
            placeholder={`Search products in ${company.name}...`}
            className="max-w-3xl mx-auto"
          />
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <div className="industrial-gradient rounded-2xl p-3 mr-4">
                <Package className="h-8 w-8 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-white">
                {isSearching ? 'Search Results' : 'Products'}
              </h2>
            </div>
            <div className="bg-white rounded-full px-6 py-3 shadow-lg border border-gray-200">
              <span className="font-semibold text-green-600">{productsToShow.length}</span>
              <span className="text-gray-600 ml-1">products {isSearching && 'found'}</span>
            </div>
          </div>
        </div>

        {productsToShow.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
            {productsToShow.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="bg-white/10 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
              <Grid3X3 className="h-12 w-12 text-white/60" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">
              {isSearching ? 'No products found' : 'No products available'}
            </h3>
            <p className="text-gray-300">
              {isSearching ? 'No products found matching your search.' : 'No products available.'}
            </p>
          </div>
        )}
      </main>
      
      <footer className="bg-white/90 backdrop-blur-lg border-t border-gray-300/50 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-600">
            <p>&copy; 2025 {company.name}. Innovation at its finest.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};