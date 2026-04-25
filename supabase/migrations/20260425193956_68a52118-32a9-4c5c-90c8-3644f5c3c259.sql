-- Create youtube_videos table for the "Watch Our Latest Videos" section
CREATE TABLE public.youtube_videos (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  video_id TEXT NOT NULL,
  title TEXT NOT NULL DEFAULT '',
  sort_order INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.youtube_videos ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read youtube_videos"
  ON public.youtube_videos FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Admins manage youtube_videos"
  ON public.youtube_videos FOR ALL
  TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE TRIGGER update_youtube_videos_updated_at
  BEFORE UPDATE ON public.youtube_videos
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Seed with the current 4 hardcoded videos
INSERT INTO public.youtube_videos (video_id, title, sort_order) VALUES
  ('rrGiK4XT54Y', 'Process Your UK Visa From Eco Trippers', 1),
  ('aA4CRbRyezA', 'Japan & South Korea', 2),
  ('dw7D5ZOsvOQ', 'What Customer Says?', 3),
  ('Et6krgu0mOQ', 'Sreemangal Tour, Bangladesh', 4);