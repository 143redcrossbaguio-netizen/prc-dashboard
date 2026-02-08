// Show/hide MBD and Patient Directed input boxes
const donorTypeRadios = document.querySelectorAll('input[name="donorType"]');
const mbdName = document.getElementById('mbdName');
const patientName = document.getElementById('patientName');

donorTypeRadios.forEach(radio => {
  radio.addEventListener('change', () => {
    mbdName.style.display = radio.value === 'M' ? 'inline-block' : 'none';
    patientName.style.display = radio.value === 'P' ? 'inline-block' : 'none';
  });
});

// Calculate age
const birthdate = document.getElementById('birthdate');
const ageInput = document.getElementById('age');

birthdate.addEventListener('change', () => {
  const today = new Date();
  const birth = new Date(birthdate.value);
  let age = today.getFullYear() - birth.getFullYear();
  const m = today.getMonth() - birth.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--;
  ageInput.value = age;
});

// Donor table
const donorForm = document.getElementById('donorForm');
const donorTable = document.getElementById('donorTable').getElementsByTagName('tbody')[0];

donorForm.addEventListener('submit', function(e) {
  e.preventDefault();

  const type = document.querySelector('input[name="donorType"]:checked').value;
  const typeExtra = type === 'M' ? mbdName.value : type === 'P' ? patientName.value : '';
  const name = `${document.getElementById('surname').value}, ${document.getElementById('firstname').value} ${document.getElementById('middlename').value}`;
  const blood = document.getElementById('bloodType').value.toUpperCase();
  const donationCount = document.getElementById('donationCount').value;
  const date = document.getElementById('entryDate').value;

  const row = donorTable.insertRow();
  row.insertCell(0).innerText = name;
  row.insertCell(1).innerText = type + (typeExtra ? ` (${typeExtra})` : '');
  row.insertCell(2).innerText = blood;
  row.insertCell(3).innerText = donationCount;
  row.insertCell(4).innerText = date;

  donorForm.reset();
  mbdName.style.display = 'none';
  patientName.style.display = 'none';
});

// Search function
function searchDonors() {
  const input = document.getElementById('searchInput').value.toLowerCase();
  const rows = donorTable.getElementsByTagName('tr');
  for (let i = 0; i < rows.length; i++) {
    const cell = rows[i].getElementsByTagName('td')[0];
    if (cell) {
      const txtValue = cell.textContent || cell.innerText;
      rows[i].style.display = txtValue.toLowerCase().includes(input) ? "" : "none";
    }
  }
}
