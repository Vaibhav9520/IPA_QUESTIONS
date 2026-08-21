import { useState, useEffect, useCallback, useRef } from 'react';
import { supabase } from '../lib/supabase';
import type { User } from '@supabase/supabase-js';

export interface UserData {
  completed: number[];
}

const DEFAULT: UserData = { completed: [] };

// Fallback local storage key (used when not logged in)
const LOCAL_KEY = 'tcs_ipa_pra_v2';

function loadLocal(): UserData {
  try {
    const raw = localStorage.getItem(LOCAL_KEY);
    return raw ? { ...DEFAULT, ...JSON.parse(raw) } : { ...DEFAULT };
  } catch { return { ...DEFAULT }; }
}

export function useStore(user: User | null) {
  const [data, setData] = useState<UserData>(DEFAULT);
  const [synced, setSynced] = useState(false);
  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Load progress from Supabase when user logs in
  useEffect(() => {
    if (!user) {
      // Not logged in — use localStorage
      setData(loadLocal());
      setSynced(true);
      return;
    }

    setSynced(false);
    supabase
      .from('user_progress')
      .select('completed')
      .eq('user_id', user.id)
      .single()
      .then(({ data: row, error }) => {
        if (error && error.code !== 'PGRST116') {
          // PGRST116 = no rows found, that's fine for new users
          console.error('Error loading progress:', error);
        }
        setData({ completed: row?.completed ?? [] });
        setSynced(true);
      });
  }, [user?.id]);

  // Save to Supabase (debounced) or localStorage
  const persist = useCallback((newData: UserData) => {
    if (!user) {
      localStorage.setItem(LOCAL_KEY, JSON.stringify(newData));
      return;
    }

    // Debounce DB writes by 800ms to avoid spamming
    if (saveTimer.current) clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(async () => {
      await supabase
        .from('user_progress')
        .upsert({ user_id: user.id, completed: newData.completed }, { onConflict: 'user_id' });
    }, 800);
  }, [user?.id]);

  const toggle = useCallback((id: number) => {
    setData(prev => {
      const next = {
        completed: prev.completed.includes(id)
          ? prev.completed.filter(x => x !== id)
          : [...prev.completed, id]
      };
      persist(next);
      return next;
    });
  }, [persist]);

  const isCompleted = useCallback((id: number) => data.completed.includes(id), [data]);

  return { data, toggle, isCompleted, synced };
}
