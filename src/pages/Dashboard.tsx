
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-black mb-6">Painel do Usuário</h1>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h2 className="text-xl font-semibold mb-4">Minhas Conversas</h2>
            <p className="text-gray-600">Gerencie suas conversas com fornecedores</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h2 className="text-xl font-semibold mb-4">Fornecedores Favoritos</h2>
            <p className="text-gray-600">Seus fornecedores salvos</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h2 className="text-xl font-semibold mb-4">Histórico de Buscas</h2>
            <p className="text-gray-600">Suas pesquisas recentes</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
