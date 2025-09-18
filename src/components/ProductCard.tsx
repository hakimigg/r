import React from 'react';
import { Wrench } from 'lucide-react';
import type { Product } from '../data/mockData';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg border border-gray-200 card-hover group overflow-hidden">
      <div className="aspect-square relative overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
        <div className="text-4xl font-bold text-gray-400">
          {product.id.toUpperCase()}
        </div>
        <div className="absolute top-2 right-2">
          <div className="industrial-gradient text-white px-2 py-1 rounded-full text-xs font-bold uppercase tracking-wide">
            {product.category}
          </div>
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors duration-200">{product.name}</h3>
        <div className="flex items-center text-gray-600 text-sm">
          <Wrench className="h-4 w-4 mr-1" />
          <span>{product.company}</span>
        </div>
      </div>
      <div className="h-1 industrial-gradient transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
    </div>
  );
};