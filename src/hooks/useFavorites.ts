import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export const useFavorites = (userId: string | undefined) => {
  const [favorites, setFavorites] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    if (userId) {
      fetchFavorites();
    }
  }, [userId]);

  const fetchFavorites = async () => {
    try {
      const { data, error } = await supabase
        .from('favorite_suppliers')
        .select(`
          *,
          suppliers (*)
        `)
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setFavorites(data || []);
    } catch (error: any) {
      console.error('Error fetching favorites:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleFavorite = async (supplierId: string) => {
    if (!userId) {
      toast({
        title: "Erro",
        description: "Você precisa estar logado para favoritar fornecedores",
        variant: "destructive",
      });
      return;
    }

    try {
      const existing = favorites.find(f => f.supplier_id === supplierId);

      if (existing) {
        const { error } = await supabase
          .from('favorite_suppliers')
          .delete()
          .eq('id', existing.id);

        if (error) throw error;

        toast({
          title: "Removido dos favoritos",
          description: "Fornecedor removido dos favoritos",
        });
      } else {
        const { error } = await supabase
          .from('favorite_suppliers')
          .insert({ user_id: userId, supplier_id: supplierId });

        if (error) throw error;

        toast({
          title: "Adicionado aos favoritos",
          description: "Fornecedor adicionado aos favoritos",
        });
      }

      await fetchFavorites();
    } catch (error: any) {
      toast({
        title: "Erro",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const isFavorite = (supplierId: string) => {
    return favorites.some(f => f.supplier_id === supplierId);
  };

  return { favorites, loading, toggleFavorite, isFavorite, refetch: fetchFavorites };
};
