
ALTER TABLE public.visa_countries
  ADD COLUMN IF NOT EXISTS country_code TEXT,
  ADD COLUMN IF NOT EXISTS description TEXT DEFAULT '',
  ADD COLUMN IF NOT EXISTS visa_type TEXT DEFAULT 'Tourist',
  ADD COLUMN IF NOT EXISTS validity TEXT DEFAULT '',
  ADD COLUMN IF NOT EXISTS stay_duration TEXT DEFAULT '',
  ADD COLUMN IF NOT EXISTS entry_type TEXT DEFAULT '',
  ADD COLUMN IF NOT EXISTS requirements TEXT DEFAULT '',
  ADD COLUMN IF NOT EXISTS documents TEXT DEFAULT '',
  ADD COLUMN IF NOT EXISTS hero_image TEXT DEFAULT '';

-- Backfill country_code for known names (lower-case ISO 3166-1 alpha-2)
UPDATE public.visa_countries SET country_code = CASE name
  WHEN 'Malaysia' THEN 'my' WHEN 'Thailand' THEN 'th' WHEN 'Japan' THEN 'jp'
  WHEN 'South Korea' THEN 'kr' WHEN 'China' THEN 'cn' WHEN 'Singapore' THEN 'sg'
  WHEN 'Indonesia' THEN 'id' WHEN 'Turkey' THEN 'tr' WHEN 'United Kingdom' THEN 'gb'
  WHEN 'Canada' THEN 'ca' WHEN 'USA' THEN 'us' WHEN 'Germany' THEN 'de'
  WHEN 'Spain' THEN 'es' WHEN 'Netherlands' THEN 'nl' WHEN 'Hong Kong' THEN 'hk'
  WHEN 'Nepal' THEN 'np' WHEN 'India' THEN 'in' WHEN 'Australia' THEN 'au'
  WHEN 'France' THEN 'fr' WHEN 'Italy' THEN 'it' WHEN 'Maldives' THEN 'mv'
  WHEN 'Vietnam' THEN 'vn' WHEN 'Philippines' THEN 'ph' WHEN 'UAE' THEN 'ae'
  WHEN 'Saudi Arabia' THEN 'sa' WHEN 'Sri Lanka' THEN 'lk'
  ELSE country_code
END
WHERE country_code IS NULL;
