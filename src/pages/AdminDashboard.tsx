
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Users, Package, Tag, LogOut } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAdmin } from '@/hooks/useAdmin';
import { useAuth } from '@/hooks/useAuth';
import Breadcrumbs from '@/components/Breadcrumbs';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { isAdmin, loading } = useAdmin();
  const { signOut } = useAuth();
  const [stats, setStats] = useState([
    { name: 'Fornecedores', value: '0', icon: Package, color: 'bg-blue-500' },
    { name: 'Categorias', value: '0', icon: Tag, color: 'bg-green-500' },
    { name: 'Usuários', value: '0', icon: Users, color: 'bg-purple-500' },
  ]);

  useEffect(() => {
    if (!loading && !isAdmin) {
      navigate('/admin/login');
      return;
    }

    if (isAdmin) {
      loadStats();
    }
  }, [isAdmin, loading, navigate]);

  const loadStats = async () => {
    try {
      const [suppliersRes, categoriesRes, usersRes] = await Promise.all([
        supabase.from('suppliers').select('id', { count: 'exact', head: true }),
        supabase.from('categories').select('id', { count: 'exact', head: true }),
        supabase.from('profiles').select('id', { count: 'exact', head: true }),
      ]);

      setStats([
        { name: 'Fornecedores', value: (suppliersRes.count || 0).toString(), icon: Package, color: 'bg-blue-500' },
        { name: 'Categorias', value: (categoriesRes.count || 0).toString(), icon: Tag, color: 'bg-green-500' },
        { name: 'Usuários', value: (usersRes.count || 0).toString(), icon: Users, color: 'bg-purple-500' },
      ]);
    } catch (error) {
      console.error('Error loading stats:', error);
    }
  };

  const handleLogout = async () => {
    await signOut();
    navigate('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FED141] mx-auto"></div>
          <p className="mt-4 text-gray-600">Carregando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link to="/" className="text-2xl font-bold">
                <span className="text-[#FED141]">Indústria</span>
                <span className="text-black">Direta</span>
              </Link>
              <span className="text-gray-400">|</span>
              <h1 className="text-xl font-semibold text-gray-900">Painel Administrativo</h1>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <LogOut className="w-5 h-5" />
                <span>Sair</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <Breadcrumbs />

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h2>
          <p className="text-gray-600">Gerencie a plataforma IndústriaDireta</p>
        </div>

        {/* Estatísticas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {stats.map((stat) => (
            <div key={stat.name} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center">
                <div className={`${stat.color} rounded-lg p-3`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <div className="ml-4">
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-gray-600">{stat.name}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Menu Principal */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link
            to="/admin/fornecedores"
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-all duration-300 hover:border-[#FED141] group"
          >
            <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg mb-4 group-hover:bg-blue-200">
              <Package className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Fornecedores</h3>
            <p className="text-gray-600">Gerenciar fornecedores da plataforma</p>
          </Link>

          <Link
            to="/admin/categorias"
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-all duration-300 hover:border-[#FED141] group"
          >
            <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-lg mb-4 group-hover:bg-green-200">
              <Tag className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Categorias</h3>
            <p className="text-gray-600">Gerenciar categorias e produtos</p>
          </Link>

          <Link
            to="/admin/usuarios"
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-all duration-300 hover:border-[#FED141] group"
          >
            <div className="flex items-center justify-center w-12 h-12 bg-purple-100 rounded-lg mb-4 group-hover:bg-purple-200">
              <Users className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Usuários</h3>
            <p className="text-gray-600">Gerenciar contas de usuários</p>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
