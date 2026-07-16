export interface AcademyExpense {
  id: string;
  title: string;
  category: 'Rent' | 'Utilities' | 'Salaries' | 'Maintenance' | 'Equipment' | 'Marketing' | 'Other';
  amount: number;
  date: string;
  notes?: string;
  created_at?: string;
}