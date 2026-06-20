-- Fix: Add 'Semanal' to the frequency check constraint on regulatory_controls
-- This is needed for D8-01 and D8-02 which have weekly monitoring frequency

-- Step 1: Drop the existing check constraint
ALTER TABLE public.regulatory_controls
DROP CONSTRAINT IF EXISTS regulatory_controls_frequency_check;

-- Step 2: Re-add the constraint with 'Semanal' included
ALTER TABLE public.regulatory_controls
ADD CONSTRAINT regulatory_controls_frequency_check
CHECK (frequency IN ('Única', 'Continua', 'Mensual', 'Trimestral', 'Semestral', 'Anual', 'Por evento', 'Semanal'));
