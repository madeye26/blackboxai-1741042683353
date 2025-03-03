const db = require('./js/supabase');

async function testEmployeeAndAdvances() {
    try {
        console.log('🔍 Testing Employee and Advances Creation...\n');

        // 1. Create a new employee
        console.log('1. Creating new employee...');
        const newEmployee = await db.createEmployee({
            code: 'EMP006',
            name: 'Sarah Wilson',
            jobTitle: 'Frontend Developer',
            basicSalary: 5000,
            monthlyIncentives: 300
        });
        console.log('✅ Created new employee:', newEmployee, '\n');

        // 2. Create an advance for the new employee
        console.log('2. Creating advance for the new employee...');
        const advance = await db.createAdvance({
            employeeId: newEmployee.id,
            amount: 1000,
            date: new Date().toISOString().split('T')[0], // Format as YYYY-MM-DD
            isPaid: false
        });
        console.log('✅ Created advance:', advance, '\n');

        // 3. Verify by getting all advances for the employee
        console.log('3. Verifying advances...');
        const employeeAdvances = await db.getAdvancesByEmployee(newEmployee.id);
        console.log('✅ Retrieved advances for employee:', employeeAdvances, '\n');

        // 4. Update advance (mark as paid)
        console.log('4. Updating advance (marking as paid)...');
        const updatedAdvance = await db.updateAdvance(advance.id, {
            isPaid: true
        });
        console.log('✅ Updated advance:', updatedAdvance, '\n');

        console.log('🎉 All employee and advances operations completed successfully!');

    } catch (error) {
        console.error('❌ Error during operations:', error.message);
        if (error.stack) {
            console.error('Stack:', error.stack);
        }
    }
}

// Run the tests
testEmployeeAndAdvances();
