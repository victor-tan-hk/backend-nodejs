const API_BASE = 'http://localhost:3000';

// a) GET /employees
document.getElementById('getEmployeesBtn').addEventListener('click', async () => {
  const response = await fetch(`${API_BASE}/employees`);
  const data = await response.json();

  const tbody = document.querySelector('#employeeTable tbody');
  tbody.innerHTML = ''; // clear existing rows

  data.forEach(emp => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${emp.id}</td>
      <td>${emp.name}</td>
      <td>${emp.country}</td>
      <td>${emp.age}</td>
      <td>${emp.salary}</td>
    `;
    tbody.appendChild(row);
  });
});

// b) POST /employees
document.getElementById('addEmployeeForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const name = document.getElementById('addName').value;
  const country = document.getElementById('addCountry').value;
  const age = parseInt(document.getElementById('addAge').value);
  const salary = parseFloat(document.getElementById('addSalary').value);

  const response = await fetch(`${API_BASE}/employees`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, country, age, salary })
  });

  const result = await response.json();
  alert(result.message || 'Employee added');
  e.target.reset();
});

// c) PUT /employees/:id
document.getElementById('updateEmployeeForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const id = parseInt(document.getElementById('updateId').value);
  const name = document.getElementById('updateName').value;
  const country = document.getElementById('updateCountry').value;
  const age = parseInt(document.getElementById('updateAge').value);
  const salary = parseFloat(document.getElementById('updateSalary').value);

  const response = await fetch(`${API_BASE}/employees/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, country, age, salary })
  });

  const result = await response.json();
  alert(result.message || 'Employee updated');
  e.target.reset();
});

// d) DELETE /employees/:id
document.getElementById('deleteEmployeeForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const id = parseInt(document.getElementById('deleteId').value);

  const response = await fetch(`${API_BASE}/employees/${id}`, {
    method: 'DELETE'
  });

  const result = await response.json();
  alert(result.message || 'Employee deleted');
  e.target.reset();
});
