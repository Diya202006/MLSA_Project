// Get references to DOM elements
const display = document.getElementById('display');
const buttons = document.querySelectorAll('.button');
const historyList = document.getElementById('history-list');
let currentInput = '';
let operator = null;
let firstOperand = null;

// Initialize display
display.textContent = '0';

// Add event listeners to buttons
buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.dataset.value;
        if (!isNaN(value) || value === '.') {
            // Handle number and decimal point input
            currentInput += value;
            display.textContent = currentInput;
        } else if (value === 'C') {
            // Clear the display and reset variables
            currentInput = '';
            operator = null;
            firstOperand = null;
            display.textContent = '0';
        } else if (value === '=') {
            // Perform calculation
            if (operator && firstOperand !== null && currentInput) {
                const secondOperand = parseFloat(currentInput);
                let result;
                switch (operator) {
                    case '+':
                        result = firstOperand + secondOperand;
                        break;
                    case '-':
                        result = firstOperand - secondOperand;
                        break;
                    case '*':
                        result = firstOperand * secondOperand;
                        break;
                    case '/':
                        if (secondOperand === 0) {
                            display.textContent = 'Error';
                            currentInput = '';
                            operator = null;
                            firstOperand = null;
                            return;
                        }
                        result = firstOperand / secondOperand;
                        break;
                    case '^':
                        result = Math.pow(firstOperand, secondOperand);
                        break;
                }
                display.textContent = result.toString();
                const li = document.createElement('li');
                li.textContent = `${firstOperand} ${operator} ${secondOperand} = ${result}`;
                historyList.appendChild(li);
                currentInput = result.toString();
                operator = null;
                firstOperand = null;
            }
        } else if (value === 'sqrt()') {
            // Handle square root
            if (currentInput) {
                const num = parseFloat(currentInput);
                if (num >= 0) {
                    const result = Math.sqrt(num);
                    display.textContent = result.toString();
                    const li = document.createElement('li');
                    li.textContent = `√${num} = ${result}`;
                    historyList.appendChild(li);
                    currentInput = result.toString();
                } else {
                    display.textContent = 'Error';
                    currentInput = '';
                }
            }
        } else {
            // Handle operator input
            if (currentInput) {
                if (operator && firstOperand !== null) {
                    // Calculate intermediate result
                    const secondOperand = parseFloat(currentInput);
                    let result;
                    switch (operator) {
                        case '+':
                            result = firstOperand + secondOperand;
                            break;
                        case '-':
                            result = firstOperand - secondOperand;
                            break;
                        case '*':
                            result = firstOperand * secondOperand;
                            break;
                        case '/':
                            if (secondOperand === 0) {
                                display.textContent = 'Error';
                                currentInput = '';
                                operator = null;
                                firstOperand = null;
                                return;
                            }
                            result = firstOperand / secondOperand;
                            break;
                        case '^':
                            result = Math.pow(firstOperand, secondOperand);
                            break;
                    }
                    display.textContent = result.toString();
                    const li = document.createElement('li');
                    li.textContent = `${firstOperand} ${operator} ${secondOperand} = ${result}`;
                    historyList.appendChild(li);
                    firstOperand = result;
                    currentInput = '';
                } else {
                    firstOperand = parseFloat(currentInput);
                    currentInput = '';
                }
                operator = value;
                display.textContent = '';
            }
        }
    });
});

