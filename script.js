document.getElementById('dosageForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Get the values from the form inputs
    const weight = parseFloat(document.getElementById('weight').value);
    const dose = parseFloat(document.getElementById('dose').value);

    // Check if the inputs are valid numbers
    if (isNaN(weight) || isNaN(dose)) {
        document.getElementById('result').textContent = 'Please enter valid numbers.';
        return;
    }

    // Calculate the total dosage
    const totalDosage = weight * dose;

    // Display the result
    document.getElementById('result').textContent = `Total Dosage: ${totalDosage.toFixed(2)} mg`;

    // Optional: Calculate number of tablets if needed
    const dosagePerTablet = 50; // Assuming each tablet contains 50 mg
    const numberOfTablets = totalDosage / dosagePerTablet;

    // Display the number of tablets
    document.getElementById('result').innerHTML += `<br>Number of Tablets: ${numberOfTablets.toFixed(2)}`;
});
