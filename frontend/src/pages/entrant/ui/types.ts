export interface Program {
  code: string;
  name: string;
  description: string;
  duration: string;
  seats?: string;
}

export interface Step {
  title: string;
  text: React.ReactNode;
}

export interface KeyDate {
  period: string;
  label: string;
  note?: string;
}
