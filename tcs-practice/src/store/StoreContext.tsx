import React, { createContext, useContext } from 'react';
import { useStore } from './useStore';
import { useAuth } from './useAuth';
import type { User } from '@supabase/supabase-js';

type AuthType = ReturnType<typeof useAuth>;
type StoreType = ReturnType<typeof useStore>;

interface AppContextType extends StoreType, AuthType {}

const AppContext = createContext<AppContextType | null>(null);

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const auth = useAuth();
  const store = useStore(auth.user);

  return (
    <AppContext.Provider value={{ ...auth, ...store }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppStore(): AppContextType {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useAppStore must be inside StoreProvider');
  return ctx;
}
