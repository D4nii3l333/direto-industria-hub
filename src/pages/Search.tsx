import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, Filter } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SupplierCard from '@/components/SupplierCard';
import { getSuppliers, getCategories, initializeData } from '@/data/mockData';

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const [suppliers, setSuppliers] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [results, setResults] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');

  useEffect(() => {
    // Inicializa os dados se necessário e carrega do localStorage
    initializeData();
    const loadedSuppliers = getSuppliers();
    const loadedCategories = getCategories();
    setSuppliers(loadedSuppliers);
    setCategories(loadedCategories);

    // Pega o termo de busca da URL
    const query = searchParams.get('q') || '';
    setSearchTerm(query);
  }, [searchParams]);

  useEffect(() => {
    let filtered = suppliers;

    if (searchTerm) {
      filtered = filtered.filter(supplier =>
        supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        supplier.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        supplier.specialties.some((specialty: string) => 
          specialty.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }

    if (categoryFilter) {
      const category = categories.find(c => c.slug === categoryFilter);
      if (category) {
        // Filtra fornecedores que tenham produtos na categoria selecionada
        filtered = filtered.filter(supplier =>
          supplier.specialties.some((specialty: string) =>
            category.name.toLowerCase().includes(specialty.toLowerCase()) ||
            specialty.toLowerCase().includes(category.name.toLowerCase())
          )
        );
      }
    }

    setResults(filtered);
  }, [searchTerm, categoryFilter, suppliers, categories]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Resultados da Busca</h1>
          {searchTerm && (
            <p className="text-gray-600">
              Resultados para: <span className="font-semibold">"{searchTerm}"</span>
            </p>
          )}
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Buscar fornecedores..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#FED141]"
              />
            </div>
            
            <div className="relative">
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#FED141] appearance-none"
              >
                <option value="">Todas as categorias</option>
                {categories.map(category => (
                  <option key={category.id} value={category.slug}>{category.name}</option>
                ))}
              </select>
            </div>
            
            <button className="flex items-center justify-center space-x-2 bg-[#FED141] text-black px-4 py-2 rounded-lg font-medium hover:bg-yellow-400 transition-colors">
              <Filter className="w-5 h-5" />
              <span>Filtrar</span>
            </button>
          </div>
        </div>

        {/* Results */}
        <div className="mb-6">
          <p className="text-gray-600">
            Encontrados {results.length} fornecedores
          </p>
        </div>

        {/* Results Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {results.map((supplier) => (
            <SupplierCard key={supplier.id} supplier={supplier} />
          ))}
        </div>

        {results.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">Nenhum fornecedor encontrado.</p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default SearchPage;
