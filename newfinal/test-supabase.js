const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

async function testSupabaseConnection() {
    // Debug: Print environment variables
    console.log('Environment variables:');
    console.log('SUPABASE_URL:', process.env.SUPABASE_URL);
    console.log('SUPABASE_KEY:', process.env.SUPABASE_KEY ? 'Present (hidden for security)' : 'Missing');

    if (!process.env.SUPABASE_URL || !process.env.SUPABASE_KEY) {
        console.error('❌ Missing required Supabase configuration in .env file');
        return;
    }

    // Create Supabase client
    const supabase = createClient(
        process.env.SUPABASE_URL,
        process.env.SUPABASE_KEY,
        {
            auth: {
                persistSession: true,
                autoRefreshToken: true
            }
        }
    );

    try {
        // Test connection by attempting to fetch system time
        const { data, error } = await supabase
            .from('employees')
            .select('*')
            .limit(1);

        if (error) {
            console.error('❌ Error connecting to Supabase:', error.message);
            return;
        }

        console.log('✅ Successfully connected to Supabase!');
        console.log('Sample data:', data);

    } catch (err) {
        console.error('❌ Unexpected error:', err.message);
    }
}

// Run the test
console.log('Testing Supabase connection...');
testSupabaseConnection();
