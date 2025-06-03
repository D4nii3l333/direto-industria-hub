
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Check } from 'lucide-react';

const Plans = () => {
  const plans = [
    {
      name: "Gratuito",
      price: "R$ 0",
      period: "/mês",
      features: [
        "Busca básica de fornecedores",
        "Cadastro de empresa",
        "Chat inicial limitado",
        "Visualização de perfis básicos"
      ]
    },
    {
      name: "Premium",
      price: "R$ 99",
      period: "/mês",
      features: [
        "Acesso a fornecedores selecionados",
        "Chat ilimitado",
        "Alertas de promoções",
        "Relatórios de mercado",
        "Comparador avançado",
        "Suporte prioritário"
      ],
      popular: true
    },
    {
      name: "Enterprise",
      price: "Sob consulta",
      period: "",
      features: [
        "Todos os recursos Premium",
        "Integração com ERP",
        "API personalizada",
        "Gerente de conta dedicado",
        "Relatórios personalizados"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-black mb-4">Planos e Preços</h1>
          <p className="text-xl text-gray-600">
            Escolha o plano ideal para sua empresa
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <div key={index} className={`bg-white p-8 rounded-lg shadow-sm border ${plan.popular ? 'border-[#FED141] relative' : ''}`}>
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-[#FED141] text-black px-4 py-2 rounded-full text-sm font-semibold">
                    Mais Popular
                  </span>
                </div>
              )}
              
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-black mb-4">{plan.name}</h3>
                <div className="text-4xl font-bold text-black mb-2">
                  {plan.price}
                  <span className="text-lg text-gray-600">{plan.period}</span>
                </div>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center">
                    <Check className="w-5 h-5 text-[#FED141] mr-3" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              <button className={`w-full py-3 px-4 rounded-lg font-semibold transition-colors ${
                plan.popular 
                  ? 'bg-[#FED141] text-black hover:bg-yellow-400' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}>
                {plan.name === 'Enterprise' ? 'Entrar em Contato' : 'Começar Agora'}
              </button>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Plans;
