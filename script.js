const questions = [
    {
        question: "How would you rate your current physical fitness?",
        options: [
            "a) Excellent – I work out regularly",
            "b) Average – Moderately active",
            "c) Below average – I rarely engage in physical activity"
        ]
    },
    {
        question: "Do you have any experience in hand-to-hand combat or self-defense?",
        options: [
            "a) Yes, formal training",
            "b) Yes, informally",
            "c) No, I rely on non-physical conflict resolution"
        ]
    },
    // Add the rest of the questions in the same format as above
];

const points = { 'a': 10, 'b': 5, 'c': 0 };

// Load questions dynamically into the HTML
function loadQuestions() {
    const questionContainer = document.getElementById("questionContainer");
    questions.forEach((q, index) => {
        const questionDiv = document.createElement("div");
        questionDiv.classList.add("question");
        questionDiv.innerHTML = `
            <label>${q.question}</label>
            ${q.options.map((option, i) => `
                <label><input type="radio" name="question${index}" value="${option[0]}" required> ${option}</label>
            `).join('')}
        `;
        questionContainer.appendChild(questionDiv);
    });
}

// Calculate the score
function submitAnswers() {
    let score = 0;
    let totalScore = questions.length * 10;
    const resultElement = document.getElementById("result");

    questions.forEach((_, index) => {
        const selectedOption = document.querySelector(`input[name="question${index}"]:checked`);
        if (selectedOption) {
            score += points[selectedOption.value];
        }
    });

    const percentage = (score / totalScore) * 100;

    resultElement.innerHTML = `Your total score is ${score}/${totalScore}, which is ${percentage.toFixed(2)}% survival readiness.<br>`;

    if (percentage > 80) {
        resultElement.innerHTML += "You have a strong chance of surviving in a post-apocalyptic scenario!";
    } else if (percentage > 50) {
        resultElement.innerHTML += "You have a moderate chance of survival, but could improve your skills.";
    } else {
        resultElement.innerHTML += "Your chances of survival are low. Consider improving your skills in key areas.";
    }
}

// Load the questions when the page is loaded
window.onload = loadQuestions;
