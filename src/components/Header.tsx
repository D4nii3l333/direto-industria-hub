import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, Search, User, Bell, Settings } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleSearch = () => {
    navigate('/buscar');
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-bold">
              <span className="text-[#FED141]">Indústria</span>
              <span className="text-black">Direta</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-[#FED141] font-medium">Home</Link>
            <Link to="/fornecedores" className="text-black hover:text-[#FED141] transition-colors">Fornecedores</Link>
            <Link to="/categorias" className="text-black hover:text-[#FED141] transition-colors">Categorias</Link>
            <Link to="/como-funciona" className="text-black hover:text-[#FED141] transition-colors">Como Funciona</Link>
            <Link to="/planos" className="text-black hover:text-[#FED141] transition-colors">Planos</Link>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <button 
              onClick={handleSearch}
              className="p-2 text-black hover:text-[#FED141] transition-colors"
            >
              <Search className="w-5 h-5" />
            </button>
            
            {user ? (
              <div className="flex items-center space-x-3">
                <button className="p-2 text-black hover:text-[#FED141] transition-colors relative">
                  <Bell className="w-5 h-5" />
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
                </button>
                <Link 
                  to="/dashboard" 
                  className="flex items-center space-x-2 p-2 text-black hover:text-[#FED141] transition-colors"
                >
                  <User className="w-5 h-5" />
                  <span>Dashboard</span>
                </Link>
                <Link 
                  to="/configuracoes" 
                  className="p-2 text-black hover:text-[#FED141] transition-colors"
                  title="Configurações"
                >
                  <Settings className="w-5 h-5" />
                </Link>
              </div>
            ) : (
              <>
                <Link 
                  to="/entrar" 
                  className="text-black hover:text-[#FED141] transition-colors font-medium"
                >
                  Entrar
                </Link>
                <Link 
                  to="/cadastro" 
                  className="bg-[#FED141] text-black px-4 py-2 rounded-lg font-medium hover:bg-yellow-400 transition-colors"
                >
                  Cadastre-se
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button 
            onClick={toggleMenu}
            className="md:hidden p-2 text-black hover:text-[#FED141] transition-colors"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <nav className="flex flex-col space-y-2">
              <Link to="/" className="text-[#FED141] font-medium py-2">Home</Link>
              <Link to="/fornecedores" className="text-black hover:text-[#FED141] transition-colors py-2">Fornecedores</Link>
              <Link to="/categorias" className="text-black hover:text-[#FED141] transition-colors py-2">Categorias</Link>
              <Link to="/como-funciona" className="text-black hover:text-[#FED141] transition-colors py-2">Como Funciona</Link>
              <Link to="/planos" className="text-black hover:text-[#FED141] transition-colors py-2">Planos</Link>
              
              <div className="pt-4 border-t border-gray-200 flex flex-col space-y-2">
                {user ? (
                  <>
                    <Link to="/dashboard" className="text-black hover:text-[#FED141] transition-colors py-2">Dashboard</Link>
                    <Link to="/configuracoes" className="text-black hover:text-[#FED141] transition-colors py-2">Configurações</Link>
                    <button className="text-left text-black hover:text-[#FED141] transition-colors py-2">Notificações</button>
                  </>
                ) : (
                  <>
                    <Link to="/entrar" className="text-black hover:text-[#FED141] transition-colors py-2">Entrar</Link>
                    <Link 
                      to="/cadastro" 
                      className="bg-[#FED141] text-black px-4 py-2 rounded-lg font-medium hover:bg-yellow-400 transition-colors text-center"
                    >
                      Cadastre-se
                    </Link>
                  </>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
