
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Search, MessageCircle, HandshakeIcon } from 'lucide-react';

const HowItWorks = () => {
  const steps = [
    {
      icon: <Search className="w-12 h-12 text-[#FED141]" />,
      title: "1. Cadastre sua empresa",
      description: "Forneça informações básicas sobre sua indústria ou fornecimento."
    },
    {
      icon: <MessageCircle className="w-12 h-12 text-[#FED141]" />,
      title: "2. Encontre ou ofereça produtos",
      description: "Pesquise fornecedores ou publique seus produtos com facilidade."
    },
    {
      icon: <HandshakeIcon className="w-12 h-12 text-[#FED141]" />,
      title: "3. Negocie direto com as partes",
      description: "Sem intermediários, com segurança e economia."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-black mb-4">Como Funciona</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Conecte-se diretamente com fornecedores industriais em três passos simples
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {steps.map((step, index) => (
            <div key={index} className="bg-white p-8 rounded-lg shadow-sm border text-center">
              <div className="flex justify-center mb-6">
                {step.icon}
              </div>
              <h3 className="text-xl font-semibold text-black mb-4">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default HowItWorks;
