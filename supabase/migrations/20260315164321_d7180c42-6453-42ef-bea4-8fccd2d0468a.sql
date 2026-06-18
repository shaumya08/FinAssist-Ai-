CREATE TABLE public.loan_applications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  income NUMERIC NOT NULL DEFAULT 0,
  loan_amount NUMERIC NOT NULL DEFAULT 0,
  tenure INTEGER NOT NULL DEFAULT 12,
  employment TEXT NOT NULL DEFAULT '',
  credit_score INTEGER NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'review',
  reason TEXT NOT NULL DEFAULT '',
  details JSONB,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.loan_applications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own applications"
  ON public.loan_applications FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own applications"
  ON public.loan_applications FOR INSERT
  WITH CHECK (auth.uid() = user_id);