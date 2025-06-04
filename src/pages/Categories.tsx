import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CategoryCard from '@/components/CategoryCard';
import { getCategories, initializeData } from '@/data/mockData';

const Categories = () => {
  const { category } = useParams();
  const [categories, setCategories] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<any>(null);

  useEffect(() => {
    // Inicializa os dados se necessário e carrega do localStorage
    initializeData();
    const loadedCategories = getCategories();
    setCategories(loadedCategories);

    if (category) {
      const found = loadedCategories.find(cat => cat.slug === category);
      setSelectedCategory(found);
    }
  }, [category]);

  if (selectedCategory) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        
        <main className="max-w-7xl mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4 flex items-center">
              <span className="text-4xl mr-3">{selectedCategory.icon}</span>
              {selectedCategory.name}
            </h1>
            <p className="text-gray-600">{selectedCategory.count} produtos disponíveis</p>
          </div>

          {selectedCategory.products && selectedCategory.products.length > 0 ? (
            <div className="grid gap-6">
              {selectedCategory.products.map((product: any) => (
                <div key={product.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">{product.name}</h3>
                      <p className="text-gray-600 mb-2">{product.company}</p>
                      <p className="text-gray-500 mb-4">{product.description}</p>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <span>Quantidade mínima: {product.minQuantity}</span>
                        {product.price > 0 && (
                          <span>Preço: R$ {product.price.toLocaleString('pt-BR')}</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhum produto encontrado</h3>
              <p className="text-gray-600">Esta categoria ainda não possui produtos cadastrados.</p>
            </div>
          )}
        </main>

        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Categorias</h1>
          <p className="text-gray-600">Explore nossas categorias de produtos industriais</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Categories;
