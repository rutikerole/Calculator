// Step 1 declare our varibale
// Select DOM elements for the calculator
const boxes = document.querySelectorAll('.box'); 
const operators = document.querySelectorAll('.operator'); 
const allClear = document.querySelector('.all-clear'); 
const inputField = document.querySelector('.calculator-screen'); 
const equalSign = document.querySelector('.equal-sign');

// Create an element to display the equation above the calculator
const equationDisplay = document.createElement('div');
equationDisplay.classList.add('equation-display');
document.body.insertBefore(equationDisplay, document.querySelector('.calculator'));

// Initialize variables to store input and operation
let currentInput = ''; // Input for the current number
let previousInput = ''; // Input for the previous number
let operation = null; // Current operation (+, -, *, /)

// Update the display screen with a value
const updateScreen = (value) => {
    inputField.value = value;
};

// Perform the calculation based on the selected operation
const performCalculation = () => {
    let result; // Variable to store the result
    const prev = parseFloat(previousInput); // Convert previous input to a number
    const current = parseFloat(currentInput); // Convert current input to a number

    // Check if inputs are valid numbers
    if (isNaN(prev) || isNaN(current)) return;

    // Perform the operation
    switch (operation) {
        case '+':
            result = prev + current;
            break;
        case '-':
            result = prev - current;
            break;
        case '×':
            result = prev * current;
            break;
        case '÷':
            result = prev / current;
            break;
        default:
            return; // If no valid operation, do nothing
    }

    // Display the equation and result
    equationDisplay.textContent = `${previousInput} ${operation} ${currentInput}`;
    currentInput = result.toString(); 
    updateScreen(currentInput); // Update the display with the result

    // Clear previous input and operation for next calculation
    previousInput = '';
    operation = null;
};

// Handle number button clicks
boxes.forEach((box) => {
    box.addEventListener('click', (e) => {
        currentInput += e.target.textContent; // Append clicked number to current input
        updateScreen(currentInput); // Update display
    });
});

// Handle operator button clicks
operators.forEach((operator) => {
    operator.addEventListener('click', (e) => {
        if (currentInput === '') return; // Ignore if no input

        if (previousInput !== '' && operation) {
            performCalculation(); // Calculate if there is a previous input and operation
        }

        // Set previous input and operation
        previousInput = currentInput;
        operation = e.target.textContent; // Get operator from button
        currentInput = ''; // Clear current input for next number
    });
});

// Handle equals button click
equalSign.addEventListener('click', () => {
    if (currentInput === '' || previousInput === '' || !operation) return; // Check for valid inputs
    performCalculation(); // Perform the calculation
});

// Handle all clear (AC) button click
allClear.addEventListener('click', () => {
    // Reset all inputs and clear the display
    currentInput = '';
    previousInput = '';
    operation = null;
    equationDisplay.textContent = ''; // Clear the equation display
    updateScreen(''); // Clear the calculator display
});
