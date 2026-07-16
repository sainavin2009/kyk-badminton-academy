-- Create sales table
CREATE TABLE public.sales (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  customer_id UUID REFERENCES public.students(id),
  total_amount DECIMAL(10,2) NOT NULL,
  tax_amount DECIMAL(10,2) DEFAULT 0,
  discount_amount DECIMAL(10,2) DEFAULT 0,
  payment_mode TEXT NOT NULL, -- Cash, UPI, Card
  receipt_no SERIAL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create sale items table
CREATE TABLE public.sale_items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  sale_id UUID REFERENCES public.sales(id) ON DELETE CASCADE,
  product_id UUID REFERENCES public.inventory(id),
  quantity INTEGER NOT NULL,
  unit_price DECIMAL(10,2) NOT NULL,
  subtotal DECIMAL(10,2) NOT NULL
);

-- Function to update inventory on sale
CREATE OR REPLACE FUNCTION public.update_inventory_on_sale()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE public.inventory
  SET quantity = quantity - NEW.quantity
  WHERE id = NEW.product_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to call the function after a sale item is inserted
CREATE TRIGGER after_sale_item_insert
AFTER INSERT ON public.sale_items
FOR EACH ROW
EXECUTE FUNCTION public.update_inventory_on_sale();

-- Enable RLS and Grants
ALTER TABLE public.sales ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sale_items ENABLE ROW LEVEL SECURITY;

GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE public.sales TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE public.sale_items TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE public.sales TO service_role;
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE public.sale_items TO service_role;
GRANT USAGE, SELECT ON SEQUENCE public.sales_receipt_no_seq TO authenticated;

-- Policies
CREATE POLICY "sales_select_policy" ON public.sales FOR SELECT TO authenticated USING (true);
CREATE POLICY "sales_insert_policy" ON public.sales FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "sale_items_select_policy" ON public.sale_items FOR SELECT TO authenticated USING (true);
CREATE POLICY "sale_items_insert_policy" ON public.sale_items FOR INSERT TO authenticated WITH CHECK (true);