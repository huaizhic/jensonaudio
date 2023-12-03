import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://aykgozlgavkkuyxfksoi.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF5a2dvemxnYXZra3V5eGZrc29pIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDE1NzYyNzIsImV4cCI6MjAxNzE1MjI3Mn0.ospxLED3WAuLJzzjdBFTnFnNB-3jLLjxpdC5gw4--C0";
const supabase = createClient(supabaseUrl, supabaseKey);
export default supabase;
