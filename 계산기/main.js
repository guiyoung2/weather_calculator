// let runningTotal = 0;
// let buffer = "0";
// let previousOperator;

// const result = document.querySelector(".result");

// function buttonClick(value) {
//   if (isNaN(value)) {
//     handleSymbol(value);
//   } else {
//     handleNumber(value);
//   }
//   result.innerText = Math.round(buffer * 1000000) / 1000000;
// }

// function handleSymbol(symbol) {
//   switch (symbol) {
//     case "C":
//       buffer = "0";
//       runningTotal = 0;
//       break;
//     case "=":
//       if (previousOperator === null) {
//         return;
//       }
//       flushOperator(parseInt(buffer));
//       previousOperator = null;
//       buffer = runningTotal;
//       runningTotal = 0;
//       break;
//     case "←":
//       if (buffer.length === 1) {
//         buffer = "0";
//       } else {
//         buffer = buffer.substring(0, buffer.length - 1);
//       }
//       break;
//     case "%":
//       if (buffer.length === 0) {
//         buffer = "0";
//       } else {
//         buffer = buffer * 0.01;
//       }
//       break;
//     case "+":
//     case "-":
//     case "x":
//     case "÷":
//       handleMath(symbol);
//       break;
//   }
// }

// function handleMath(symbol) {
//   if (buffer === "0") {
//     return;
//   }

//   // const intBuffer = parseInt(buffer);
//   const intBuffer = buffer;

//   if (runningTotal === 0) {
//     runningTotal = intBuffer;
//   } else {
//     flushOperator(intBuffer);
//   }
//   previousOperator = symbol;
//   buffer = "0";
// }

// function flushOperator(intBuffer) {
//   if (previousOperator === "+") {
//     runningTotal += intBuffer;
//   } else if (previousOperator === "-") {
//     runningTotal -= intBuffer;
//   } else if (previousOperator === "x") {
//     runningTotal *= intBuffer;
//   } else if (previousOperator === "÷") {
//     runningTotal /= intBuffer;
//   }
// }

// function handleNumber(numberString) {
//   if (buffer === "0") {
//     buffer = numberString;
//   } else {
//     buffer += numberString;
//   }
// }

// function init() {
//   document
//     .querySelector(".buttons")
//     .addEventListener("click", function (event) {
//       buttonClick(event.target.innerText);
//     });
// }

// init();

//  위에는 다른 방식의 계산기 코드

const numbers = document.querySelectorAll(".numbers");
const result = document.querySelector(".result");
const signs = document.querySelectorAll(".sign");
const equals = document.querySelector(".equals");
const clear = document.querySelector(".clear");
const percent = document.querySelector(".percent");
const del = document.querySelector(".del");

let firstValue = "";
let isFirstValue = false;
let secondValue = "";
let isSecondValue = false;
let sign = "";
let resultValue = 0;

for (let i = 0; i < numbers.length; i++) {
  numbers[i].addEventListener("click", e => {
    let atr = e.target.getAttribute("value");
    if (isFirstValue === false) {
      getFirstValue(atr);
    }
    if (isSecondValue == false) {
      getSecondValue(atr);
    }
  });
}

function getFirstValue(el) {
  result.innerHTML = "";
  firstValue += el;
  result.innerHTML = firstValue;
  firstValue = +firstValue;
}

function getSecondValue(el) {
  if (firstValue != "" && sign != "") {
    secondValue += el;
    result.innerHTML = secondValue;
    secondValue = +secondValue;
  }
}

function getSign() {
  for (let i = 0; i < signs.length; i++) {
    signs[i].addEventListener("click", e => {
      sign = e.target.getAttribute("value");
      isFirstValue = true;
    });
  }
}
getSign();

equals.addEventListener("click", () => {
  result.innerHTML = "";
  if (sign === "+") {
    resultValue = firstValue + secondValue;
  } else if (sign === "-") {
    resultValue = firstValue - secondValue;
  } else if (sign === "x") {
    resultValue = firstValue * secondValue;
  } else if (sign === "÷") {
    resultValue = firstValue / secondValue;
  }
  result.innerHTML = resultValue;
  firstValue = resultValue;
  secondValue = "";

  checkResultLength();
});

// 소수점 5자리까지만 나오게
function checkResultLength() {
  resultValue = JSON.stringify(resultValue);

  if (resultValue.length >= 8) {
    resultValue = JSON.parse(resultValue);
    result.innerHTML = resultValue.toFixed(5);
  }
}

percent.addEventListener("click", () => {
  result.innerHTML = "";
  if (firstValue != "") {
    resultValue = firstValue / 100;
    firstValue = resultValue;
  }
  if (firstValue != "" && secondValue != "" && sign != "") {
    resultValue = resultValue / 100;
  }

  result.innerHTML = resultValue;
});

// 숫자에서 짜르는게 안되니 문자열로 바꾼 후 다시 숫자로 바꾸기
del.addEventListener("click", () => {
  result.innerHTML = "";
  if (firstValue != "") {
    resultValue = firstValue.toString().slice(0, -1);
    firstValue = Number(resultValue);
    console.log(typeof firstValue);
  }
  if (firstValue != "" && secondValue != "" && sign != "") {
    resultValue = resultValue.toString().slice(0, -1);
    Number(resultValue);
  }

  result.innerHTML = resultValue;
});

clear.addEventListener("click", () => {
  result.innerHTML = 0;

  firstValue = "";
  isFirstValue = false;
  secondValue = "";
  isSecondValue = false;
  sign = "";
  resultValue = 0;
});
