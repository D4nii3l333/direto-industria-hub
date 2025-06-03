
import React from 'react';
import { Link } from 'react-router-dom';
import { Star, MapPin, Package, Shield, MessageCircle } from 'lucide-react';

interface SupplierCardProps {
  supplier: {
    id: number;
    name: string;
    location: string;
    rating: number;
    products: number;
    verified: boolean;
    logo: string;
  };
}

const SupplierCard: React.FC<SupplierCardProps> = ({ supplier }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-all duration-300 hover:border-[#FED141]">
      <div className="flex flex-col items-center text-center">
        {/* Logo */}
        <div className="w-20 h-20 bg-gray-100 rounded-full mb-4 flex items-center justify-center overflow-hidden">
          <img 
            src={supplier.logo} 
            alt={supplier.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Name and Verification */}
        <div className="flex items-center mb-2">
          <h3 className="text-lg font-semibold text-black mr-2">{supplier.name}</h3>
          {supplier.verified && (
            <Shield className="w-5 h-5 text-green-500" title="Fornecedor Verificado" />
          )}
        </div>

        {/* Location */}
        <div className="flex items-center text-gray-600 mb-3">
          <MapPin className="w-4 h-4 mr-1" />
          <span className="text-sm">{supplier.location}</span>
        </div>

        {/* Stats */}
        <div className="flex items-center space-x-4 mb-4 text-sm">
          <div className="flex items-center">
            <Star className="w-4 h-4 text-yellow-400 mr-1" />
            <span className="font-medium">{supplier.rating}</span>
          </div>
          <div className="flex items-center">
            <Package className="w-4 h-4 text-gray-400 mr-1" />
            <span>{supplier.products} produtos</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex space-x-2 w-full">
          <Link 
            to={`/fornecedores/${supplier.id}`}
            className="flex-1 bg-[#FED141] text-black py-2 px-4 rounded-lg font-medium hover:bg-yellow-400 transition-colors text-center"
          >
            Ver Perfil
          </Link>
          <button className="bg-gray-100 text-black p-2 rounded-lg hover:bg-gray-200 transition-colors">
            <MessageCircle className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SupplierCard;
