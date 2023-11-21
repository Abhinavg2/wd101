document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('registrationForm');
    const tableBody = document.querySelector('#dataTable tbody');

    // Load saved data from web storage on page load
    loadSavedData();

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        // Validate date of birth
        const dobInput = document.getElementById('dob');
        const dobValue = dobInput.value;
        const today = new Date();
        const dob = new Date(dobValue);
        const age = today.getFullYear() - dob.getFullYear();

        if (age < 18 || age > 55) {
            alert('Date of birth must be for people between ages 18 and 55.');
            return;
        }

        // Add form data to the table
        const rowData = [
            document.getElementById('name').value,
            document.getElementById('email').value,
            document.getElementById('password').value,
            dobValue,
            document.getElementById('terms').checked ? 'Yes' : 'No'
        ];

        const newRow = tableBody.insertRow();
        rowData.forEach((data, index) => {
            const cell = newRow.insertCell(index);
            cell.textContent = data;
        });

        // Save the data to web storage
        saveData();

        // Clear the form
        form.reset();
    });

    function loadSavedData() {
        const savedData = JSON.parse(localStorage.getItem('registrationData')) || [];
        savedData.forEach(data => {
            const newRow = tableBody.insertRow();
            data.forEach((value, index) => {
                const cell = newRow.insertCell(index);
                cell.textContent = value;
            });
        });
    }

    function saveData() {
        const rows = tableBody.querySelectorAll('tr');
        const data = Array.from(rows).map(row =>
            Array.from(row.children).map(cell => cell.textContent)
        );
        localStorage.setItem('registrationData', JSON.stringify(data));
    }
});
