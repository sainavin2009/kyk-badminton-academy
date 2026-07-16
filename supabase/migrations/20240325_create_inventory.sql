-- Create inventory table
CREATE TABLE public.inventory (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  purchase_price DECIMAL(10,2) NOT NULL DEFAULT 0,
  selling_price DECIMAL(10,2) NOT NULL DEFAULT 0,
  quantity INTEGER NOT NULL DEFAULT 0,
  min_stock INTEGER NOT NULL DEFAULT 0,
  supplier TEXT,
  purchase_date DATE DEFAULT CURRENT_DATE,
  barcode TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Data API Grants
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE public.inventory TO service_role;
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE public.inventory TO authenticated;

-- Enable RLS
ALTER TABLE public.inventory ENABLE ROW LEVEL SECURITY;

-- Create policies (Admin only - authenticated)
CREATE POLICY "inventory_select_policy" ON public.inventory
FOR SELECT TO authenticated USING (true);

CREATE POLICY "inventory_insert_policy" ON public.inventory
FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "inventory_update_policy" ON public.inventory
FOR UPDATE TO authenticated USING (true);

CREATE POLICY "inventory_delete_policy" ON public.inventory
FOR DELETE TO authenticated USING (true);