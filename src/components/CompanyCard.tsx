import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Package } from 'lucide-react';
import type { Company } from '../data/mockData';

interface CompanyCardProps {
  company: Company;
}

export const CompanyCard: React.FC<CompanyCardProps> = ({ company }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/company/${company.id}`);
  };

  return (
    <div
      onClick={handleClick}
      className="bg-white rounded-xl shadow-xl cursor-pointer border border-gray-200 overflow-hidden card-hover group relative"
    >
      <div className="aspect-[2/1] relative overflow-hidden">
        <img 
          src={company.image} 
          alt={company.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="text-2xl font-bold text-white mb-2 drop-shadow-lg">{company.name}</h3>
          <div className="flex items-center justify-between">
            <div className="flex items-center text-white/90">
              <Package className="h-5 w-5 mr-2" />
              <span className="font-medium">{company.products.length} products</span>
            </div>
            <div className="industrial-gradient text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
              View Products →
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};