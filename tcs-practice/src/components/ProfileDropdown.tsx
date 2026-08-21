import React, { useState, useRef, useEffect } from 'react';
import { useAppStore } from '../store/StoreContext';

const C = {
  bg:      '#0d1117',
  surface: '#161b22',
  surface2:'#1c2128',
  border:  '#21262d',
  border2: '#30363d',
  text:    '#e6edf3',
  muted:   '#8b949e',
  accent:  '#58a6ff',
  green:   '#3fb950',
  orange:  '#d29922',
  red:     '#f85149',
  purple:  '#bc8cff',
  cyan:    '#79c0ff',
};

export function ProfileDropdown({ totalDone, totalQ, ipaDone, ipaQ, praDone, praQ }: {
  totalDone: number; totalQ: number;
  ipaDone: number; ipaQ: number;
  praDone: number; praQ: number;
}) {
  const { user, signOut, name, updateName } = useAppStore();
  const [open, setOpen] = useState(false);
  const [editingName, setEditingName] = useState(false);
  const [nameInput, setNameInput] = useState('');
  const ref = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const displayName = name || user?.email?.split('@')[0] || 'User';
  const avatar = (name || user?.email || 'U')[0].toUpperCase();
  const pct = totalQ === 0 ? 0 : Math.round((totalDone / totalQ) * 100);

  const startEdit = () => { setNameInput(name); setEditingName(true); };
  const saveName = async () => {
    if (nameInput.trim()) await updateName(nameInput.trim());
    setEditingName(false);
  };

  return (
    <div ref={ref} style={{ position: 'relative' }}>
      {/* Avatar button */}
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          display: 'flex', alignItems: 'center', gap: 8,
          background: open ? C.surface2 : 'none',
          border: `1px solid ${open ? C.border2 : 'transparent'}`,
          borderRadius: 8, padding: '4px 10px 4px 4px',
          cursor: 'pointer', transition: 'all 0.15s',
        }}
        onMouseEnter={e => { if (!open) (e.currentTarget as HTMLButtonElement).style.background = C.surface2; }}
        onMouseLeave={e => { if (!open) (e.currentTarget as HTMLButtonElement).style.background = 'none'; }}
      >
        {/* Avatar circle */}
        <div style={{
          width: 30, height: 30, borderRadius: '50%',
          background: `linear-gradient(135deg, ${C.accent}40, ${C.purple}40)`,
          border: `2px solid ${C.accent}60`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 13, fontWeight: 800, color: C.accent, flexShrink: 0,
        }}>
          {avatar}
        </div>
        <div style={{ textAlign: 'left' }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: C.text, lineHeight: 1.2 }}>{displayName}</div>
          <div style={{ fontSize: 10, color: C.muted }}>{pct}% done</div>
        </div>
        <span style={{ color: C.muted, fontSize: 11, marginLeft: 2 }}>{open ? '▲' : '▼'}</span>
      </button>

      {/* Dropdown panel */}
      {open && (
        <div style={{
          position: 'absolute', top: 'calc(100% + 8px)', right: 0,
          width: 300, background: C.surface,
          border: `1px solid ${C.border2}`, borderRadius: 12,
          boxShadow: '0 16px 48px rgba(0,0,0,0.6)',
          zIndex: 200, overflow: 'hidden',
        }}>
          {/* Profile header */}
          <div style={{
            padding: '20px 20px 16px',
            background: `linear-gradient(135deg, ${C.accent}08, ${C.purple}08)`,
            borderBottom: `1px solid ${C.border}`,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 14 }}>
              {/* Big avatar */}
              <div style={{
                width: 52, height: 52, borderRadius: '50%',
                background: `linear-gradient(135deg, ${C.accent}30, ${C.purple}30)`,
                border: `2px solid ${C.accent}50`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 22, fontWeight: 800, color: C.accent, flexShrink: 0,
              }}>
                {avatar}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                {editingName ? (
                  <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                    <input
                      value={nameInput}
                      onChange={e => setNameInput(e.target.value)}
                      onKeyDown={e => { if (e.key === 'Enter') saveName(); if (e.key === 'Escape') setEditingName(false); }}
                      autoFocus
                      style={{
                        flex: 1, background: C.bg, color: C.text,
                        border: `1px solid ${C.accent}`, borderRadius: 6,
                        padding: '5px 8px', fontSize: 13, outline: 'none',
                      }}
                    />
                    <button onClick={saveName} style={{ background: C.accent, border: 'none', color: '#000', borderRadius: 6, padding: '5px 10px', cursor: 'pointer', fontWeight: 700, fontSize: 12 }}>✓</button>
                    <button onClick={() => setEditingName(false)} style={{ background: 'none', border: `1px solid ${C.border2}`, color: C.muted, borderRadius: 6, padding: '5px 8px', cursor: 'pointer', fontSize: 12 }}>✕</button>
                  </div>
                ) : (
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span style={{ fontSize: 16, fontWeight: 800, color: C.text, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{displayName}</span>
                    <button onClick={startEdit} title="Edit name" style={{ background: 'none', border: 'none', color: C.muted, cursor: 'pointer', fontSize: 12, padding: '2px 4px', borderRadius: 4, flexShrink: 0 }}>✏</button>
                  </div>
                )}
                <div style={{ fontSize: 11, color: C.muted, marginTop: 2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{user?.email}</div>
              </div>
            </div>

            {/* Overall progress bar */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                <span style={{ fontSize: 11, color: C.muted, fontWeight: 600, letterSpacing: 0.5 }}>OVERALL PROGRESS</span>
                <span style={{ fontSize: 12, fontWeight: 800, color: pct === 100 ? C.green : C.accent }}>{pct}%</span>
              </div>
              <div style={{ background: C.border, borderRadius: 99, height: 6, overflow: 'hidden' }}>
                <div style={{
                  width: `${pct}%`,
                  background: pct === 100
                    ? `linear-gradient(90deg, ${C.green}, #2ea043)`
                    : `linear-gradient(90deg, ${C.accent}, ${C.purple})`,
                  height: '100%', borderRadius: 99, transition: 'width 0.5s',
                }} />
              </div>
              <div style={{ fontSize: 11, color: C.muted, marginTop: 4, textAlign: 'right' }}>{totalDone} / {totalQ} completed</div>
            </div>
          </div>

          {/* Stats grid */}
          <div style={{ padding: '14px 20px', borderBottom: `1px solid ${C.border}` }}>
            <div style={{ fontSize: 10, fontWeight: 700, color: C.muted, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 10 }}>Stats</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
              {[
                { label: 'IPA (35M)', done: ipaDone, total: ipaQ, color: C.purple },
                { label: 'Coding (15M)', done: praDone, total: praQ, color: C.cyan },
              ].map(s => {
                const p = s.total === 0 ? 0 : Math.round((s.done / s.total) * 100);
                return (
                  <div key={s.label} style={{ background: C.bg, borderRadius: 8, padding: '10px 12px', border: `1px solid ${C.border}` }}>
                    <div style={{ fontSize: 10, color: C.muted, fontWeight: 600, marginBottom: 4 }}>{s.label}</div>
                    <div style={{ fontSize: 18, fontWeight: 800, color: s.color, marginBottom: 6 }}>{s.done}<span style={{ fontSize: 11, color: C.muted, fontWeight: 400 }}>/{s.total}</span></div>
                    <div style={{ background: C.border, borderRadius: 99, height: 3, overflow: 'hidden' }}>
                      <div style={{ width: `${p}%`, background: s.color, height: '100%', borderRadius: 99, transition: 'width 0.5s' }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Sign out */}
          <div style={{ padding: '10px 12px' }}>
            <button
              onClick={signOut}
              style={{
                width: '100%', padding: '9px 14px', background: 'none',
                border: `1px solid ${C.border2}`, borderRadius: 8,
                color: C.muted, cursor: 'pointer', fontSize: 13, fontWeight: 600,
                display: 'flex', alignItems: 'center', gap: 8, justifyContent: 'center',
                transition: 'all 0.15s',
              }}
              onMouseEnter={e => { const b = e.currentTarget as HTMLButtonElement; b.style.borderColor = C.red; b.style.color = C.red; b.style.background = '#2d0c0c'; }}
              onMouseLeave={e => { const b = e.currentTarget as HTMLButtonElement; b.style.borderColor = C.border2; b.style.color = C.muted; b.style.background = 'none'; }}
            >
              <span>⎋</span> Sign out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
