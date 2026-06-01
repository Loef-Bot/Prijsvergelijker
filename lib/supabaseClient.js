import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://kkabflrojmcprodzanen.supabase.co';
const SUPABASE_ANON_KEY = 'JOUW-ANON-PUBLIC-KEY';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
