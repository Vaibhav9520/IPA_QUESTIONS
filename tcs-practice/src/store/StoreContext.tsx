import React, { createContext, useContext } from 'react';
import { useStore } from './useStore';
import { useAuth } from './useAuth';
import { useProfile } from './useProfile';

type AuthType = ReturnType<typeof useAuth>;
type StoreType = ReturnType<typeof useStore>;
type ProfileType = ReturnType<typeof useProfile>;

interface AppContextType extends StoreType, AuthType, ProfileType {}

const AppContext = createContext<AppContextType | null>(null);

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const auth = useAuth();
  const store = useStore(auth.user);
  const profile = useProfile(auth.user);

  return (
    <AppContext.Provider value={{ ...auth, ...store, ...profile }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppStore(): AppContextType {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useAppStore must be inside StoreProvider');
  return ctx;
}
