const display = document.getElementById("display");

let expression = "";
let lastResult = null;

function updateDisplay(value) {
    display.value = value;
}

function addNumber(num) {
    expression += num;
    updateDisplay(expression);
}

function addDecimal() {
    const parts = expression.split(/[\+\-\*\/]/);
    if (!parts[parts.length - 1].includes(".")) {
        expression += ".";
        updateDisplay(expression);
    }
}

function addOperator(op) {
    if (expression === "" && lastResult !== null) {
        expression = lastResult.toString();
    }

    if (/[\+\-\*\/]$/.test(expression)) {
        expression = expression.slice(0, -1);
    }

    expression += op;
    updateDisplay(expression);
}

function backspace() {
    expression = expression.slice(0, -1);
    updateDisplay(expression || "0");
}

function clearAll() {
    expression = "";
    lastResult = null;
    updateDisplay("0");
}

function calculate() {
    try {
        const result = Function(`return ${expression}`)();
        lastResult = Number(result.toFixed(10));
        expression = lastResult.toString();
        updateDisplay(expression);
    } catch {
        updateDisplay("Error");
        expression = "";
    }
}

document.querySelectorAll("[data-num]").forEach(btn =>
    btn.addEventListener("click", () => addNumber(btn.dataset.num))
);

document.querySelectorAll("[data-op]").forEach(btn =>
    btn.addEventListener("click", () => addOperator(btn.dataset.op))
);

document.querySelector("[data-dec]").addEventListener("click", addDecimal);
document.getElementById("equals").addEventListener("click", calculate);
document.getElementById("clear").addEventListener("click", clearAll);

document.addEventListener("keydown", (e) => {
    if (/\d/.test(e.key)) addNumber(e.key);
    if ("+-*/".includes(e.key)) addOperator(e.key);
    if (e.key === ".") addDecimal();
    if (e.key === "Enter") calculate();
    if (e.key === "Backspace") backspace();
    if (e.key === "Escape") clearAll();
});
