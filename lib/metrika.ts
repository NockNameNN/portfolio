export const YANDEX_METRIKA_ID = 107062974;

declare global {
  interface Window {
    ym?: (id: number, action: string, ...args: unknown[]) => void;
  }
}

/** Отправка достижения цели в Яндекс.Метрику (опционально с параметрами визита) */
export function reachGoal(goalName: string, params?: Record<string, string>): void {
  if (typeof window === 'undefined' || !window.ym) return;
  if (params && Object.keys(params).length > 0) {
    window.ym(YANDEX_METRIKA_ID, 'params', params);
  }
  window.ym(YANDEX_METRIKA_ID, 'reachGoal', goalName);
}
