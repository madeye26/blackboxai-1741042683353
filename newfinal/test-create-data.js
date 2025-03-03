const db = require('./js/supabase');

async function createTestData() {
    try {
        console.log('🔍 Creating Test Data...\n');

        // 1. Get our test employee
        console.log('1. Getting reference employee...');
        const employee = await db.getEmployeeByCode('EMP003');
        console.log('✅ Found employee:', employee.name, '\n');

        // 2. Create a time entry
        console.log('2. Creating time entry...');
        const timeEntry = await db.createCheckIn(employee.id, 'Test check-in');
        console.log('✅ Created time entry:', timeEntry, '\n');

        // 3. Create a task
        console.log('3. Creating task...');
        const task = await db.createTask({
            employeeId: employee.id,
            title: 'Complete UI Design',
            description: 'Finish the dashboard layout',
            status: 'pending',
            priority: 'high',
            dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days from now
        });
        console.log('✅ Created task:', task, '\n');

        // 4. Create a salary report
        console.log('4. Creating salary report...');
        const salaryReport = await db.createSalaryReport({
            employeeId: employee.id,
            month: new Date().toISOString().slice(0, 7), // Current month (YYYY-MM)
            basicSalary: employee.basic_salary,
            advancesDeduction: 0,
            otherDeductions: 0,
            bonuses: 500,
            netSalary: employee.basic_salary + 500
        });
        console.log('✅ Created salary report:', salaryReport, '\n');

        console.log('🎉 All test data created successfully!');

    } catch (error) {
        console.error('❌ Error creating test data:', error.message);
        console.error('Stack:', error.stack);
    }
}

// Run the creation
createTestData();
