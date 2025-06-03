
import React, { useState } from 'react';
import { Search, Filter, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [location, setLocation] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const queryParams = new URLSearchParams();
    if (searchTerm) queryParams.append('q', searchTerm);
    if (location) queryParams.append('location', location);
    
    navigate(`/buscar?${queryParams.toString()}`);
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <form onSubmit={handleSearch} className="bg-white rounded-lg shadow-lg border border-gray-200 p-4">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search Input */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Busque por produtos, fornecedores ou categorias..."
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#FED141] focus:ring-2 focus:ring-yellow-200"
            />
          </div>

          {/* Location Input */}
          <div className="lg:w-64 relative">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Localização"
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#FED141] focus:ring-2 focus:ring-yellow-200"
            />
          </div>

          {/* Filters Button */}
          <button
            type="button"
            onClick={() => setShowFilters(!showFilters)}
            className="lg:w-auto px-4 py-3 border border-gray-300 rounded-lg hover:border-[#FED141] transition-colors flex items-center justify-center gap-2"
          >
            <Filter className="w-5 h-5" />
            <span className="hidden lg:inline">Filtros</span>
          </button>

          {/* Search Button */}
          <button
            type="submit"
            className="lg:w-auto px-8 py-3 bg-[#FED141] text-black font-semibold rounded-lg hover:bg-yellow-400 transition-colors"
          >
            Buscar
          </button>
        </div>

        {/* Advanced Filters */}
        {showFilters && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Categoria</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#FED141]">
                  <option value="">Todas as categorias</option>
                  <option value="equipamentos">Equipamentos Industriais</option>
                  <option value="materias-primas">Matérias-Primas</option>
                  <option value="ferramentas">Ferramentas</option>
                  <option value="eletronicos">Componentes Eletrônicos</option>
                  <option value="embalagens">Embalagens</option>
                  <option value="seguranca">Segurança Industrial</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Quantidade Mínima</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#FED141]">
                  <option value="">Qualquer quantidade</option>
                  <option value="1-10">1 - 10 unidades</option>
                  <option value="10-100">10 - 100 unidades</option>
                  <option value="100-1000">100 - 1.000 unidades</option>
                  <option value="1000+">1.000+ unidades</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Avaliação</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#FED141]">
                  <option value="">Qualquer avaliação</option>
                  <option value="5">⭐⭐⭐⭐⭐ (5 estrelas)</option>
                  <option value="4">⭐⭐⭐⭐ (4+ estrelas)</option>
                  <option value="3">⭐⭐⭐ (3+ estrelas)</option>
                </select>
              </div>
            </div>
            
            <div className="mt-4 flex items-center gap-4">
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                <span className="text-sm text-gray-700">Apenas fornecedores verificados</span>
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                <span className="text-sm text-gray-700">Disponível para entrega imediata</span>
              </label>
            </div>
          </div>
        )}
      </form>

      {/* Quick Search Suggestions */}
      <div className="mt-4 flex flex-wrap gap-2">
        <span className="text-sm text-gray-600">Buscas populares:</span>
        {['Parafusos', 'Motores elétricos', 'Sensores', 'Tubos de aço', 'Válvulas'].map((term) => (
          <button
            key={term}
            onClick={() => setSearchTerm(term)}
            className="text-sm bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-full transition-colors"
          >
            {term}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SearchBar;
