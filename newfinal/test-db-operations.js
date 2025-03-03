const db = require('./js/supabase');

async function testDatabaseOperations() {
    try {
        console.log('🔍 Testing Database Operations...\n');

        // 1. Test getting all employees
        console.log('1. Getting all employees...');
        const employees = await db.getAllEmployees();
        console.log(`✅ Successfully retrieved ${employees.length} employees\n`);

        // 2. Test getting employee by code
        console.log('2. Getting employee by code (EMP003)...');
        const employee = await db.getEmployeeByCode('EMP003');
        console.log('✅ Successfully retrieved employee:', employee, '\n');

        // 3. Test getting time entries
        console.log('3. Getting time entries...');
        const timeEntries = await db.getTimeEntries(employee.id);
        console.log(`✅ Successfully retrieved time entries:`, timeEntries, '\n');

        // 4. Test getting tasks
        console.log('4. Getting tasks...');
        const tasks = await db.getTasks(employee.id);
        console.log(`✅ Successfully retrieved tasks:`, tasks, '\n');

        // 5. Test getting salary reports
        console.log('5. Getting salary reports...');
        const salaryReports = await db.getSalaryReports(employee.id);
        console.log(`✅ Successfully retrieved salary reports:`, salaryReports, '\n');

        console.log('🎉 All database operations completed successfully!');

    } catch (error) {
        console.error('❌ Error during database operations:', error.message);
        console.error('Stack:', error.stack);
    }
}

// Run the tests
testDatabaseOperations();
