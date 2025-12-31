import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm';

const SUPABASE_URL = 'https://iexolpurphniznxurjdh.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlleG9scHVycGhuaXpueHVyamRoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjcwOTg3ODIsImV4cCI6MjA4MjY3NDc4Mn0.-3krAlaNs2q2tU7wSnsmPkf_YOdB-OR0nexJabz8S34';

console.log("🔌 Supabase Config Loading (ES Module)...");
console.log("📍 URL:", SUPABASE_URL);

try {
    const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    window.supabaseClient = supabase;
    console.log("✅ Supabase Client initialized and attached to window.supabaseClient");

    // Add a global test function
    window.testSupabaseConnection = async function () {
        console.log("🧪 Testing Supabase Connection...");

        try {
            // Test 1: Check if client exists
            if (!window.supabaseClient) {
                console.error("❌ Supabase client not found on window");
                return false;
            }
            console.log("✅ Client exists");

            // Test 2: Try to get current session
            const { data: { session }, error: sessionError } = await window.supabaseClient.auth.getSession();
            if (sessionError) {
                console.error("❌ Session error:", sessionError);
            } else {
                console.log("✅ Session check passed. Logged in:", !!session);
                if (session) {
                    console.log("👤 User ID:", session.user.id);
                    console.log("📧 Email:", session.user.email);
                }
            }

            // Test 3: Try to query profiles table
            const { data: profiles, error: profilesError } = await window.supabaseClient
                .from('profiles')
                .select('*')
                .limit(1);

            if (profilesError) {
                console.error("❌ Profiles query error:", profilesError);
                console.log("⚠️ This might be due to RLS policies. Make sure RLS is configured correctly.");
            } else {
                console.log("✅ Profiles table accessible. Sample:", profiles);
            }

            // Test 4: Try to query learning_stats table
            const { data: stats, error: statsError } = await window.supabaseClient
                .from('learning_stats')
                .select('*')
                .limit(1);

            if (statsError) {
                console.error("❌ Learning_stats query error:", statsError);
            } else {
                console.log("✅ Learning_stats table accessible. Sample:", stats);
            }

            console.log("🎉 Supabase connection test complete!");
            return true;

        } catch (err) {
            console.error("❌ Test failed with exception:", err);
            return false;
        }
    };

    console.log("💡 Tip: Run testSupabaseConnection() in console to verify connection");

} catch (err) {
    console.error("❌ Supabase Init Error:", err);
    alert("Critical Error: Supabase failed to initialize. Check console for details.");
}
