document.getElementById('dosageForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Get the values from the form inputs
    const weight = parseFloat(document.getElementById('weight').value);
    const dose = parseFloat(document.getElementById('dose').value);
    const concentration = parseFloat(document.getElementById('concentration').value);
    const tabletConcentration = parseFloat(document.getElementById('tabletConcentration').value);

    // Check if the inputs are valid numbers
    if (isNaN(weight) || isNaN(dose) || isNaN(concentration) || isNaN(tabletConcentration)) {
        document.getElementById('result').textContent = 'Please enter valid numbers.';
        return;
    }

    // Calculate the total dosage in mg
    const totalDosageMg = weight * dose;

    // Calculate the volume in ml
    const volumeMl = totalDosageMg / concentration;

    // Calculate the number of tablets needed
    const numberOfTablets = totalDosageMg / tabletConcentration;

    // Display the result
    document.getElementById('result').innerHTML = `
        Total Dosage: ${totalDosageMg.toFixed(2)} mg<br>
        Volume to Administer: ${volumeMl.toFixed(2)} ml<br>
        Number of Tablets: ${numberOfTablets.toFixed(2)}
    `;
});
