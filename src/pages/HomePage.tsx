import { useMemo, useState } from 'react';
import StatsBar from '../components/StatsBar';
import TaskForm from '../components/TaskForm';
import FilterBar from '../components/FilterBar';
import TaskItem from '../components/TaskItem';
import Modal from '../components/Modal';
import { useTasks } from '../hooks/useTasks';
import type { Filter, Task } from '../interfaces/Task';

const PRIORITY_ORDER = { yuksek: 0, orta: 1, dusuk: 2 };

export default function HomePage() {
  const { tasks, addTask, updateTask, toggleTask, deleteTask, clearCompleted } = useTasks();
  const [filter, setFilter] = useState<Filter>('tumu');
  const [search, setSearch] = useState('');
  const [editing, setEditing] = useState<Task | null>(null);
  const [deleting, setDeleting] = useState<Task | null>(null);

  // Listeleme: filtre + arama + sıralama (önce aktifler, sonra öncelik)
  const visible = useMemo(() => {
    const q = search.trim().toLocaleLowerCase('tr');
    return tasks
      .filter((t) => (filter === 'aktif' ? !t.completed : filter === 'tamamlanan' ? t.completed : true))
      .filter((t) => !q || t.title.toLocaleLowerCase('tr').includes(q) || t.note.toLocaleLowerCase('tr').includes(q))
      .sort((a, b) => Number(a.completed) - Number(b.completed) || PRIORITY_ORDER[a.priority] - PRIORITY_ORDER[b.priority]);
  }, [tasks, filter, search]);

  const hasCompleted = tasks.some((t) => t.completed);

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-gradient-to-r from-indigo-600 to-violet-600 pb-24 pt-8 text-white">
        <div className="mx-auto max-w-3xl px-4">
          <h1 className="text-3xl font-bold tracking-tight">Odak</h1>
          <p className="mt-1 text-indigo-100">Günlük görevlerini planla, önceliklendir ve tamamla.</p>
        </div>
      </header>

      <main className="mx-auto -mt-16 max-w-3xl space-y-6 px-4 pb-16">
        <StatsBar tasks={tasks} />

        <section className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
          <h2 className="mb-3 font-semibold text-slate-800">Yeni görev</h2>
          <TaskForm submitLabel="Ekle" onSubmit={addTask} />
        </section>

        <section className="space-y-4">
          <FilterBar filter={filter} onFilter={setFilter} search={search} onSearch={setSearch} />

          {visible.length === 0 ? (
            <div className="rounded-xl border-2 border-dashed border-slate-200 p-10 text-center text-slate-400">
              {tasks.length === 0 ? 'Henüz görev yok. İlk görevini yukarıdan ekle.' : 'Bu filtreye uyan görev bulunamadı.'}
            </div>
          ) : (
            <ul className="space-y-3">
              {visible.map((t) => (
                <TaskItem key={t.id} task={t} onToggle={toggleTask} onEdit={setEditing} onDelete={setDeleting} />
              ))}
            </ul>
          )}

          {hasCompleted && (
            <div className="text-right">
              <button onClick={clearCompleted} className="text-sm text-slate-500 hover:text-rose-600">
                Tamamlananları temizle
              </button>
            </div>
          )}
        </section>
      </main>

      {editing && (
        <Modal title="Görevi düzenle" onClose={() => setEditing(null)}>
          <TaskForm
            initial={{ title: editing.title, note: editing.note, category: editing.category, priority: editing.priority, dueDate: editing.dueDate }}
            submitLabel="Kaydet"
            onCancel={() => setEditing(null)}
            onSubmit={(input) => {
              updateTask(editing.id, input);
              setEditing(null);
            }}
          />
        </Modal>
      )}

      {deleting && (
        <Modal title="Görevi sil" onClose={() => setDeleting(null)}>
          <p className="text-sm text-slate-600">
            <strong className="text-slate-800">“{deleting.title}”</strong> görevini silmek istediğine emin misin? Bu işlem geri alınamaz.
          </p>
          <div className="mt-6 flex justify-end gap-2">
            <button onClick={() => setDeleting(null)} className="rounded-lg px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100">
              Vazgeç
            </button>
            <button
              onClick={() => {
                deleteTask(deleting.id);
                setDeleting(null);
              }}
              className="rounded-lg bg-rose-600 px-4 py-2 text-sm font-semibold text-white hover:bg-rose-700"
            >
              Sil
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}
