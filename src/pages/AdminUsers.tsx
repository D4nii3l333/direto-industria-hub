import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Trash2, User, Mail, Phone, MapPin } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { getUsers, setUsers, User as UserType } from '@/data/mockData';

const AdminUsers = () => {
  const navigate = useNavigate();
  const [users, setUsersState] = useState<UserType[]>([]);

  useEffect(() => {
    const isAdmin = localStorage.getItem('isAdmin');
    if (!isAdmin) {
      navigate('/admin/login');
      return;
    }
    
    // Carrega usuários do localStorage
    const loadedUsers = getUsers();
    setUsersState(loadedUsers);
  }, [navigate]);

  const updateUsers = (newUsers: UserType[]) => {
    setUsersState(newUsers);
    setUsers(newUsers);
  };

  const handleDeleteUser = (id: number) => {
    if (confirm('Tem certeza que deseja excluir este usuário?')) {
      const updatedUsers = users.filter(u => u.id !== id);
      updateUsers(updatedUsers);
      toast({ title: "Usuário excluído com sucesso!" });
    }
  };

  const getUserTypeLabel = (type: string) => {
    return type === 'buyer' ? 'Comprador' : 'Fornecedor';
  };

  const getUserTypeBadge = (type: string) => {
    const baseClasses = "text-xs px-2 py-1 rounded-full";
    if (type === 'buyer') {
      return `${baseClasses} bg-blue-100 text-blue-800`;
    }
    return `${baseClasses} bg-green-100 text-green-800`;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center space-x-4">
            <Link to="/admin/dashboard" className="text-gray-600 hover:text-gray-900">
              <ArrowLeft className="w-6 h-6" />
            </Link>
            <h1 className="text-xl font-semibold text-gray-900">Gerenciar Usuários</h1>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Usuários ({users.length})</h2>
        </div>

        <div className="grid gap-4">
          {users.map((user) => (
            <div key={user.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 text-gray-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h3 className="text-lg font-semibold text-black">{user.name}</h3>
                      <span className={getUserTypeBadge(user.type)}>
                        {getUserTypeLabel(user.type)}
                      </span>
                      {user.verified && (
                        <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                          Verificado
                        </span>
                      )}
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                      <div className="space-y-2">
                        <div className="flex items-center">
                          <Mail className="w-4 h-4 mr-2" />
                          {user.email}
                        </div>
                        <div className="flex items-center">
                          <Phone className="w-4 h-4 mr-2" />
                          {user.phone}
                        </div>
                        <div className="flex items-center">
                          <MapPin className="w-4 h-4 mr-2" />
                          {user.location}
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div>
                          <span className="font-medium">Empresa:</span> {user.company}
                        </div>
                        <div>
                          <span className="font-medium">Cadastrado em:</span> {new Date(user.createdAt).toLocaleDateString('pt-BR')}
                        </div>
                        <div>
                          <span className="font-medium">Último acesso:</span> {new Date(user.lastLogin).toLocaleDateString('pt-BR')}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleDeleteUser(user.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    title="Excluir usuário"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {users.length === 0 && (
          <div className="text-center py-12">
            <User className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhum usuário encontrado</h3>
            <p className="text-gray-600">Não há usuários cadastrados na plataforma.</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminUsers;
