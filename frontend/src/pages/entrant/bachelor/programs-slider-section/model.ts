export type ProgramData = {
  code: string;
  departmentId: number;
  name: string;
  tags: string[];
  budget: number;
  contract: number;
};

export const PROGRAM_META: Record<string, { departmentId: number; budget: number; contract: number }> = {
  "121": { departmentId: 4, budget: 20, contract: 40 },
  "122": { departmentId: 2, budget: 15, contract: 35 },
  "123": { departmentId: 3, budget: 12, contract: 30 },
  "125": { departmentId: 3, budget: 18, contract: 25 },
  "126": { departmentId: 2, budget: 0, contract: 35 },
  "051": { departmentId: 2, budget: 0, contract: 28 },
  "113": { departmentId: 1, budget: 10, contract: 0 },
  "111": { departmentId: 1, budget: 8, contract: 0 },
};
