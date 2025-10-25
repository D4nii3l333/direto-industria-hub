import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, User, Building, Phone } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';

const Register = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { signUp, user, loading: authLoading } = useAuth();

  useEffect(() => {
    if (!authLoading && user) {
      navigate('/dashboard');
    }
  }, [user, authLoading, navigate]);
  
  const [userType, setUserType] = useState(searchParams.get('tipo') || 'comprador');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    company: '',
    phone: '',
    cnpj: '',
    segment: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Erro",
        description: "As senhas não coincidem.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);

    try {
      const { error } = await signUp(formData.email, formData.password, formData.name);

      if (error) {
        toast({
          title: "Erro no cadastro",
          description: error.message,
          variant: "destructive"
        });
        setIsLoading(false);
        return;
      }

      toast({
        title: "Cadastro realizado com sucesso!",
        description: `Bem-vindo à IndústriaDireta! Você foi cadastrado como ${userType}.`,
      });
      
      // O redirecionamento acontecerá automaticamente via useEffect
    } catch (error: any) {
      toast({
        title: "Erro no cadastro",
        description: error.message || "Ocorreu um erro ao criar sua conta.",
        variant: "destructive"
      });
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-block mb-8">
            <span className="text-3xl font-bold">
              <span className="text-[#FED141]">Indústria</span>
              <span className="text-black">Direta</span>
            </span>
          </Link>
          <h2 className="text-3xl font-bold text-black">Crie sua conta</h2>
          <p className="mt-2 text-gray-600">
            Junte-se à maior plataforma B2B industrial do Brasil
          </p>
        </div>

        {/* User Type Selection */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <h3 className="text-lg font-semibold text-black mb-4">Tipo de Conta</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <label className={`border-2 rounded-lg p-4 cursor-pointer transition-colors ${
              userType === 'comprador' ? 'border-[#FED141] bg-yellow-50' : 'border-gray-200 hover:border-gray-300'
            }`}>
              <input 
                type="radio" 
                value="comprador" 
                checked={userType === 'comprador'}
                onChange={(e) => setUserType(e.target.value)}
                className="sr-only" 
              />
              <div className="text-center">
                <div className="text-3xl mb-2">🏭</div>
                <h4 className="font-semibold text-black">Comprador</h4>
                <p className="text-sm text-gray-600">Busco fornecedores para minha empresa</p>
              </div>
            </label>
            
            <label className={`border-2 rounded-lg p-4 cursor-pointer transition-colors ${
              userType === 'fornecedor' ? 'border-[#FED141] bg-yellow-50' : 'border-gray-200 hover:border-gray-300'
            }`}>
              <input 
                type="radio" 
                value="fornecedor" 
                checked={userType === 'fornecedor'}
                onChange={(e) => setUserType(e.target.value)}
                className="sr-only" 
              />
              <div className="text-center">
                <div className="text-3xl mb-2">🏪</div>
                <h4 className="font-semibold text-black">Fornecedor</h4>
                <p className="text-sm text-gray-600">Quero vender meus produtos</p>
              </div>
            </label>
          </div>
        </div>

        {/* Registration Form */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Nome Completo
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Seu nome completo"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#FED141] focus:ring-2 focus:ring-yellow-200"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  E-mail
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="seu@email.com"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#FED141] focus:ring-2 focus:ring-yellow-200"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
                  Empresa
                </label>
                <div className="relative">
                  <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    id="company"
                    name="company"
                    type="text"
                    value={formData.company}
                    onChange={handleInputChange}
                    placeholder="Nome da empresa"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#FED141] focus:ring-2 focus:ring-yellow-200"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Telefone
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="(11) 99999-9999"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#FED141] focus:ring-2 focus:ring-yellow-200"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="cnpj" className="block text-sm font-medium text-gray-700 mb-1">
                  CNPJ
                </label>
                <input
                  id="cnpj"
                  name="cnpj"
                  type="text"
                  value={formData.cnpj}
                  onChange={handleInputChange}
                  placeholder="00.000.000/0000-00"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#FED141] focus:ring-2 focus:ring-yellow-200"
                  required
                />
              </div>

              <div>
                <label htmlFor="segment" className="block text-sm font-medium text-gray-700 mb-1">
                  Segmento
                </label>
                <select
                  id="segment"
                  name="segment"
                  value={formData.segment}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#FED141] focus:ring-2 focus:ring-yellow-200"
                  required
                >
                  <option value="">Selecione o segmento</option>
                  <option value="metalurgia">Metalurgia</option>
                  <option value="quimica">Química</option>
                  <option value="alimenticia">Alimentícia</option>
                  <option value="textil">Têxtil</option>
                  <option value="automotiva">Automotiva</option>
                  <option value="outros">Outros</option>
                </select>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Senha
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#FED141] focus:ring-2 focus:ring-yellow-200"
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

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                  Confirmar Senha
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#FED141] focus:ring-2 focus:ring-yellow-200"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <label className="flex items-start">
                <input type="checkbox" required className="mt-1 mr-3" />
                <span className="text-sm text-gray-600">
                  Concordo com os{' '}
                  <Link to="/termos" className="text-[#FED141] hover:underline">Termos de Uso</Link>
                  {' '}e{' '}
                  <Link to="/privacidade" className="text-[#FED141] hover:underline">Política de Privacidade</Link>
                </span>
              </label>
              
              <label className="flex items-start">
                <input type="checkbox" className="mt-1 mr-3" />
                <span className="text-sm text-gray-600">
                  Aceito receber comunicações comerciais da IndústriaDireta
                </span>
              </label>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#FED141] text-black py-3 px-4 rounded-lg font-semibold hover:bg-yellow-400 transition-colors disabled:opacity-50"
            >
              {isLoading ? 'Criando conta...' : 'Criar conta'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Já tem uma conta?{' '}
              <Link to="/entrar" className="text-[#FED141] font-medium hover:underline">
                Faça login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
