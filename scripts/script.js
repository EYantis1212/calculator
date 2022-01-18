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

// VARIABLES
let displayNumber = '';
let operator = '';
let operand1 = 0;
let operand2 = '';
let isDot = false;

//LISTENERS
numberBtns.forEach((button) => {
	button.addEventListener('click', (e) => {
		if (operand1 == 0) {
			operand1 = '';
			renderValues();
		}
		appendNum(parseFloat(button.value));
	});
});

operatorBtns.forEach((button) => {
	button.addEventListener('click', (e) => {
		if (
			operator === '+' ||
			operator === '-' ||
			operator === 'x' ||
			operator === '÷'
		) {
			if (operand1 === 0 || operand1 === '') {
				operator = button.value;
				renderValues();
			} else {
				operate();
			}
		} else {
			operator = button.value;
			console.log(operator);
			operand2 = parseFloat(operand1);
			operand1 = 0;
			renderValues();
		}
	});
});

posNegBtn.addEventListener('click', (e) => {
	if (operand1 > 0) {
		operand1 = -Math.abs(operand1);
		renderValues();
	} else operand1 = Math.abs(operand1);
	renderValues();
});
dotBtn.addEventListener('click', (e) => appendDot());

percentBtn.addEventListener('click', (e) => {
	operand1 = operand1 / 100;
	renderValues();
});

equalsBtn.addEventListener('click', (e) => {
	if (operator !== '') {
		operate();
	}
});

clearBtn.addEventListener('click', (e) => clearAll());

backBtn.addEventListener('click', (e) => {
	if (operand1.length > 1) {
		operand1 = operand1.slice(0, -1);
	} else operand1 = 0;
	renderValues();
});

//FUNCTIONS

// APPEND FUNCTIONS
function appendNum(num) {
	if (operand1.length <= 10) {
		operand1 += parseFloat(num);
		renderValues();
	} else throwError('screenLimit');
}

function appendDot() {
	if (isDot === false) {
		operand1 += '.';
		renderValues();
	}
}

//OPERATION FUNCTIONS
function operate() {
	switch (operator) {
		case '+':
			displayNumber = parseFloat(operand2) + parseFloat(operand1);
			break;
		case '-':
			displayNumber = parseFloat(operand2) - parseFloat(operand1);
			break;
		case 'x':
			displayNumber = parseFloat(operand2) * parseFloat(operand1);
			break;
		case '÷':
			displayNumber = parseFloat(operand2) / parseFloat(operand1);
			break;
	}
	if (displayNumber.length > 8) {
		displayNumber = displayNumber.toFixed(4);
	}
	operand2 = '';
	operand1 = displayNumber;
	operator = '';
	renderValues();
}

//RENDER FUNCTIONS
function renderValues() {
	displayNumber = Math.abs(operand1).toExponential(8);
	displayRunning.textContent = operand2 + operator;
	displayCurrent.textContent = parseFloat(displayNumber);
}

function clearAll() {
	displayNumber = '';
	operator = '';
	operand1 = 0;
	operand2 = '';
	renderValues();
}

function formatNumber(num) {
	return num.toFixed(4);
}

function throwError(err) {
	clearAll();
	switch (err) {
		case 'screenLimit':
			displayRunning.textContent = 'Input Exceeded Limit';
	}
}
renderValues();
