import React, { useState, useMemo, useCallback } from 'react';
import { questions as initialQuestions } from './data/questions';
import type { Question } from './data/questions';
import { StoreProvider, useAppStore } from './store/StoreContext';
import { useEditedQuestions } from './store/useEditedQuestions';
import { AuthModal } from './components/AuthModal';
import { ProfileDropdown } from './components/ProfileDropdown';
import { useIsMobile } from './store/useIsMobile';
import { useVisitorCount } from './store/useVisitorCount';

// ── Theme tokens ─────────────────────────────────────────────────────────────
const C = {
  bg:       '#0d1117',
  surface:  '#161b22',
  border:   '#21262d',
  border2:  '#30363d',
  text:     '#e6edf3',
  muted:    '#8b949e',
  accent:   '#58a6ff',
  green:    '#3fb950',
  orange:   '#d29922',
  red:      '#f85149',
  purple:   '#bc8cff',
  cyan:     '#79c0ff',
};

const diff = {
  Easy:   { color: C.green,  bg: '#0d2818' },
  Medium: { color: C.orange, bg: '#2d1f00' },
  Hard:   { color: C.red,    bg: '#2d0c0c' },
};

// ── Visitor Badge ─────────────────────────────────────────────────────────────
function VisitorBadge() {
  const count = useVisitorCount();
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
      {/* Green dot */}
      <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#3fb950', flexShrink: 0 }} />
      <span style={{ fontSize: 14, fontWeight: 800, color: '#e6edf3', fontVariantNumeric: 'tabular-nums' }}>
        {count !== null ? count.toLocaleString() : '—'}
      </span>
      <span style={{ fontSize: 13, color: '#8b949e', fontWeight: 400 }}>visitors</span>
    </div>
  );
}

// ── Helpers ───────────────────────────────────────────────────────────────────
function Pill({ label, color, bg }: { label: string; color: string; bg: string }) {
  return (
    <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: 0.5, color, background: bg, padding: '3px 10px', borderRadius: 99, border: `1px solid ${color}40` }}>
      {label}
    </span>
  );
}

// ── Edit Modal ────────────────────────────────────────────────────────────────
function EditModal({ q, onClose, onSave, onReset, isEdited }: {
  q: Question;
  onClose: () => void;
  onSave: (updated: Question) => void;
  onReset?: () => void;
  isEdited?: boolean;
}) {
  const [form, setForm] = useState({ ...q });
  const set = (k: keyof Question, v: any) => setForm(f => ({ ...f, [k]: v }));

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 2000, background: 'rgba(0,0,0,0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}
      onClick={e => e.target === e.currentTarget && onClose()}>
      <div style={{ background: C.surface, border: `1px solid ${C.border2}`, borderRadius: 14, width: '100%', maxWidth: 720, maxHeight: '90vh', overflowY: 'auto', padding: 28 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <h2 style={{ margin: 0, color: C.text, fontSize: 18 }}>Edit Question #{q.id}</h2>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: C.muted, fontSize: 22, cursor: 'pointer' }}>✕</button>
        </div>
        {[
          { label: 'Title', key: 'title', multi: false },
          { label: 'Question', key: 'question', multi: true },
          { label: 'Input', key: 'input', multi: true },
          { label: 'Output', key: 'output', multi: false },
        ].map(({ label, key, multi }) => (
          <div key={key} style={{ marginBottom: 16 }}>
            <label style={{ color: C.muted, fontSize: 12, fontWeight: 600, letterSpacing: 1, textTransform: 'uppercase', display: 'block', marginBottom: 6 }}>{label}</label>
            {multi ? (
              <textarea value={(form as any)[key] || ''} onChange={e => set(key as keyof Question, e.target.value)} rows={5}
                style={{ width: '100%', background: C.bg, color: C.text, border: `1px solid ${C.border2}`, borderRadius: 8, padding: '10px 12px', fontSize: 13, fontFamily: 'monospace', resize: 'vertical', boxSizing: 'border-box' }} />
            ) : (
              <input value={(form as any)[key] || ''} onChange={e => set(key as keyof Question, e.target.value)}
                style={{ width: '100%', background: C.bg, color: C.text, border: `1px solid ${C.border2}`, borderRadius: 8, padding: '10px 12px', fontSize: 13, boxSizing: 'border-box' }} />
            )}
          </div>
        ))}
        <div style={{ marginBottom: 16 }}>
          <label style={{ color: C.muted, fontSize: 12, fontWeight: 600, letterSpacing: 1, textTransform: 'uppercase', display: 'block', marginBottom: 6 }}>Explanation</label>
          <textarea value={form.answer?.explanation || ''} onChange={e => set('answer', { ...form.answer, explanation: e.target.value })} rows={3}
            style={{ width: '100%', background: C.bg, color: C.text, border: `1px solid ${C.border2}`, borderRadius: 8, padding: '10px 12px', fontSize: 13, fontFamily: 'inherit', resize: 'vertical', boxSizing: 'border-box' }} />
        </div>
        <div style={{ marginBottom: 20 }}>
          <label style={{ color: C.muted, fontSize: 12, fontWeight: 600, letterSpacing: 1, textTransform: 'uppercase', display: 'block', marginBottom: 6 }}>Solution Code</label>
          <textarea value={form.answer?.code || ''} onChange={e => set('answer', { ...form.answer, code: e.target.value })} rows={12}
            style={{ width: '100%', background: '#010409', color: '#e6edf3', border: `1px solid ${C.border2}`, borderRadius: 8, padding: '10px 12px', fontSize: 12, fontFamily: "'Fira Code','Consolas',monospace", resize: 'vertical', boxSizing: 'border-box' }} />
        </div>
        <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
          {isEdited && onReset && (
            <button onClick={() => { onReset(); onClose(); }} style={{ padding: '9px 20px', background: 'none', border: `1px solid ${C.red}60`, color: C.red, borderRadius: 8, cursor: 'pointer', fontSize: 14, marginRight: 'auto' }}>
              ↺ Reset to Original
            </button>
          )}
          <button onClick={onClose} style={{ padding: '9px 20px', background: 'none', border: `1px solid ${C.border2}`, color: C.muted, borderRadius: 8, cursor: 'pointer', fontSize: 14 }}>Cancel</button>
          <button onClick={() => { onSave(form); onClose(); }} style={{ padding: '9px 20px', background: C.accent, border: 'none', color: '#000', borderRadius: 8, cursor: 'pointer', fontWeight: 700, fontSize: 14 }}>Save Changes</button>
        </div>
      </div>
    </div>
  );
}

// ── Syntax highlighter (Java, no deps) ───────────────────────────────────────
function highlight(code: string): React.ReactNode[] {
  const lines = code.split('\n');
  return lines.map((line, li) => {
    // Tokenise the line
    type Token = { type: string; val: string };
    const tokens: Token[] = [];
    let remaining = line;
    while (remaining.length > 0) {
      // comment
      const cm = remaining.match(/^(\/\/.*)/);
      if (cm) { tokens.push({ type: 'comment', val: cm[1] }); remaining = ''; continue; }
      // string
      const sm = remaining.match(/^(\"[^\"]*\"|'[^']*')/);
      if (sm) { tokens.push({ type: 'string', val: sm[1] }); remaining = remaining.slice(sm[1].length); continue; }
      // keyword
      const km = remaining.match(/^(\b(public|private|protected|static|void|int|double|float|long|boolean|char|class|interface|extends|implements|new|return|if|else|for|while|do|switch|case|break|continue|null|true|false|import|package|this|super|final|abstract|try|catch|finally|throw|throws|instanceof)\b)/);
      if (km) { tokens.push({ type: 'keyword', val: km[1] }); remaining = remaining.slice(km[1].length); continue; }
      // type name
      const tm = remaining.match(/^(Scanner|Arrays|ArrayList|HashMap|LinkedHashMap|HashSet|TreeSet|List|Map|Set|System|Math|StringBuilder|Integer|Double|Boolean|Character)\b/);
      if (tm) { tokens.push({ type: 'type', val: tm[1] }); remaining = remaining.slice(tm[1].length); continue; }
      // number
      const nm = remaining.match(/^(\d+\.?\d*)/);
      if (nm) { tokens.push({ type: 'number', val: nm[1] }); remaining = remaining.slice(nm[1].length); continue; }
      // annotation
      const am = remaining.match(/^(@\w+)/);
      if (am) { tokens.push({ type: 'annotation', val: am[1] }); remaining = remaining.slice(am[1].length); continue; }
      // method call
      const mmatch = remaining.match(/^([a-zA-Z_]\w*)(?=\s*\()/);
      if (mmatch) { tokens.push({ type: 'method', val: mmatch[1] }); remaining = remaining.slice(mmatch[1].length); continue; }
      // anything else — take one char or a word
      const other = remaining.match(/^([^a-zA-Z0-9"'\/]+|[a-zA-Z_]\w*)/);
      if (other) { tokens.push({ type: 'plain', val: other[1] }); remaining = remaining.slice(other[1].length); continue; }
      tokens.push({ type: 'plain', val: remaining[0] }); remaining = remaining.slice(1);
    }
    const colorMap: Record<string, string> = {
      keyword:    '#ff7b72',
      string:     '#a5d6ff',
      comment:    '#8b949e',
      number:     '#79c0ff',
      type:       '#ffa657',
      annotation: '#bc8cff',
      method:     '#d2a8ff',
      plain:      '#e6edf3',
    };
    return (
      <div key={li} style={{ minHeight: '1.8em' }}>
        {tokens.map((tok, ti) => (
          <span key={ti} style={{ color: colorMap[tok.type] }}>{tok.val}</span>
        ))}
      </div>
    );
  });
}

// ── Code Block ────────────────────────────────────────────────────────────────
function CodeBlock({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);
  const copy = () => { navigator.clipboard.writeText(code); setCopied(true); setTimeout(() => setCopied(false), 2000); };

  // Line numbers
  const lines = code.split('\n');
  const highlighted = highlight(code);

  return (
    <div style={{ borderRadius: 10, overflow: 'hidden', border: `1px solid ${C.border2}` }}>
      {/* Header bar */}
      <div style={{ background: '#161b22', padding: '9px 16px', display: 'flex', alignItems: 'center', gap: 10, borderBottom: `1px solid ${C.border}` }}>
        {/* Traffic lights */}
        <span style={{ width: 12, height: 12, borderRadius: '50%', background: '#ff5f57', display: 'inline-block' }} />
        <span style={{ width: 12, height: 12, borderRadius: '50%', background: '#febc2e', display: 'inline-block' }} />
        <span style={{ width: 12, height: 12, borderRadius: '50%', background: '#28c840', display: 'inline-block' }} />
        <span style={{ flex: 1 }} />
        <span style={{ color: C.muted, fontSize: 11, fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase' }}>Java</span>
        <span style={{ flex: 1 }} />
        <button onClick={copy} style={{
          background: copied ? '#1a3a1a' : C.border, color: copied ? C.green : C.muted,
          border: `1px solid ${copied ? C.green + '60' : C.border2}`,
          borderRadius: 6, padding: '4px 14px', cursor: 'pointer', fontSize: 11, fontWeight: 700,
          display: 'flex', alignItems: 'center', gap: 5, transition: 'all 0.2s'
        }}>
          {copied ? '✓ Copied!' : '⎘ Copy'}
        </button>
      </div>

      {/* Code with line numbers */}
      <div style={{ background: '#010409', display: 'flex', maxHeight: 560, overflow: 'auto' }}>
        {/* Line numbers */}
        <div style={{ padding: '16px 0', userSelect: 'none', flexShrink: 0 }}>
          {lines.map((_, i) => (
            <div key={i} style={{ padding: '0 16px 0 12px', fontSize: 12.5, lineHeight: 1.8, color: '#3d444d', textAlign: 'right', minWidth: 42 }}>
              {i + 1}
            </div>
          ))}
        </div>
        {/* Code */}
        <div style={{ borderLeft: `1px solid ${C.border}`, flex: 1, padding: '16px 20px', overflowX: 'auto' }}>
          <pre style={{ margin: 0, fontSize: 13, lineHeight: 1.8, fontFamily: "'Fira Code','Cascadia Code','Consolas','Courier New',monospace" }}>
            {highlighted}
          </pre>
        </div>
      </div>
    </div>
  );
}

// ── Project Renderer (Admin questions) ───────────────────────────────────────
function ProjectRenderer({ text }: { text: string }) {
  const lines = text.split('\n');
  const elements: React.ReactNode[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i].trim();
    if (!line) { i++; continue; }

    // Main title line (Project Title:)
    if (line.startsWith('Project Title:')) {
      elements.push(
        <div key={i} style={{ background: 'linear-gradient(135deg,#1a0a2e,#0d1117)', border: `1px solid ${C.purple}40`, borderRadius: 12, padding: '16px 20px', marginBottom: 24 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: C.purple, letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 6 }}>Project Title</div>
          <div style={{ fontSize: 17, fontWeight: 700, color: C.text }}>{line.replace('Project Title:', '').trim()}</div>
        </div>
      );
      i++; continue;
    }

    // Numbered section header like "1. Registration Page"
    const sectionMatch = line.match(/^(\d+)\.\s+(.+)/);
    if (sectionMatch) {
      const num = sectionMatch[1];
      const title = sectionMatch[2];
      // Collect bullet points under this section
      const bullets: string[] = [];
      i++;
      while (i < lines.length) {
        const sub = lines[i].trim();
        if (!sub) { i++; continue; }
        if (/^\d+\./.test(sub) || /^[A-Z]/.test(sub) && sub.endsWith(':')) break;
        if (sub.startsWith('-')) bullets.push(sub.slice(1).trim());
        else break;
        i++;
      }
      const sectionColors = ['#58a6ff','#3fb950','#d29922','#bc8cff','#79c0ff','#f85149','#ffa657'];
      const col = sectionColors[(parseInt(num)-1) % sectionColors.length];
      elements.push(
        <div key={`s${num}`} style={{ background: C.surface, border: `1px solid ${C.border2}`, borderLeft: `3px solid ${col}`, borderRadius: 10, padding: '16px 20px', marginBottom: 14 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: bullets.length ? 12 : 0 }}>
            <span style={{ width: 26, height: 26, borderRadius: 8, background: col + '20', border: `1px solid ${col}40`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 800, color: col, flexShrink: 0 }}>{num}</span>
            <span style={{ fontSize: 15, fontWeight: 700, color: C.text }}>{title}</span>
          </div>
          {bullets.length > 0 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6, paddingLeft: 36 }}>
              {bullets.map((b, bi) => (
                <div key={bi} style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                  <span style={{ color: col, fontSize: 14, flexShrink: 0, marginTop: 2 }}>›</span>
                  <span style={{ fontSize: 13.5, color: C.muted, lineHeight: 1.6 }}>{b}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      );
      continue;
    }

    // Section divider headers like "Pages to Develop:" or "Database Design:" or "Steps:"
    if (line.endsWith(':') && !line.startsWith('-')) {
      elements.push(
        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, margin: '24px 0 12px' }}>
          <div style={{ width: 3, height: 18, background: C.accent, borderRadius: 2 }} />
          <span style={{ fontSize: 12, fontWeight: 700, color: C.accent, letterSpacing: 1.5, textTransform: 'uppercase' }}>{line.replace(':', '')}</span>
          <div style={{ flex: 1, height: 1, background: C.border }} />
        </div>
      );
      i++; continue;
    }

    // Regular line
    elements.push(<p key={i} style={{ margin: '0 0 8px', fontSize: 14, color: C.text, lineHeight: 1.8 }}>{line}</p>);
    i++;
  }

  return <div>{elements}</div>;
}

// ── Question Page (LeetCode style full-page split) ────────────────────────────
function QuestionPage({
  currentQ, setCurrentQ, list, onClose, onEdit, isAdmin,
}: {
  currentQ: Question;
  setCurrentQ: (q: Question) => void;
  list: Question[];
  onClose: () => void;
  onEdit: (q: Question) => void;
  isAdmin: boolean;
}) {
  const { isCompleted, toggle } = useAppStore();
  const isMobile = useIsMobile();
  const [showAnswer, setShowAnswer] = useState(false);
  const [tab, setTab] = useState<'problem' | 'solution'>('problem');
  const done = isCompleted(currentQ.id);

  const idx = list.findIndex(x => x.id === currentQ.id);
  const prev = idx > 0 ? list[idx - 1] : null;
  const next = idx < list.length - 1 ? list[idx + 1] : null;

  React.useEffect(() => { setShowAnswer(false); setTab('problem'); }, [currentQ.id]);

  React.useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft' && prev) setCurrentQ(prev);
      if (e.key === 'ArrowRight' && next) setCurrentQ(next);
    };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, [prev, next, onClose, setCurrentQ]);

  const d = diff[currentQ.difficulty as keyof typeof diff];

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 1000, background: C.bg, display: 'flex', flexDirection: 'column' }}>
      {/* Top bar */}
      {isMobile ? (
        /* Mobile top bar — two rows */
        <div style={{ background: C.surface, borderBottom: `1px solid ${C.border}`, flexShrink: 0 }}>
          {/* Row 1 */}
          <div style={{ display: 'flex', alignItems: 'center', padding: '8px 12px', gap: 8 }}>
            <button onClick={onClose} style={{ background: 'none', border: `1px solid ${C.border2}`, color: C.muted, borderRadius: 6, padding: '4px 10px', cursor: 'pointer', fontSize: 12 }}>← Back</button>
            <span style={{ color: C.text, fontSize: 13, fontWeight: 600, flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{currentQ.title}</span>
            <button onClick={() => toggle(currentQ.id)} style={{ background: done ? C.green : 'none', border: `1px solid ${done ? C.green : C.border2}`, color: done ? '#000' : C.muted, borderRadius: 6, padding: '4px 10px', cursor: 'pointer', fontSize: 11, fontWeight: 700, flexShrink: 0 }}>
              {done ? '✓ Done' : 'Mark Done'}
            </button>
          </div>
          {/* Row 2 */}
          <div style={{ display: 'flex', alignItems: 'center', padding: '0 12px 8px', gap: 6 }}>
            <Pill label={currentQ.difficulty} color={d.color} bg={d.bg} />
            <Pill label={`${currentQ.marks}M`} color={currentQ.marks === 35 ? C.purple : C.cyan} bg={currentQ.marks === 35 ? '#1a0a2e' : '#0a1a2e'} />
            <span style={{ flex: 1 }} />
            <button onClick={() => prev && setCurrentQ(prev)} disabled={!prev} style={{ background: prev ? C.border2 : 'none', border: `1px solid ${C.border}`, color: prev ? C.text : C.border2, borderRadius: 6, padding: '4px 8px', cursor: prev ? 'pointer' : 'not-allowed', fontSize: 12 }}>←</button>
            <span style={{ color: C.muted, fontSize: 11 }}>{idx + 1}/{list.length}</span>
            <button onClick={() => next && setCurrentQ(next)} disabled={!next} style={{ background: next ? C.border2 : 'none', border: `1px solid ${C.border}`, color: next ? C.text : C.border2, borderRadius: 6, padding: '4px 8px', cursor: next ? 'pointer' : 'not-allowed', fontSize: 12 }}>→</button>
          </div>
        </div>
      ) : (
        /* Desktop top bar */
        <div style={{ height: 50, background: C.surface, borderBottom: `1px solid ${C.border}`, display: 'flex', alignItems: 'center', padding: '0 20px', gap: 12, flexShrink: 0 }}>
          <button onClick={onClose} style={{ background: 'none', border: `1px solid ${C.border2}`, color: C.muted, borderRadius: 6, padding: '4px 12px', cursor: 'pointer', fontSize: 13, display: 'flex', alignItems: 'center', gap: 6 }}>← Back</button>
          <div style={{ width: 1, height: 20, background: C.border2 }} />
          <span style={{ color: C.muted, fontSize: 13 }}>#{currentQ.id}</span>
          <span style={{ color: C.text, fontSize: 14, fontWeight: 600, flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{currentQ.title}</span>
          <Pill label={currentQ.difficulty} color={d.color} bg={d.bg} />
          <Pill label={`${currentQ.marks} MARKS`} color={currentQ.marks === 35 ? C.purple : C.cyan} bg={currentQ.marks === 35 ? '#1a0a2e' : '#0a1a2e'} />
          {isAdmin && <button onClick={() => onEdit(currentQ)} style={{ background: C.border2, border: 'none', color: C.text, borderRadius: 6, padding: '5px 14px', cursor: 'pointer', fontSize: 12, fontWeight: 600 }}>✏ Edit</button>}
          <button onClick={() => toggle(currentQ.id)} style={{ background: done ? C.green : 'none', border: `1px solid ${done ? C.green : C.border2}`, color: done ? '#000' : C.muted, borderRadius: 6, padding: '5px 14px', cursor: 'pointer', fontSize: 12, fontWeight: 700, transition: 'all 0.2s' }}>
            {done ? '✓ Done' : 'Mark Done'}
          </button>
          <div style={{ display: 'flex', gap: 6 }}>
            <button onClick={() => prev && setCurrentQ(prev)} disabled={!prev} style={{ background: prev ? C.border2 : 'none', border: `1px solid ${C.border}`, color: prev ? C.text : C.border2, borderRadius: 6, padding: '5px 10px', cursor: prev ? 'pointer' : 'not-allowed', fontSize: 12 }}>←</button>
            <span style={{ color: C.muted, fontSize: 12, alignSelf: 'center', minWidth: 60, textAlign: 'center' }}>{idx + 1} / {list.length}</span>
            <button onClick={() => next && setCurrentQ(next)} disabled={!next} style={{ background: next ? C.border2 : 'none', border: `1px solid ${C.border}`, color: next ? C.text : C.border2, borderRadius: 6, padding: '5px 10px', cursor: next ? 'pointer' : 'not-allowed', fontSize: 12 }}>→</button>
          </div>
        </div>
      )}

      {/* Split content */}
      <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
        {/* Left — Problem */}
        <div style={{ flex: 1, borderRight: isMobile ? 'none' : `1px solid ${C.border}`, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
          {/* Tab bar */}
          <div style={{ display: 'flex', borderBottom: `1px solid ${C.border}`, padding: '0 20px', background: C.surface, flexShrink: 0 }}>
            {(['problem', 'solution'] as const).map(t => (
              <button key={t} onClick={() => setTab(t)} style={{
                background: 'none', border: 'none', padding: '12px 16px', cursor: 'pointer',
                color: tab === t ? C.text : C.muted, fontSize: 13, fontWeight: tab === t ? 700 : 400,
                borderBottom: tab === t ? `2px solid ${C.accent}` : '2px solid transparent',
                textTransform: 'capitalize', letterSpacing: 0.3
              }}>{t}</button>
            ))}
          </div>

          <div style={{ flex: 1, overflowY: 'auto', padding: '28px 32px' }}>
            {tab === 'problem' ? (
              <>
                {/* Title */}
                <h1 style={{ margin: '0 0 14px', fontSize: 22, fontWeight: 800, color: C.text, lineHeight: 1.3 }}>
                  {currentQ.title}
                </h1>

                {/* Meta pills */}
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 24, alignItems: 'center' }}>
                  <Pill label={currentQ.difficulty} color={d.color} bg={d.bg} />
                  <Pill label={`${currentQ.marks} marks`} color={currentQ.marks === 35 ? C.purple : C.cyan} bg={currentQ.marks === 35 ? '#1a0a2e' : '#0a1a2e'} />
                  <Pill label={currentQ.subcategory} color={C.muted} bg={C.border} />
                  {currentQ.tags.map(t => <Pill key={t} label={t} color={C.accent} bg='#0d1f38' />)}
                </div>

                {/* Question description — render each line smartly */}
                <div style={{ marginBottom: 28 }}>
                  {currentQ.category === 'ADMIN' ? (
                    <ProjectRenderer text={currentQ.question} />
                  ) : currentQ.question.split('\n').map((line, i) => {
                    const trimmed = line.trim();
                    if (!trimmed) return <div key={i} style={{ height: 10 }} />;
                    const isAttr = /^[a-zA-Z_][\w\s]*[-–]\s*(int|String|double|boolean|float|long|char|void)/.test(trimmed);
                    const isHeader = /^[A-Za-z][\w\s]+:$/.test(trimmed) || /^(create|implement|note|input|output|example)/i.test(trimmed);
                    if (isAttr) return (
                      <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '5px 0', borderBottom: `1px solid ${C.border}` }}>
                        <span style={{ color: C.accent, fontFamily: 'monospace', fontSize: 13.5, minWidth: 160 }}>{trimmed.split(/[-–]/)[0].trim()}</span>
                        <span style={{ color: C.border2, fontSize: 12 }}>—</span>
                        <span style={{ color: C.orange, fontFamily: 'monospace', fontSize: 13 }}>{trimmed.split(/[-–]/)[1]?.trim()}</span>
                      </div>
                    );
                    if (isHeader) return (
                      <p key={i} style={{ margin: '14px 0 6px', fontSize: 13, fontWeight: 700, color: C.muted, letterSpacing: 0.8, textTransform: 'uppercase' }}>{trimmed}</p>
                    );
                    return <p key={i} style={{ margin: '0 0 8px', fontSize: 14.5, color: C.text, lineHeight: 1.85 }}>{trimmed}</p>;
                  })}
                </div>

                {/* Input / Output */}
                {(currentQ.input || currentQ.output) && (
                  <div style={{ display: 'grid', gridTemplateColumns: currentQ.input && currentQ.output ? '1fr 1fr' : '1fr', gap: 14, marginBottom: 24 }}>
                    {currentQ.input && (
                      <div style={{ background: '#010409', border: `1px solid ${C.border2}`, borderRadius: 10, overflow: 'hidden' }}>
                        <div style={{ padding: '8px 14px', background: C.border, display: 'flex', alignItems: 'center', gap: 8 }}>
                          <span style={{ width: 8, height: 8, borderRadius: '50%', background: C.cyan, display: 'inline-block' }} />
                          <span style={{ fontSize: 11, fontWeight: 700, color: C.muted, letterSpacing: 1, textTransform: 'uppercase' }}>Input</span>
                        </div>
                        <pre style={{ margin: 0, padding: '12px 16px', fontSize: 13, color: C.cyan, fontFamily: "'Fira Code',monospace", whiteSpace: 'pre-wrap', lineHeight: 1.7 }}>{currentQ.input}</pre>
                      </div>
                    )}
                    {currentQ.output && (
                      <div style={{ background: '#010409', border: `1px solid ${C.border2}`, borderRadius: 10, overflow: 'hidden' }}>
                        <div style={{ padding: '8px 14px', background: C.border, display: 'flex', alignItems: 'center', gap: 8 }}>
                          <span style={{ width: 8, height: 8, borderRadius: '50%', background: C.green, display: 'inline-block' }} />
                          <span style={{ fontSize: 11, fontWeight: 700, color: C.muted, letterSpacing: 1, textTransform: 'uppercase' }}>Output</span>
                        </div>
                        <pre style={{ margin: 0, padding: '12px 16px', fontSize: 13, color: C.green, fontFamily: "'Fira Code',monospace", whiteSpace: 'pre-wrap', lineHeight: 1.7 }}>{currentQ.output}</pre>
                      </div>
                    )}
                  </div>
                )}

                {/* Examples */}
                {currentQ.examples && currentQ.examples.length > 0 && (
                  <div style={{ marginBottom: 24 }}>
                    <div style={{ fontSize: 12, fontWeight: 700, color: C.muted, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{ width: 3, height: 14, background: C.accent, borderRadius: 2, display: 'inline-block' }} />
                      Examples
                    </div>
                    {currentQ.examples.map((ex, i) => (
                      <div key={i} style={{ background: '#010409', border: `1px solid ${C.border2}`, borderRadius: 10, marginBottom: 10, overflow: 'hidden' }}>
                        <div style={{ padding: '7px 14px', background: C.border, fontSize: 11, color: C.muted, fontWeight: 600 }}>Example {i + 1}</div>
                        <div style={{ padding: '12px 16px', display: 'flex', flexDirection: 'column', gap: 8 }}>
                          <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                            <span style={{ fontSize: 11, fontWeight: 700, color: C.muted, minWidth: 50, paddingTop: 1 }}>INPUT</span>
                            <code style={{ fontFamily: "'Fira Code',monospace", color: C.cyan, fontSize: 13, background: '#0d1117', padding: '3px 10px', borderRadius: 6, flex: 1, wordBreak: 'break-all' }}>{ex.input}</code>
                          </div>
                          <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                            <span style={{ fontSize: 11, fontWeight: 700, color: C.muted, minWidth: 50, paddingTop: 1 }}>OUTPUT</span>
                            <code style={{ fontFamily: "'Fira Code',monospace", color: C.green, fontSize: 13, background: '#0d1117', padding: '3px 10px', borderRadius: 6, flex: 1, wordBreak: 'break-all' }}>{ex.output}</code>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </>
            ) : (
              /* Solution tab */
              <div style={{ padding: '4px 0' }}>
                {!showAnswer ? (
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: 380, textAlign: 'center', gap: 20 }}>
                    {/* Lock icon */}
                    <div style={{ position: 'relative' }}>
                      <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'linear-gradient(135deg,#1a1f2e,#0d1117)', border: `2px solid ${C.border2}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 34 }}>🔐</div>
                      <div style={{ position: 'absolute', inset: -4, borderRadius: '50%', border: `1px solid ${C.accent}20` }} />
                    </div>
                    <div>
                      <div style={{ fontSize: 20, fontWeight: 800, color: C.text, marginBottom: 8 }}>Solution Hidden</div>
                      <div style={{ fontSize: 14, color: C.muted, maxWidth: 300, lineHeight: 1.65, margin: '0 auto' }}>
                        Try solving it yourself first.<br />Reveal when you're ready.
                      </div>
                    </div>
                    <button onClick={() => setShowAnswer(true)} style={{
                      padding: '12px 40px', background: `linear-gradient(135deg, ${C.accent}, #1f6feb)`,
                      color: '#fff', border: 'none', borderRadius: 10, cursor: 'pointer',
                      fontWeight: 700, fontSize: 15, boxShadow: `0 4px 20px ${C.accent}40`,
                      transition: 'transform 0.15s, box-shadow 0.15s'
                    }}
                      onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-2px)'; (e.currentTarget as HTMLButtonElement).style.boxShadow = `0 8px 28px ${C.accent}50`; }}
                      onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.transform = 'none'; (e.currentTarget as HTMLButtonElement).style.boxShadow = `0 4px 20px ${C.accent}40`; }}
                    >
                      Reveal Solution
                    </button>
                  </div>
                ) : currentQ.answer ? (
                  <div>
                    {/* Approach card */}
                    <div style={{ background: 'linear-gradient(135deg,#0d2818,#0a1f12)', border: `1px solid ${C.green}30`, borderRadius: 12, padding: '18px 22px', marginBottom: 22 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                        <div style={{ width: 28, height: 28, background: C.green + '20', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14 }}>💡</div>
                        <span style={{ fontSize: 12, fontWeight: 700, color: C.green, letterSpacing: 1.5, textTransform: 'uppercase' }}>Approach</span>
                      </div>
                      <p style={{ margin: 0, fontSize: 15, color: '#c3f0d0', lineHeight: 1.85, fontWeight: 400 }}>{currentQ.answer.explanation}</p>
                    </div>

                    {/* Code section header */}
                    {currentQ.answer.code && (
                      <>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                          <div style={{ width: 3, height: 16, background: C.accent, borderRadius: 2 }} />
                          <span style={{ fontSize: 12, fontWeight: 700, color: C.muted, letterSpacing: 1.5, textTransform: 'uppercase' }}>Solution Code</span>
                        </div>
                        <CodeBlock code={currentQ.answer.code} />
                      </>
                    )}

                    <button onClick={() => setShowAnswer(false)} style={{ marginTop: 18, background: 'none', border: `1px solid ${C.border2}`, borderRadius: 8, padding: '7px 20px', cursor: 'pointer', color: C.muted, fontSize: 13, display: 'flex', alignItems: 'center', gap: 6 }}>
                      🙈 Hide Solution
                    </button>
                  </div>
                ) : (
                  <div style={{ background: 'linear-gradient(135deg,#2d1f00,#1a1200)', border: `1px solid ${C.orange}30`, borderRadius: 12, padding: 32, textAlign: 'center' }}>
                    <div style={{ fontSize: 36, marginBottom: 14 }}>⚠️</div>
                    <div style={{ fontWeight: 700, color: C.orange, fontSize: 16, marginBottom: 8 }}>No solution available</div>
                    <div style={{ color: C.muted, fontSize: 13 }}>Use the ✏ Edit button above to add the solution</div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Right — quick info panel (hidden on mobile) */}
        {!isMobile && (
        <div className="qpage-right" style={{ width: 300, background: C.surface, display: 'flex', flexDirection: 'column', overflow: 'hidden', borderLeft: `1px solid ${C.border}` }}>
          <div style={{ padding: '14px 20px', borderBottom: `1px solid ${C.border}`, fontSize: 11, fontWeight: 700, color: C.muted, letterSpacing: 1.5, textTransform: 'uppercase' }}>Details</div>
          <div style={{ flex: 1, overflowY: 'auto', padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: 12 }}>
            <Row label="ID" value={`#${currentQ.id}`} />
            <Row label="Category" value={currentQ.category} />
            <Row label="Subcategory" value={currentQ.subcategory} />
            <Row label="Marks" value={`${currentQ.marks}`} />
            <Row label="Difficulty" value={currentQ.difficulty} color={d.color} />

            <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: 14, marginTop: 4 }}>
              <button onClick={() => toggle(currentQ.id)} style={{
                width: '100%', padding: '11px 0', borderRadius: 8, cursor: 'pointer', fontWeight: 700, fontSize: 14, transition: 'all 0.2s', border: 'none',
                background: done ? C.green : C.border2, color: done ? '#000' : C.text,
              }}>
                {done ? '✓ Completed — Undo' : '○ Mark as Complete'}
              </button>
            </div>

            <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: 14 }}>
              <div style={{ fontSize: 11, color: C.muted, fontWeight: 700, marginBottom: 10, letterSpacing: 1, textTransform: 'uppercase' }}>Tags</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {currentQ.tags.map(t => (
                  <span key={t} style={{ fontSize: 11, background: '#0d1f38', color: C.accent, padding: '3px 10px', borderRadius: 99, border: `1px solid ${C.accent}25` }}>{t}</span>
                ))}
              </div>
            </div>

            {/* Difficulty bar */}
            <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: 14 }}>
              <div style={{ fontSize: 11, color: C.muted, fontWeight: 700, marginBottom: 10, letterSpacing: 1, textTransform: 'uppercase' }}>Difficulty</div>
              <div style={{ display: 'flex', gap: 4 }}>
                {(['Easy','Medium','Hard'] as const).map(lv => (
                  <div key={lv} style={{ flex: 1, height: 6, borderRadius: 3, background: currentQ.difficulty === lv || (lv === 'Medium' && currentQ.difficulty === 'Hard') || (lv === 'Easy') ? diff[lv].color + (currentQ.difficulty === lv ? 'ff' : currentQ.difficulty === 'Hard' && lv !== 'Hard' ? '80' : currentQ.difficulty === 'Medium' && lv === 'Easy' ? '80' : '25') : C.border2 }} />
                ))}
              </div>
            </div>
          </div>
        </div>
        )}
      </div>
    </div>
  );
}

function Row({ label, value, color, mono }: { label: string; value: string; color?: string; mono?: boolean }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <span style={{ fontSize: 12, color: C.muted }}>{label}</span>
      <span style={{ fontSize: 12, color: color || C.text, fontFamily: mono ? 'monospace' : 'inherit', maxWidth: 180, textAlign: 'right', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{value}</span>
    </div>
  );
}

// ── Question Card ─────────────────────────────────────────────────────────────
function QuestionCard({ q, index, onOpen }: { q: Question; index: number; onOpen: (q: Question) => void }) {
  const { isCompleted, toggle } = useAppStore();
  const done = isCompleted(q.id);
  const d = diff[q.difficulty as keyof typeof diff];
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onClick={() => onOpen(q)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: done
          ? 'linear-gradient(135deg,#0d2818,#0a1f12)'
          : hovered ? '#1c2128' : C.surface,
        border: `1px solid ${done ? C.green + '60' : hovered ? C.border2 : C.border}`,
        borderRadius: 12,
        padding: '18px 20px',
        display: 'flex', alignItems: 'flex-start', gap: 16,
        cursor: 'pointer',
        transition: 'background 0.18s, border-color 0.18s, transform 0.18s, box-shadow 0.18s',
        transform: hovered ? 'translateY(-2px)' : 'none',
        boxShadow: hovered
          ? done ? `0 6px 24px ${C.green}18` : `0 6px 24px rgba(0,0,0,0.4)`
          : 'none',
      }}
    >
      {/* Checkbox */}
      <button
        onClick={e => { e.stopPropagation(); toggle(q.id); }}
        style={{
          width: 24, height: 24, borderRadius: 6, flexShrink: 0,
          border: `2px solid ${done ? C.green : hovered ? C.border2 : '#30363d'}`,
          background: done ? C.green : 'transparent',
          cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
          marginTop: 3, transition: 'all 0.18s',
        }}>
        {done && <span style={{ color: '#000', fontSize: 12, fontWeight: 900, lineHeight: 1 }}>✓</span>}
      </button>

      {/* Content */}
      <div style={{ flex: 1, minWidth: 0 }}>
        {/* ID + Title */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
          <span style={{ fontSize: 11, color: C.border2, fontFamily: 'monospace', flexShrink: 0 }}>#{index}</span>
          <span style={{
            fontSize: 15, fontWeight: 700,
            color: done ? C.green : C.text,
            textDecoration: done ? 'line-through' : 'none',
            overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
            opacity: done ? 0.75 : 1,
          }}>{q.title}</span>
        </div>
        {/* Pills row */}
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', alignItems: 'center' }}>
          <Pill label={q.difficulty} color={d.color} bg={d.bg} />
          <span style={{ width: 1, height: 12, background: C.border2, display: 'inline-block' }} />
          <Pill label={q.subcategory} color={C.muted} bg={C.border} />
          {q.tags.slice(0, 2).map(t => <Pill key={t} label={t} color={C.accent} bg='#0d1f38' />)}
        </div>
      </div>

      {/* Arrow */}
      <div style={{
        width: 28, height: 28, borderRadius: 8, flexShrink: 0,
        background: hovered ? (done ? C.green + '20' : C.accent + '15') : 'transparent',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        transition: 'all 0.18s', marginTop: 2,
        color: hovered ? (done ? C.green : C.accent) : C.border2,
        fontSize: 16,
      }}>›</div>
    </div>
  );
}

// ── Section ───────────────────────────────────────────────────────────────────
function Section({ title, subtitle, color, questions: qs, onOpen }: {
  title: string; subtitle: string; color: string;
  questions: Question[]; onOpen: (q: Question) => void;
}) {
  const { data } = useAppStore();
  const [search, setSearch] = useState('');
  const [diffFilter, setDiffFilter] = useState('');
  const [showDone, setShowDone] = useState(true);

  const completed = qs.filter(q => data.completed.includes(q.id)).length;
  const pct = qs.length === 0 ? 0 : Math.round((completed / qs.length) * 100);

  const filtered = useMemo(() => {
    let list = qs;
    if (search.trim()) {
      const s = search.toLowerCase();
      list = list.filter(x => x.title.toLowerCase().includes(s) || x.question.toLowerCase().includes(s) || x.subcategory.toLowerCase().includes(s) || x.tags.some(t => t.toLowerCase().includes(s)));
    }
    if (diffFilter) list = list.filter(x => x.difficulty === diffFilter);
    if (!showDone) list = list.filter(x => !data.completed.includes(x.id));
    return list;
  }, [qs, search, diffFilter, showDone, data.completed]);

  return (
    <section style={{ marginBottom: 48 }}>
      {/* Header */}
      <div style={{ marginBottom: 20 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12, marginBottom: 14 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 4, height: 24, background: color, borderRadius: 2 }} />
            <div>
              <h2 style={{ margin: 0, fontSize: 20, fontWeight: 800, color: C.text }}>{title}</h2>
              <p style={{ margin: '3px 0 0', fontSize: 12, color: C.muted }}>{completed} of {qs.length} completed &nbsp;·&nbsp; {pct}%</p>
            </div>
            <span style={{ fontSize: 11, fontWeight: 700, color, background: color + '18', border: `1px solid ${color}35`, padding: '3px 10px', borderRadius: 6, letterSpacing: 0.5 }}>{subtitle}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ fontSize: 24, fontWeight: 800, color, fontVariantNumeric: 'tabular-nums' }}>{completed}<span style={{ fontSize: 15, color: C.muted, fontWeight: 400 }}>/{qs.length}</span></span>
            <div style={{ background: C.border2, borderRadius: 99, height: 6, width: 100, overflow: 'hidden' }}>
              <div style={{ width: `${pct}%`, background: color, height: '100%', borderRadius: 99, transition: 'width 0.5s' }} />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap', alignItems: 'center' }}>
        <div style={{ flex: 1, minWidth: 200, display: 'flex', alignItems: 'center', background: C.surface, border: `1px solid ${C.border2}`, borderRadius: 8, padding: '8px 14px', gap: 8 }}>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search questions..."
            style={{ border: 'none', outline: 'none', width: '100%', fontSize: 13, color: C.text, background: 'transparent' }} />
          {search && <button onClick={() => setSearch('')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: C.muted, fontSize: 14, lineHeight: 1 }}>✕</button>}
        </div>
        {(['Easy', 'Medium', 'Hard'] as const).map(d => {
          const dc = diff[d]; const active = diffFilter === d;
          return (
            <button key={d} onClick={() => setDiffFilter(active ? '' : d)} style={{ padding: '8px 16px', borderRadius: 8, cursor: 'pointer', fontWeight: 600, fontSize: 12, border: `1px solid ${active ? dc.color : C.border2}`, background: active ? dc.bg : C.surface, color: active ? dc.color : C.muted, transition: 'all 0.15s' }}>{d}</button>
          );
        })}
        <button onClick={() => setShowDone(!showDone)} style={{ padding: '8px 16px', borderRadius: 8, cursor: 'pointer', fontWeight: 600, fontSize: 12, border: `1px solid ${!showDone ? C.accent : C.border2}`, background: !showDone ? '#0d1f38' : C.surface, color: !showDone ? C.accent : C.muted, transition: 'all 0.15s' }}>
          {showDone ? 'Hide Done' : 'Show All'}
        </button>
      </div>

      {filtered.length === 0 ? (
        <div style={{ background: C.surface, border: `1px dashed ${C.border2}`, borderRadius: 12, padding: 48, textAlign: 'center', color: C.muted }}>
          {completed === qs.length && !search && !diffFilter
            ? <><div style={{ fontSize: 15, fontWeight: 700, color: C.green, marginBottom: 4 }}>All {qs.length} questions completed!</div><div style={{ fontSize: 13 }}>Great work.</div></>
            : <div style={{ fontSize: 14 }}>No questions match your filter.</div>
          }
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(360px, 100%), 1fr))', gap: 12 }}>
          {filtered.map((q, idx) => <QuestionCard key={q.id} q={q} index={idx + 1} onOpen={onOpen} />)}
        </div>
      )}
    </section>
  );
}

// ── Main App ──────────────────────────────────────────────────────────────────
function App() {
  const { data, user, loading, synced } = useAppStore();
  const isMobile = useIsMobile();
  const { questions: allQuestions, saveEdit, resetEdit, hasEdit } = useEditedQuestions(initialQuestions);

  const [openId, setOpenId] = useState<number | null>(null);
  const [activeIds, setActiveIds] = useState<number[]>([]);
  const [editId, setEditId] = useState<number | null>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);

  const currentQ = openId != null ? (allQuestions.find(q => q.id === openId) ?? null) : null;
  const activeList = useMemo(() => activeIds.map(id => allQuestions.find(q => q.id === id)!).filter(Boolean), [activeIds, allQuestions]);
  const editQ = editId != null ? (allQuestions.find(q => q.id === editId) ?? null) : null;

  const ADMIN_EMAIL = 'vaibhavsingh01080@gmail.com';
  const isAdmin = user?.email === ADMIN_EMAIL;

  const ipaQ = useMemo(() => allQuestions.filter(q => q.category === 'IPA' && (!q.adminOnly || isAdmin)), [allQuestions, isAdmin]);
  const praQ = useMemo(() => allQuestions.filter(q => q.category === 'PRA' && (!q.adminOnly || isAdmin)), [allQuestions, isAdmin]);
  const adminQ = useMemo(() => isAdmin ? allQuestions.filter(q => q.category === 'ADMIN') : [], [allQuestions, isAdmin]);

  const totalDone = data.completed.length;
  const totalPct = Math.round((totalDone / allQuestions.length) * 100);
  const ipaDone = ipaQ.filter(q => data.completed.includes(q.id)).length;
  const praDone = praQ.filter(q => data.completed.includes(q.id)).length;

  // If not logged in, intercept question open and show auth modal instead
  const openQuestion = useCallback((q: Question, list: Question[]) => {
    if (!user) { setShowAuthModal(true); return; }
    setActiveIds(list.map(x => x.id));
    setOpenId(q.id);
  }, [user]);

  const handleSave = useCallback((updated: Question) => {
    saveEdit(updated);
    setEditId(null);
  }, [saveEdit]);

  const handleReset = useCallback((id: number) => {
    resetEdit(id);
  }, [resetEdit]);

  // Loading spinner
  if (loading) {
    return (
      <div style={{ minHeight: '100vh', background: C.bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ color: C.muted, fontSize: 15 }}>Loading…</div>
      </div>
    );
  }

  // Question detail page (logged-in only — guests can't reach openId)
  if (openId != null && currentQ && user) {
    return (
      <>
        <QuestionPage
          currentQ={currentQ}
          setCurrentQ={q => setOpenId(q.id)}
          list={activeList}
          onClose={() => { setOpenId(null); }}
          onEdit={q => setEditId(q.id)}
          isAdmin={isAdmin}
        />
        {editQ && (
          <EditModal
            q={editQ}
            onClose={() => setEditId(null)}
            onSave={handleSave}
            onReset={() => handleReset(editQ.id)}
            isEdited={hasEdit(editQ.id)}
          />
        )}
      </>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: C.bg, color: C.text }}>
      {/* Auth modal for guests trying to open a question */}
      {showAuthModal && <AuthModal onClose={() => setShowAuthModal(false)} />}

      {/* Header */}
      <header className="main-header" style={{ background: C.surface, borderBottom: `1px solid ${C.border}`, padding: isMobile ? '0 14px' : '0 32px', height: 58, display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 50 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{ background: C.accent + '20', border: `1px solid ${C.accent}30`, borderRadius: 8, width: 34, height: 34, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ color: C.accent, fontSize: 15, fontWeight: 900 }}>IP</span>
          </div>
          <div>
            <div style={{ color: C.text, fontWeight: 800, fontSize: 16, letterSpacing: -0.3 }}>IPA Practice</div>
            <div style={{ color: C.muted, fontSize: 11 }}>Question Bank</div>
          </div>
          <div style={{ width: 1, height: 28, background: C.border2 }} />
          <VisitorBadge />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          {user && !isMobile && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ background: C.border, borderRadius: 99, height: 5, width: 120, overflow: 'hidden' }}>
                <div style={{ width: `${totalPct}%`, background: `linear-gradient(90deg,${C.accent},${C.green})`, height: '100%', borderRadius: 99, transition: 'width 0.5s' }} />
              </div>
              <span style={{ color: C.text, fontSize: 13, fontWeight: 700 }}>{totalDone}<span style={{ color: C.muted, fontWeight: 400 }}>/{allQuestions.length}</span></span>
            </div>
          )}
          {user ? (
            <ProfileDropdown
              totalDone={totalDone} totalQ={allQuestions.length}
              ipaDone={ipaDone} ipaQ={ipaQ.length}
              praDone={praDone} praQ={praQ.length}
            />
          ) : (
            <button onClick={() => setShowAuthModal(true)} style={{
              padding: '7px 20px',
              background: `linear-gradient(135deg, #1f6feb, ${C.accent})`,
              color: '#fff', border: 'none', borderRadius: 8,
              cursor: 'pointer', fontWeight: 700, fontSize: 13,
              boxShadow: `0 2px 12px ${C.accent}30`,
            }}>
              Login / Register
            </button>
          )}
        </div>
      </header>

      {/* Stats bar */}
      <div className="stats-bar" style={{
        background: C.surface, borderBottom: `1px solid ${C.border}`,
        display: isMobile ? 'grid' : 'flex',
        gridTemplateColumns: isMobile ? '1fr 1fr 1fr' : undefined,
        alignItems: 'stretch',
        width: '100%',
        overflow: 'hidden',
      }}>
        {[
          { label: 'Total', value: String(allQuestions.length), color: C.accent },
          { label: 'Done', value: String(totalDone), color: C.green },
          { label: 'Remaining', value: String(allQuestions.length - totalDone), color: C.muted },
          { label: 'IPA\n35 marks', value: `${ipaDone}/${ipaQ.length}`, color: C.purple },
          { label: 'Coding\n15 marks', value: `${praDone}/${praQ.length}`, color: C.cyan },
        ].map((s, i) => (
          <div key={s.label} style={{
            display: 'flex', alignItems: 'center', gap: isMobile ? 6 : 10,
            padding: isMobile ? '10px 10px' : '14px 24px',
            borderRight: `1px solid ${C.border}`,
            borderBottom: isMobile && i < 3 ? `1px solid ${C.border}` : 'none',
            minWidth: 0,
          }}>
            <span style={{ fontSize: isMobile ? 16 : 22, fontWeight: 800, color: s.color, fontVariantNumeric: 'tabular-nums', flexShrink: 0 }}>{s.value}</span>
            <span style={{ fontSize: 10, color: C.muted, fontWeight: 500, lineHeight: 1.3, whiteSpace: 'pre-line', overflow: 'hidden' }}>{s.label}</span>
          </div>
        ))}
      </div>

      {/* Content */}
      <main style={{ maxWidth: 1320, margin: '0 auto', padding: isMobile ? '20px 14px' : '36px 28px' }}>
        <Section title="IPA Questions" subtitle="35 MARKS" color={C.purple} questions={ipaQ} onOpen={q => openQuestion(q, ipaQ)} />
        <Section title="Coding Questions" subtitle="15 MARKS" color={C.cyan} questions={praQ} onOpen={q => openQuestion(q, praQ)} />
        {isAdmin && adminQ.length > 0 && (
          <Section title="Admin — Projects & Notes" subtitle="ADMIN ONLY" color={C.red} questions={adminQ} onOpen={q => openQuestion(q, adminQ)} />
        )}
      </main>

      <footer style={{ borderTop: `1px solid ${C.border}`, padding: '14px 32px', textAlign: 'center', color: C.border2, fontSize: 12, background: C.surface }}>
        IPA Practice &nbsp;•&nbsp; {allQuestions.length} questions &nbsp;•&nbsp; Progress synced to cloud ☁
      </footer>
    </div>
  );
}

export default function Root() {
  return (
    <StoreProvider>
      <App />
    </StoreProvider>
  );
}
