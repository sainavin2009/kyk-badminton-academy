-- Create fee_payments table
CREATE TABLE IF NOT EXISTS public.fee_payments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  student_id UUID NOT NULL REFERENCES public.students(id) ON DELETE CASCADE,
  amount DECIMAL(10,2) NOT NULL,
  payment_type TEXT NOT NULL, -- Monthly, Admission, Tournament, Custom
  payment_method TEXT NOT NULL, -- UPI, Cash, Card, Bank Transfer
  billing_month DATE, -- Specific to monthly fees
  receipt_no SERIAL,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Update students table for tracking
ALTER TABLE public.students ADD COLUMN IF NOT EXISTS next_due_date DATE;
ALTER TABLE public.students ADD COLUMN IF NOT EXISTS total_outstanding DECIMAL(10,2) DEFAULT 0;

-- Enable Data API Grants
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE public.fee_payments TO service_role;
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE public.fee_payments TO authenticated;

-- Enable RLS
ALTER TABLE public.fee_payments ENABLE ROW LEVEL SECURITY;

-- Create Policies
CREATE POLICY "fee_payments_select_policy" ON public.fee_payments FOR SELECT TO authenticated USING (true);
CREATE POLICY "fee_payments_insert_policy" ON public.fee_payments FOR INSERT TO authenticated WITH CHECK (true);