export const YANDEX_METRIKA_ID = 111329237;

declare global {
  interface Window {
    ym?: (id: number, action: string, ...args: unknown[]) => void;
  }
}

export function reachGoal(goalName: string, params?: Record<string, string>): void {
  if (typeof window === 'undefined' || !window.ym) return;
  if (params && Object.keys(params).length > 0) {
    window.ym(YANDEX_METRIKA_ID, 'params', params);
  }
  window.ym(YANDEX_METRIKA_ID, 'reachGoal', goalName);
}
