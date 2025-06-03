import React from 'react';
import { Link } from 'react-router-dom';
import { Search, Shield, Users, TrendingUp, Star, MessageCircle } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SearchBar from '../components/SearchBar';
import CategoryCard from '../components/CategoryCard';
import SupplierCard from '../components/SupplierCard';
import TestimonialCard from '../components/TestimonialCard';

const Index = () => {
  const categories = [
    { name: "Equipamentos Industriais", count: 437, icon: "🏭" },
    { name: "Matérias-Primas", count: 294, icon: "⚡" },
    { name: "Ferramentas", count: 183, icon: "🔧" },
    { name: "Componentes Eletrônicos", count: 256, icon: "💻" },
    { name: "Embalagens", count: 165, icon: "📦" },
    { name: "Segurança Industrial", count: 92, icon: "🛡️" }
  ];

  const featuredSuppliers = [
    {
      id: 1,
      name: "MetalTech Ind.",
      location: "São Paulo, SP",
      rating: 4.8,
      specialties: ["Aço Inoxidável", "Metalurgia", "Soldas Especiais"],
      image: "https://via.placeholder.com/150",
      verified: true
    },
    {
      id: 2,
      name: "PlastiCorp",
      location: "Rio de Janeiro, RJ",
      rating: 4.6,
      specialties: ["Plásticos Industriais", "Moldagem", "Extrusão"],
      image: "https://via.placeholder.com/150",
      verified: true
    },
    {
      id: 3,
      name: "EletroMax",
      location: "Belo Horizonte, MG",
      rating: 4.9,
      specialties: ["Componentes Eletrônicos", "Automação", "Controle"],
      image: "https://via.placeholder.com/150",
      verified: true
    }
  ];

  const testimonials = [
    {
      text: "A Indústria Direta reduziu nossos custos em 30% no primeiro trimestre!",
      author: "João Silva",
      company: "MetalTork",
      role: "Comprador"
    },
    {
      text: "Conectamos com novos fornecedores em apenas 2 dias. Excelente suporte.",
      author: "Ana Moreira",
      company: "PlasTech",
      role: "Logística"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <main>
        <section className="py-20 px-4 bg-gradient-to-br from-gray-50 to-white">
          <div className="max-w-6xl mx-auto">
            <div className="max-w-4xl">
              <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6">
                <span className="text-[#FED141]">Conectando</span>
                <br />
                <span className="text-black">indústrias diretamente.</span>
              </h1>
              <p className="text-xl text-gray-700 mb-8 max-w-2xl">
                Compre direto da fábrica. Reduza custos, ganhe eficiência e elimine os intermediários no seu processo industrial.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  to="/cadastro" 
                  className="bg-[#FED141] text-black px-8 py-3 rounded-lg font-semibold hover:bg-yellow-400 transition-colors text-center"
                >
                  Começar agora
                </Link>
                <Link 
                  to="/como-funciona" 
                  className="bg-white text-black border-2 border-gray-300 px-8 py-3 rounded-lg font-semibold hover:border-gray-400 transition-colors text-center"
                >
                  Como funciona
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Search Bar */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4">
            <SearchBar />
          </div>
        </section>

        {/* Features */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-black mb-4">Por que escolher a IndústriaDireta?</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">Eliminamos intermediários, oferecemos transparência total e conectamos você diretamente com fornecedores verificados.</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-[#FED141] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8 text-black" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Busca Inteligente</h3>
                <p className="text-gray-600">Encontre fornecedores por região, produto, quantidade mínima e certificações.</p>
              </div>
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-[#FED141] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-black" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Fornecedores Verificados</h3>
                <p className="text-gray-600">Todos os fornecedores passam por verificação KYC e validação de documentos.</p>
              </div>
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-[#FED141] rounded-full flex items-center justify-center mx-auto mb-4">
                  <MessageCircle className="w-8 h-8 text-black" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Chat Direto</h3>
                <p className="text-gray-600">Comunique-se diretamente com fornecedores e mantenha histórico de conversas.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="py-16 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-black mb-4">Categorias Principais</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">Explore as principais categorias de produtos e serviços industriais disponíveis na plataforma.</p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {categories.map((category, index) => (
                <CategoryCard key={index} category={category} />
              ))}
            </div>
          </div>
        </section>

        {/* Featured Suppliers */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-black mb-4">Fornecedores em Destaque</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">Conheça alguns dos fornecedores verificados disponíveis na plataforma.</p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {featuredSuppliers.map((supplier) => (
                <SupplierCard key={supplier.id} supplier={supplier} />
              ))}
            </div>
            <div className="text-center mt-8">
              <Link 
                to="/fornecedores" 
                className="bg-[#FED141] text-black px-8 py-3 rounded-lg font-semibold hover:bg-yellow-400 transition-colors"
              >
                Ver todos os fornecedores
              </Link>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-16 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-black mb-4">O que dizem nossos clientes</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {testimonials.map((testimonial, index) => (
                <TestimonialCard key={index} testimonial={testimonial} />
              ))}
            </div>
          </div>
        </section>

        {/* How it Works */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-black mb-4">Como Funciona</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-lg shadow-sm">
                <div className="w-12 h-12 bg-[#FED141] rounded-full flex items-center justify-center mb-4">
                  <span className="text-black font-bold text-xl">1</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Cadastre sua empresa</h3>
                <p className="text-gray-600">Forneça informações básicas sobre sua indústria ou fornecimento.</p>
              </div>
              <div className="bg-white p-8 rounded-lg shadow-sm">
                <div className="w-12 h-12 bg-[#FED141] rounded-full flex items-center justify-center mb-4">
                  <span className="text-black font-bold text-xl">2</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Encontre ou ofereça produtos</h3>
                <p className="text-gray-600">Pesquise fornecedores ou publique seus produtos com facilidade.</p>
              </div>
              <div className="bg-white p-8 rounded-lg shadow-sm">
                <div className="w-12 h-12 bg-[#FED141] rounded-full flex items-center justify-center mb-4">
                  <span className="text-black font-bold text-xl">3</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Negocie direto com as partes</h3>
                <p className="text-gray-600">Sem intermediários, com segurança e economia.</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-black text-white">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-4">Pronto para revolucionar suas compras industriais?</h2>
            <p className="text-xl text-gray-300 mb-8">Junte-se a centenas de empresas que já economizam com a IndústriaDireta.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/cadastro?tipo=comprador" 
                className="bg-[#FED141] text-black px-8 py-3 rounded-lg font-semibold hover:bg-yellow-400 transition-colors"
              >
                Sou Comprador
              </Link>
              <Link 
                to="/cadastro?tipo=fornecedor" 
                className="bg-white text-black px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Sou Fornecedor
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
