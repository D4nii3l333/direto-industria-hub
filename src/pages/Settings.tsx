import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Mail, MapPin, Phone, Building, Upload, Plus, Trash2, LogOut } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import LoadingSpinner from '@/components/LoadingSpinner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';

interface Profile {
  id: string;
  full_name: string | null;
  contact_email: string | null;
  address: string | null;
  cnpj: string | null;
  phone: string | null;
  avatar_url: string | null;
}

interface UserCompany {
  id: string;
  company_name: string;
  cnpj: string | null;
  address: string | null;
  phone: string | null;
}

const Settings = () => {
  const { user, signOut, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [companies, setCompanies] = useState<UserCompany[]>([]);
  const [newCompany, setNewCompany] = useState({ company_name: '', cnpj: '', address: '', phone: '' });
  const [showAddCompany, setShowAddCompany] = useState(false);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/entrar');
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (user) {
      loadProfile();
      loadCompanies();
    }
  }, [user]);

  const loadProfile = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user?.id)
        .single();

      if (error) throw error;
      setProfile(data);
    } catch (error: any) {
      console.error('Error loading profile:', error);
      toast({
        title: 'Erro ao carregar perfil',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const loadCompanies = async () => {
    try {
      const { data, error } = await supabase
        .from('user_companies')
        .select('*')
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setCompanies(data || []);
    } catch (error: any) {
      console.error('Error loading companies:', error);
    }
  };

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile) return;

    setSaving(true);
    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          full_name: profile.full_name,
          contact_email: profile.contact_email,
          address: profile.address,
          cnpj: profile.cnpj,
          phone: profile.phone,
        })
        .eq('id', user?.id);

      if (error) throw error;

      toast({
        title: 'Perfil atualizado!',
        description: 'Suas informações foram salvas com sucesso.',
      });
    } catch (error: any) {
      toast({
        title: 'Erro ao atualizar perfil',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setSaving(false);
    }
  };

  const handleAddCompany = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCompany.company_name) return;

    try {
      const { error } = await supabase
        .from('user_companies')
        .insert({
          user_id: user?.id,
          ...newCompany,
        });

      if (error) throw error;

      toast({
        title: 'Empresa adicionada!',
        description: 'A empresa foi cadastrada com sucesso.',
      });

      setNewCompany({ company_name: '', cnpj: '', address: '', phone: '' });
      setShowAddCompany(false);
      loadCompanies();
    } catch (error: any) {
      toast({
        title: 'Erro ao adicionar empresa',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  const handleDeleteCompany = async (id: string) => {
    try {
      const { error } = await supabase
        .from('user_companies')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: 'Empresa removida',
        description: 'A empresa foi excluída com sucesso.',
      });

      loadCompanies();
    } catch (error: any) {
      toast({
        title: 'Erro ao remover empresa',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const handleDeleteAccount = async () => {
    try {
      // This would need to be implemented via an edge function for security
      toast({
        title: 'Funcionalidade em desenvolvimento',
        description: 'A exclusão de conta será implementada em breve.',
      });
    } catch (error: any) {
      toast({
        title: 'Erro ao excluir conta',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  if (authLoading || loading) {
    return <LoadingSpinner />;
  }

  if (!profile) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Configurações do Perfil</h1>

        {/* Profile Information */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Informações Pessoais</CardTitle>
            <CardDescription>Atualize suas informações de contato e empresa</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleProfileUpdate} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="full_name">Nome Completo</Label>
                  <div className="relative mt-1">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <Input
                      id="full_name"
                      type="text"
                      value={profile.full_name || ''}
                      onChange={(e) => setProfile({ ...profile, full_name: e.target.value })}
                      className="pl-10"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="contact_email">Email de Contato</Label>
                  <div className="relative mt-1">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <Input
                      id="contact_email"
                      type="email"
                      value={profile.contact_email || ''}
                      onChange={(e) => setProfile({ ...profile, contact_email: e.target.value })}
                      className="pl-10"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="phone">Telefone</Label>
                  <div className="relative mt-1">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <Input
                      id="phone"
                      type="tel"
                      value={profile.phone || ''}
                      onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                      className="pl-10"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="cnpj">CNPJ</Label>
                  <div className="relative mt-1">
                    <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <Input
                      id="cnpj"
                      type="text"
                      value={profile.cnpj || ''}
                      onChange={(e) => setProfile({ ...profile, cnpj: e.target.value })}
                      className="pl-10"
                    />
                  </div>
                </div>

                <div className="md:col-span-2">
                  <Label htmlFor="address">Endereço</Label>
                  <div className="relative mt-1">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <Input
                      id="address"
                      type="text"
                      value={profile.address || ''}
                      onChange={(e) => setProfile({ ...profile, address: e.target.value })}
                      className="pl-10"
                    />
                  </div>
                </div>
              </div>

              <Button type="submit" disabled={saving} className="w-full">
                {saving ? 'Salvando...' : 'Salvar Alterações'}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Companies Section */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Outras Empresas</CardTitle>
                <CardDescription>Gerencie suas empresas vinculadas</CardDescription>
              </div>
              <Button
                onClick={() => setShowAddCompany(!showAddCompany)}
                variant="outline"
                size="sm"
              >
                <Plus className="w-4 h-4 mr-2" />
                Adicionar Empresa
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {showAddCompany && (
              <form onSubmit={handleAddCompany} className="mb-6 p-4 bg-gray-50 rounded-lg space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="company_name">Nome da Empresa</Label>
                    <Input
                      id="company_name"
                      type="text"
                      value={newCompany.company_name}
                      onChange={(e) => setNewCompany({ ...newCompany, company_name: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="company_cnpj">CNPJ</Label>
                    <Input
                      id="company_cnpj"
                      type="text"
                      value={newCompany.cnpj}
                      onChange={(e) => setNewCompany({ ...newCompany, cnpj: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="company_phone">Telefone</Label>
                    <Input
                      id="company_phone"
                      type="tel"
                      value={newCompany.phone}
                      onChange={(e) => setNewCompany({ ...newCompany, phone: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="company_address">Endereço</Label>
                    <Input
                      id="company_address"
                      type="text"
                      value={newCompany.address}
                      onChange={(e) => setNewCompany({ ...newCompany, address: e.target.value })}
                    />
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button type="submit">Salvar Empresa</Button>
                  <Button type="button" variant="outline" onClick={() => setShowAddCompany(false)}>
                    Cancelar
                  </Button>
                </div>
              </form>
            )}

            {companies.length === 0 ? (
              <p className="text-gray-500 text-center py-8">Nenhuma empresa cadastrada</p>
            ) : (
              <div className="space-y-4">
                {companies.map((company) => (
                  <div key={company.id} className="flex justify-between items-center p-4 border rounded-lg">
                    <div>
                      <h3 className="font-semibold text-gray-900">{company.company_name}</h3>
                      <p className="text-sm text-gray-600">CNPJ: {company.cnpj || 'N/A'}</p>
                      <p className="text-sm text-gray-600">Tel: {company.phone || 'N/A'}</p>
                    </div>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <Trash2 className="w-4 h-4 text-red-500" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
                          <AlertDialogDescription>
                            Tem certeza que deseja remover esta empresa? Esta ação não pode ser desfeita.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancelar</AlertDialogCancel>
                          <AlertDialogAction onClick={() => handleDeleteCompany(company.id)}>
                            Excluir
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Account Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Ações da Conta</CardTitle>
            <CardDescription>Gerencie sua conta e privacidade</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button
              onClick={handleSignOut}
              variant="outline"
              className="w-full"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sair da Conta
            </Button>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive" className="w-full">
                  <Trash2 className="w-4 h-4 mr-2" />
                  Excluir Conta
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Confirmar exclusão de conta</AlertDialogTitle>
                  <AlertDialogDescription>
                    Esta ação é permanente e não pode ser desfeita. Todos os seus dados serão excluídos permanentemente.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancelar</AlertDialogCancel>
                  <AlertDialogAction onClick={handleDeleteAccount}>
                    Excluir Permanentemente
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </CardContent>
        </Card>
      </div>

      <Footer />
    </div>
  );
};

export default Settings;
