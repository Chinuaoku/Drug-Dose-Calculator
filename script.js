document.getElementById('dosageForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent form submission

    // Get user inputs
    const weight = parseFloat(document.getElementById('weight').value);
    const dose = parseFloat(document.getElementById('dose').value);
    const mode = document.getElementById('mode').value;
    const concentrationType = document.getElementById('concentrationType').value;
    const concentrationValue = parseFloat(document.getElementById('concentrationValue').value);

    let resultText = ''; // Variable to store the result message

    if (mode === 'injection') {
        // Validate injection-specific inputs
        if (isNaN(weight) || isNaN(dose) || isNaN(concentrationValue)) {
            resultText = 'Please enter valid numbers for weight, dose, and concentration.';
        } else {
            // Calculate total dosage in mg
            const totalDosageMg = weight * dose;

            // Handle different concentration types
            let volumeMl = 0;
            switch (concentrationType) {
                case 'mg/mL':
                    volumeMl = totalDosageMg / concentrationValue;
                    break;
                case 'IU/mL':
                    volumeMl = totalDosageMg / concentrationValue; // Assuming IU is directly proportional to mg
                    break;
                case '% w/v':
                    volumeMl = (totalDosageMg * 100) / (concentrationValue * 10); // Convert % w/v to mg/mL
                    break;
                case '1:X Ratio':
                    volumeMl = totalDosageMg / (1000 / concentrationValue); // Convert ratio to mg/mL
                    break;
                case 'Molar (M)':
                    const molecularWeight = 100; // Placeholder for molecular weight (update as needed)
                    volumeMl = (totalDosageMg * 1000) / (concentrationValue * molecularWeight);
                    break;
                case 'Normality (N)':
                    const equivalentWeight = 100; // Placeholder for equivalent weight (update as needed)
                    volumeMl = (totalDosageMg * 1000) / (concentrationValue * equivalentWeight);
                    break;
                case 'Osmolarity (mOsm/L)':
                    const osmolarityFactor = 1; // Placeholder for conversion factor (update as needed)
                    volumeMl = (totalDosageMg * 1000) / (concentrationValue * osmolarityFactor);
                    break;
                case 'PPM':
                    volumeMl = totalDosageMg / (concentrationValue / 1000); // Convert PPM to mg/mL
                    break;
                case 'PPB':
                    volumeMl = totalDosageMg / (concentrationValue / 1000000); // Convert PPB to mg/mL
                    break;
                default:
                    resultText = 'Unsupported concentration type.';
                    break;
            }

            if (volumeMl > 0) {
                resultText = `Total Dosage: ${totalDosageMg.toFixed(2)} mg<br>Volume to Administer: ${volumeMl.toFixed(2)} mL`;
            }
        }
    } else if (mode === 'tablet') {
        const tabletConcentration = parseFloat(document.getElementById('tabletConcentration').value);

        // Validate tablet-specific inputs
        if (isNaN(weight) || isNaN(dose) || isNaN(tabletConcentration)) {
            resultText = 'Please enter valid numbers for weight, dose, and tablet concentration.';
        } else {
            // Calculate total dosage in mg
            const totalDosageMg = weight * dose;

            // Calculate the number of tablets needed
            const numberOfTablets = Math.ceil(totalDosageMg / tabletConcentration);

            // Display the result
            resultText = `Total Dosage: ${totalDosageMg.toFixed(2)} mg<br>Number of Tablets: ${numberOfTablets}`;
        }
    }

    // Show the result
    document.getElementById('result').innerHTML = resultText;
});

// Show/hide fields based on mode of administration
document.getElementById('mode').addEventListener('change', function () {
    const mode = this.value;
    const tabletFields = document.getElementById('tabletFields');

    if (mode === 'injection') {
        tabletFields.style.display = 'none';
    } else if (mode === 'tablet') {
        tabletFields.style.display = 'block';
    }
});
