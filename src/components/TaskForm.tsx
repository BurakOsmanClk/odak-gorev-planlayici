import { useState } from 'react';
import type { Category, Priority, TaskInput } from '../interfaces/Task';
import { CATEGORY_LABELS, PRIORITY_LABELS } from '../interfaces/Task';

interface Props {
  initial?: TaskInput;
  submitLabel: string;
  onSubmit: (input: TaskInput) => void;
  onCancel?: () => void;
}

const EMPTY: TaskInput = { title: '', note: '', category: 'is', priority: 'orta', dueDate: '' };

// Hem yeni görev ekleme hem de düzenleme için kullanılan form
export default function TaskForm({ initial = EMPTY, submitLabel, onSubmit, onCancel }: Props) {
  const [form, setForm] = useState<TaskInput>(initial);
  const [error, setError] = useState('');

  const set = <K extends keyof TaskInput>(key: K, value: TaskInput[K]) => setForm((f) => ({ ...f, [key]: value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim()) {
      setError('Görev başlığı boş bırakılamaz.');
      return;
    }
    onSubmit({ ...form, title: form.title.trim(), note: form.note.trim() });
    setError('');
    if (!onCancel) setForm(EMPTY); // ekleme formuysa temizle
  };

  const field = 'w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100';

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div>
        <input
          className={field}
          placeholder="Ne yapılacak?"
          value={form.title}
          onChange={(e) => set('title', e.target.value)}
          aria-label="Görev başlığı"
        />
        {error && <p className="mt-1 text-xs text-rose-600">{error}</p>}
      </div>
      <textarea className={`${field} resize-none`} rows={2} placeholder="Not (isteğe bağlı)" value={form.note} onChange={(e) => set('note', e.target.value)} aria-label="Not" />
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <label className="text-xs font-medium text-slate-500">
          Kategori
          <select className={`${field} mt-1`} value={form.category} onChange={(e) => set('category', e.target.value as Category)}>
            {Object.entries(CATEGORY_LABELS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
          </select>
        </label>
        <label className="text-xs font-medium text-slate-500">
          Öncelik
          <select className={`${field} mt-1`} value={form.priority} onChange={(e) => set('priority', e.target.value as Priority)}>
            {Object.entries(PRIORITY_LABELS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
          </select>
        </label>
        <label className="text-xs font-medium text-slate-500">
          Bitiş tarihi
          <input type="date" className={`${field} mt-1`} value={form.dueDate} onChange={(e) => set('dueDate', e.target.value)} />
        </label>
      </div>
      <div className="flex justify-end gap-2">
        {onCancel && (
          <button type="button" onClick={onCancel} className="rounded-lg px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100">
            Vazgeç
          </button>
        )}
        <button type="submit" className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700">
          {submitLabel}
        </button>
      </div>
    </form>
  );
}
