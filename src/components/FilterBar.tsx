import type { Filter } from '../interfaces/Task';

interface Props {
  filter: Filter;
  onFilter: (f: Filter) => void;
  search: string;
  onSearch: (s: string) => void;
}

const FILTERS: { key: Filter; label: string }[] = [
  { key: 'tumu', label: 'Tümü' },
  { key: 'aktif', label: 'Aktif' },
  { key: 'tamamlanan', label: 'Tamamlanan' },
];

export default function FilterBar({ filter, onFilter, search, onSearch }: Props) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="inline-flex rounded-lg bg-slate-100 p-1">
        {FILTERS.map((f) => (
          <button
            key={f.key}
            onClick={() => onFilter(f.key)}
            className={`rounded-md px-3 py-1.5 text-sm font-medium transition ${filter === f.key ? 'bg-white text-indigo-700 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
          >
            {f.label}
          </button>
        ))}
      </div>
      <input
        type="search"
        value={search}
        onChange={(e) => onSearch(e.target.value)}
        placeholder="Görevlerde ara…"
        className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-indigo-500 sm:w-60"
      />
    </div>
  );
}
