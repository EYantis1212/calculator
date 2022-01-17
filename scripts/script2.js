// STARTING STATE

// SELECTORS
const numberBtns = document.querySelectorAll('.number');
const operatorBtns = document.querySelectorAll('.operator');
const clearBtn = document.getElementById('clear');
const backBtn = document.querySelector('.back');
const equalsBtn = document.getElementById('equals');
const posNegBtn = document.getElementById('posNegBtn');
const dotBtn = document.getElementById('dot');
const percentBtn = document.getElementById('percent');
const specialBtns = document.querySelectorAll('special');
const displayCurrent = document.getElementById('display-current');
const displayRunning = document.getElementById('display-running');
const displayOperator = document.getElementById('display-operator');

// VARIABLES
let operator = '';
let operand1 = '';
let operand2 = '';

//LISTENERS
// Number buttons
numberBtns.forEach((button) =>
	button.addEventListener('click', () => appendNum(button.value))
);
// Positive/Negative Button
posNegBtn.addEventListener('click', () => posNeg(displayCurrent.textContent));

// Percent Button
percentBtn.addEventListener('click', () => percent(displayCurrent.textContent));

// Dot Button
dotBtn.addEventListener('click', () => appendDot());

// Operator buttons
operatorBtns.forEach((button) =>
	button.addEventListener('click', function () {
		if (operator == '') {
			operand1 = Number(displayCurrent.textContent);
			operator = button.value;
			displayRunning.textContent = `${operand1} ${operator}`;
			displayCurrent.textContent = '0';
		} else {
			operand2 = Number(displayCurrent.textContent);
			operate(operand1, operand2, operator);
			operand1 = displayCurrent.textContent;
			displayRunning.textContent = displayCurrent.textContent;
			displayCurrent.textContent = 0;
		}
	})
);

// Clear Button
clearBtn.addEventListener('click', () => allClear());

// Equals Button
equalsBtn.addEventListener('click', function () {
	operand2 = Number(displayCurrent.textContent);
	displayRunning.textContent = `${operand1} ${operator} ${operand2} =`;
	displayCurrent.textContent = '';
	operate(operand1, operand2, operator);
	operator = '';
});

// DISPLAY FUNCTION
function updateDisplay(num) {
	displayCurrent.textContent = num;
}

// APPEND FUNCTION
function appendNum(num) {
	if (displayCurrent.textContent.length < 10) {
		if (displayCurrent.textContent == 0) {
			clearCurrentScreen();
			displayCurrent.textContent += num;
		} else sizeFormat((displayCurrent.textContent += num));
	} else displayCurrent.textContent = 'Screen Limit';
}

// MATH FUNCTIONS
function add(num1, num2) {
	return num1 + num2;
}

function subtract(num1, num2) {
	return num1 - num2;
}

function multiply(num1, num2) {
	return num1 * num2;
}

function divide(num1, num2) {
	if (operand2 == 0) {
		return 'WTF MATE!';
	} else return num1 / num2;
}

function percent(num1) {
	displayRunning.textContent = `${num1}%`;
	displayCurrent.textContent = num1 / 100;
}

// NEGATIVE FUNCTION
function posNeg(num1) {
	if (num1 > 0) {
		updateDisplay(-Math.abs(num1));
	} else if (num1 < 0) {
		updateDisplay(Math.abs(num1));
	} else return num1;
}

// BACKSPACE FUNCTION

// CLEAR FUNCTIONS

// Erases starting '0' when number is input
function clearCurrentScreen() {
	displayCurrent.textContent = '';
}
// Clear All
function allClear() {
	displayCurrent.textContent = '0';
	displayRunning.textContent = '';
	operator = '';
	operand1 = '';
	operand2 = '';
}

// DOT FUNCTION
function appendDot() {
	if (displayCurrent.textContent.includes('.')) {
		return;
	} else displayCurrent.textContent += '.';
}

// OPERATE FUNCTION
function operate(operand1, operand2, operator) {
	if (operator == '+') {
		displayCurrent.textContent = add(operand1, operand2);
	}
	if (operator == '-') {
		displayCurrent.textContent = subtract(operand1, operand2);
	}
	if (operator == 'x') {
		displayCurrent.textContent = sizeFormat(multiply(operand1, operand2));
	}
	if (operator == '÷') {
		displayCurrent.textContent = divide(operand1, operand2);
	}
}
// SIZE FORMAT FUNCTION
function sizeFormat(num) {
	if (num % 1 != 0 && num.length > 10) {
		return num.toExponential(2);
	} else if (num.length > 10) {
		return 'Number Exceeds Screen';
	} else return num;
}
