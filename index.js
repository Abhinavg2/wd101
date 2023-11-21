const userEntries = JSON.parse(localStorage.getItem("user-entries")) || [];
function displayUserEntries() {
    const tableBody = document.querySelector('#userTable tbody');
    tableBody.innerHTML = "";
    userEntries.forEach(entry => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td class="border px-4 py-2">${entry.name}</td>
            <td class="border px-4 py-2">${entry.email}</td>
            <td class="border px-4 py-2">${entry.password}</td>
            <td class="border px-4 py-2">${entry.dob}</td>
            <td class="border px-4 py-2">${entry.terms}</td>
        `;
        tableBody.appendChild(row);
    });
    return true;
}

function validateForm(e) {
    e.preventDefault();
    const name = document.querySelector('#name').value;
    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;
    const dob = document.querySelector('#dob').value;
    const terms = document.querySelector('#terms').checked;
    const userEntry = {
        name,
        email,
        password,
        dob,
        terms
    };
    userEntries.push(userEntry);
    localStorage.setItem("user-entries", JSON.stringify(userEntries));
    displayUserEntries();
    return true;
}

document.addEventListener("DOMContentLoaded", displayUserEntries);