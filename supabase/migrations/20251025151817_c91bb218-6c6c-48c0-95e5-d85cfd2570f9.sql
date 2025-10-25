-- Add new fields to profiles table
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS contact_email text,
ADD COLUMN IF NOT EXISTS address text,
ADD COLUMN IF NOT EXISTS cnpj text,
ADD COLUMN IF NOT EXISTS phone text;

-- Create user_companies table for additional company affiliations
CREATE TABLE IF NOT EXISTS public.user_companies (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  company_name text NOT NULL,
  cnpj text,
  address text,
  phone text,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- Enable RLS on user_companies
ALTER TABLE public.user_companies ENABLE ROW LEVEL SECURITY;

-- RLS policies for user_companies
CREATE POLICY "Users can view their own companies"
ON public.user_companies
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own companies"
ON public.user_companies
FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own companies"
ON public.user_companies
FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own companies"
ON public.user_companies
FOR DELETE
USING (auth.uid() = user_id);

-- Add trigger for updated_at on user_companies
CREATE TRIGGER update_user_companies_updated_at
BEFORE UPDATE ON public.user_companies
FOR EACH ROW
EXECUTE FUNCTION public.handle_updated_at();