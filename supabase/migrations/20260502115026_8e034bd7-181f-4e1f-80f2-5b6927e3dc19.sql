ALTER TABLE public.packages
  ADD COLUMN IF NOT EXISTS country text,
  ADD COLUMN IF NOT EXISTS overview text,
  ADD COLUMN IF NOT EXISTS itinerary text[] DEFAULT '{}'::text[],
  ADD COLUMN IF NOT EXISTS cancellation_policy text;