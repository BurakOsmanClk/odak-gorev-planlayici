// Uygulamadaki veri tiplerinin (arayüzlerin) tanımı
export type Priority = 'dusuk' | 'orta' | 'yuksek';
export type Category = 'is' | 'egitim' | 'kisisel' | 'saglik';
export type Filter = 'tumu' | 'aktif' | 'tamamlanan';

export interface Task {
  id: string;
  title: string;
  note: string;
  category: Category;
  priority: Priority;
  dueDate: string;      // YYYY-AA-GG, boş olabilir
  completed: boolean;
  createdAt: string;    // ISO tarih
}

// Form üzerinden gelen veri: id, durum ve tarih uygulama tarafından atanır
export type TaskInput = Pick<Task, 'title' | 'note' | 'category' | 'priority' | 'dueDate'>;

export const PRIORITY_LABELS: Record<Priority, string> = { dusuk: 'Düşük', orta: 'Orta', yuksek: 'Yüksek' };
export const CATEGORY_LABELS: Record<Category, string> = { is: 'İş', egitim: 'Eğitim', kisisel: 'Kişisel', saglik: 'Sağlık' };
