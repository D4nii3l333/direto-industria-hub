import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export const useConversations = (userId: string | undefined) => {
  const [conversations, setConversations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    if (userId) {
      fetchConversations();
    }
  }, [userId]);

  const fetchConversations = async () => {
    try {
      const { data, error } = await supabase
        .from('conversations')
        .select(`
          *,
          suppliers (name, logo),
          messages (count)
        `)
        .eq('user_id', userId)
        .order('updated_at', { ascending: false });

      if (error) throw error;
      setConversations(data || []);
    } catch (error: any) {
      console.error('Error fetching conversations:', error);
    } finally {
      setLoading(false);
    }
  };

  const createConversation = async (supplierId: string, subject: string) => {
    if (!userId) {
      toast({
        title: "Erro",
        description: "Você precisa estar logado para iniciar conversas",
        variant: "destructive",
      });
      return null;
    }

    try {
      const { data, error } = await supabase
        .from('conversations')
        .insert({
          user_id: userId,
          supplier_id: supplierId,
          subject,
          status: 'open'
        })
        .select()
        .single();

      if (error) throw error;

      toast({
        title: "Conversa iniciada",
        description: "Sua conversa com o fornecedor foi criada",
      });

      await fetchConversations();
      return data;
    } catch (error: any) {
      toast({
        title: "Erro",
        description: error.message,
        variant: "destructive",
      });
      return null;
    }
  };

  return { conversations, loading, createConversation, refetch: fetchConversations };
};
