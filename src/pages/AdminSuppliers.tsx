import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, Edit, Trash2, MapPin, Star } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface Supplier {
  id: number;
  name: string;
  location: string;
  rating: number;
  specialties: string[];
  image: string;
  verified: boolean;
  description?: string;
  phone?: string;
  email?: string;
}

const AdminSuppliers = () => {
  const navigate = useNavigate();
  const [suppliers, setSuppliers] = useState<Supplier[]>([
    {
      id: 1,
      name: "MetalTech Ind.",
      location: "São Paulo, SP",
      rating: 4.8,
      specialties: ["Aço Inoxidável", "Metalurgia", "Soldas Especiais"],
      image: "https://via.placeholder.com/150",
      verified: true,
      description: "Especializada em produtos metalúrgicos de alta qualidade",
      phone: "(11) 99999-9999",
      email: "contato@metaltech.com.br"
    },
    {
      id: 2,
      name: "PlastiCorp",
      location: "Rio de Janeiro, RJ",
      rating: 4.6,
      specialties: ["Plásticos Industriais", "Moldagem", "Extrusão"],
      image: "https://via.placeholder.com/150",
      verified: true,
      description: "Líder em soluções de plásticos para a indústria",
      phone: "(21) 88888-7777",
      email: "vendas@plasticorp.com.br"
    },
    {
      id: 3,
      name: "FerramentasBR",
      location: "Belo Horizonte, MG",
      rating: 4.5,
      specialties: ["Ferramentas Elétricas", "Manuais", "Medição"],
      image: "https://via.placeholder.com/150",
      verified: false,
      description: "Ampla variedade de ferramentas para profissionais e hobbistas",
      phone: "(31) 77777-6666",
      email: "info@ferramentasbr.com.br"
    }
  ]);

  const [showForm, setShowForm] = useState(false);
  const [editingSupplier, setEditingSupplier] = useState<Supplier | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    rating: 5,
    specialties: '',
    image: '',
    verified: true,
    description: '',
    phone: '',
    email: ''
  });

  useEffect(() => {
    const isAdmin = localStorage.getItem('isAdmin');
    if (!isAdmin) {
      navigate('/admin/login');
    }
  }, [navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newSupplier: Supplier = {
      id: editingSupplier ? editingSupplier.id : Date.now(),
      name: formData.name,
      location: formData.location,
      rating: formData.rating,
      specialties: formData.specialties.split(',').map(s => s.trim()),
      image: formData.image || 'https://via.placeholder.com/150',
      verified: formData.verified,
      description: formData.description,
      phone: formData.phone,
      email: formData.email
    };

    if (editingSupplier) {
      setSuppliers(suppliers.map(s => s.id === editingSupplier.id ? newSupplier : s));
      toast({ title: "Fornecedor atualizado com sucesso!" });
    } else {
      setSuppliers([...suppliers, newSupplier]);
      toast({ title: "Fornecedor adicionado com sucesso!" });
    }

    resetForm();
  };

  const handleEdit = (supplier: Supplier) => {
    setEditingSupplier(supplier);
    setFormData({
      name: supplier.name,
      location: supplier.location,
      rating: supplier.rating,
      specialties: supplier.specialties.join(', '),
      image: supplier.image,
      verified: supplier.verified,
      description: supplier.description || '',
      phone: supplier.phone || '',
      email: supplier.email || ''
    });
    setShowForm(true);
  };

  const handleDelete = (id: number) => {
    if (confirm('Tem certeza que deseja excluir este fornecedor?')) {
      setSuppliers(suppliers.filter(s => s.id !== id));
      toast({ title: "Fornecedor excluído com sucesso!" });
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      location: '',
      rating: 5,
      specialties: '',
      image: '',
      verified: true,
      description: '',
      phone: '',
      email: ''
    });
    setEditingSupplier(null);
    setShowForm(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center space-x-4">
            <Link to="/admin/dashboard" className="text-gray-600 hover:text-gray-900">
              <ArrowLeft className="w-6 h-6" />
            </Link>
            <h1 className="text-xl font-semibold text-gray-900">Gerenciar Fornecedores</h1>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Fornecedores ({suppliers.length})</h2>
          <button
            onClick={() => setShowForm(true)}
            className="bg-[#FED141] text-black px-4 py-2 rounded-lg font-medium hover:bg-yellow-400 transition-colors flex items-center space-x-2"
          >
            <Plus className="w-5 h-5" />
            <span>Adicionar Fornecedor</span>
          </button>
        </div>

        {showForm && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
            <h3 className="text-lg font-semibold mb-4">
              {editingSupplier ? 'Editar Fornecedor' : 'Adicionar Novo Fornecedor'}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nome *</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#FED141]"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Localização *</label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({...formData, location: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#FED141]"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#FED141]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Telefone</label>
                  <input
                    type="text"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#FED141]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Avaliação (1-5)</label>
                  <input
                    type="number"
                    min="1"
                    max="5"
                    step="0.1"
                    value={formData.rating}
                    onChange={(e) => setFormData({...formData, rating: parseFloat(e.target.value)})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#FED141]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">URL da Imagem</label>
                  <input
                    type="url"
                    value={formData.image}
                    onChange={(e) => setFormData({...formData, image: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#FED141]"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Especialidades (separadas por vírgula)</label>
                <input
                  type="text"
                  value={formData.specialties}
                  onChange={(e) => setFormData({...formData, specialties: e.target.value})}
                  placeholder="Ex: Aço Inoxidável, Metalurgia, Soldas"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#FED141]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Descrição</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#FED141]"
                />
              </div>
              <div>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={formData.verified}
                    onChange={(e) => setFormData({...formData, verified: e.target.checked})}
                    className="rounded border-gray-300 focus:border-[#FED141]"
                  />
                  <span className="text-sm text-gray-700">Fornecedor verificado</span>
                </label>
              </div>
              <div className="flex space-x-3">
                <button
                  type="submit"
                  className="bg-[#FED141] text-black px-4 py-2 rounded-lg font-medium hover:bg-yellow-400 transition-colors"
                >
                  {editingSupplier ? 'Atualizar' : 'Adicionar'}
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-300 transition-colors"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="grid gap-4">
          {suppliers.map((supplier) => (
            <div key={supplier.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4">
                  <img 
                    src={supplier.image} 
                    alt={supplier.name}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className="text-lg font-semibold text-black">{supplier.name}</h3>
                      {supplier.verified && (
                        <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                          Verificado
                        </span>
                      )}
                    </div>
                    <div className="flex items-center text-gray-600 text-sm mb-2">
                      <MapPin className="w-4 h-4 mr-1" />
                      {supplier.location}
                    </div>
                    <div className="flex items-center mb-2">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`w-4 h-4 ${i < supplier.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-600 ml-2">({supplier.rating})</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {supplier.specialties.map((specialty, index) => (
                        <span key={index} className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEdit(supplier)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(supplier.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default AdminSuppliers;
