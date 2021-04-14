const display = document.querySelector('#display');
const allButtons = document.querySelectorAll('button');

const calculator = {
	displayContent: '0',
	operatorA: null,
	waitingOperatorB: false,
	operation: null,
};

function inputDigit(digit) {
	if (calculator.waitingOperatorB === true) {
		calculator.displayContent = digit;
		calculator.waitingOperatorB = false;
	} else {
		calculator.displayContent = (calculator.displayContent === '0') ? digit : calculator.displayContent + digit;
	}
}
function calculate(a, b, symbol) {
	let res = 0;
	switch (symbol) {
	case '+':
		res = a + b;
		break;
	case '-':
		res = a - b;
		break;
	case 'X':
		res = a * b;
		break;
	case '/':
		res = a / b;
		break;
	default:
		res = b;
	}
	return res;
}

function reset() {
	calculator.displayContent = '0';
	calculator.operatorA = null;
	calculator.waitingOperatorB = false;
	calculator.operation = null;
}

function handleOperation(operatorSelected) {
	const input = parseFloat(calculator.displayContent);
	if (calculator.operatorA === null) {
		calculator.operatorA = input;
	} else if (calculator.operation) {
		const result = calculate(calculator.operatorA, input, calculator.operation);
		calculator.displayContent = result.toString();
		calculator.operatorA = result;
	}
	calculator.waitingOperatorB = true;
	calculator.operation = operatorSelected;
}

function updateDisplay() {
	display.textContent = calculator.displayContent;
}

updateDisplay();

allButtons.forEach((button) => {
	button.addEventListener('click', () => {
		if (button.classList.contains('operation-btn')) {
			handleOperation(button.textContent);
			updateDisplay();
		} else if (button.classList.contains('clear')) {
			reset();
			updateDisplay();
		} else {
			inputDigit(button.textContent);
			updateDisplay();
		}
	});
});
