
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

interface CategoryCardProps {
  category: {
    name: string;
    count: number;
    icon: string;
  };
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category }) => {
  const categorySlug = category.name.toLowerCase().replace(/\s+/g, '-');

  return (
    <Link 
      to={`/categorias/${categorySlug}`}
      className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-all duration-300 hover:border-[#FED141] group"
    >
      <div className="flex items-center space-x-4">
        <div className="text-4xl">{category.icon}</div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-black group-hover:text-[#FED141] transition-colors">
            {category.name}
          </h3>
          <p className="text-gray-600 text-sm">
            {category.count} produtos
          </p>
        </div>
        <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-[#FED141] transition-colors" />
      </div>
    </Link>
  );
};

export default CategoryCard;
