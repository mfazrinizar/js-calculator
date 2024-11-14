var ops = ["+", "-", "/", "*"];

var display = null;
var historyDisplay = null;
var currentOp = null;
var equals = null;
var decimal = null;

var isFirstNum = true;

var numArray = [];
var opValue;
var lastBtn;
var calcOp;

var result;

var keyCombo = []
function inputNumber(btn) {

    currentOp = document.getElementsByClassName("operator");
    display = document.getElementById("displayBox");
    historyDisplay = document.getElementById("operationHistory");
    equals = document.getElementById("equals").value;
    decimal = document.getElementById("decimal").value;

    lastBtn = btn;

    if (!ops.includes(btn) && btn != equals) {
        if (isFirstNum) {
            if (btn == decimal) {
                display.innerText = "0" + decimal;
            } else {
                display.innerText = btn;
            }
            isFirstNum = false;
        } else {
            if (display.innerText.length == 1 && display.innerText == 0) {
                if (btn == decimal) {
                    display.innerText += btn;
                }
                return;
            }
            if (display.innerText.includes(decimal) && btn == decimal) {
                return;
            }
            if (display.innerText.length == 20) {
                return;
            }
            if (btn == decimal && display.innerText == "-") {
                display.innerText = "-0" + decimal;
            } else {
                display.innerText += btn;
            }
        }
    } else {
        if (opValue != null && btn == opValue) {
            return
        }
        if (btn == "-" && display.innerText == 0) {
            display.innerText = btn;
            isFirstNum = false;
            opValue = btn
            highlightOperator()
            return;
        } else if (ops.includes(btn) && display.innerText == "-") {
            return
        } else if (btn == "-" && opValue == "-" && historyDisplay.innerText.includes("=")) {
            return
        }
        if (ops.includes(btn)) {
            if (typeof lastOp != "undefined" && lastOp != null) {
                calcOp = lastOp
            } else {
                calcOp = btn
            }
            if (btn == "*") {
                lastOp = "×"
            } else if (btn == "/") {
                lastOp = "÷"
            } else {
                lastOp = btn
            }
            opValue = btn
            isFirstNum = true
            highlightOperator()
        }
        if (numArray.length == 0) {
            numArray.push(display.innerText)
            if (typeof lastOp != "undefined" && lastOp != null) {
                historyDisplay.innerText = display.innerText + " " + lastOp
            }
        } else {
            if (numArray.length == 1) {
                numArray[1] = display.innerText
            }
            var tempNum = display.innerText
            if (btn == equals && calcOp != null) {
                var result = calculate(numArray[0], numArray[1], calcOp)
                display.innerText = result;
                if (!historyDisplay.innerText.includes("=")) {
                    historyDisplay.innerText += " " + numArray[1] + " ="
                }
                tempNum = numArray[0]
                numArray[0] = result
                opValue = null
                highlightOperator()
                var historyArr = historyDisplay.innerText.split(" ")
                historyArr[0] = tempNum
                historyDisplay.innerText = historyArr.join(" ")
            } else if (calcOp != null) {
                historyDisplay.innerText = tempNum + " " + lastOp
                calcOp = btn
                numArray = []
                numArray.push(display.innerText)
            }
        }
    }
}

function highlightOperator() {
    var elements = document.getElementsByClassName("operator");
    for (var i = 0; i < elements.length; i++) {
        elements[i].style.backgroundColor = "#4CAF50";
    }
    if (opValue == "+") {
        document.getElementById("addOp").style.backgroundColor = "#8BC34A";
    } else if (opValue == "-") {
        document.getElementById("subtractOp").style.backgroundColor = "#8BC34A";
    } else if (opValue == "*") {
        document.getElementById("multiplyOp").style.backgroundColor = "#8BC34A";
    } else if (opValue == "/") {
        document.getElementById("divideOp").style.backgroundColor = "#8BC34A";
    }
}

function calculate(num1, num2, operator) {
    if (operator === "+") {
        result = (parseFloat)(num1) + (parseFloat)(num2)
    } else if (operator === "-") {
        result = (parseFloat)(num1) - (parseFloat)(num2)
    } else if (operator === "*") {
        result = (parseFloat)(num1) * (parseFloat)(num2)
    } else if (operator === "/") {
        result = (parseFloat)(num1) / (parseFloat)(num2)
    } else {
        if (result == display.innerText) {
            return result
        } else {
            return display.innerText
        }
    }
    if (!Number.isInteger(result)) {
        result = result.toPrecision(12);
    }
    return parseFloat(result);
}

function clearAll() {
    window.location.reload()
}

function removeLast() {
    display = document.getElementById("displayBox");
    var elements = document.getElementsByClassName("operator");
    for (var i = 0; i < elements.length; i++) {
        elements[i].style.backgroundColor = "#4CAF50";
    }
    var lastNum = display.innerText;
    lastNum = lastNum.slice(0, -1)
    display.innerText = lastNum
    if (display.innerText.length == 0) {
        display.innerText = 0
        isFirstNum = true
    }
}

function toggleSign() {
    display = document.getElementById("displayBox");
    if (typeof lastOp != "undefined") {
        if (numArray.length > 0) {
            if (ops.includes(lastBtn)) {
                if (display.innerText == "-") {
                    display.innerText = 0
                    isFirstNum = true
                    return
                } else {
                    display.innerText = "-"
                    isFirstNum = false
                }
            } else {
                display.innerText = -display.innerText
                if (numArray.length == 1) {
                    numArray[0] = display.innerText
                } else {
                    numArray[1] = display.innerText
                }
            }
        }
        return
    }
    if (display.innerText == 0) {
        display.innerText = "-"
        isFirstNum = false
        return
    }
    display.innerText = -display.innerText
}

function sqrt() {
    display = document.getElementById("displayBox");
    var sqrtNum = Math.sqrt(display.innerText)
    display.innerText = sqrtNum
    numArray.push(sqrtNum)
}

function reciprocal() {
    display = document.getElementById("displayBox");
    var reciprocalNum = 1 / display.innerText
    display.innerText = reciprocalNum
    numArray.push(reciprocalNum)
}

function square() {
    display = document.getElementById("displayBox");
    var squareNum = Math.pow(display.innerText, 2)
    display.innerText = squareNum
    numArray.push(squareNum)
}

function percentCalc() {
    var elements = document.getElementsByClassName("operator");
    display = document.getElementById("displayBox");
    if (numArray.length > 0 && typeof lastOp != "undefined") {
        var percValue = ((display.innerText / 100) * numArray[0])
        if (!Number.isInteger(percValue)) {
            percValue = percValue.toFixed(2);
        }
        display.innerText = percValue
        numArray.push(display.innerText)
        if (!historyDisplay.innerText.includes("=")) {
            historyDisplay.innerText += " " + numArray[1] + " ="
        }
    } else {
        display.innerText = display.innerText / 100
    }
    numArray.push(display.innerText)
    var res = calculate(numArray[0], numArray[1], lastOp)
    display.innerText = res
    opValue = "="
    for (var i = 0; i < elements.length; i++) {
        elements[i].style.backgroundColor = "#4CAF50";
    }
}

function clearEntry() {
    display = document.getElementById("displayBox");
    display.innerText = 0;
    isFirstNum = true;

    if (numArray.length > 0) {
        var temp = numArray[0];
        numArray = [];
        numArray.push(temp);
    }
}

document.addEventListener('keydown', keyPressed);
document.addEventListener('keyup', keyReleased);

function keyPressed(e) {
    e.preventDefault()
    var equals = document.getElementById("equals").value;
    var decimal = document.getElementById("decimal").value;
    if (e.key == "Delete") {
        clearAll();
        return;
    }
    var isNumber = isFinite(e.key);
    var enterPress;
    var decimalPress;
    var commaPress = false;
    if (e.key == "Enter") {
        enterPress = equals;
    }
    if (e.key == ".") {
        decimalPress = decimal;
    }
    if (e.key == ",") {
        commaPress = true;
    }
    if (isNumber || ops.includes(e.key) || e.key == "Enter" || e.key == decimalPress ||
        commaPress || e.key == "Backspace") {
        if (e.key == "Enter") {
            inputNumber(enterPress)
        } else if (e.key == "Backspace") {
            document.getElementById("backspaceBtn").style.backgroundColor = "#999999";
            removeLast()
        } else if (commaPress) {
            inputNumber(decimal)
        } else {
            inputNumber(e.key)
        }
    }
    if (e.key) {
        keyCombo[e.code] = e.key;
    }
}

function keyReleased(e) {
    if (keyCombo['ControlLeft'] && keyCombo['KeyV']) {
        navigator.clipboard.readText().then(text => {
            display = document.getElementById("displayBox");
            var isNumber = isFinite(text);
            if (isNumber) {
                var copyNumber = text
                isFirstNum = true
                inputNumber(copyNumber)
            }
        }).catch(err => {
            console.error('Failed to read clipboard contents: ', err);
        });
    }
    if (keyCombo['ControlLeft'] && keyCombo['KeyC']) {
        display = document.getElementById("displayBox");
        navigator.clipboard.writeText(display.innerText)
    }
    keyCombo = []
    e.preventDefault()
    if (e.key == "Backspace") {
        document.getElementById("backspaceBtn").style.backgroundColor = "#666666";
    }
}