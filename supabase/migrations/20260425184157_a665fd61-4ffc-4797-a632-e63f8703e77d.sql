-- Re-map gallery image categories: keep only "Visa Success" and "Visa Travelers"
UPDATE public.gallery_images SET category = 'Visa Success' WHERE category IN ('Success', 'Visa');
UPDATE public.gallery_images SET category = 'Visa Travelers' WHERE category IN ('Travelers', 'Destinations', 'Umrah', 'General');