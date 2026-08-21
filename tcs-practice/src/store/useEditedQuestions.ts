import { useState, useEffect, useCallback } from 'react';
import type { Question } from '../data/questions';

const KEY = 'tcs_edited_questions_v1';

function loadEdits(): Record<number, Partial<Question>> {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : {};
  } catch { return {}; }
}

export function useEditedQuestions(base: Question[]) {
  const [edits, setEdits] = useState<Record<number, Partial<Question>>>(loadEdits);

  // Persist edits to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(edits));
  }, [edits]);

  // Merge base questions with stored edits
  const questions = base.map(q =>
    edits[q.id] ? { ...q, ...edits[q.id] } : q
  );

  const saveEdit = useCallback((updated: Question) => {
    setEdits(prev => ({ ...prev, [updated.id]: updated }));
  }, []);

  const resetEdit = useCallback((id: number) => {
    setEdits(prev => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
  }, []);

  const hasEdit = useCallback((id: number) => id in edits, [edits]);

  return { questions, saveEdit, resetEdit, hasEdit };
}
