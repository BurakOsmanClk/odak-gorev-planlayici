import type { Task } from '../interfaces/Task';

// Üst bölümdeki özet kartları ve ilerleme çubuğu
export default function StatsBar({ tasks }: { tasks: Task[] }) {
  const done = tasks.filter((t) => t.completed).length;
  const todayStr = new Date().toISOString().slice(0, 10);
  const overdue = tasks.filter((t) => !t.completed && t.dueDate && t.dueDate < todayStr).length;
  const percent = tasks.length ? Math.round((done / tasks.length) * 100) : 0;

  const items = [
    { label: 'Toplam', value: tasks.length, color: 'text-slate-800' },
    { label: 'Aktif', value: tasks.length - done, color: 'text-indigo-600' },
    { label: 'Tamamlanan', value: done, color: 'text-emerald-600' },
    { label: 'Geciken', value: overdue, color: 'text-rose-600' },
  ];

  return (
    <section className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {items.map((i) => (
          <div key={i.label}>
            <p className="text-xs font-medium uppercase tracking-wide text-slate-400">{i.label}</p>
            <p className={`text-2xl font-bold ${i.color}`}>{i.value}</p>
          </div>
        ))}
      </div>
      <div className="mt-4">
        <div className="mb-1 flex justify-between text-xs text-slate-500">
          <span>İlerleme</span>
          <span>%{percent}</span>
        </div>
        <div className="h-2 rounded-full bg-slate-100">
          <div className="h-2 rounded-full bg-emerald-500 transition-all" style={{ width: `${percent}%` }} />
        </div>
      </div>
    </section>
  );
}
