export interface AttendanceRecord {
  id: string;
  student_id: string;
  date: string;
  status: 'Present' | 'Absent' | 'Late';
  batch: string;
  remarks?: string;
  created_at?: string;
  students?: {
    name: string;
    student_id_serial: string;
  };
}