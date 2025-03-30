document.addEventListener('DOMContentLoaded', () => {
    const expr1 = document.getElementById('expr1');
    const expr2 = document.getElementById('expr2');
    const expr3 = document.getElementById('expr3');
    const answer1 = document.getElementById('answer1');
    const answer2 = document.getElementById('answer2');
    const answer3 = document.getElementById('answer3');
    const feedback = document.getElementById('feedback');
    const checkButton = document.getElementById('check');
    const resetButton = document.getElementById('reset');
    const showButton = document.getElementById('show');

    let correctAnswers = [];

    function generateExpressions() {
        correctAnswers = [];
        for (let i = 1; i <= 3; i++) {
            const num1 = Math.floor(Math.random() * 11);
            const num2 = Math.floor(Math.random() * 11);
            document.getElementById(`expr${i}`).textContent = `${num1} x ${num2}`;
            correctAnswers.push(num1 * num2);
        }
    }

    function checkAnswers() {
        feedback.innerHTML = '';
        const userAnswers = [answer1.value, answer2.value, answer3.value];
        userAnswers.forEach((ans, index) => {
            const result = document.createElement('div');
            if (ans == correctAnswers[index]) {
                result.textContent = `Answer ${index + 1} is correct!`;
                result.style.color = 'rgb(67, 255, 61)';
            } else {
                result.textContent = `Answer ${index + 1} is incorrect.`;
                result.style.color = 'rgb(255, 73, 73)';
            }
            feedback.appendChild(result);
        });
    }

    function showAnswers() {
        feedback.innerHTML = '';
        correctAnswers.forEach((ans, index) => {
            const result = document.createElement('div');
            result.textContent = `Correct answer for ${index + 1} is ${ans}`;
            feedback.appendChild(result);
        });
    }

    function resetGame() {
        answer1.value = '';
        answer2.value = '';
        answer3.value = '';
        feedback.innerHTML = '';
        generateExpressions();
    }

    checkButton.addEventListener('click', checkAnswers);
    resetButton.addEventListener('click', resetGame);
    showButton.addEventListener('click', showAnswers);

    generateExpressions();
});
