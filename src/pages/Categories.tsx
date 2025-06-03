
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronRight, Grid, List } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CategoryCard from '../components/CategoryCard';
import SupplierCard from '../components/SupplierCard';

const Categories = () => {
  const { category } = useParams();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const categories = [
    { name: "Equipamentos Industriais", count: 437, icon: "🏭", slug: "equipamentos-industriais" },
    { name: "Matérias-Primas", count: 294, icon: "⚡", slug: "materias-primas" },
    { name: "Ferramentas", count: 183, icon: "🔧", slug: "ferramentas" },
    { name: "Componentes Eletrônicos", count: 256, icon: "💻", slug: "componentes-eletronicos" },
    { name: "Embalagens", count: 165, icon: "📦", slug: "embalagens" },
    { name: "Segurança Industrial", count: 92, icon: "🛡️", slug: "seguranca-industrial" }
  ];

  const subcategories = {
    "equipamentos-industriais": [
      "Soldadores e Equipamentos de Solda",
      "Compressores de Ar",
      "Máquinas-Ferramenta",
      "Equipamentos de Elevação",
      "Sistemas de Ventilação"
    ],
    "materias-primas": [
      "Aço e Metais",
      "Plásticos Industriais", 
      "Borrachas e Elastômeros",
      "Químicos Industriais",
      "Materiais Compostos"
    ]
  };

  const suppliers = [
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
  ];

  const currentCategory = categories.find(cat => cat.slug === category);
  const isSpecificCategory = !!category;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="py-8">
        <div className="max-w-7xl mx-auto px-4">
          {/* Breadcrumb */}
          <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-6">
            <Link to="/" className="hover:text-[#FED141]">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <Link to="/categorias" className="hover:text-[#FED141]">Categorias</Link>
            {isSpecificCategory && (
              <>
                <ChevronRight className="w-4 h-4" />
                <span className="text-black">{currentCategory?.name}</span>
              </>
            )}
          </nav>

          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-black mb-2">
              {isSpecificCategory ? currentCategory?.name : 'Todas as Categorias'}
            </h1>
            <p className="text-gray-600">
              {isSpecificCategory 
                ? `Explore fornecedores e produtos em ${currentCategory?.name}`
                : 'Explore todas as categorias de produtos industriais disponíveis'
              }
            </p>
          </div>

          {!isSpecificCategory ? (
            /* All Categories View */
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories.map((cat) => (
                <CategoryCard key={cat.slug} category={cat} />
              ))}
            </div>
          ) : (
            /* Specific Category View */
            <div className="space-y-8">
              {/* Category Stats */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="text-5xl">{currentCategory?.icon}</div>
                    <div>
                      <h2 className="text-2xl font-bold text-black">{currentCategory?.name}</h2>
                      <p className="text-gray-600">{currentCategory?.count} produtos disponíveis</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`p-2 rounded ${viewMode === 'grid' ? 'bg-[#FED141] text-black' : 'text-gray-400 hover:text-black'}`}
                    >
                      <Grid className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`p-2 rounded ${viewMode === 'list' ? 'bg-[#FED141] text-black' : 'text-gray-400 hover:text-black'}`}
                    >
                      <List className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Subcategories */}
              {subcategories[category as keyof typeof subcategories] && (
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-black mb-4">Subcategorias</h3>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {subcategories[category as keyof typeof subcategories].map((subcat) => (
                      <Link
                        key={subcat}
                        to={`/buscar?category=${category}&subcategory=${subcat}`}
                        className="p-3 border border-gray-200 rounded-lg hover:border-[#FED141] hover:shadow-sm transition-all"
                      >
                        <span className="text-sm font-medium">{subcat}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Suppliers */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-black mb-6">
                  Fornecedores em {currentCategory?.name}
                </h3>
                <div className={`grid ${viewMode === 'grid' ? 'md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'} gap-6`}>
                  {suppliers.map((supplier) => (
                    <SupplierCard key={supplier.id} supplier={supplier} />
                  ))}
                </div>
                <div className="text-center mt-6">
                  <Link 
                    to={`/fornecedores?category=${category}`}
                    className="bg-[#FED141] text-black px-6 py-3 rounded-lg font-semibold hover:bg-yellow-400 transition-colors"
                  >
                    Ver todos os fornecedores
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Categories;
