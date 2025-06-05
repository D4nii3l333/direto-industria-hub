
import React, { useEffect, useState } from 'react';
import { Search, Filter, MapPin, Star } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SupplierCard from '@/components/SupplierCard';
import Breadcrumbs from '@/components/Breadcrumbs';
import LoadingSpinner from '@/components/LoadingSpinner';
import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious 
} from '@/components/ui/pagination';
import { getSuppliers, initializeData } from '@/data/mockData';

const Suppliers = () => {
  const [suppliers, setSuppliers] = useState<any[]>([]);
  const [filteredSuppliers, setFilteredSuppliers] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [ratingFilter, setRatingFilter] = useState('');
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      // Simula loading para demonstrar o spinner
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      initializeData();
      const loadedSuppliers = getSuppliers();
      setSuppliers(loadedSuppliers);
      setFilteredSuppliers(loadedSuppliers);
      setLoading(false);
    };

    loadData();
  }, []);

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

    if (locationFilter) {
      filtered = filtered.filter(supplier =>
        supplier.location.toLowerCase().includes(locationFilter.toLowerCase())
      );
    }

    if (ratingFilter) {
      const minRating = parseFloat(ratingFilter);
      filtered = filtered.filter(supplier => supplier.rating >= minRating);
    }

    setFilteredSuppliers(filtered);
    setCurrentPage(1); // Reset to first page when filters change
  }, [searchTerm, locationFilter, ratingFilter, suppliers]);

  const locations = [...new Set(suppliers.map(s => s.location))];

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentSuppliers = filteredSuppliers.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredSuppliers.length / itemsPerPage);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <Breadcrumbs />
        <div className="flex items-center justify-center min-h-[400px]">
          <LoadingSpinner size="lg" text="Carregando fornecedores..." />
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Breadcrumbs />
      
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Fornecedores</h1>
          <p className="text-gray-600">Encontre os melhores fornecedores para sua indústria</p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <select
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#FED141] appearance-none"
              >
                <option value="">Todas as localizações</option>
                {locations.map(location => (
                  <option key={location} value={location}>{location}</option>
                ))}
              </select>
            </div>
            
            <div className="relative">
              <Star className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <select
                value={ratingFilter}
                onChange={(e) => setRatingFilter(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#FED141] appearance-none"
              >
                <option value="">Todas as avaliações</option>
                <option value="4.5">4.5+ estrelas</option>
                <option value="4.0">4.0+ estrelas</option>
                <option value="3.5">3.5+ estrelas</option>
                <option value="3.0">3.0+ estrelas</option>
              </select>
            </div>
            
            <button className="flex items-center justify-center space-x-2 bg-[#FED141] text-black px-4 py-2 rounded-lg font-medium hover:bg-yellow-400 transition-colors">
              <Filter className="w-5 h-5" />
              <span>Filtrar</span>
            </button>
          </div>
        </div>

        {/* Results */}
        <div className="mb-6 flex justify-between items-center">
          <p className="text-gray-600">
            Encontrados {filteredSuppliers.length} fornecedores
          </p>
          <p className="text-sm text-gray-500">
            Página {currentPage} de {totalPages}
          </p>
        </div>

        {/* Suppliers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {currentSuppliers.map((supplier) => (
            <SupplierCard key={supplier.id} supplier={supplier} />
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <Pagination className="mb-8">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious 
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  className={currentPage === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                />
              </PaginationItem>
              
              {[...Array(totalPages)].map((_, index) => (
                <PaginationItem key={index + 1}>
                  <PaginationLink
                    onClick={() => setCurrentPage(index + 1)}
                    isActive={currentPage === index + 1}
                    className="cursor-pointer"
                  >
                    {index + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}
              
              <PaginationItem>
                <PaginationNext 
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  className={currentPage === totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        )}

        {filteredSuppliers.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">Nenhum fornecedor encontrado com os filtros aplicados.</p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Suppliers;
