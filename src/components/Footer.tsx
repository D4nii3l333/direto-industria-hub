
import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';
import SearchBar from './SearchBar';

const Footer = () => {
  return (
    <footer className="bg-gray-100 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Search Bar Section */}
        <div className="mb-12">
          <SearchBar />
        </div>

        {/* Footer Content */}
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <Link to="/" className="flex items-center mb-4">
              <span className="text-2xl font-bold">
                <span className="text-[#FED141]">Indústria</span>
                <span className="text-black">Direta</span>
              </span>
            </Link>
            <p className="text-gray-600 mb-4">
              Conectando indústrias diretamente. Eliminamos intermediários e conectamos você aos melhores fornecedores do Brasil.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-[#FED141] transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-[#FED141] transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-[#FED141] transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-[#FED141] transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Links Úteis */}
          <div>
            <h4 className="text-lg font-semibold text-black mb-4">Links Úteis</h4>
            <ul className="space-y-2">
              <li><Link to="/sobre" className="text-gray-600 hover:text-[#FED141] transition-colors">Sobre nós</Link></li>
              <li><Link to="/como-funciona" className="text-gray-600 hover:text-[#FED141] transition-colors">Como funciona</Link></li>
              <li><Link to="/fornecedores" className="text-gray-600 hover:text-[#FED141] transition-colors">Fornecedores</Link></li>
              <li><Link to="/categorias" className="text-gray-600 hover:text-[#FED141] transition-colors">Categorias</Link></li>
              <li><Link to="/planos" className="text-gray-600 hover:text-[#FED141] transition-colors">Planos</Link></li>
              <li><Link to="/ajuda" className="text-gray-600 hover:text-[#FED141] transition-colors">Central de Ajuda</Link></li>
            </ul>
          </div>

          {/* Para Empresas */}
          <div>
            <h4 className="text-lg font-semibold text-black mb-4">Para Empresas</h4>
            <ul className="space-y-2">
              <li><Link to="/cadastro?tipo=comprador" className="text-gray-600 hover:text-[#FED141] transition-colors">Sou Comprador</Link></li>
              <li><Link to="/cadastro?tipo=fornecedor" className="text-gray-600 hover:text-[#FED141] transition-colors">Sou Fornecedor</Link></li>
              <li><Link to="/dashboard" className="text-gray-600 hover:text-[#FED141] transition-colors">Dashboard</Link></li>
              <li><Link to="/integracao" className="text-gray-600 hover:text-[#FED141] transition-colors">Integração ERP</Link></li>
              <li><Link to="/relatorios" className="text-gray-600 hover:text-[#FED141] transition-colors">Relatórios</Link></li>
            </ul>
          </div>

          {/* Contato */}
          <div>
            <h4 className="text-lg font-semibold text-black mb-4">Contato</h4>
            <div className="space-y-3">
              <div className="flex items-center">
                <Mail className="w-5 h-5 text-gray-400 mr-2" />
                <span className="text-gray-600">contato@industriadireta.com.br</span>
              </div>
              <div className="flex items-center">
                <Phone className="w-5 h-5 text-gray-400 mr-2" />
                <span className="text-gray-600">(11) 1234-5678</span>
              </div>
              <div className="flex items-center">
                <MapPin className="w-5 h-5 text-gray-400 mr-2" />
                <span className="text-gray-600">São Paulo, SP</span>
              </div>
            </div>

            {/* Newsletter */}
            <div className="mt-6">
              <h5 className="text-sm font-semibold text-black mb-2">Newsletter</h5>
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="Seu e-mail"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-l-lg text-sm focus:outline-none focus:border-[#FED141]"
                />
                <button className="bg-[#FED141] text-black px-4 py-2 rounded-r-lg text-sm font-medium hover:bg-yellow-400 transition-colors">
                  Assinar
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-300 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-600 text-sm mb-4 md:mb-0">
            © 2024 IndústriaDireta. Todos os direitos reservados.
          </p>
          <div className="flex space-x-6 text-sm">
            <Link to="/privacidade" className="text-gray-600 hover:text-[#FED141] transition-colors">
              Política de Privacidade
            </Link>
            <Link to="/termos" className="text-gray-600 hover:text-[#FED141] transition-colors">
              Termos de Uso
            </Link>
            <Link to="/cookies" className="text-gray-600 hover:text-[#FED141] transition-colors">
              Política de Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
