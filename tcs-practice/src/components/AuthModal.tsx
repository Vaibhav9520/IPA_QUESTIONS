import React, { useState } from 'react';
import { useAppStore } from '../store/StoreContext';
import { supabase } from '../lib/supabase';

const C = {
  bg:      '#0d1117',
  surface: '#161b22',
  border:  '#21262d',
  border2: '#30363d',
  text:    '#e6edf3',
  muted:   '#8b949e',
  accent:  '#58a6ff',
  green:   '#3fb950',
  red:     '#f85149',
};

export function AuthModal({ onClose }: { onClose: () => void }) {
  const { signIn, signUp } = useAppStore();
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handle = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(''); setSuccess('');
    setLoading(true);

    if (!email || !password) { setError('Please fill in all fields.'); setLoading(false); return; }
    if (mode === 'register' && !name.trim()) { setError('Please enter your name.'); setLoading(false); return; }
    if (password.length < 6) { setError('Password must be at least 6 characters.'); setLoading(false); return; }

    if (mode === 'login') {
      const err = await signIn(email, password);
      if (err) setError(err.message);
      else onClose();
    } else {
      const err = await signUp(email, password);
      if (err) {
        setError(err.message);
      } else {
        const { data } = await supabase.auth.getUser();
        if (data.user) {
          await supabase.from('profiles').upsert({ id: data.user.id, name: name.trim() }, { onConflict: 'id' });
        }
        localStorage.setItem('pending_profile_name', name.trim());
        // Auto sign in after register (email confirmation is disabled)
        await signIn(email, password);
        onClose();
      }
    }
    setLoading(false);
  };

  const inputStyle: React.CSSProperties = {
    width: '100%', background: C.bg, color: C.text,
    border: `1px solid ${C.border2}`, borderRadius: 8,
    padding: '11px 14px', fontSize: 14, outline: 'none',
    boxSizing: 'border-box', transition: 'border-color 0.2s',
  };

  return (
    <div
      style={{ position: 'fixed', inset: 0, zIndex: 3000, background: 'rgba(0,0,0,0.75)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}
      onClick={e => e.target === e.currentTarget && onClose()}
    >
      <div style={{ width: '100%', maxWidth: 420, background: C.surface, border: `1px solid ${C.border2}`, borderRadius: 16, padding: 32, boxShadow: '0 24px 64px rgba(0,0,0,0.6)', position: 'relative' }}>

        {/* Close button */}
        <button onClick={onClose} style={{ position: 'absolute', top: 14, right: 14, background: 'none', border: 'none', color: C.muted, fontSize: 20, cursor: 'pointer', lineHeight: 1, borderRadius: 6, padding: '2px 6px' }}>✕</button>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <div style={{ fontSize: 32, marginBottom: 8 }}>🔐</div>
          <h2 style={{ margin: 0, fontSize: 20, fontWeight: 800, color: C.text }}>Login to open questions</h2>
          <p style={{ margin: '6px 0 0', color: C.muted, fontSize: 13 }}>Create a free account to track your progress</p>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', background: C.bg, borderRadius: 10, padding: 4, marginBottom: 24, border: `1px solid ${C.border}` }}>
          {(['login', 'register'] as const).map(m => (
            <button key={m} onClick={() => { setMode(m); setError(''); setSuccess(''); }} style={{
              flex: 1, padding: '9px 0',
              background: mode === m ? C.accent : 'none',
              color: mode === m ? '#000' : C.muted,
              border: 'none', borderRadius: 7, cursor: 'pointer',
              fontWeight: 700, fontSize: 13, transition: 'all 0.2s',
            }}>
              {m === 'login' ? 'Log In' : 'Register'}
            </button>
          ))}
        </div>

        <form onSubmit={handle} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {mode === 'register' && (
            <div>
              <label style={{ fontSize: 11, fontWeight: 700, color: C.muted, letterSpacing: 1, textTransform: 'uppercase', display: 'block', marginBottom: 6 }}>Your Name</label>
              <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Enter your full name"
                style={inputStyle}
                onFocus={e => (e.target.style.borderColor = C.accent)}
                onBlur={e => (e.target.style.borderColor = C.border2)}
                autoComplete="name" />
            </div>
          )}

          <div>
            <label style={{ fontSize: 11, fontWeight: 700, color: C.muted, letterSpacing: 1, textTransform: 'uppercase', display: 'block', marginBottom: 6 }}>Email</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com"
              style={inputStyle}
              onFocus={e => (e.target.style.borderColor = C.accent)}
              onBlur={e => (e.target.style.borderColor = C.border2)}
              autoComplete="email" />
          </div>

          <div>
            <label style={{ fontSize: 11, fontWeight: 700, color: C.muted, letterSpacing: 1, textTransform: 'uppercase', display: 'block', marginBottom: 6 }}>Password</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)}
              placeholder={mode === 'register' ? 'Min 6 characters' : '••••••••'}
              style={inputStyle}
              onFocus={e => (e.target.style.borderColor = C.accent)}
              onBlur={e => (e.target.style.borderColor = C.border2)}
              autoComplete={mode === 'login' ? 'current-password' : 'new-password'} />
          </div>

          {error && <div style={{ background: '#2d0c0c', border: `1px solid ${C.red}40`, borderRadius: 8, padding: '10px 14px', fontSize: 13, color: C.red }}>{error}</div>}
          {success && <div style={{ background: '#0d2818', border: `1px solid ${C.green}40`, borderRadius: 8, padding: '10px 14px', fontSize: 13, color: C.green }}>{success}</div>}

          <button type="submit" disabled={loading} style={{
            padding: '13px 0', marginTop: 4,
            background: loading ? C.border2 : `linear-gradient(135deg, #1f6feb, ${C.accent})`,
            color: loading ? C.muted : '#fff',
            border: 'none', borderRadius: 8, cursor: loading ? 'not-allowed' : 'pointer',
            fontWeight: 800, fontSize: 15, transition: 'all 0.2s',
            boxShadow: loading ? 'none' : `0 4px 20px ${C.accent}30`,
          }}>
            {loading ? 'Please wait…' : mode === 'login' ? 'Log In' : 'Create Account'}
          </button>
        </form>
      </div>
    </div>
  );
}
