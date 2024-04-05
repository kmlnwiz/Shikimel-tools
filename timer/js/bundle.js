let timerInterval;
let totalTime = (Number($('#set-min').val() * 60) + Number($('#set-sec').val())) * 1000;
let timeLeft = totalTime;
let isPaused = true;
const timerText = document.getElementById('timer-text');

function startTimer() {
    if (isPaused) { // 一時停止状態の場合、再開
        isPaused = false;
        $('#startTimer').addClass('d-none').prop('disabled', true);
        $('#stopTimer').removeClass('d-none');

        if (timeLeft <= 0) { // タイマーが終了していた場合、リセット
            resetTimer();
        } else {
            timerInterval = setInterval(updateTimer, 10);
        }
    }
}

function updateTimer() {
    timeLeft -= 10;
    if (timeLeft <= 0) {
        clearInterval(timerInterval);
        timerText.textContent = "Time's up!";
        $('#left-bar').css('width', 0 + '%');
        $('#left-bar-label').attr('aria-valuenow', 0);

        $('#startTimer').prop('disabled', true); // 数字がすべて出たら Start ボタンを無効化する
        $('#stopTimer').prop('disabled', true); // 数字がすべて出たら Stop ボタンを無効化する

        // Play sound
        var audio = new Audio('se/whistle.mp3');
        audio.play();
    } else {
        const minutesLeft = Math.floor(timeLeft / (60 * 1000));
        const secondsLeft = Math.floor((timeLeft % (60 * 1000)) / 1000);
        const millisecondsLeft = Math.floor((timeLeft % 1000) / 10);
        timerText.textContent = `${String(minutesLeft).padStart(2, '0')}:${String(secondsLeft).padStart(2, '0')}.${String(millisecondsLeft).padStart(2, '0')}`;
        $('#left-bar').css('width', (timeLeft / totalTime) * 100 + '%');
        $('#left-bar-label').attr('aria-valuenow', (timeLeft / totalTime));
    }
}

function stopTimer() {
    if (!isPaused) { // タイマーが実行中の場合、停止
        clearInterval(timerInterval);
        isPaused = true;
        $('#startTimer').removeClass('d-none').prop('disabled', false);
        $('#stopTimer').addClass('d-none');
    }
}

function resetTimer() {
    clearInterval(timerInterval);
    isPaused = true;
    totalTime = (Number($('#set-min').val() * 60) + Number($('#set-sec').val())) * 1000;
    timeLeft = totalTime;
    const minutesLeft = Math.floor(totalTime / (60 * 1000));
    const secondsLeft = Math.floor((totalTime % (60 * 1000)) / 1000);
    const millisecondsLeft = Math.floor((totalTime % 1000) / 10);
    console.log(minutesLeft, secondsLeft, millisecondsLeft)
    timerText.textContent = `${String(minutesLeft).padStart(2, '0')}:${String(secondsLeft).padStart(2, '0')}.${String(millisecondsLeft).padStart(2, '0')}`;
    $('#left-bar').css('width', (timeLeft / totalTime) * 100 + '%');
    $('#left-bar-label').attr('aria-valuenow', (timeLeft / totalTime));

    $('#startTimer').removeClass('d-none').prop('disabled', false);
    $('#stopTimer').addClass('d-none').prop('disabled', false);
}

// キーボードイベントを追加して、スペースキーで startTimer と stopTimer を切り替える
document.addEventListener('keydown', function (event) {
    if (event.code === 'Space') {
        event.preventDefault(); // デフォルトのスクロールを防止
        if (isPaused) {
            startTimer();
        } else {
            stopTimer();
        }
    }
});
