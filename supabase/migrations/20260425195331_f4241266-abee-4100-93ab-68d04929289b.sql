CREATE TABLE public.offers (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  message TEXT NOT NULL DEFAULT '',
  sort_order INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.offers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read offers" ON public.offers FOR SELECT USING (true);
CREATE POLICY "Admins manage offers" ON public.offers FOR ALL TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE TRIGGER update_offers_updated_at
  BEFORE UPDATE ON public.offers
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

INSERT INTO public.offers (message, sort_order) VALUES
  ('🎉 Early Bird Discount: Save up to 15% on Umrah Packages — Book Before April 30!', 1),
  ('✈️ Special Thailand Tour: Starting from ৳45,000 — Limited Seats Available', 2),
  ('🕌 Hajj 2026 Registration Open — Reserve Your Spot Today', 3),
  ('🌴 Bali Honeymoon Package — Free Airport Transfer & Candle Light Dinner', 4),
  ('📞 Call +880 1894-071070 for Exclusive Group Discounts', 5),
  ('🛂 Visa Processing in 7 Days — 100% Success Rate', 6);