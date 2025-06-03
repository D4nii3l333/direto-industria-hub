
import React, { useState } from 'react';
import { Search, Filter, Star, MapPin, Package, Shield } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SupplierCard from '../components/SupplierCard';

const Suppliers = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [minRating, setMinRating] = useState(0);

  const suppliers = [
    {
      id: 1,
      name: "MetalTech Ind.",
      location: "São Paulo, SP",
      rating: 4.8,
      products: 45,
      verified: true,
      logo: "https://via.placeholder.com/150",
      category: "equipamentos",
      description: "Especializada em equipamentos industriais de alta qualidade"
    },
    {
      id: 2,
      name: "PlastiCorp",
      location: "Rio de Janeiro, RJ",
      rating: 4.6,
      products: 32,
      verified: true,
      logo: "https://via.placeholder.com/150",
      category: "materias-primas",
      description: "Fornecedor líder em materiais plásticos industriais"
    },
    {
      id: 3,
      name: "EletroMax",
      location: "Belo Horizonte, MG",
      rating: 4.9,
      products: 68,
      verified: true,
      logo: "https://via.placeholder.com/150",
      category: "eletronicos",
      description: "Componentes eletrônicos para automação industrial"
    },
    {
      id: 4,
      name: "FerroForte",
      location: "Porto Alegre, RS",
      rating: 4.7,
      products: 23,
      verified: true,
      logo: "https://via.placeholder.com/150",
      category: "ferramentas",
      description: "Ferramentas profissionais para indústria pesada"
    },
    {
      id: 5,
      name: "EmbalaFlex",
      location: "Curitiba, PR",
      rating: 4.5,
      products: 56,
      verified: false,
      logo: "https://via.placeholder.com/150",
      category: "embalagens",
      description: "Soluções inovadoras em embalagens industriais"
    },
    {
      id: 6,
      name: "SecureInd",
      location: "Salvador, BA",
      rating: 4.8,
      products: 34,
      verified: true,
      logo: "https://via.placeholder.com/150",
      category: "seguranca",
      description: "Equipamentos de segurança industrial certificados"
    }
  ];

  const categories = [
    { value: '', label: 'Todas as categorias' },
    { value: 'equipamentos', label: 'Equipamentos Industriais' },
    { value: 'materias-primas', label: 'Matérias-Primas' },
    { value: 'ferramentas', label: 'Ferramentas' },
    { value: 'eletronicos', label: 'Componentes Eletrônicos' },
    { value: 'embalagens', label: 'Embalagens' },
    { value: 'seguranca', label: 'Segurança Industrial' }
  ];

  const locations = [
    { value: '', label: 'Todas as localizações' },
    { value: 'São Paulo, SP', label: 'São Paulo, SP' },
    { value: 'Rio de Janeiro, RJ', label: 'Rio de Janeiro, RJ' },
    { value: 'Belo Horizonte, MG', label: 'Belo Horizonte, MG' },
    { value: 'Porto Alegre, RS', label: 'Porto Alegre, RS' },
    { value: 'Curitiba, PR', label: 'Curitiba, PR' },
    { value: 'Salvador, BA', label: 'Salvador, BA' }
  ];

  const filteredSuppliers = suppliers.filter(supplier => {
    return (
      supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedCategory === '' || supplier.category === selectedCategory) &&
      (selectedLocation === '' || supplier.location === selectedLocation) &&
      supplier.rating >= minRating
    );
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="py-8">
        <div className="max-w-7xl mx-auto px-4">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-black mb-2">Fornecedores</h1>
            <p className="text-gray-600">Encontre fornecedores verificados para suas necessidades industriais</p>
          </div>

          {/* Search and Filters */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
            <div className="grid md:grid-cols-4 gap-4 mb-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Buscar fornecedores..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#FED141]"
                />
              </div>

              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#FED141]"
              >
                {categories.map(category => (
                  <option key={category.value} value={category.value}>{category.label}</option>
                ))}
              </select>

              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#FED141]"
              >
                {locations.map(location => (
                  <option key={location.value} value={location.value}>{location.label}</option>
                ))}
              </select>

              <select
                value={minRating}
                onChange={(e) => setMinRating(Number(e.target.value))}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#FED141]"
              >
                <option value={0}>Qualquer avaliação</option>
                <option value={4.5}>4.5+ estrelas</option>
                <option value={4.0}>4.0+ estrelas</option>
                <option value={3.5}>3.5+ estrelas</option>
              </select>
            </div>

            <div className="flex items-center justify-between text-sm text-gray-600">
              <span>{filteredSuppliers.length} fornecedores encontrados</span>
              <div className="flex items-center space-x-4">
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  <span>Apenas verificados</span>
                </label>
              </div>
            </div>
          </div>

          {/* Suppliers Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSuppliers.map(supplier => (
              <SupplierCard key={supplier.id} supplier={supplier} />
            ))}
          </div>

          {/* Empty State */}
          {filteredSuppliers.length === 0 && (
            <div className="text-center py-12">
              <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">Nenhum fornecedor encontrado</h3>
              <p className="text-gray-500">Tente ajustar os filtros para encontrar mais resultados.</p>
            </div>
          )}

          {/* Load More */}
          {filteredSuppliers.length > 0 && (
            <div className="text-center mt-8">
              <button className="bg-[#FED141] text-black px-8 py-3 rounded-lg font-semibold hover:bg-yellow-400 transition-colors">
                Carregar mais fornecedores
              </button>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Suppliers;
