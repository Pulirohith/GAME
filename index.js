
const questionEl = document.getElementById("question");
const inputEl = document.getElementById("input");
const formEl = document.getElementById("form");
const scoreEl = document.getElementById("score");

let score = JSON.parse(localStorage.getItem("score"));

if (!score) {
    score = 0;
}

scoreEl.innerText = `score: ${score}`;

function generateRandomOperation() {
    const operations = ['+', '-', '*', '/'];
    const randomIndex = Math.floor(Math.random() * operations.length);
    return operations[randomIndex];
}

function generateQuestion() {
    const num1 = Math.ceil(Math.random() * 10);
    const num2 = Math.ceil(Math.random() * 10);
    const operation = generateRandomOperation();

    let correctAns;

    switch (operation) {
        case '+':
            correctAns = num1 + num2;
            return [`What is ${num1} + ${num2} ?`, correctAns];
        case '-':
            correctAns = num1 - num2;
            return [`What is ${num1} - ${num2} ?`, correctAns];
        case '*':
            correctAns = num1 * num2;
            return [`What is ${num1} * ${num2} ?`, correctAns];
        case '/':
            correctAns = num1 / num2;
            return [`What is ${num1} / ${num2} ? (Round to 2 decimal places)`, correctAns];
    }
}

function updateQuestion() {
    const [question, correctAns] = generateQuestion();
    questionEl.innerText = question;
    return correctAns;
}

let correctAns = updateQuestion();

formEl.addEventListener("submit", (event) => {
    event.preventDefault(); // Prevents the default form submission behavior
    const userAns = +inputEl.value;

    if (userAns.toFixed(2) == correctAns.toFixed(2)) {
        score++;
    } else {
        score--;
    }

    correctAns = updateQuestion();
    scoreEl.innerText = `score: ${score}`;
    updateLocalStorage();

    // Clear the input field for the next question
    inputEl.value = "";
});

function updateLocalStorage() {
    localStorage.setItem("score", JSON.stringify(score));
}

window.addEventListener("beforeunload", () => {
    // Reset the score to 0 when the window is closed
    localStorage.setItem("score", JSON.stringify(0));
});
