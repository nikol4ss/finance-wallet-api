export type Category = {
  id: string;
  userId: string;
  name: string;
  type: 'income' | 'expense';
  createdAt: Date;
};
