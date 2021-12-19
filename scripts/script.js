// STARTING STATE

// SELECTORS

const numberBtns = document.querySelectorAll('.number');
const operatorBtns = document.querySelectorAll('button .operator');
const clearBtns = document.querySelectorAll('button .clear');
const equalsBtn = document.querySelectorAll('button .equals');
const posNegBtn = document.querySelectorAll('button .posNeg');
const dotBtn = document.querySelectorAll('button .dot');
const displayCurrent = document.getElementById('display-current');
const displayRunning = document.getElementById('display-running');
console.log(numberBtns);
// VARIABLES
operand1 = '';
operand2 = '';
//LISTENERS
numberBtns.forEach((button) =>
	button.addEventListener('click', () => appendNum(button.value))
);

// APPEND FUNCTION
function appendNum(num) {
	if (displayCurrent.textContent == 0) {
		minusZero();
		displayCurrent.textContent += num;
	} else displayCurrent.textContent += num;
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
	return num1 / num2;
}

function percent(num1) {
	return num1 / 100;
}

// NEGATIVE FUNCTION

function posNeg(num1) {
	if (num1 > 0) {
		return -Math.abs(num1);
	} else if (num1 < 0) {
		return Math.abs(num1);
	} else return num1;
}

// BACKSPACE FUNCTION

// CLEAR FUNCTIONS

function minusZero() {
	displayCurrent.textContent = '';
}
// DOT FUNCTION

// OPERATE FUNCTION
