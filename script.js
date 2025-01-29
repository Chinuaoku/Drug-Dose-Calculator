document.getElementById('dosageForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Get the values from the form inputs
    const weight = parseFloat(document.getElementById('weight').value);
    const dose = parseFloat(document.getElementById('dose').value);
    const concentration = parseFloat(document.getElementById('concentration').value);

    // Check if the inputs are valid numbers
    if (isNaN(weight) || isNaN(dose) || isNaN(concentration)) {
        document.getElementById('result').textContent = 'Please enter valid numbers.';
        return;
    }

    // Calculate the total dosage in mg
    const totalDosageMg = weight * dose;

    // Calculate the volume in ml
    const volumeMl = totalDosageMg / concentration;

    // Display the result
    document.getElementById('result').innerHTML = `
        Total Dosage: ${totalDosageMg.toFixed(2)} mg<br>
        Volume to Administer: ${volumeMl.toFixed(2)} ml
    `;

    // Optional: Calculate number of tablets if needed
    const dosagePerTablet = 50; // Assuming each tablet contains 50 mg
    const numberOfTablets = totalDosageMg / dosagePerTablet;

    // Display the number of tablets (if applicable)
    if (dosagePerTablet > 0) {
        document.getElementById('result').innerHTML += `<br>Number of Tablets: ${numberOfTablets.toFixed(2)}`;
    }
});
