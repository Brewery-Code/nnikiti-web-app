export const PROGRAM_META: Record<string, { departmentId: number; budget: number; contract: number }> = {
  "F1": { departmentId: 1, budget: 10, contract: 0 },   // Прикладна математика
  "F2": { departmentId: 4, budget: 20, contract: 40 },  // Інженерія ПЗ
  "F3": { departmentId: 2, budget: 15, contract: 35 },  // Комп'ютерні науки
  "F4": { departmentId: 3, budget: 12, contract: 30 },  // Прикладна інформатика
  "F5": { departmentId: 3, budget: 18, contract: 25 },  // Інформаційна безпека
  "F6": { departmentId: 2, budget: 0, contract: 35 },   // Інформаційні системи
  "F7": { departmentId: 3, budget: 12, contract: 30 },  // Комп'ютерна інженерія
  "A5": { departmentId: 2, budget: 0, contract: 28 },   // Інженерія даних
};

export const SPACE_BETWEEN_PX = 20;

export type SpecData = {
  id: number;
  code: string;
  name: string;
  tags: string[];
  levels: string[];
  departmentId: number | null;
  budget: number;
  contract: number;
};

const LEVEL_LABELS: Record<string, string> = {
  бакалавр: "Бакалаврат",
  магістр: "Магістратура",
  аспірантура: "Аспірантура",
};

export function detectLevel(name: string, levelTagNames: string[]): string {
  const sources = [...levelTagNames, name].map((s) => s.toLowerCase());
  for (const src of sources) {
    for (const [key, label] of Object.entries(LEVEL_LABELS)) {
      if (src.includes(key)) return label;
    }
  }
  return "";
}
