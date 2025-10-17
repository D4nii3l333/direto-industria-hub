import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export const useSearchHistory = (userId: string | undefined) => {
  const [history, setHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (userId) {
      fetchHistory();
    }
  }, [userId]);

  const fetchHistory = async () => {
    try {
      const { data, error } = await supabase
        .from('search_history')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
        .limit(10);

      if (error) throw error;
      setHistory(data || []);
    } catch (error: any) {
      console.error('Error fetching search history:', error);
    } finally {
      setLoading(false);
    }
  };

  const addToHistory = async (searchTerm: string, resultsCount: number) => {
    if (!userId || !searchTerm.trim()) return;

    try {
      await supabase
        .from('search_history')
        .insert({
          user_id: userId,
          search_term: searchTerm,
          results_count: resultsCount
        });

      await fetchHistory();
    } catch (error: any) {
      console.error('Error adding to search history:', error);
    }
  };

  const deleteHistoryItem = async (id: string) => {
    try {
      await supabase
        .from('search_history')
        .delete()
        .eq('id', id);

      await fetchHistory();
    } catch (error: any) {
      console.error('Error deleting search history:', error);
    }
  };

  return { history, loading, addToHistory, deleteHistoryItem, refetch: fetchHistory };
};
