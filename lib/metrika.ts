export const YANDEX_METRIKA_ID = 107062974;

declare global {
  interface Window {
    ym?: (id: number, action: string, ...args: unknown[]) => void;
  }
}

/** Отправка достижения цели в Яндекс.Метрику */
export function reachGoal(goalName: string): void {
  if (typeof window === 'undefined' || !window.ym) return;
  window.ym(YANDEX_METRIKA_ID, 'reachGoal', goalName);
}
