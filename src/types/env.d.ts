declare namespace NodeJS {
  interface ProcessEnv {
    NEXT_PUBLIC_SUPABASE_URL?: string;
    NEXT_PUBLIC_SUPABASE_ANON_KEY?: string;
    NEXT_PUBLIC_DATA_SOURCE?: "mock" | "supabase";
  }
}
