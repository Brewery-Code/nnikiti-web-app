export type ProgramData = {
  code: string;
  departmentId: number;
  name: string;
  tags: string[];
  seats: string;
};

export const programsMeta: { code: string; departmentId: number }[] = [
  { code: "121", departmentId: 4 },
  { code: "122", departmentId: 2 },
  { code: "123", departmentId: 3 },
  { code: "125", departmentId: 3 },
  { code: "126", departmentId: 2 },
];
