// Function to update concentration type when drug type changes
function updateConcentrationType() {
  const drugType = document.getElementById('drugType').value;
  const concentrationTypeDropdown = document.getElementById('concentrationType');

  // Clear all options
  concentrationTypeDropdown.innerHTML = '<option value="" disabled selected>Select Concentration Type</option>';

  if (drugType === 'tablet') {
    // For tablets, only allow "mg"
    const option = document.createElement('option');
    option.value = 'mg';
    option.text = 'mg (for Tablets)';
    concentrationTypeDropdown.add(option);
    concentrationTypeDropdown.disabled = true; // Disable further selection
  } else if (drugType === 'injection') {
    // For injections, allow all concentration types
    const concentrationTypes = ['mg/mL', 'µg/mL', 'IU/mL', '% w/v', 'U/mL', 'Normality', 'mOsm/L'];
    concentrationTypes.forEach(type => {
      const option = document.createElement('option');
      option.value = type;
      option.text = type;
      concentrationTypeDropdown.add(option);
    });
    concentrationTypeDropdown.disabled = false; // Enable selection
  }
}

// Function to calculate dose
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

  let dose;

  // Conversion logic based on concentration type
  switch (concentrationType) {
    case 'mg':
      // Tablets: Number of tablets = Required Dosage / Tablet Strength
      dose = Math.ceil((requiredDosage * patientWeight) / concentrationValue);
      document.getElementById('result').innerHTML = `Number of Tablets to Administer: ${dose}`;
      break;

    case 'mg/mL':
      // Injection: Volume (mL) = (Required Dosage * Patient Weight) / Concentration Value
      dose = (requiredDosage * patientWeight) / concentrationValue;
      document.getElementById('result').innerHTML = `Volume of Injection to Administer: ${dose.toFixed(2)} mL`;
      break;

    case 'µg/mL':
      // Convert µg/mL to mg/mL for consistency
      const mgPerMl = concentrationValue / 1000;
      dose = (requiredDosage * patientWeight) / mgPerMl;
      document.getElementById('result').innerHTML = `Volume of Injection to Administer: ${dose.toFixed(2)} mL`;
      break;

    case 'IU/mL':
      // Convert IU to mg if necessary (example conversion factor: 1 IU = 0.034 mg)
      const mgEquivalent = concentrationValue * 0.034;
      dose = (requiredDosage * patientWeight) / mgEquivalent;
      document.getElementById('result').innerHTML = `Volume of Injection to Administer: ${dose.toFixed(2)} mL`;
      break;

    case '% w/v':
      // Convert % w/v to mg/mL (1% w/v = 10 mg/mL)
      const mgPerMlPercentage = concentrationValue * 10;
      dose = (requiredDosage * patientWeight) / mgPerMlPercentage;
      document.getElementById('result').innerHTML = `Volume of Injection to Administer: ${dose.toFixed(2)} mL`;
      break;

    case 'U/mL':
      // Convert Units to mg if necessary (example conversion factor: 1 U = 0.01 mg)
      const mgPerUnit = concentrationValue * 0.01;
      dose = (requiredDosage * patientWeight) / mgPerUnit;
      document.getElementById('result').innerHTML = `Volume of Injection to Administer: ${dose.toFixed(2)} mL`;
      break;

    case 'Normality':
      // Convert Normality (N) to mg/mL (example conversion factor: 1 N = 36.5 mg/mL for HCl)
      const mgPerMlNormality = concentrationValue * 36.5;
      dose = (requiredDosage * patientWeight) / mgPerMlNormality;
      document.getElementById('result').innerHTML = `Volume of Injection to Administer: ${dose.toFixed(2)} mL`;
      break;

    case 'mOsm/L':
      // Convert mOsm/L to mg/mL (example conversion factor: 1 mOsm/L = 0.018 mg/mL for NaCl)
      const mgPerMlOsmolarity = concentrationValue * 0.018;
      dose = (requiredDosage * patientWeight) / mgPerMlOsmolarity;
      document.getElementById('result').innerHTML = `Volume of Injection to Administer: ${dose.toFixed(2)} mL`;
      break;

    default:
      alert("Unsupported concentration type.");
      return;
  }
}
