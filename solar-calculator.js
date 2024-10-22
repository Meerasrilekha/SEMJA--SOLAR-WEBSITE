document.getElementById('calculate-button').addEventListener('click', function() {
    const panelCapacity = parseFloat(document.getElementById('panel-capacity').value);
    const roofArea = parseFloat(document.getElementById('roof-area').value);
    const budget = parseFloat(document.getElementById('budget').value);
    const state = document.getElementById('state').value;
    const customerCategory = document.getElementById('customer-category').value;
    const electricityCost = parseFloat(document.getElementById('electricity-cost').value);

    if (isNaN(panelCapacity) || isNaN(roofArea) || isNaN(budget) || isNaN(electricityCost)) {
        alert("Please fill in all required fields correctly.");
        return;
    }

    // Calculate maximum possible panel capacity based on roof area
    const maxPanelCapacity = roofArea * 0.15;

    // Calculate cost per kW based on the budget and desired panel capacity
    const costPerKW = budget / panelCapacity;

    // Calculate the total estimated cost
    const totalCost = panelCapacity * costPerKW;

    // Display results
    const resultsContainer = document.getElementById('results-container');
    resultsContainer.innerHTML = `
        <h3>Calculation Results:</h3>
        <p>Maximum Possible Panel Capacity Based on Roof Area: ${maxPanelCapacity.toFixed(2)} kW</p>
        <p>Total Estimated Cost: Rs ${totalCost.toFixed(2)}</p>
    `;
});
