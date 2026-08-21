import { useState, useEffect, useCallback } from 'react';
import type { Question } from '../data/questions';
import { supabase } from '../lib/supabase';

export function useEditedQuestions(base: Question[]) {
  const [edits, setEdits] = useState<Record<number, Question>>({});
  const [deleted, setDeleted] = useState<Set<number>>(new Set());

  // Load edits + deleted on mount
  useEffect(() => {
    async function load() {
      const [{ data: editRows }, { data: delRows }] = await Promise.all([
        supabase.from('edited_questions').select('id, data'),
        supabase.from('deleted_questions').select('id'),
      ]);
      if (editRows) {
        const map: Record<number, Question> = {};
        editRows.forEach(r => { map[r.id] = r.data; });
        setEdits(map);
      }
      if (delRows) {
        setDeleted(new Set(delRows.map((r: { id: number }) => r.id)));
      }
    }
    load();
  }, []);

  // Merge: base (minus deleted) + edits (overrides + new admin questions)
  const questions: Question[] = [
    ...base
      .filter(q => !deleted.has(q.id))
      .map(q => edits[q.id] ? { ...q, ...edits[q.id] } : q),
    // Admin-added questions (id not in base)
    ...Object.values(edits).filter(q => !base.find(b => b.id === q.id)),
  ];

  // Save / update a question
  const saveEdit = useCallback(async (updated: Question) => {
    const { error } = await supabase
      .from('edited_questions')
      .upsert({ id: updated.id, data: updated, updated_at: new Date().toISOString() }, { onConflict: 'id' });
    if (error) { console.warn('[edits] save error:', error.message); return; }
    setEdits(prev => ({ ...prev, [updated.id]: updated }));
  }, []);

  // Reset an edit back to original
  const resetEdit = useCallback(async (id: number) => {
    await supabase.from('edited_questions').delete().eq('id', id);
    setEdits(prev => { const n = { ...prev }; delete n[id]; return n; });
  }, []);

  // Delete a question (hides from all users)
  const deleteQuestion = useCallback(async (id: number) => {
    // Remove from edits too if it was an admin-added question
    await Promise.all([
      supabase.from('deleted_questions').upsert({ id }, { onConflict: 'id' }),
      supabase.from('edited_questions').delete().eq('id', id),
    ]);
    setDeleted(prev => new Set([...prev, id]));
    setEdits(prev => { const n = { ...prev }; delete n[id]; return n; });
  }, []);

  // Add a brand new question
  const addQuestion = useCallback(async (q: Question) => {
    const { error } = await supabase
      .from('edited_questions')
      .upsert({ id: q.id, data: q, updated_at: new Date().toISOString() }, { onConflict: 'id' });
    if (error) { console.warn('[edits] add error:', error.message); return; }
    setEdits(prev => ({ ...prev, [q.id]: q }));
  }, []);

  const hasEdit = useCallback((id: number) => id in edits, [edits]);

  return { questions, saveEdit, resetEdit, deleteQuestion, addQuestion, hasEdit };
}
