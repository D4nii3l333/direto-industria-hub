
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from '@/components/ui/breadcrumb';

const Breadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  const breadcrumbNames: { [key: string]: string } = {
    'fornecedores': 'Fornecedores',
    'categorias': 'Categorias',
    'buscar': 'Busca',
    'entrar': 'Login',
    'cadastro': 'Cadastro',
    'dashboard': 'Dashboard',
    'como-funciona': 'Como Funciona',
    'planos': 'Planos',
    'chat': 'Chat',
    'admin': 'Administração',
    'usuarios': 'Usuários'
  };

  if (location.pathname === '/') {
    return null;
  }

  return (
    <div className="bg-gray-50 border-b">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/" className="flex items-center text-gray-600 hover:text-gray-900">
                  <Home className="w-4 h-4 mr-1" />
                  Início
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            
            {pathnames.map((pathname, index) => {
              const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
              const isLast = index === pathnames.length - 1;
              const name = breadcrumbNames[pathname] || pathname.charAt(0).toUpperCase() + pathname.slice(1);

              return (
                <React.Fragment key={pathname}>
                  <BreadcrumbSeparator>
                    <ChevronRight className="w-4 h-4" />
                  </BreadcrumbSeparator>
                  <BreadcrumbItem>
                    {isLast ? (
                      <BreadcrumbPage className="text-gray-900 font-medium">
                        {name}
                      </BreadcrumbPage>
                    ) : (
                      <BreadcrumbLink asChild>
                        <Link to={routeTo} className="text-gray-600 hover:text-gray-900">
                          {name}
                        </Link>
                      </BreadcrumbLink>
                    )}
                  </BreadcrumbItem>
                </React.Fragment>
              );
            })}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </div>
  );
};

export default Breadcrumbs;
