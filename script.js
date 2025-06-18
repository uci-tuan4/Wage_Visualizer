document.addEventListener('DOMContentLoaded', () => {
    const wageInput = document.getElementById('wage');
    const startButton = document.getElementById('startButton');
    const stopButton = document.getElementById('stopButton');
    const moneyDisplay = document.getElementById('moneyDisplay');
    const normalPrecisionBtn = document.getElementById('normalPrecision');
    const precisePrecisionBtn = document.getElementById('precisePrecision');

    let interval;
    let startTime;
    let hourlyWage;
    let precision = 2;
    let moneyEarned = 0;

    startButton.addEventListener('click', () => {
        const wage = parseFloat(wageInput.value);
        if (isNaN(wage) || wage <= 0) {
            alert('Please enter a valid hourly wage.');
            return;
        }
        hourlyWage = wage;
        startTime = Date.now();
        moneyEarned = 0;
        
        startButton.disabled = true;
        stopButton.disabled = false;
        wageInput.disabled = true;

        interval = setInterval(updateMoney, 1);
    });

    stopButton.addEventListener('click', () => {
        clearInterval(interval);
        startButton.disabled = false;
        stopButton.disabled = true;
        wageInput.disabled = false;
    });

    normalPrecisionBtn.addEventListener('click', () => {
        precision = 2;
        normalPrecisionBtn.classList.add('active');
        precisePrecisionBtn.classList.remove('active');
        updateDisplay();
    });

    precisePrecisionBtn.addEventListener('click', () => {
        precision = 4;
        precisePrecisionBtn.classList.add('active');
        normalPrecisionBtn.classList.remove('active');
        updateDisplay();
    });

    function updateMoney() {
        const elapsedTime = Date.now() - startTime; // in milliseconds
        moneyEarned = (hourlyWage / 3600000) * elapsedTime;
        updateDisplay();
    }

    function updateDisplay() {
        moneyDisplay.textContent = `$${moneyEarned.toFixed(precision)}`;
    }
}); 