document.addEventListener('DOMContentLoaded', () => {
    const randomNumber = Math.floor(Math.random() * 11);
    let attempts = 4;

    document.getElementById('guessButton').addEventListener('click', () => {
        const userGuess = parseInt(document.getElementById('guessInput').value);
        const feedback = document.getElementById('feedback');

        if (isNaN(userGuess) || userGuess < 0 || userGuess > 10) {
            feedback.textContent = 'Please enter a valid number between 0 and 10.';
            return;
        }

        attempts--;

        if (userGuess === randomNumber) {
            feedback.textContent = 'Congratulations! You guessed correctly!';
            feedback.style.color = 'rgb(107, 212, 93)';
            const guessButton = document.getElementById('guessButton');
            guessButton.textContent = 'Go Again';
            guessButton.addEventListener('click', () => {
                location.reload();
            });
        } else if (attempts > 0) {
            feedback.textContent = `Wrong! Your guess was too ${userGuess < randomNumber ? 'low' : 'high'}. You have ${attempts} attempts left.`;
            feedback.style.color = 'rgb(212, 93, 93)';
        } else {
            feedback.textContent = `Game over! The correct number was ${randomNumber}.`;
            const guessButton = document.getElementById('guessButton');
            guessButton.textContent = 'Try Again';
            guessButton.addEventListener('click', () => {
                location.reload();
            });
        }
    });
});