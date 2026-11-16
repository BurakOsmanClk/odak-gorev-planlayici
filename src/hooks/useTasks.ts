import { useLocalStorage } from './useLocalStorage';
import type { Task, TaskInput } from '../interfaces/Task';

const today = new Date();
const addDays = (n: number) => new Date(today.getTime() + n * 86400000).toISOString().slice(0, 10);

// İlk açılışta boş görünmemesi için örnek görevler
const SAMPLE_TASKS: Task[] = [
  { id: 's1', title: 'React bileşen yapısını tekrar et', note: 'props, state ve useEffect', category: 'egitim', priority: 'yuksek', dueDate: addDays(1), completed: false, createdAt: today.toISOString() },
  { id: 's2', title: 'Portfolyo envanterlerini tamamla', note: '4 eğitim için proje dosyaları', category: 'is', priority: 'yuksek', dueDate: addDays(2), completed: false, createdAt: today.toISOString() },
  { id: 's3', title: 'Tailwind ile responsive tasarım denemesi', note: '', category: 'egitim', priority: 'orta', dueDate: '', completed: true, createdAt: today.toISOString() },
  { id: 's4', title: 'Akşam yürüyüşü', note: '30 dakika', category: 'saglik', priority: 'dusuk', dueDate: addDays(0), completed: false, createdAt: today.toISOString() },
];

// CRUD işlemlerini tek yerde toplayan hook
export function useTasks() {
  const [tasks, setTasks] = useLocalStorage<Task[]>('odak.tasks', SAMPLE_TASKS);

  // EKLE
  const addTask = (input: TaskInput) => {
    const task: Task = { ...input, id: crypto.randomUUID(), completed: false, createdAt: new Date().toISOString() };
    setTasks((prev) => [task, ...prev]);
  };

  // GÜNCELLE
  const updateTask = (id: string, changes: Partial<Task>) => {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, ...changes } : t)));
  };

  const toggleTask = (id: string) => {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)));
  };

  // SİL
  const deleteTask = (id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const clearCompleted = () => setTasks((prev) => prev.filter((t) => !t.completed));

  // LİSTELE: tasks dizisi doğrudan döndürülür
  return { tasks, addTask, updateTask, toggleTask, deleteTask, clearCompleted };
}
