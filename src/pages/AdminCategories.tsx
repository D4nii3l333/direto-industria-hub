import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, Edit, Trash2 } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface Category {
  id: number;
  name: string;
  count: number;
  icon: string;
  slug: string;
  products: Product[];
}

interface Product {
  id: number;
  name: string;
  company: string;
  description: string;
  minQuantity: number;
  price: number;
  categoryId: number;
}

const AdminCategories = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState<Category[]>([
    { 
      id: 1, 
      name: "Equipamentos Industriais", 
      count: 437, 
      icon: "🏭", 
      slug: "equipamentos-industriais",
      products: [
        {
          id: 1,
          name: "Compressor de Ar Industrial",
          company: "MetalTech Ind.",
          description: "Compressor de alta capacidade para uso industrial",
          minQuantity: 1,
          price: 15000,
          categoryId: 1
        }
      ]
    },
    { 
      id: 2, 
      name: "Matérias-Primas", 
      count: 294, 
      icon: "⚡", 
      slug: "materias-primas",
      products: []
    },
    { 
      id: 3, 
      name: "Ferramentas", 
      count: 183, 
      icon: "🔧", 
      slug: "ferramentas",
      products: []
    },
    { 
      id: 4, 
      name: "Componentes Eletrônicos", 
      count: 256, 
      icon: "💻", 
      slug: "componentes-eletronicos",
      products: []
    },
    { 
      id: 5, 
      name: "Embalagens", 
      count: 165, 
      icon: "📦", 
      slug: "embalagens",
      products: []
    },
    { 
      id: 6, 
      name: "Segurança Industrial", 
      count: 92, 
      icon: "🛡️", 
      slug: "seguranca-industrial",
      products: []
    }
  ]);

  const [showCategoryForm, setShowCategoryForm] = useState(false);
  const [showProductForm, setShowProductForm] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

  const [categoryForm, setCategoryForm] = useState({
    name: '',
    icon: '',
    slug: ''
  });

  const [productForm, setProductForm] = useState({
    name: '',
    company: '',
    description: '',
    minQuantity: 1,
    price: 0,
    categoryId: 0
  });

  useEffect(() => {
    const isAdmin = localStorage.getItem('isAdmin');
    if (!isAdmin) {
      navigate('/admin/login');
    }
  }, [navigate]);

  const handleCategorySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newCategory: Category = {
      id: editingCategory ? editingCategory.id : Date.now(),
      name: categoryForm.name,
      icon: categoryForm.icon,
      slug: categoryForm.slug || categoryForm.name.toLowerCase().replace(/\s+/g, '-'),
      count: editingCategory ? editingCategory.count : 0,
      products: editingCategory ? editingCategory.products : []
    };

    if (editingCategory) {
      setCategories(categories.map(c => c.id === editingCategory.id ? newCategory : c));
      toast({ title: "Categoria atualizada com sucesso!" });
    } else {
      setCategories([...categories, newCategory]);
      toast({ title: "Categoria adicionada com sucesso!" });
    }

    resetCategoryForm();
  };

  const handleProductSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newProduct: Product = {
      id: editingProduct ? editingProduct.id : Date.now(),
      name: productForm.name,
      company: productForm.company,
      description: productForm.description,
      minQuantity: productForm.minQuantity,
      price: productForm.price,
      categoryId: productForm.categoryId
    };

    setCategories(categories.map(category => {
      if (category.id === productForm.categoryId) {
        let updatedProducts;
        if (editingProduct) {
          updatedProducts = category.products.map(p => p.id === editingProduct.id ? newProduct : p);
        } else {
          updatedProducts = [...category.products, newProduct];
        }
        return {
          ...category,
          products: updatedProducts,
          count: updatedProducts.length
        };
      }
      return category;
    }));

    toast({ 
      title: editingProduct ? "Produto atualizado com sucesso!" : "Produto adicionado com sucesso!" 
    });

    resetProductForm();
  };

  const handleDeleteCategory = (id: number) => {
    if (confirm('Tem certeza que deseja excluir esta categoria e todos os seus produtos?')) {
      setCategories(categories.filter(c => c.id !== id));
      toast({ title: "Categoria excluída com sucesso!" });
    }
  };

  const handleDeleteProduct = (categoryId: number, productId: number) => {
    if (confirm('Tem certeza que deseja excluir este produto?')) {
      setCategories(categories.map(category => {
        if (category.id === categoryId) {
          const updatedProducts = category.products.filter(p => p.id !== productId);
          return {
            ...category,
            products: updatedProducts,
            count: updatedProducts.length
          };
        }
        return category;
      }));
      toast({ title: "Produto excluído com sucesso!" });
    }
  };

  const resetCategoryForm = () => {
    setCategoryForm({ name: '', icon: '', slug: '' });
    setEditingCategory(null);
    setShowCategoryForm(false);
  };

  const resetProductForm = () => {
    setProductForm({ name: '', company: '', description: '', minQuantity: 1, price: 0, categoryId: 0 });
    setEditingProduct(null);
    setShowProductForm(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center space-x-4">
            <Link to="/admin/dashboard" className="text-gray-600 hover:text-gray-900">
              <ArrowLeft className="w-6 h-6" />
            </Link>
            <h1 className="text-xl font-semibold text-gray-900">Gerenciar Categorias</h1>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Categorias ({categories.length})</h2>
          <div className="flex space-x-3">
            <button
              onClick={() => setShowProductForm(true)}
              className="bg-green-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-600 transition-colors flex items-center space-x-2"
            >
              <Plus className="w-5 h-5" />
              <span>Adicionar Produto</span>
            </button>
            <button
              onClick={() => setShowCategoryForm(true)}
              className="bg-[#FED141] text-black px-4 py-2 rounded-lg font-medium hover:bg-yellow-400 transition-colors flex items-center space-x-2"
            >
              <Plus className="w-5 h-5" />
              <span>Adicionar Categoria</span>
            </button>
          </div>
        </div>

        {/* Category Form */}
        {showCategoryForm && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
            <h3 className="text-lg font-semibold mb-4">
              {editingCategory ? 'Editar Categoria' : 'Adicionar Nova Categoria'}
            </h3>
            <form onSubmit={handleCategorySubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nome *</label>
                  <input
                    type="text"
                    value={categoryForm.name}
                    onChange={(e) => setCategoryForm({...categoryForm, name: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#FED141]"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Ícone (emoji)</label>
                  <input
                    type="text"
                    value={categoryForm.icon}
                    onChange={(e) => setCategoryForm({...categoryForm, icon: e.target.value})}
                    placeholder="🏭"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#FED141]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Slug</label>
                  <input
                    type="text"
                    value={categoryForm.slug}
                    onChange={(e) => setCategoryForm({...categoryForm, slug: e.target.value})}
                    placeholder="equipamentos-industriais"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#FED141]"
                  />
                </div>
              </div>
              <div className="flex space-x-3">
                <button
                  type="submit"
                  className="bg-[#FED141] text-black px-4 py-2 rounded-lg font-medium hover:bg-yellow-400 transition-colors"
                >
                  {editingCategory ? 'Atualizar' : 'Adicionar'}
                </button>
                <button
                  type="button"
                  onClick={resetCategoryForm}
                  className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-300 transition-colors"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Product Form */}
        {showProductForm && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
            <h3 className="text-lg font-semibold mb-4">
              {editingProduct ? 'Editar Produto' : 'Adicionar Novo Produto'}
            </h3>
            <form onSubmit={handleProductSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nome do Produto *</label>
                  <input
                    type="text"
                    value={productForm.name}
                    onChange={(e) => setProductForm({...productForm, name: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#FED141]"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Empresa *</label>
                  <input
                    type="text"
                    value={productForm.company}
                    onChange={(e) => setProductForm({...productForm, company: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#FED141]"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Categoria *</label>
                  <select
                    value={productForm.categoryId}
                    onChange={(e) => setProductForm({...productForm, categoryId: parseInt(e.target.value)})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#FED141]"
                    required
                  >
                    <option value={0}>Selecione uma categoria</option>
                    {categories.map(category => (
                      <option key={category.id} value={category.id}>{category.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Preço (R$)</label>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={productForm.price}
                    onChange={(e) => setProductForm({...productForm, price: parseFloat(e.target.value)})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#FED141]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Quantidade Mínima</label>
                  <input
                    type="number"
                    min="1"
                    value={productForm.minQuantity}
                    onChange={(e) => setProductForm({...productForm, minQuantity: parseInt(e.target.value)})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#FED141]"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Descrição</label>
                <textarea
                  value={productForm.description}
                  onChange={(e) => setProductForm({...productForm, description: e.target.value})}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#FED141]"
                />
              </div>
              <div className="flex space-x-3">
                <button
                  type="submit"
                  className="bg-green-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-600 transition-colors"
                >
                  {editingProduct ? 'Atualizar' : 'Adicionar'}
                </button>
                <button
                  type="button"
                  onClick={resetProductForm}
                  className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-300 transition-colors"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Categories List */}
        <div className="grid gap-6">
          {categories.map((category) => (
            <div key={category.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{category.icon}</span>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{category.name}</h3>
                    <p className="text-sm text-gray-600">{category.count} produtos</p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => {
                      setEditingCategory(category);
                      setCategoryForm({
                        name: category.name,
                        icon: category.icon,
                        slug: category.slug
                      });
                      setShowCategoryForm(true);
                    }}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteCategory(category.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Products in Category */}
              {category.products.length > 0 && (
                <div className="border-t pt-4">
                  <h4 className="font-medium text-gray-900 mb-3">Produtos nesta categoria:</h4>
                  <div className="space-y-2">
                    {category.products.map((product) => (
                      <div key={product.id} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                        <div>
                          <h5 className="font-medium text-gray-900">{product.name}</h5>
                          <p className="text-sm text-gray-600">{product.company} - R$ {product.price.toLocaleString('pt-BR')} - Min: {product.minQuantity}</p>
                        </div>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => {
                              setEditingProduct(product);
                              setProductForm({
                                name: product.name,
                                company: product.company,
                                description: product.description,
                                minQuantity: product.minQuantity,
                                price: product.price,
                                categoryId: product.categoryId
                              });
                              setShowProductForm(true);
                            }}
                            className="p-1 text-blue-600 hover:bg-blue-50 rounded"
                          >
                            <Edit className="w-3 h-3" />
                          </button>
                          <button
                            onClick={() => handleDeleteProduct(category.id, product.id)}
                            className="p-1 text-red-600 hover:bg-red-50 rounded"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default AdminCategories;
