export interface User {
  id: string;
  name: string;
  initials: string;
}

export const USERS: User[] = [
  { id: 'u1', name: 'Ana Petrova', initials: 'AP' },
  { id: 'u2', name: 'Boris Ivanov', initials: 'BI' },
  { id: 'u3', name: 'Daria Koleva', initials: 'DK' },
  { id: 'u4', name: 'Georgi Marinov', initials: 'GM' },
];
