export const PROGRAM_DEPARTMENTS: Record<string, number> = {
  "F1": 1, // Прикладна математика
  "F2": 4, // Інженерія ПЗ
  "F3": 2, // Комп'ютерні науки
  "F4": 3, // Інженерія даних
  "F5": 3, // Інформаційна безпека
  "F6": 2, // Інформаційні системи
  "F7": 3, // Комп'ютерна інженерія
  "A5": 2, // Цифрові технології
};

export type ProgramData = {
  id: number;
  code: string;
  /** Specialty name (name) */
  specialty: string;
  /** Educational program name (name_op) */
  program: string;
  /** Degree level, already translated by the backend */
  degree: string;
  departmentId: number | null;
};

/** Matches the bachelor degree across supported locales */
export const isBachelorDegree = (degree: string) => /бакалавр|bachelor/i.test(degree);
