let timerInterval;
let totalTime;
let timeLeft;
let isPaused = true;
const timerText = document.getElementById('timer-text');
let startTime; // 開始時刻を記録する変数を追加

function initializeTimer() {
    totalTime = (Number($('#set-min').val()) * 60 + Number($('#set-sec').val())) * 1000;
    timeLeft = totalTime;
    updateTimerDisplay();
}

function updateTimerDisplay() {
    const minutesLeft = Math.floor(timeLeft / (60 * 1000));
    const secondsLeft = Math.floor((timeLeft % (60 * 1000)) / 1000);
    const millisecondsLeft = Math.floor((timeLeft % 1000) / 10);
    timerText.innerHTML = `${String(minutesLeft).padStart(2, '0')}:${String(secondsLeft).padStart(2, '0')}<span style="font-size: 0.75em;">.${String(millisecondsLeft).padStart(2, '0')}</span>`;
    $('#left-bar').css('width', (timeLeft / totalTime) * 100 + '%');
    $('#left-bar-label').attr('aria-valuenow', (timeLeft / totalTime));
}

function startTimer() {
    if (isPaused) {
        isPaused = false;
        $('#startTimer').addClass('d-none').prop('disabled', true);
        $('#stopTimer').removeClass('d-none');

        if (timeLeft <= 0) {
            resetTimer();
        } else {
            startTime = Date.now() - (totalTime - timeLeft);
            timerInterval = setInterval(updateTimer, 1);
        }
    }
}

function updateTimer() {
    const now = Date.now();
    const timePassed = now - startTime;
    timeLeft = totalTime - timePassed;

    if (timeLeft <= 0) {
        clearInterval(timerInterval);
        timerText.textContent = "Time's up!";
        $('#left-bar').css('width', '0%');
        $('#left-bar-label').attr('aria-valuenow', 0);

        $('#startTimer, #stopTimer').prop('disabled', true);

        var audio = new Audio('se/whistle.mp3');
        audio.play();
    } else {
        updateTimerDisplay();
    }
}

function stopTimer() {
    if (!isPaused) {
        clearInterval(timerInterval);
        isPaused = true;
        $('#startTimer').removeClass('d-none').prop('disabled', false);
        $('#stopTimer').addClass('d-none');
    }
}

function resetTimer() {
    clearInterval(timerInterval);
    isPaused = true;
    initializeTimer();
    $('#startTimer').removeClass('d-none').prop('disabled', false);
    $('#stopTimer').addClass('d-none').prop('disabled', false);
}

document.addEventListener('keydown', function (event) {
    if (event.code === 'Space') {
        event.preventDefault();
        if (isPaused) {
            startTimer();
        } else {
            stopTimer();
        }
    }
});

// Initialize timer when the document is ready
$(document).ready(function () {
    initializeTimer();
});
