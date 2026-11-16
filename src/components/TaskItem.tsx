import type { Task } from '../interfaces/Task';
import { CATEGORY_LABELS, PRIORITY_LABELS } from '../interfaces/Task';

interface Props {
  task: Task;
  onToggle: (id: string) => void;
  onEdit: (task: Task) => void;
  onDelete: (task: Task) => void;
}

const PRIORITY_STYLE = {
  yuksek: 'bg-rose-50 text-rose-700 ring-rose-200',
  orta: 'bg-amber-50 text-amber-700 ring-amber-200',
  dusuk: 'bg-sky-50 text-sky-700 ring-sky-200',
};

function formatDate(d: string) {
  return new Date(d + 'T00:00:00').toLocaleDateString('tr-TR', { day: 'numeric', month: 'short' });
}

export default function TaskItem({ task, onToggle, onEdit, onDelete }: Props) {
  const todayStr = new Date().toISOString().slice(0, 10);
  const overdue = !task.completed && task.dueDate && task.dueDate < todayStr;

  return (
    <li className="group flex items-start gap-3 rounded-xl bg-white p-4 shadow-sm ring-1 ring-slate-200 transition hover:ring-indigo-200">
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggle(task.id)}
        className="mt-1 h-5 w-5 cursor-pointer accent-emerald-600"
        aria-label={`${task.title} tamamlandı olarak işaretle`}
      />
      <div className="min-w-0 flex-1">
        <p className={`font-medium ${task.completed ? 'text-slate-400 line-through' : 'text-slate-800'}`}>{task.title}</p>
        {task.note && <p className="mt-0.5 text-sm text-slate-500">{task.note}</p>}
        <div className="mt-2 flex flex-wrap items-center gap-2 text-xs">
          <span className={`rounded-full px-2 py-0.5 font-medium ring-1 ${PRIORITY_STYLE[task.priority]}`}>{PRIORITY_LABELS[task.priority]}</span>
          <span className="rounded-full bg-slate-100 px-2 py-0.5 font-medium text-slate-600">{CATEGORY_LABELS[task.category]}</span>
          {task.dueDate && (
            <span className={overdue ? 'font-semibold text-rose-600' : 'text-slate-500'}>
              📅 {formatDate(task.dueDate)}{overdue ? ' · gecikti' : ''}
            </span>
          )}
        </div>
      </div>
      <div className="flex shrink-0 gap-1">
        <button onClick={() => onEdit(task)} className="rounded-md px-2 py-1 text-sm text-slate-500 hover:bg-indigo-50 hover:text-indigo-700">
          Düzenle
        </button>
        <button onClick={() => onDelete(task)} className="rounded-md px-2 py-1 text-sm text-slate-500 hover:bg-rose-50 hover:text-rose-700">
          Sil
        </button>
      </div>
    </li>
  );
}
