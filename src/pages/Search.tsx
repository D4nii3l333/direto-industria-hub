
import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Search as SearchIcon, Filter, Star, MapPin, Package, Grid, List } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SupplierCard from '../components/SupplierCard';

const Search = () => {
  const [searchParams] = useSearchParams();
  const [viewMode, setViewMode] = useState<'suppliers' | 'products'>('suppliers');
  const [sortBy, setSortBy] = useState('relevance');
  
  const query = searchParams.get('q') || '';
  const location = searchParams.get('location') || '';
  const category = searchParams.get('category') || '';

  // Mock search results
  const searchResults = {
    suppliers: [
      {
        id: 1,
        name: "MetalTech Ind.",
        location: "São Paulo, SP",
        rating: 4.8,
        products: 45,
        verified: true,
        logo: "https://via.placeholder.com/150"
      },
      {
        id: 2,
        name: "PlastiCorp",
        location: "Rio de Janeiro, RJ",
        rating: 4.6,
        products: 32,
        verified: true,
        logo: "https://via.placeholder.com/150"
      }
    ],
    products: [
      {
        id: 1,
        name: "Soldadora Industrial MIG 250A",
        supplier: "MetalTech Ind.",
        price: "R$ 2.800,00",
        image: "https://via.placeholder.com/200",
        rating: 4.8,
        minQuantity: 1
      },
      {
        id: 2,
        name: "Compressor de Ar 20HP",
        supplier: "MetalTech Ind.",
        price: "R$ 5.500,00",
        image: "https://via.placeholder.com/200",
        rating: 4.9,
        minQuantity: 1
      }
    ]
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="py-8">
        <div className="max-w-7xl mx-auto px-4">
          {/* Search Header */}
          <div className="mb-8">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex flex-col lg:flex-row gap-4 mb-4">
                <div className="flex-1 relative">
                  <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    defaultValue={query}
                    placeholder="Busque por produtos, fornecedores ou categorias..."
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#FED141]"
                  />
                </div>
                <div className="lg:w-64 relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    defaultValue={location}
                    placeholder="Localização"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#FED141]"
                  />
                </div>
                <button className="px-8 py-3 bg-[#FED141] text-black font-semibold rounded-lg hover:bg-yellow-400 transition-colors">
                  Buscar
                </button>
              </div>
              
              {/* Search Info */}
              <div className="flex items-center justify-between text-sm text-gray-600">
                <div>
                  {query && (
                    <span>
                      Resultados para "<strong className="text-black">{query}</strong>"
                      {location && ` em ${location}`}
                      {category && ` na categoria ${category}`}
                    </span>
                  )}
                </div>
                <span>
                  {searchResults.suppliers.length + searchResults.products.length} resultados encontrados
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filters Sidebar */}
            <div className="lg:w-1/4">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky top-8">
                <h3 className="text-lg font-semibold text-black mb-4 flex items-center">
                  <Filter className="w-5 h-5 mr-2" />
                  Filtros
                </h3>
                
                <div className="space-y-6">
                  {/* Type Filter */}
                  <div>
                    <h4 className="font-medium text-black mb-2">Tipo de Resultado</h4>
                    <div className="space-y-2">
                      <label className="flex items-center">
                        <input 
                          type="radio" 
                          name="type" 
                          value="suppliers"
                          checked={viewMode === 'suppliers'}
                          onChange={(e) => setViewMode(e.target.value as 'suppliers' | 'products')}
                          className="mr-2" 
                        />
                        <span className="text-sm">Fornecedores</span>
                      </label>
                      <label className="flex items-center">
                        <input 
                          type="radio" 
                          name="type" 
                          value="products"
                          checked={viewMode === 'products'}
                          onChange={(e) => setViewMode(e.target.value as 'suppliers' | 'products')}
                          className="mr-2" 
                        />
                        <span className="text-sm">Produtos</span>
                      </label>
                    </div>
                  </div>

                  {/* Category Filter */}
                  <div>
                    <h4 className="font-medium text-black mb-2">Categoria</h4>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-[#FED141]">
                      <option value="">Todas as categorias</option>
                      <option value="equipamentos">Equipamentos Industriais</option>
                      <option value="materias-primas">Matérias-Primas</option>
                      <option value="ferramentas">Ferramentas</option>
                    </select>
                  </div>

                  {/* Location Filter */}
                  <div>
                    <h4 className="font-medium text-black mb-2">Localização</h4>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-[#FED141]">
                      <option value="">Todas as regiões</option>
                      <option value="sp">São Paulo</option>
                      <option value="rj">Rio de Janeiro</option>
                      <option value="mg">Minas Gerais</option>
                    </select>
                  </div>

                  {/* Rating Filter */}
                  <div>
                    <h4 className="font-medium text-black mb-2">Avaliação</h4>
                    <div className="space-y-2">
                      {[5, 4, 3].map((rating) => (
                        <label key={rating} className="flex items-center">
                          <input type="checkbox" className="mr-2" />
                          <div className="flex items-center">
                            <div className="flex mr-1">
                              {Array.from({ length: rating }, (_, i) => (
                                <Star key={i} className="w-3 h-3 text-yellow-400 fill-current" />
                              ))}
                            </div>
                            <span className="text-sm">& acima</span>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Verified Filter */}
                  <div>
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2" />
                      <span className="text-sm">Apenas verificados</span>
                    </label>
                  </div>
                </div>

                <button className="w-full mt-6 bg-gray-100 text-black py-2 px-4 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors">
                  Limpar Filtros
                </button>
              </div>
            </div>

            {/* Results */}
            <div className="lg:w-3/4">
              {/* Results Header */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => setViewMode('suppliers')}
                      className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                        viewMode === 'suppliers' 
                          ? 'bg-[#FED141] text-black' 
                          : 'text-gray-600 hover:text-black'
                      }`}
                    >
                      Fornecedores ({searchResults.suppliers.length})
                    </button>
                    <button
                      onClick={() => setViewMode('products')}
                      className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                        viewMode === 'products' 
                          ? 'bg-[#FED141] text-black' 
                          : 'text-gray-600 hover:text-black'
                      }`}
                    >
                      Produtos ({searchResults.products.length})
                    </button>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-600">Ordenar:</span>
                    <select 
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="px-3 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:border-[#FED141]"
                    >
                      <option value="relevance">Relevância</option>
                      <option value="rating">Avaliação</option>
                      <option value="price">Preço</option>
                      <option value="distance">Distância</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Results Grid */}
              <div className="space-y-6">
                {viewMode === 'suppliers' ? (
                  <div className="grid md:grid-cols-2 gap-6">
                    {searchResults.suppliers.map(supplier => (
                      <SupplierCard key={supplier.id} supplier={supplier} />
                    ))}
                  </div>
                ) : (
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {searchResults.products.map(product => (
                      <div key={product.id} className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-shadow">
                        <img 
                          src={product.image} 
                          alt={product.name}
                          className="w-full h-48 object-cover rounded-lg mb-4"
                        />
                        <h3 className="font-semibold text-black mb-2">{product.name}</h3>
                        <p className="text-sm text-gray-600 mb-2">por {product.supplier}</p>
                        <div className="flex items-center mb-2">
                          <div className="flex mr-1">
                            {Array.from({ length: Math.floor(product.rating) }, (_, i) => (
                              <Star key={i} className="w-3 h-3 text-yellow-400 fill-current" />
                            ))}
                          </div>
                          <span className="text-sm text-gray-600">({product.rating})</span>
                        </div>
                        <div className="flex justify-between items-center mb-3">
                          <span className="text-lg font-bold text-[#FED141]">{product.price}</span>
                          <span className="text-sm text-gray-600">Mín: {product.minQuantity}</span>
                        </div>
                        <button className="w-full bg-[#FED141] text-black py-2 px-4 rounded-lg font-medium hover:bg-yellow-400 transition-colors">
                          Ver Detalhes
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {/* Load More */}
                <div className="text-center">
                  <button className="bg-gray-100 text-black px-8 py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors">
                    Carregar mais resultados
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Search;
