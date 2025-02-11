
import { createClient } from '@supabase/supabase-js';

// Create client with empty strings initially
const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL ?? '',
  import.meta.env.VITE_SUPABASE_ANON_KEY ?? ''
);

// Export async function to check if credentials are valid
export const getSupabaseClient = async () => {
  try {
    // Test the connection
    await supabase.from('_dummy_').select('*').limit(1);
    return supabase;
  } catch (error) {
    console.error('Supabase connection failed:', error);
    throw new Error('Unable to connect to Supabase. Please check your credentials.');
  }
};

export { supabase };
