document.addEventListener("DOMContentLoaded", () => {
    //Select the elements
    const textToTypeElement = document.getElementById("text-to-type");
    const typingInputElement = document.getElementById("typing-input");
    const speedElement = document.getElementById("speed");
    const accuracyElement = document.getElementById("accuracy");

    //Text to display
    const sampleTexts = [
        "The quick brown fox jumps over the lazy dog.",
        "The sun dipped below the horizon, painting the sky in shades of orange and pink.",
        "She found a small, handwritten note tucked inside the old book.",
        "The cat watched the birds from the window, her tail twitching with excitement.",
        "After the storm, the air was crisp and smelled like fresh rain.",
        "He couldn’t believe his luck when he found a rare coin on the sidewalk.",
        "The children laughed as they ran through the autumn leaves scattered on the ground.",
        "The sun shone brightly, casting a warm glow over the forest.",
        "The old man sat in a rocking chair, his arms crossed, his eyes closed.",
        "A gentle breeze carried the scent of blooming flowers through the open window.",
        "They discovered a hidden trail in the woods that led to a beautiful lake.",
        "He spent the evening sketching the city skyline as the lights twinkled in the distance."]

    //initial values
    let currentIndex = 0;
    let startTime = new Date();
    let errors = 0;

    //Function to initialize or restart the game
    function initializeGame() {
        const text = sampleTexts[Math.floor(Math.random() * sampleTexts.length)];
        textToTypeElement.textContent = text;
        typingInputElement.value = "";
        currentIndex = 0;
        startTime = new Date();
        errors = 0;
        //update fn
        updateFeedback();
    }
    //Function to update the speed and the accuracy feedback
    function updateFeedback() {
        const currentTime = new Date();
        const elapsedTime = (currentTime - startTime) / 60000;
        if (elapsedTime <= 0) {
            speedElement.textContent = 0;
        } else {
            const wordsTyped = typingInputElement.value.trim().split(/\s+/).length;
            const speed = Math.round(wordsTyped / elapsedTime);
            speedElement.textContent = speed;
        }
        //cal accurracy
        const accuracy =
            currentIndex > 0
                ? Math.round(((currentIndex - errors) / currentIndex) * 100)
                : 100;
        accuracyElement.textContent = accuracy;
    }

    //Function to check typed character
    function checkCharacter(inputChar, targetChar) {
        if (inputChar !== targetChar) {
            errors++;
            //play error sound
            new Audio("/error-sound.mp3").play();
            return false;
        } else {
            return true;
        }
    }
    //Function to display messages to the user
    function displayMessage(message) {
        const messageArea = document.getElementById("message-area");
        messageArea.textContent = message;
        //clear the msg after 3s
        setTimeout(() => {
            messageArea.textContent = "";
        }, 3000);
    }
    //Event listener for typing input
    typingInputElement.addEventListener("input", (e) => {
        const typedText = typingInputElement.value;
        const targetText = textToTypeElement.textContent;

        if (currentIndex < targetText.length) {
            const isCorrect = checkCharacter(
                typedText[currentIndex],
                targetText[currentIndex]
            );

            textToTypeElement.innerHTML =
                targetText.substring(0, currentIndex) +
                `<span class='${isCorrect ? "correct" : "incorrect"}'>${targetText[currentIndex]
                }</span>` +
                targetText.substring(currentIndex + 1);
            currentIndex++;

            if (currentIndex === targetText.length) {
                displayMessage("Game Completed starting a new one.");
                initializeGame();
            }
        }
        //update the feedback
        updateFeedback();
    });
    //Start the game
    initializeGame();
});