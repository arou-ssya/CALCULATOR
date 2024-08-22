const calcdisplay = document.getElementById('calcdisplay');
const buttons = document.querySelectorAll('.calcbtn');

let currentInput = '';
let operator = '';
let previousInput = '';
let shouldResetScreen = false;

function resetScreen() {
    calcdisplay.innerText = '';
    shouldResetScreen = false;
}

buttons.forEach(button => {
    button.addEventListener('click', () => {
        if (button.id === 'reset') {
            currentInput = '';
            previousInput = '';
            operator = '';
            calcdisplay.innerText = '0';
        } else if (button.id === 'delete') {
            currentInput = currentInput.slice(0, -1);
            calcdisplay.innerText = currentInput || '0';
        } else if (button.classList.contains('number')) {
            if (calcdisplay.innerText === '0' || shouldResetScreen) {
                resetScreen();
            }
            currentInput += button.id;
            calcdisplay.innerText = currentInput;
        } else if (button.classList.contains('operator')) {
            if (operator && previousInput && currentInput) {
                currentInput = calculate(previousInput, currentInput, operator);
                calcdisplay.innerText = currentInput;
            }
            operator = button.id;
            previousInput = currentInput;
            currentInput = '';
            shouldResetScreen = true;
        } else if (button.id === 'equals') {
            if (previousInput && currentInput && operator) {
                currentInput = calculate(previousInput, currentInput, operator);
                calcdisplay.innerText = currentInput;
                operator = '';
                previousInput = '';
            }
        } else if (button.id === 'decimal') {
            if (!currentInput.includes('.')) {
                currentInput += '.';
                calcdisplay.innerText = currentInput;
            }
        }
    });
});

function calculate(firstOperand, secondOperand, operator) {
    const num1 = parseFloat(firstOperand);
    const num2 = parseFloat(secondOperand);

    if (isNaN(num1) || isNaN(num2)) return '';

    switch (operator) {
        case 'add':
            return (num1 + num2).toString();
        case 'subtract':
            return (num1 - num2).toString();
        case 'multiply':
            return (num1 * num2).toString();
        case 'divide':
            return num2 !== 0 ? (num1 / num2).toString() : 'Error';
        default:
            return '';
    }
}
