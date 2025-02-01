function calculateDose() {
  // Get user inputs
  const drugType = document.getElementById('drugType').value;
  const concentrationType = document.getElementById('concentrationType').value;
  const concentrationValue = parseFloat(document.getElementById('concentrationValue').value);
  const requiredDosage = parseFloat(document.getElementById('requiredDosage').value);
  const patientWeight = parseFloat(document.getElementById('patientWeight').value);

  // Validate inputs
  if (!drugType || !concentrationType || isNaN(concentrationValue) || isNaN(requiredDosage) || isNaN(patientWeight)) {
    alert("Please fill in all fields correctly.");
    return;
  }

  // Calculate dose based on drug type
  let dose;
  if (drugType === 'tablet') {
    // Tablets are given as a number of tablets
    dose = Math.ceil((requiredDosage * patientWeight) / concentrationValue);
    document.getElementById('result').innerHTML = `Number of Tablets to Administer: ${dose}`;
  } else if (drugType === 'injection') {
    // Injections are given in mL
    dose = (requiredDosage * patientWeight) / concentrationValue;
    document.getElementById('result').innerHTML = `Volume of Injection to Administer: ${dose.toFixed(2)} mL`;
  }
}
