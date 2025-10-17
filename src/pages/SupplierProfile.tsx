
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Star, MapPin, Phone, Mail, Globe, MessageCircle, Shield, Heart } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useFavorites } from '@/hooks/useFavorites';
import { useConversations } from '@/hooks/useConversations';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

const SupplierProfile = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const { toast } = useToast();
  const { toggleFavorite, isFavorite } = useFavorites(user?.id);
  const { createConversation } = useConversations(user?.id);
  const [showConversationDialog, setShowConversationDialog] = useState(false);
  const [conversationSubject, setConversationSubject] = useState('');
  
  // Mock data - in real app, would fetch from API
  const supplier = {
    id: id,
    name: "MetalTech Indústria",
    location: "São Paulo, SP",
    rating: 4.8,
    reviewCount: 124,
    description: "Especializada em produtos de aço inoxidável e soluções metalúrgicas para a indústria.",
    image: "https://via.placeholder.com/150",
    verified: true,
    founded: 2010,
    employees: "200-500",
    phone: "(11) 99999-9999",
    email: "contato@metaltech.com.br",
    website: "www.metaltech.com.br",
    specialties: ["Aço Inoxidável", "Metalurgia", "Soldas Especiais", "Corte a Laser"],
    certifications: ["ISO 9001", "ISO 14001", "OHSAS 18001"],
    products: [
      { name: "Chapas de Aço Inox", minOrder: "100kg", price: "R$ 15,00/kg" },
      { name: "Tubos Industriais", minOrder: "50m", price: "R$ 120,00/m" },
      { name: "Conexões Especiais", minOrder: "20 peças", price: "R$ 85,00/peça" }
    ]
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-8">
        {/* Supplier Header */}
        <div className="bg-white rounded-lg shadow-sm border p-8 mb-8">
          <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6">
            <img 
              src={supplier.image} 
              alt={supplier.name}
              className="w-32 h-32 rounded-lg object-cover"
            />
            
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl font-bold text-black">{supplier.name}</h1>
                {supplier.verified && (
                  <div className="flex items-center bg-green-100 text-green-800 px-3 py-1 rounded-full">
                    <Shield className="w-4 h-4 mr-1" />
                    <span className="text-sm font-medium">Verificado</span>
                  </div>
                )}
              </div>
              
              <div className="flex items-center text-gray-600 mb-3">
                <MapPin className="w-5 h-5 mr-2" />
                {supplier.location}
              </div>
              
              <div className="flex items-center mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-5 h-5 ${i < Math.floor(supplier.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                    />
                  ))}
                </div>
                <span className="text-gray-600 ml-2">
                  {supplier.rating} ({supplier.reviewCount} avaliações)
                </span>
              </div>
              
              <p className="text-gray-700 mb-6">{supplier.description}</p>
              
              <div className="flex gap-3">
                <button 
                  onClick={() => {
                    if (!user) {
                      toast({
                        title: "Faça login",
                        description: "Você precisa estar logado para iniciar conversas",
                        variant: "destructive",
                      });
                      return;
                    }
                    setShowConversationDialog(true);
                  }}
                  className="bg-[#FED141] text-black px-6 py-3 rounded-lg font-semibold hover:bg-yellow-400 transition-colors flex items-center"
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Iniciar Conversa
                </button>
                <button 
                  onClick={() => {
                    if (!user) {
                      toast({
                        title: "Faça login",
                        description: "Você precisa estar logado para favoritar fornecedores",
                        variant: "destructive",
                      });
                      return;
                    }
                    toggleFavorite(id!);
                  }}
                  className={`px-6 py-3 rounded-lg font-medium transition-colors flex items-center gap-2 ${
                    isFavorite(id!) 
                      ? 'bg-red-100 text-red-700 hover:bg-red-200' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <Heart className={`w-5 h-5 ${isFavorite(id!) ? 'fill-current' : ''}`} />
                  {isFavorite(id!) ? 'Remover dos Favoritos' : 'Salvar Fornecedor'}
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Products */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h2 className="text-2xl font-bold text-black mb-6">Produtos e Serviços</h2>
              <div className="space-y-4">
                {supplier.products.map((product, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-semibold text-black">{product.name}</h3>
                      <span className="text-lg font-bold text-[#FED141]">{product.price}</span>
                    </div>
                    <p className="text-gray-600">Pedido mínimo: {product.minOrder}</p>
                    <button className="mt-3 bg-gray-100 text-gray-700 px-4 py-2 rounded font-medium hover:bg-gray-200 transition-colors">
                      Solicitar Orçamento
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Specialties */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h2 className="text-2xl font-bold text-black mb-6">Especialidades</h2>
              <div className="flex flex-wrap gap-3">
                {supplier.specialties.map((specialty, index) => (
                  <span key={index} className="bg-[#FED141] text-black px-4 py-2 rounded-lg font-medium">
                    {specialty}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Company Info */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="text-xl font-bold text-black mb-4">Informações da Empresa</h3>
              <div className="space-y-3">
                <div>
                  <span className="text-gray-600">Fundada em:</span>
                  <span className="ml-2 font-medium">{supplier.founded}</span>
                </div>
                <div>
                  <span className="text-gray-600">Funcionários:</span>
                  <span className="ml-2 font-medium">{supplier.employees}</span>
                </div>
              </div>
            </div>

            {/* Contact Info */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="text-xl font-bold text-black mb-4">Contato</h3>
              <div className="space-y-3">
                <div className="flex items-center">
                  <Phone className="w-5 h-5 text-gray-600 mr-3" />
                  <span>{supplier.phone}</span>
                </div>
                <div className="flex items-center">
                  <Mail className="w-5 h-5 text-gray-600 mr-3" />
                  <span>{supplier.email}</span>
                </div>
                <div className="flex items-center">
                  <Globe className="w-5 h-5 text-gray-600 mr-3" />
                  <span>{supplier.website}</span>
                </div>
              </div>
            </div>

            {/* Certifications */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="text-xl font-bold text-black mb-4">Certificações</h3>
              <div className="space-y-2">
                {supplier.certifications.map((cert, index) => (
                  <div key={index} className="flex items-center">
                    <Shield className="w-4 h-4 text-green-600 mr-2" />
                    <span className="text-sm">{cert}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />

      <Dialog open={showConversationDialog} onOpenChange={setShowConversationDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Iniciar Conversa</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Assunto da conversa</label>
              <Input
                value={conversationSubject}
                onChange={(e) => setConversationSubject(e.target.value)}
                placeholder="Ex: Consulta sobre produtos"
              />
            </div>
            <Button
              onClick={async () => {
                if (!conversationSubject.trim()) {
                  toast({
                    title: "Erro",
                    description: "Por favor, informe o assunto da conversa",
                    variant: "destructive",
                  });
                  return;
                }
                const conversation = await createConversation(id!, conversationSubject);
                if (conversation) {
                  setShowConversationDialog(false);
                  setConversationSubject('');
                }
              }}
              className="w-full"
            >
              Criar Conversa
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SupplierProfile;
