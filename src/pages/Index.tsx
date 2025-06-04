import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Factory, Users, Globe, CheckCircle } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SearchBar from '@/components/SearchBar';
import CategoryCard from '@/components/CategoryCard';
import SupplierCard from '@/components/SupplierCard';
import TestimonialCard from '@/components/TestimonialCard';
import { getSuppliers, getCategories, initializeData } from '@/data/mockData';

const Index = () => {
  const [suppliers, setSuppliers] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);

  useEffect(() => {
    // Inicializa os dados se necessário
    initializeData();
    
    // Carrega dados do localStorage
    const loadedSuppliers = getSuppliers();
    const loadedCategories = getCategories();
    
    setSuppliers(loadedSuppliers.slice(0, 6)); // Mostra apenas os primeiros 6
    setCategories(loadedCategories.slice(0, 6)); // Mostra apenas os primeiros 6
  }, []);

  const testimonials = [
    {
      name: "Maria Santos",
      company: "Indústria MegaCorp",
      text: "Encontramos fornecedores de qualidade em questão de minutos. A plataforma revolucionou nossa cadeia de suprimentos."
    },
    {
      name: "João Silva",
      company: "Fábrica TechnoPlus",
      text: "Interface intuitiva e fornecedores verificados. Conseguimos reduzir custos em 30% com os novos parceiros encontrados."
    },
    {
      name: "Ana Costa",
      company: "Manufatura ProIndustrial",
      text: "Atendimento excepcional e resultados rápidos. Recomendo para qualquer empresa que busca eficiência na procurement."
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-50 to-gray-100 py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Conectamos <span className="text-[#FED141]">Indústrias</span> aos Melhores Fornecedores
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Encontre fornecedores qualificados, compare propostas e acelere sua produção. 
            A maior plataforma B2B industrial do Brasil.
          </p>
          
          <div className="max-w-2xl mx-auto mb-12">
            <SearchBar />
          </div>
          
          <div className="flex flex-wrap justify-center gap-6 mb-12">
            <div className="flex items-center space-x-2 bg-white rounded-full px-6 py-3 shadow-sm">
              <Factory className="w-5 h-5 text-[#FED141]" />
              <span className="text-gray-700">+5.000 Fornecedores</span>
            </div>
            <div className="flex items-center space-x-2 bg-white rounded-full px-6 py-3 shadow-sm">
              <Users className="w-5 h-5 text-[#FED141]" />
              <span className="text-gray-700">+50.000 Produtos</span>
            </div>
            <div className="flex items-center space-x-2 bg-white rounded-full px-6 py-3 shadow-sm">
              <Globe className="w-5 h-5 text-[#FED141]" />
              <span className="text-gray-700">Todo o Brasil</span>
            </div>
          </div>
          
          <Link
            to="/cadastro"
            className="inline-flex items-center bg-[#FED141] text-black px-8 py-4 rounded-lg font-semibold hover:bg-yellow-400 transition-colors text-lg"
          >
            Começar Agora
            <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Principais Categorias</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Explore nossa ampla gama de categorias industriais e encontre exatamente o que precisa
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {categories.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
          
          <div className="text-center">
            <Link
              to="/categorias"
              className="inline-flex items-center text-[#FED141] font-semibold hover:underline"
            >
              Ver Todas as Categorias
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Suppliers Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Fornecedores em Destaque</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Conheça alguns dos nossos fornecedores mais bem avaliados e confiáveis
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {suppliers.map((supplier) => (
              <SupplierCard key={supplier.id} supplier={supplier} />
            ))}
          </div>
          
          <div className="text-center">
            <Link
              to="/fornecedores"
              className="inline-flex items-center text-[#FED141] font-semibold hover:underline"
            >
              Ver Todos os Fornecedores
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Por que Escolher a IndústriaDireta?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Oferecemos a melhor experiência para conectar indústrias e fornecedores
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-[#FED141] rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-black" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Fornecedores Verificados</h3>
              <p className="text-gray-600">Todos os fornecedores passam por rigoroso processo de verificação</p>
            </div>
            
            <div className="text-center">
              <div className="bg-[#FED141] rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-black" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Rede Confiável</h3>
              <p className="text-gray-600">Milhares de empresas já confiam em nossa plataforma</p>
            </div>
            
            <div className="text-center">
              <div className="bg-[#FED141] rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Factory className="w-8 h-8 text-black" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Processo Simplificado</h3>
              <p className="text-gray-600">Encontre, compare e conecte-se com fornecedores em minutos</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">O que Nossos Clientes Dizem</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Histórias reais de sucesso de empresas que transformaram suas operações
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard key={index} testimonial={testimonial} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[#FED141]">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-black mb-4">
            Pronto para Revolucionar sua Cadeia de Suprimentos?
          </h2>
          <p className="text-xl text-gray-800 mb-8">
            Junte-se a milhares de empresas que já encontraram seus fornecedores ideais
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/cadastro"
              className="bg-black text-white px-8 py-4 rounded-lg font-semibold hover:bg-gray-800 transition-colors"
            >
              Cadastrar Empresa
            </Link>
            <Link
              to="/como-funciona"
              className="bg-white text-black px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Como Funciona
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
