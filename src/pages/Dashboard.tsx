import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useAuth } from '@/hooks/useAuth';
import { useFavorites } from '@/hooks/useFavorites';
import { useConversations } from '@/hooks/useConversations';
import { useSearchHistory } from '@/hooks/useSearchHistory';
import { MessageCircle, Star, History, Trash2 } from 'lucide-react';
import LoadingSpinner from '@/components/LoadingSpinner';
import { format } from 'date-fns';

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const { favorites, loading: favLoading } = useFavorites(user?.id);
  const { conversations, loading: convLoading } = useConversations(user?.id);
  const { history, loading: histLoading, deleteHistoryItem } = useSearchHistory(user?.id);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/login');
    }
  }, [user, authLoading, navigate]);

  if (authLoading || !user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-black mb-6">Painel do Usuário</h1>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Minhas Conversas */}
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center gap-2 mb-4">
              <MessageCircle className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-semibold">Minhas Conversas</h2>
            </div>
            {convLoading ? (
              <LoadingSpinner />
            ) : conversations.length > 0 ? (
              <div className="space-y-3">
                {conversations.slice(0, 3).map((conv) => (
                  <div key={conv.id} className="border-b pb-2">
                    <p className="font-medium text-sm">{conv.subject}</p>
                    <p className="text-xs text-gray-500">
                      Com: {conv.suppliers?.name}
                    </p>
                    <p className="text-xs text-gray-400">
                      {format(new Date(conv.updated_at), 'dd/MM/yyyy')}
                    </p>
                  </div>
                ))}
                {conversations.length > 3 && (
                  <p className="text-sm text-gray-500">
                    +{conversations.length - 3} conversas
                  </p>
                )}
              </div>
            ) : (
              <p className="text-gray-600">Nenhuma conversa ainda</p>
            )}
          </div>

          {/* Fornecedores Favoritos */}
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center gap-2 mb-4">
              <Star className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-semibold">Fornecedores Favoritos</h2>
            </div>
            {favLoading ? (
              <LoadingSpinner />
            ) : favorites.length > 0 ? (
              <div className="space-y-3">
                {favorites.slice(0, 3).map((fav) => (
                  <div 
                    key={fav.id} 
                    className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-2 rounded"
                    onClick={() => navigate(`/fornecedor/${fav.supplier_id}`)}
                  >
                    <img 
                      src={fav.suppliers?.logo || 'https://via.placeholder.com/40'} 
                      alt={fav.suppliers?.name}
                      className="w-10 h-10 rounded object-cover"
                    />
                    <div className="flex-1">
                      <p className="font-medium text-sm">{fav.suppliers?.name}</p>
                      <p className="text-xs text-gray-500">{fav.suppliers?.location}</p>
                    </div>
                  </div>
                ))}
                {favorites.length > 3 && (
                  <p className="text-sm text-gray-500">
                    +{favorites.length - 3} fornecedores
                  </p>
                )}
              </div>
            ) : (
              <p className="text-gray-600">Nenhum fornecedor favorito</p>
            )}
          </div>

          {/* Histórico de Buscas */}
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center gap-2 mb-4">
              <History className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-semibold">Histórico de Buscas</h2>
            </div>
            {histLoading ? (
              <LoadingSpinner />
            ) : history.length > 0 ? (
              <div className="space-y-2">
                {history.map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded">
                    <div 
                      className="flex-1 cursor-pointer"
                      onClick={() => navigate(`/buscar?q=${encodeURIComponent(item.search_term)}`)}
                    >
                      <p className="font-medium text-sm">{item.search_term}</p>
                      <p className="text-xs text-gray-500">
                        {item.results_count} resultados - {format(new Date(item.created_at), 'dd/MM/yyyy')}
                      </p>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteHistoryItem(item.id);
                      }}
                      className="text-gray-400 hover:text-red-600"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-600">Nenhuma busca recente</p>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
