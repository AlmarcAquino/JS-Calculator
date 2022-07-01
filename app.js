// https://frontendmasters.com/courses/web-development-v2/javascript-html-and-css-solution-part-2/
let runningTotal = 0;
let buffer = '0';
let previousOperator = null;
const screen = document.querySelector('.result');

document.querySelector('.calc__buttons').addEventListener('click', function(event) {
  buttonClick(event.target.innerText);
})

function buttonClick(value) {
  if (isNaN(parseInt(value))) {
    // symbol clicked
    handleSymbol(value);
  } else {
    // number clicked
    handleNumber(value);
  }
  renderOutput();
}

function handleNumber(value) {
  if (buffer === 0) {
    buffer = value; 
  } else {
    buffer += value;
  }
}

function handleSymbol(value) {
  switch (value) {
    case 'C':
      buffer = '0';
      runningTotal = 0;
      previousOperator = null;
      break;
    case '=':
      if (previousOperator === null) {
        return;
      }
      flushOperation(parseInt(buffer));
      previousOperator = null;
      buffer = '' + runningTotal;
      runningTotal = 0;
      break;
    case '←':
      if (buffer.length === 1) {
        buffer = '0';
      } else {
        buffer = buffer.substring(0, buffer.length - 1)
      }
      break;
    default:
      handleMath(value)
      break;
  }
}

function handleMath(value) {
  const intBuffer = parseInt(buffer);
  if (runningTotal === 0) {
    runningTotal = buffer;
  } else {
    flushOperation(intBuffer);
  }

  previousOperator = value;
  buffer = '0';
}

function flushOperation(intBuffer) {
  if (previousOperator === '+') {
    runningTotal += intBuffer;
  } else if (previousOperator === '-') {
    runningTotal -= intBuffer;
  } else if (previousOperator === 'x') {
    runningTotal *= intBuffer;
  } else {
    runningTotal /= intBuffer;
  }  
}

function renderOutput() {
  screen.innerText = buffer;
}