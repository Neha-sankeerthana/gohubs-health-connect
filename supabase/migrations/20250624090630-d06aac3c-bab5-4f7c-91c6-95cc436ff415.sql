
-- Add age column to the profiles table
ALTER TABLE public.profiles ADD COLUMN age INTEGER;

-- Update the handle_new_user function to include age
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY definer SET search_path = ''
AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, phone, location, age)
  VALUES (
    new.id, 
    COALESCE(new.raw_user_meta_data ->> 'full_name', ''),
    COALESCE(new.raw_user_meta_data ->> 'phone', ''),
    COALESCE(new.raw_user_meta_data ->> 'location', ''),
    CASE 
      WHEN new.raw_user_meta_data ->> 'age' IS NOT NULL 
      THEN (new.raw_user_meta_data ->> 'age')::INTEGER 
      ELSE NULL 
    END
  );
  RETURN new;
END;
$$;
