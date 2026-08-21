import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

const VISITED_KEY = 'ipa_visited';

export function useVisitorCount() {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    async function init() {
      try {
        const alreadyCounted = sessionStorage.getItem(VISITED_KEY);

        if (!alreadyCounted) {
          const { data, error } = await supabase.rpc('increment_visit_count');
          if (!error && data != null) {
            setCount(Number(data));
            sessionStorage.setItem(VISITED_KEY, '1');
            return;
          }
          console.warn('[visit_count] rpc error:', error?.message);
        }

        // Already counted this session — just read current total
        const { data, error } = await supabase
          .from('visit_count')
          .select('total')
          .eq('id', 1)
          .single();

        if (!error && data) setCount(Number(data.total));
        else console.warn('[visit_count] fetch error:', error?.message);

      } catch (e) {
        console.warn('[visit_count] unexpected error:', e);
      }
    }

    init();
  }, []);

  return count;
}
