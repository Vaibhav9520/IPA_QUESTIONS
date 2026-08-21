import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import type { User } from '@supabase/supabase-js';

export function useProfile(user: User | null) {
  const [name, setName] = useState('');
  const [loadingProfile, setLoadingProfile] = useState(false);

  useEffect(() => {
    if (!user) { setName(''); return; }
    setLoadingProfile(true);
    supabase
      .from('profiles')
      .select('name')
      .eq('id', user.id)
      .single()
      .then(({ data }) => {
        setName(data?.name ?? '');
        setLoadingProfile(false);
      });
  }, [user?.id]);

  const updateName = useCallback(async (newName: string) => {
    if (!user) return;
    setName(newName);
    await supabase
      .from('profiles')
      .upsert({ id: user.id, name: newName }, { onConflict: 'id' });
  }, [user?.id]);

  return { name, loadingProfile, updateName };
}
