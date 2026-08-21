import { useState, useEffect, useCallback } from 'react';
import type { Question } from '../data/questions';
import { supabase } from '../lib/supabase';

export function useEditedQuestions(base: Question[]) {
  const [edits, setEdits] = useState<Record<number, Partial<Question>>>({});

  // Load all edits from Supabase on mount (all users see admin edits)
  useEffect(() => {
    supabase
      .from('edited_questions')
      .select('id, data')
      .then(({ data: rows, error }) => {
        if (error) { console.warn('[edits] load error:', error.message); return; }
        if (!rows) return;
        const map: Record<number, Partial<Question>> = {};
        rows.forEach(r => { map[r.id] = r.data; });
        setEdits(map);
      });
  }, []);

  // Merge base questions with edits
  const questions = base.map(q =>
    edits[q.id] ? { ...q, ...edits[q.id] } : q
  );

  // Save edit to Supabase (admin only — enforced by RLS)
  const saveEdit = useCallback(async (updated: Question) => {
    const { error } = await supabase
      .from('edited_questions')
      .upsert({ id: updated.id, data: updated, updated_at: new Date().toISOString() }, { onConflict: 'id' });
    if (error) { console.warn('[edits] save error:', error.message); return; }
    setEdits(prev => ({ ...prev, [updated.id]: updated }));
  }, []);

  // Reset — delete from Supabase
  const resetEdit = useCallback(async (id: number) => {
    await supabase.from('edited_questions').delete().eq('id', id);
    setEdits(prev => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
  }, []);

  const hasEdit = useCallback((id: number) => id in edits, [edits]);

  return { questions, saveEdit, resetEdit, hasEdit };
}
