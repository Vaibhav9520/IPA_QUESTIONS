import React, { useState } from 'react';
import { useAppStore } from '../store/StoreContext';

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

export function AuthPage() {
  const { signIn, signUp } = useAppStore();
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handle = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    if (!email || !password) {
      setError('Please fill in all fields.');
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      setLoading(false);
      return;
    }

    if (mode === 'login') {
      const err = await signIn(email, password);
      if (err) setError(err.message);
    } else {
      const err = await signUp(email, password);
      if (err) {
        setError(err.message);
      } else {
        setSuccess('Account created! Check your email to confirm, then log in.');
        setMode('login');
        setPassword('');
      }
    }

    setLoading(false);
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    background: C.bg,
    color: C.text,
    border: `1px solid ${C.border2}`,
    borderRadius: 8,
    padding: '11px 14px',
    fontSize: 14,
    outline: 'none',
    boxSizing: 'border-box',
    transition: 'border-color 0.2s',
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: C.bg,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 24,
      fontFamily: "'Inter','Segoe UI',sans-serif",
    }}>
      <div style={{ width: '100%', maxWidth: 400 }}>
        {/* Logo / Header */}
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <div style={{
            width: 56, height: 56, borderRadius: 16,
            background: `linear-gradient(135deg, ${C.accent}, #1f6feb)`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 26, margin: '0 auto 16px',
            boxShadow: `0 8px 24px ${C.accent}40`,
          }}>
            IP
          </div>
          <h1 style={{ margin: 0, fontSize: 24, fontWeight: 800, color: C.text }}>IPA Practice</h1>
          <p style={{ margin: '6px 0 0', color: C.muted, fontSize: 14 }}>TCS IPA + PRA Question Bank</p>
        </div>

        {/* Card */}
        <div style={{
          background: C.surface,
          border: `1px solid ${C.border2}`,
          borderRadius: 14,
          padding: 32,
        }}>
          {/* Tab switcher */}
          <div style={{
            display: 'flex',
            background: C.bg,
            borderRadius: 8,
            padding: 3,
            marginBottom: 28,
            border: `1px solid ${C.border}`,
          }}>
            {(['login', 'register'] as const).map(m => (
              <button key={m} onClick={() => { setMode(m); setError(''); setSuccess(''); }} style={{
                flex: 1,
                padding: '8px 0',
                background: mode === m ? C.accent : 'none',
                color: mode === m ? '#000' : C.muted,
                border: 'none',
                borderRadius: 6,
                cursor: 'pointer',
                fontWeight: 700,
                fontSize: 13,
                textTransform: 'capitalize',
                transition: 'all 0.2s',
              }}>
                {m === 'login' ? 'Log In' : 'Register'}
              </button>
            ))}
          </div>

          <form onSubmit={handle} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div>
              <label style={{ fontSize: 12, fontWeight: 600, color: C.muted, letterSpacing: 0.8, textTransform: 'uppercase', display: 'block', marginBottom: 6 }}>
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="you@example.com"
                style={inputStyle}
                onFocus={e => (e.target.style.borderColor = C.accent)}
                onBlur={e => (e.target.style.borderColor = C.border2)}
                autoComplete="email"
              />
            </div>

            <div>
              <label style={{ fontSize: 12, fontWeight: 600, color: C.muted, letterSpacing: 0.8, textTransform: 'uppercase', display: 'block', marginBottom: 6 }}>
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder={mode === 'register' ? 'Min 6 characters' : '••••••••'}
                style={inputStyle}
                onFocus={e => (e.target.style.borderColor = C.accent)}
                onBlur={e => (e.target.style.borderColor = C.border2)}
                autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
              />
            </div>

            {error && (
              <div style={{ background: '#2d0c0c', border: `1px solid ${C.red}40`, borderRadius: 8, padding: '10px 14px', fontSize: 13, color: C.red }}>
                {error}
              </div>
            )}

            {success && (
              <div style={{ background: '#0d2818', border: `1px solid ${C.green}40`, borderRadius: 8, padding: '10px 14px', fontSize: 13, color: C.green }}>
                {success}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              style={{
                padding: '12px 0',
                background: loading ? C.border2 : `linear-gradient(135deg, ${C.accent}, #1f6feb)`,
                color: loading ? C.muted : '#fff',
                border: 'none',
                borderRadius: 8,
                cursor: loading ? 'not-allowed' : 'pointer',
                fontWeight: 700,
                fontSize: 15,
                marginTop: 4,
                transition: 'all 0.2s',
                boxShadow: loading ? 'none' : `0 4px 16px ${C.accent}30`,
              }}
            >
              {loading ? 'Please wait…' : mode === 'login' ? 'Log In' : 'Create Account'}
            </button>
          </form>
        </div>

        <p style={{ textAlign: 'center', marginTop: 20, fontSize: 13, color: C.muted }}>
          {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
          <button
            onClick={() => { setMode(mode === 'login' ? 'register' : 'login'); setError(''); setSuccess(''); }}
            style={{ background: 'none', border: 'none', color: C.accent, cursor: 'pointer', fontSize: 13, fontWeight: 600, padding: 0 }}
          >
            {mode === 'login' ? 'Register' : 'Log In'}
          </button>
        </p>
      </div>
    </div>
  );
}
