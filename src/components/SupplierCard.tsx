
import React from 'react';
import { Link } from 'react-router-dom';
import { Star, MapPin, MessageCircle } from 'lucide-react';

interface SupplierCardProps {
  supplier: {
    id: number;
    name: string;
    location: string;
    rating: number;
    specialties: string[];
    image: string;
    verified: boolean;
  };
}

const SupplierCard: React.FC<SupplierCardProps> = ({ supplier }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-all duration-300 hover:border-[#FED141]">
      <div className="flex items-start space-x-4">
        <img 
          src={supplier.image} 
          alt={supplier.name}
          className="w-16 h-16 rounded-lg object-cover"
        />
        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-semibold text-black">{supplier.name}</h3>
            {supplier.verified && (
              <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                Verificado
              </span>
            )}
          </div>
          
          <div className="flex items-center text-gray-600 text-sm mb-2">
            <MapPin className="w-4 h-4 mr-1" />
            {supplier.location}
          </div>
          
          <div className="flex items-center mb-3">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  className={`w-4 h-4 ${i < supplier.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                />
              ))}
            </div>
            <span className="text-sm text-gray-600 ml-2">({supplier.rating})</span>
          </div>
          
          <div className="flex flex-wrap gap-2 mb-4">
            {supplier.specialties.slice(0, 3).map((specialty, index) => (
              <span key={index} className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">
                {specialty}
              </span>
            ))}
          </div>
          
          <div className="flex gap-2">
            <Link 
              to={`/fornecedores/${supplier.id}`}
              className="flex-1 bg-[#FED141] text-black text-center py-2 px-4 rounded-lg font-medium hover:bg-yellow-400 transition-colors"
            >
              Ver Perfil
            </Link>
            <Link
              to={`/chat/${supplier.id}`}
              className="bg-gray-100 text-gray-700 p-2 rounded-lg hover:bg-gray-200 transition-colors"
            >
              <MessageCircle className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupplierCard;
