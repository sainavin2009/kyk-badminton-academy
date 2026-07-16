export interface AcademyEvent {
  id: string;
  title: string;
  description: string;
  banner_url: string;
  event_date: string;
  registration_deadline: string;
  status: 'Published' | 'Draft';
  created_at?: string;
}