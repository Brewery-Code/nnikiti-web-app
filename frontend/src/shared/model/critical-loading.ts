import { useEffect, useSyncExternalStore } from "react";

/**
 * Маленький стор, через який "критичні" (above-the-fold) секції повідомляють
 * прелоадер про своє завантаження. Прелоадер чекає тільки на ці запити,
 * а не на весь каскад даних сторінки.
 */
let pending = 0;
let everRegistered = false;
let version = 0;

const listeners = new Set<() => void>();
const emit = () => {
  version += 1;
  listeners.forEach((l) => l());
};
const subscribe = (cb: () => void) => {
  listeners.add(cb);
  return () => {
    listeners.delete(cb);
  };
};

export function useCriticalLoading() {
  useSyncExternalStore(
    subscribe,
    () => version,
    () => 0,
  );
  return { pending, everRegistered };
}

/** Скидає прапорець "критична секція з'явилась" на старті нової сесії (навігація). */
export function resetCriticalSession() {
  everRegistered = false;
  emit();
}

/** Викликати з критичної секції: поки loading=true — прелоадер чекає на неї. */
export function useReportCritical(loading: boolean) {
  useEffect(() => {
    if (!loading) return;
    pending += 1;
    everRegistered = true;
    emit();
    return () => {
      pending -= 1;
      emit();
    };
  }, [loading]);
}
