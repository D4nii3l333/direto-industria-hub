
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Shield } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';
import { useAdmin } from '@/hooks/useAdmin';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { signIn } = useAuth();
  const { isAdmin, loading: adminLoading } = useAdmin();

  useEffect(() => {
    if (!adminLoading && isAdmin) {
      navigate('/admin/dashboard');
    }
  }, [isAdmin, adminLoading, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { data, error } = await signIn(email, password);

      if (error) {
        toast({
          title: "Erro no login",
          description: error.message,
          variant: "destructive"
        });
        setIsLoading(false);
        return;
      }

      if (data.user) {
        // Verificar se é admin
        toast({
          title: "Login realizado com sucesso!",
          description: "Verificando permissões de administrador...",
        });
        
        // A verificação de admin acontecerá automaticamente via useAdmin hook
        // e redirecionará se for admin
        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
      }
    } catch (error: any) {
      toast({
        title: "Erro no login",
        description: error.message || "Ocorreu um erro ao fazer login.",
        variant: "destructive"
      });
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <Link to="/" className="inline-block mb-8">
            <span className="text-3xl font-bold">
              <span className="text-[#FED141]">Indústria</span>
              <span className="text-black">Direta</span>
            </span>
          </Link>
          <div className="flex justify-center mb-4">
            <Shield className="w-12 h-12 text-[#FED141]" />
          </div>
          <h2 className="text-3xl font-bold text-black">Painel Administrativo</h2>
          <p className="mt-2 text-gray-600">
            Acesse o painel de controle da plataforma
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@industriadireta.com"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#FED141] focus:ring-2 focus:ring-yellow-200"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Senha
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:border-[#FED141] focus:ring-2 focus:ring-yellow-200"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#FED141] text-black py-3 px-4 rounded-lg font-semibold hover:bg-yellow-400 transition-colors disabled:opacity-50"
            >
              {isLoading ? 'Entrando...' : 'Entrar no Painel'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Não é administrador?{' '}
              <Link to="/entrar" className="text-[#FED141] font-medium hover:underline">
                Fazer login como usuário
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
