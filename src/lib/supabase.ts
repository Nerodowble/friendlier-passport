
import { createClient } from '@supabase/supabase-js';

// Debug: Log the environment variables (without exposing sensitive data)
console.log('Supabase URL exists:', !!import.meta.env.VITE_SUPABASE_URL);
console.log('Supabase Key exists:', !!import.meta.env.VITE_SUPABASE_ANON_KEY);

// Get the credentials from Vite's environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://your-project-url.supabase.co';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-anon-key';

if (!supabaseUrl.includes('supabase.co') || supabaseKey === 'your-anon-key') {
  console.error('Missing Supabase credentials. Make sure you have connected your project to Supabase.');
  throw new Error('Missing Supabase credentials');
}

export const supabase = createClient(supabaseUrl, supabaseKey);

// Debug: Log successful client creation
console.log('Supabase client created successfully');
