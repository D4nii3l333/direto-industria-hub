import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, Edit, Trash2 } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { getCategories, setCategories, Category, Product, getSuppliers, Supplier } from '@/data/mockData';

const AdminCategories = () => {
  const navigate = useNavigate();
  const [categories, setCategoriesState] = useState<Category[]>([]);
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [showCategoryForm, setShowCategoryForm] = useState(false);
  const [showProductForm, setShowProductForm] = useState(false);
  const [showSupplierForm, setShowSupplierForm] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const [categoryForm, setCategoryForm] = useState({
    name: '',
    icon: '',
    slug: ''
  });

  const [productForm, setProductForm] = useState({
    name: '',
    supplierId: 0,
    description: '',
    minQuantity: 1,
    price: 0,
    categoryId: 0,
    image: '',
    unit: 'unidade',
    brand: '',
    model: '',
    weight: 0,
    dimensions: '',
    specifications: ''
  });

  const [supplierForm, setSupplierForm] = useState({
    name: '',
    location: '',
    specialties: '',
    verified: true
  });

  useEffect(() => {
    const isAdmin = localStorage.getItem('isAdmin');
    if (!isAdmin) {
      navigate('/admin/login');
      return;
    }
    
    // Carrega categorias e fornecedores do localStorage
    const loadedCategories = getCategories();
    const loadedSuppliers = getSuppliers();
    setCategoriesState(loadedCategories);
    setSuppliers(loadedSuppliers);
  }, [navigate]);

  const updateCategories = (newCategories: Category[]) => {
    setCategoriesState(newCategories);
    setCategories(newCategories);
  };

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
      const updatedCategories = categories.map(c => c.id === editingCategory.id ? newCategory : c);
      updateCategories(updatedCategories);
      toast({ title: "Categoria atualizada com sucesso!" });
    } else {
      const updatedCategories = [...categories, newCategory];
      updateCategories(updatedCategories);
      toast({ title: "Categoria adicionada com sucesso!" });
    }

    resetCategoryForm();
  };

  const handleProductSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newProduct: Product = {
      id: editingProduct ? editingProduct.id : Date.now(),
      name: productForm.name,
      supplierId: productForm.supplierId,
      description: productForm.description,
      minQuantity: productForm.minQuantity,
      price: productForm.price,
      categoryId: productForm.categoryId,
      image: productForm.image || 'https://via.placeholder.com/300x200',
      unit: productForm.unit,
      brand: productForm.brand,
      model: productForm.model,
      weight: productForm.weight || 0,
      dimensions: productForm.dimensions,
      specifications: productForm.specifications ? productForm.specifications.split(',').map(s => s.trim()).filter(s => s) : []
    };

    const updatedCategories = categories.map(category => {
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
    });

    updateCategories(updatedCategories);

    toast({ 
      title: editingProduct ? "Produto atualizado com sucesso!" : "Produto adicionado com sucesso!" 
    });

    resetProductForm();
  };

  const handleDeleteCategory = (id: number) => {
    if (confirm('Tem certeza que deseja excluir esta categoria e todos os seus produtos?')) {
      const updatedCategories = categories.filter(c => c.id !== id);
      updateCategories(updatedCategories);
      toast({ title: "Categoria excluída com sucesso!" });
    }
  };

  const handleDeleteProduct = (categoryId: number, productId: number) => {
    if (confirm('Tem certeza que deseja excluir este produto?')) {
      // Remove o produto de TODAS as categorias para evitar duplicatas
      const updatedCategories = categories.map(category => {
        const updatedProducts = category.products.filter(p => p.id !== productId);
        return {
          ...category,
          products: updatedProducts,
          count: updatedProducts.length
        };
      });
      updateCategories(updatedCategories);
      toast({ title: "Produto excluído com sucesso!" });
    }
  };

  const resetCategoryForm = () => {
    setCategoryForm({ name: '', icon: '', slug: '' });
    setEditingCategory(null);
    setShowCategoryForm(false);
  };

  const resetProductForm = () => {
    setProductForm({ 
      name: '', 
      supplierId: 0, 
      description: '', 
      minQuantity: 1, 
      price: 0, 
      categoryId: 0,
      image: '',
      unit: 'unidade',
      brand: '',
      model: '',
      weight: 0,
      dimensions: '',
      specifications: ''
    });
    setEditingProduct(null);
    setShowProductForm(false);
  };

  const handleSupplierSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newSupplier: Supplier = {
      id: Date.now(),
      name: supplierForm.name,
      location: supplierForm.location,
      rating: 5,
      specialties: supplierForm.specialties.split(',').map(s => s.trim()),
      image: 'https://via.placeholder.com/150',
      verified: supplierForm.verified,
      description: '',
      phone: '',
      email: ''
    };

    const updatedSuppliers = [...suppliers, newSupplier];
    setSuppliers(updatedSuppliers);
    
    // Também atualiza no localStorage
    const { setSuppliers: setStoredSuppliers } = require('@/data/mockData');
    setStoredSuppliers(updatedSuppliers);

    // Seleciona automaticamente o novo fornecedor no formulário de produto
    setProductForm({...productForm, supplierId: newSupplier.id});
    
    toast({ title: "Fornecedor adicionado com sucesso!" });
    resetSupplierForm();
  };

  const resetSupplierForm = () => {
    setSupplierForm({ name: '', location: '', specialties: '', verified: true });
    setShowSupplierForm(false);
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
                  <label className="block text-sm font-medium text-gray-700 mb-1">Marca</label>
                  <input
                    type="text"
                    value={productForm.brand}
                    onChange={(e) => setProductForm({...productForm, brand: e.target.value})}
                    placeholder="Ex: MetalTech"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#FED141]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Modelo</label>
                  <input
                    type="text"
                    value={productForm.model}
                    onChange={(e) => setProductForm({...productForm, model: e.target.value})}
                    placeholder="Ex: MT-C500"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#FED141]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Fornecedor *</label>
                  <div className="flex space-x-2">
                    <select
                      value={productForm.supplierId}
                      onChange={(e) => setProductForm({...productForm, supplierId: parseInt(e.target.value)})}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#FED141]"
                      required
                    >
                      <option value={0}>Selecione um fornecedor</option>
                      {suppliers.map(supplier => (
                        <option key={supplier.id} value={supplier.id}>{supplier.name}</option>
                      ))}
                    </select>
                    <button
                      type="button"
                      onClick={() => setShowSupplierForm(true)}
                      className="bg-blue-500 text-white px-3 py-2 rounded-lg font-medium hover:bg-blue-600 transition-colors whitespace-nowrap"
                    >
                      + Novo
                    </button>
                  </div>
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
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Unidade</label>
                  <select
                    value={productForm.unit}
                    onChange={(e) => setProductForm({...productForm, unit: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#FED141]"
                  >
                    <option value="unidade">Unidade</option>
                    <option value="kg">Quilograma (kg)</option>
                    <option value="litro">Litro</option>
                    <option value="metro">Metro</option>
                    <option value="m²">Metro quadrado (m²)</option>
                    <option value="m³">Metro cúbico (m³)</option>
                    <option value="tonelada">Tonelada</option>
                    <option value="pacote">Pacote</option>
                    <option value="caixa">Caixa</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Peso (kg)</label>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={productForm.weight}
                    onChange={(e) => setProductForm({...productForm, weight: parseFloat(e.target.value)})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#FED141]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Dimensões</label>
                  <input
                    type="text"
                    value={productForm.dimensions}
                    onChange={(e) => setProductForm({...productForm, dimensions: e.target.value})}
                    placeholder="Ex: 120x80x100 cm"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#FED141]"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">URL da Imagem</label>
                <input
                  type="url"
                  value={productForm.image}
                  onChange={(e) => setProductForm({...productForm, image: e.target.value})}
                  placeholder="https://exemplo.com/imagem.jpg"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#FED141]"
                />
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
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Especificações Técnicas (separadas por vírgula)</label>
                <textarea
                  value={productForm.specifications}
                  onChange={(e) => setProductForm({...productForm, specifications: e.target.value})}
                  rows={2}
                  placeholder="Ex: Pressão máxima: 8 bar, Capacidade: 500L/min, Motor: 5HP"
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

        {/* Supplier Form */}
        {showSupplierForm && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
            <h3 className="text-lg font-semibold mb-4">Adicionar Novo Fornecedor</h3>
            <form onSubmit={handleSupplierSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nome *</label>
                  <input
                    type="text"
                    value={supplierForm.name}
                    onChange={(e) => setSupplierForm({...supplierForm, name: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#FED141]"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Localização *</label>
                  <input
                    type="text"
                    value={supplierForm.location}
                    onChange={(e) => setSupplierForm({...supplierForm, location: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#FED141]"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Especialidades (separadas por vírgula)</label>
                <input
                  type="text"
                  value={supplierForm.specialties}
                  onChange={(e) => setSupplierForm({...supplierForm, specialties: e.target.value})}
                  placeholder="Ex: Aço Inoxidável, Metalurgia, Soldas"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#FED141]"
                />
              </div>
              <div>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={supplierForm.verified}
                    onChange={(e) => setSupplierForm({...supplierForm, verified: e.target.checked})}
                    className="rounded border-gray-300 focus:border-[#FED141]"
                  />
                  <span className="text-sm text-gray-700">Fornecedor verificado</span>
                </label>
              </div>
              <div className="flex space-x-3">
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-600 transition-colors"
                >
                  Adicionar Fornecedor
                </button>
                <button
                  type="button"
                  onClick={resetSupplierForm}
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
                        <div className="flex items-start space-x-4">
                          {product.image && (
                            <img 
                              src={product.image} 
                              alt={product.name}
                              className="w-12 h-12 rounded object-cover flex-shrink-0"
                            />
                          )}
                          <div className="flex-1">
                            <h5 className="font-medium text-gray-900">{product.name}</h5>
                            <p className="text-sm text-gray-600">
                              {suppliers.find(s => s.id === product.supplierId)?.name || 'Fornecedor não encontrado'}
                            </p>
                            <div className="text-xs text-gray-500 mt-1 space-y-1">
                              <div>R$ {product.price.toLocaleString('pt-BR')} - Min: {product.minQuantity} {product.unit}</div>
                              {product.brand && <div>Marca: {product.brand}</div>}
                              {product.model && <div>Modelo: {product.model}</div>}
                              {product.weight && <div>Peso: {product.weight}kg</div>}
                              {product.dimensions && <div>Dimensões: {product.dimensions}</div>}
                              {product.specifications && product.specifications.length > 0 && (
                                <div>Specs: {product.specifications.slice(0, 2).join(', ')}{product.specifications.length > 2 ? '...' : ''}</div>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => {
                              setEditingProduct(product);
                              setProductForm({
                                name: product.name,
                                supplierId: product.supplierId,
                                description: product.description,
                                minQuantity: product.minQuantity,
                                price: product.price,
                                categoryId: product.categoryId,
                                image: product.image || '',
                                unit: product.unit || 'unidade',
                                brand: product.brand || '',
                                model: product.model || '',
                                weight: product.weight || 0,
                                dimensions: product.dimensions || '',
                                specifications: product.specifications?.join(', ') || ''
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
