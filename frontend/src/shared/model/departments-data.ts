export type SubjectType = "Нормативна" | "Вибіркова";

export interface ProgramSubject {
  name: string;
  credits: number;
  semester: number;
  type: SubjectType;
}

export interface DepartmentData {
  id: number;
  name: string;
  description: string;
  email: string;
  address: string;
  imageUrl?: string;
  historyImageUrl?: string;
  head: {
    full_name: string;
    regalia: string;
    email?: string;
    audience?: string;
    imageUrl?: string;
  };
  programs: {
    id: number;
    code: string;
    name: string;
    description: string;
    degree: string;
    duration: string;
    form: string;
    totalCredits: number;
    subjects: ProgramSubject[];
    learnMoreUrl?: string;
  }[];
  team: {
    name: string;
    role: string;
    specialty: string;
    email?: string;
    audience?: string;
    imageUrl?: string;
  }[];
  history: {
    year: string;
    text: string;
  }[];
}
