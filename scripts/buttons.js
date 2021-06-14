const operation = {
  operand1: null,
  operand2: null,
  operation: null,
};

const addButton = document.querySelector("#add");
const subtractButton = document.querySelector("#subtract");
const multiplyButton = document.querySelector("#multiply");
const divideButton = document.querySelector("#divide");

const display = document.querySelector("#display");
const lowerDisplay = document.querySelector("#lower-display");
const numericButtons = document.querySelectorAll(".numeric");
numericButtons.forEach((b) => {
  b.addEventListener("click", (e) => {
    if (e.target.textContent === "." && display.textContent.includes(".")) {
      return;
    }
    display.textContent += e.target.textContent;
  });
});

document.querySelector("#clear").addEventListener("click", (e) => {
  display.textContent = "";
  operation.operand1 = null;
  operation.operand2 = null;
  operation.operation = null;
});

document.querySelector("#delete").addEventListener("click", (e) => {
  display.textContent = display.textContent.slice(
    0,
    display.textContent.length - 1
  );
});

document.querySelectorAll(".operator").forEach((b) => {
  b.addEventListener("click", (e) => {
    if (display.textContent.length === 0 || +display.textContent === NaN) {
      console.log(
        `Operator '${e.target.textContent}' hit when display did not have a number.`
      );
      return;
    }

    if (!operation.operand1) {
      operation.operand1 = +display.textContent;
      lowerDisplay.textContent = operation.operand1;
      console.log(`Operand 1: '${operation.operand1}'`);
    } else {
      operation.operand2 = +display.textContent;
      console.log(`Operand 2: '${operation.operand2}'`);
    }
    display.textContent = "";

    if (e.target.getAttribute("id") === "equals") {
      if (
        operation.operand1 !== null &&
        operation.operand2 !== null &&
        operation.operation !== null
      ) {
        let result = operate(
          operation.operation,
          operation.operand1,
          operation.operand2
        );
        operation.operand1 = result;
        operation.operand2 = null;
        operation.operation = null;
        display.textContent = result;
      }
      console.log("Hit equals button");
    }

    lowerDisplay.textContent += ` ${e.target.textContent} `;
    switch (e.target.textContent) {
      case addButton.textContent:
        operation.operation = add;
        break;
      case subtractButton.textContent:
        operation.operation = subtract;
        break;
      case multiplyButton.textContent:
        operation.operation = multiply;
        break;
      case divideButton.textContent:
        operation.operation = divide;
        break;
    }
  });
});



window.addEventListener('keydown', e => {
  console.log(e.key);
  console.log(e.keyCode);
  const associatedButton = document.querySelector(`[data-key='${e.keyCode}']`);
  if (associatedButton) {
    associatedButton.click();
  } else {
    console.log(`No button associated with ${e.key} (${e.keyCode})`);
  }
})

const add = function (a, b) {
  return a + b;
};

const subtract = function (a, b) {
  return a - b;
};

const multiply = function (a, b) {
  return a * b;
};

const divide = function (a, b) {
  return a / b;
};

const operate = function (operation, operandA, operandB) {
  return operation(operandA, operandB);
};
