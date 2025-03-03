const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

async function checkAdvancesStructure() {
    const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);
    
    try {
        console.log('Checking advances table structure...\n');
        
        // Get a sample advance to see the structure
        const { data, error } = await supabase
            .from('advances')
            .select('*')
            .limit(1);
            
        if (error) {
            console.error('Error:', error.message);
            return;
        }
        
        if (data && data.length > 0) {
            console.log('Advances table structure:');
            console.log(JSON.stringify(data[0], null, 2));
        } else {
            // If no records exist, let's look at the table information
            console.log('No existing advances found. Checking table information...');
            
            // Try to insert a minimal record to see what fields are required/allowed
            const { error: insertError } = await supabase
                .from('advances')
                .insert([{
                    employee_id: 5,
                    amount: 100
                }]);
                
            if (insertError) {
                console.log('Insert error (helps identify required fields):', insertError.message);
            }
        }
        
    } catch (error) {
        console.error('Error:', error.message);
    }
}

checkAdvancesStructure();
