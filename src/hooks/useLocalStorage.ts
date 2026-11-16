import { useEffect, useState } from 'react';

// State'i tarayıcının LocalStorage alanında saklayan özel hook.
// Sayfa yenilense bile veriler kaybolmaz.
export function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() => {
    try {
      const saved = localStorage.getItem(key);
      return saved ? (JSON.parse(saved) as T) : initialValue;
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      /* gizli sekme vb. durumlarda yazılamazsa uygulama çalışmaya devam eder */
    }
  }, [key, value]);

  return [value, setValue] as const;
}
