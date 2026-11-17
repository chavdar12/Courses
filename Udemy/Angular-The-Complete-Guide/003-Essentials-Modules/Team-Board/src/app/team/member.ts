export interface Member {
  id: number;
  name: string;
  role: string;
  available: boolean;
}

export const MEMBERS: Member[] = [
  { id: 1, name: 'Ana', role: 'Frontend', available: true },
  { id: 2, name: 'Boris', role: 'Backend', available: false },
  { id: 3, name: 'Daria', role: 'Design', available: true },
];
