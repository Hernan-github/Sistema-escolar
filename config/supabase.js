const SUPABASE_URL = "https://qnxxchhmhpdocymoazhb.supabase.co";

const SUPABASE_ANON_KEY = "sb_publishable_6oaqiblZ24FcVd3A_NF9iQ_KDeBuA2y";

const clienteSupabase = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_ANON_KEY
);

console.log("Cliente Supabase creado:", clienteSupabase);