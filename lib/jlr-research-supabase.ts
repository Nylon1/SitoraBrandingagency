import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://seypnezhggszfhivdnas.supabase.co';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || 'sb_publishable_O9B0Ls6lWWpjcNlg7nb1ow_cBuVyop0';

export const jlrSupabase = createClient(supabaseUrl, supabaseKey);
