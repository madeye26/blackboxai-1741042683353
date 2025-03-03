const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

// Supabase configuration
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

// Validate configuration
if (!supabaseUrl || !supabaseKey) {
    throw new Error('Missing required Supabase configuration. Please check your .env file.');
}

// Create Supabase client
const supabase = createClient(supabaseUrl, supabaseKey, {
    auth: {
        persistSession: true,
        autoRefreshToken: true
    },
    db: {
        schema: 'public'
    }
});

// Database utility functions
const db = {
    getEmployeeByCode: async (code) => {
        const { data, error } = await supabase
            .from('employees')
            .select('*')
            .eq('code', code)
            .single();
        
        if (error) throw error;
        return data;
    },

    getAllEmployees: async () => {
        const { data, error } = await supabase
            .from('employees')
            .select('*')
            .order('name');
        
        if (error) throw error;
        return data;
    },

    createEmployee: async (employee) => {
        const { data, error } = await supabase
            .from('employees')
            .insert([{
                code: employee.code,
                name: employee.name,
                job_title: employee.jobTitle,
                basic_salary: employee.basicSalary,
                monthly_incentives: employee.monthlyIncentives || 0
            }])
            .select()
            .single();
        
        if (error) throw error;
        return data;
    },

    updateEmployee: async (employeeId, employee) => {
        const { data, error } = await supabase
            .from('employees')
            .update({
                code: employee.code,
                name: employee.name,
                job_title: employee.jobTitle,
                basic_salary: employee.basicSalary,
                monthly_incentives: employee.monthlyIncentives,
                updated_at: new Date().toISOString()
            })
            .eq('id', employeeId)
            .select()
            .single();
        
        if (error) throw error;
        return data;
    },

    getAdvancesByEmployee: async (employeeId) => {
        const { data, error } = await supabase
            .from('advances')
            .select('*')
            .eq('employee_id', employeeId)
            .order('date', { ascending: false });
        
        if (error) throw error;
        return data;
    },

    createAdvance: async (advance) => {
        const { data, error } = await supabase
            .from('advances')
            .insert([{
                employee_id: advance.employeeId,
                amount: advance.amount,
                date: advance.date,
                is_paid: advance.isPaid || false,
                paid_date: advance.paidDate || null
            }])
            .select()
            .single();
        
        if (error) throw error;
        return data;
    },
    
    updateAdvance: async (advanceId, advance) => {
        const { data, error } = await supabase
            .from('advances')
            .update({
                is_paid: advance.isPaid,
                paid_date: advance.isPaid ? new Date().toISOString() : null
            })
            .eq('id', advanceId)
            .select()
            .single();
        
        if (error) throw error;
        return data;
    }
};

// Initialize Supabase real-time subscriptions
function initializeRealtimeSubscriptions() {
    supabase
        .channel('public:employees')
        .on('postgres_changes', { event: '*', schema: 'public', table: 'employees' }, payload => {
            console.log('Employees change received:', payload);
        })
        .subscribe();

    supabase
        .channel('public:advances')
        .on('postgres_changes', { event: '*', schema: 'public', table: 'advances' }, payload => {
            console.log('Advances change received:', payload);
        })
        .subscribe();
}

// Initialize realtime subscriptions
initializeRealtimeSubscriptions();

module.exports = db;
