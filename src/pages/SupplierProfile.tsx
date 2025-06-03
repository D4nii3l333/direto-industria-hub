
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, MapPin, Package, Shield, MessageCircle, Phone, Mail, Globe, Clock, Award, ChevronRight } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const SupplierProfile = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('products');

  // Mock supplier data - in a real app, this would be fetched based on the ID
  const supplier = {
    id: 1,
    name: "MetalTech Indústria",
    logo: "https://via.placeholder.com/150",
    location: "São Paulo, SP",
    rating: 4.8,
    totalReviews: 156,
    products: 45,
    verified: true,
    description: "A MetalTech é uma empresa líder no fornecimento de equipamentos industriais de alta qualidade. Com mais de 20 anos de experiência, oferecemos soluções completas para indústrias de diversos segmentos.",
    website: "www.metaltech.com.br",
    phone: "(11) 1234-5678",
    email: "contato@metaltech.com.br",
    established: "2003",
    employees: "50-100",
    certifications: ["ISO 9001", "ISO 14001", "OHSAS 18001"],
    specialties: ["Equipamentos de Solda", "Ferramentas Pneumáticas", "Sistemas de Automação"],
    minOrder: "R$ 1.000",
    paymentTerms: "30/60 dias",
    deliveryTime: "5-10 dias úteis"
  };

  const products = [
    {
      id: 1,
      name: "Soldadora Industrial MIG 250A",
      price: "R$ 2.800,00",
      minQuantity: 1,
      image: "https://via.placeholder.com/200",
      category: "Equipamentos de Solda"
    },
    {
      id: 2,
      name: "Compressor de Ar 20HP",
      price: "R$ 5.500,00",
      minQuantity: 1,
      image: "https://via.placeholder.com/200",
      category: "Compressores"
    },
    {
      id: 3,
      name: "Parafusadeira Pneumática",
      price: "R$ 450,00",
      minQuantity: 5,
      image: "https://via.placeholder.com/200",
      category: "Ferramentas Pneumáticas"
    }
  ];

  const reviews = [
    {
      id: 1,
      author: "João Silva",
      company: "Indústria ABC",
      rating: 5,
      date: "15/03/2024",
      comment: "Excelente qualidade dos produtos e atendimento muito profissional. Entrega dentro do prazo acordado."
    },
    {
      id: 2,
      author: "Maria Santos",
      company: "Fábrica XYZ",
      rating: 4,
      date: "08/03/2024",
      comment: "Bons produtos, preços competitivos. Recomendo para outras empresas do setor."
    }
  ];

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star 
        key={i} 
        className={`w-4 h-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
      />
    ));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="py-8">
        <div className="max-w-7xl mx-auto px-4">
          {/* Breadcrumb */}
          <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-6">
            <Link to="/" className="hover:text-[#FED141]">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <Link to="/fornecedores" className="hover:text-[#FED141]">Fornecedores</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-black">{supplier.name}</span>
          </nav>

          {/* Supplier Header */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-8">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Left Column */}
              <div className="lg:w-2/3">
                <div className="flex items-start gap-6 mb-6">
                  <div className="w-24 h-24 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
                    <img src={supplier.logo} alt={supplier.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center mb-2">
                      <h1 className="text-3xl font-bold text-black mr-3">{supplier.name}</h1>
                      {supplier.verified && (
                        <Shield className="w-6 h-6 text-green-500" title="Fornecedor Verificado" />
                      )}
                    </div>
                    <div className="flex items-center text-gray-600 mb-3">
                      <MapPin className="w-4 h-4 mr-1" />
                      <span>{supplier.location}</span>
                    </div>
                    <div className="flex items-center space-x-6 text-sm">
                      <div className="flex items-center">
                        <div className="flex mr-2">
                          {renderStars(Math.floor(supplier.rating))}
                        </div>
                        <span className="font-medium">{supplier.rating}</span>
                        <span className="text-gray-500 ml-1">({supplier.totalReviews} avaliações)</span>
                      </div>
                      <div className="flex items-center">
                        <Package className="w-4 h-4 mr-1" />
                        <span>{supplier.products} produtos</span>
                      </div>
                    </div>
                  </div>
                </div>
                <p className="text-gray-700 leading-relaxed">{supplier.description}</p>
              </div>

              {/* Right Column - Contact */}
              <div className="lg:w-1/3">
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold mb-4">Contato</h3>
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center">
                      <Phone className="w-4 h-4 text-gray-400 mr-3" />
                      <span className="text-sm">{supplier.phone}</span>
                    </div>
                    <div className="flex items-center">
                      <Mail className="w-4 h-4 text-gray-400 mr-3" />
                      <span className="text-sm">{supplier.email}</span>
                    </div>
                    <div className="flex items-center">
                      <Globe className="w-4 h-4 text-gray-400 mr-3" />
                      <span className="text-sm">{supplier.website}</span>
                    </div>
                  </div>
                  <button className="w-full bg-[#FED141] text-black py-3 px-4 rounded-lg font-semibold hover:bg-yellow-400 transition-colors mb-3">
                    <MessageCircle className="w-5 h-5 inline mr-2" />
                    Iniciar Conversa
                  </button>
                  <button className="w-full bg-white text-black border border-gray-300 py-3 px-4 rounded-lg font-semibold hover:border-gray-400 transition-colors">
                    Solicitar Orçamento
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Company Info */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-8">
            <h2 className="text-2xl font-bold text-black mb-6">Informações da Empresa</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div>
                <div className="flex items-center mb-2">
                  <Clock className="w-5 h-5 text-gray-400 mr-2" />
                  <span className="font-semibold">Fundada</span>
                </div>
                <p className="text-gray-600">{supplier.established}</p>
              </div>
              <div>
                <div className="flex items-center mb-2">
                  <Package className="w-5 h-5 text-gray-400 mr-2" />
                  <span className="font-semibold">Pedido Mínimo</span>
                </div>
                <p className="text-gray-600">{supplier.minOrder}</p>
              </div>
              <div>
                <div className="flex items-center mb-2">
                  <Award className="w-5 h-5 text-gray-400 mr-2" />
                  <span className="font-semibold">Funcionários</span>
                </div>
                <p className="text-gray-600">{supplier.employees}</p>
              </div>
              <div>
                <div className="flex items-center mb-2">
                  <Clock className="w-5 h-5 text-gray-400 mr-2" />
                  <span className="font-semibold">Prazo de Entrega</span>
                </div>
                <p className="text-gray-600">{supplier.deliveryTime}</p>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="font-semibold mb-3">Certificações</h3>
              <div className="flex flex-wrap gap-2">
                {supplier.certifications.map((cert) => (
                  <span key={cert} className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                    {cert}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-6">
              <h3 className="font-semibold mb-3">Especialidades</h3>
              <div className="flex flex-wrap gap-2">
                {supplier.specialties.map((specialty) => (
                  <span key={specialty} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                    {specialty}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="border-b border-gray-200">
              <nav className="flex">
                <button
                  onClick={() => setActiveTab('products')}
                  className={`py-4 px-6 font-medium ${
                    activeTab === 'products' 
                      ? 'border-b-2 border-[#FED141] text-[#FED141]' 
                      : 'text-gray-600 hover:text-black'
                  }`}
                >
                  Produtos ({products.length})
                </button>
                <button
                  onClick={() => setActiveTab('reviews')}
                  className={`py-4 px-6 font-medium ${
                    activeTab === 'reviews' 
                      ? 'border-b-2 border-[#FED141] text-[#FED141]' 
                      : 'text-gray-600 hover:text-black'
                  }`}
                >
                  Avaliações ({reviews.length})
                </button>
              </nav>
            </div>

            <div className="p-8">
              {activeTab === 'products' && (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {products.map((product) => (
                    <div key={product.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-shadow">
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-full h-48 object-cover rounded-lg mb-4"
                      />
                      <h3 className="font-semibold text-black mb-2">{product.name}</h3>
                      <p className="text-sm text-gray-600 mb-2">{product.category}</p>
                      <div className="flex justify-between items-center mb-3">
                        <span className="text-lg font-bold text-[#FED141]">{product.price}</span>
                        <span className="text-sm text-gray-600">Mín: {product.minQuantity}</span>
                      </div>
                      <button className="w-full bg-[#FED141] text-black py-2 px-4 rounded-lg font-medium hover:bg-yellow-400 transition-colors">
                        Solicitar Orçamento
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'reviews' && (
                <div className="space-y-6">
                  {reviews.map((review) => (
                    <div key={review.id} className="border-b border-gray-200 pb-6 last:border-b-0">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <div className="flex items-center mb-1">
                            <div className="flex mr-2">
                              {renderStars(review.rating)}
                            </div>
                            <span className="font-semibold">{review.author}</span>
                            <span className="text-gray-500 ml-2">• {review.company}</span>
                          </div>
                          <span className="text-sm text-gray-500">{review.date}</span>
                        </div>
                      </div>
                      <p className="text-gray-700">{review.comment}</p>
                    </div>
                  ))}
                  
                  <div className="text-center">
                    <button className="bg-gray-100 text-black px-6 py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors">
                      Ver mais avaliações
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default SupplierProfile;
