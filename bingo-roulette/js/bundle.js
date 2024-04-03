let numbers = [];
let intervalId;
let currentNumber;
let minNumber = Number($('#min-number').val());
let maxNumber = Number($('#max-number').val());

function startRoulette() {
    clearInterval(intervalId);
    intervalId = setInterval(rotateNumber, 1);
    $('#startRoulette').addClass('d-none').prop('disabled', true); // Start ボタンを非表示にして無効化する
    $('#stopRoulette').removeClass('d-none');
}

function stopRoulette() {
    const sameNumber = Number($('#same-number').val());
    clearInterval(intervalId);
    $('#startRoulette').removeClass('d-none').prop('disabled', false); // Start ボタンを表示して有効化する
    $('#stopRoulette').addClass('d-none');
    if (currentNumber !== null) {
        numbers.push(currentNumber);
        const colors = ['danger', 'primary', 'warning', 'success']
        let ColorClass = colors[(numbers.length - 1) % 4];
        $('#called-numbers').append(`<div class="col mt-0 mb-1"><p class="border border-3 border-${ColorClass} text-center py-0 mb-1 rounded fw-bold bg-${ColorClass} bg-opacity-10 fade-in touch-none" style="font-size:4.0rem;">${String(currentNumber).padStart(2, '0')}</p></div>`);
        $('.already-display').html(String(numbers.length).padStart(2, '0'));
        $('.remain-display').html(String(((maxNumber - minNumber + 1) * sameNumber) - numbers.length).padStart(2, '0'));
    }
    if (numbers.length >= (maxNumber - minNumber + 1) * sameNumber) {
        $('#current-number').html('<i class="bi bi-check-lg"></i>');
        $('#startRoulette').prop('disabled', true); // 数字がすべて出たら Start ボタンを無効化する
        $('#stopRoulette').prop('disabled', true); // 数字がすべて出たら Stop ボタンを無効化する
        $(document).off("keydown"); // 数字がすべて出たら Space キーのイベントリスナーを削除する
        return; // すべての数字が出た場合は処理を終了する
    }
}

function rotateNumber() {
    minNumber = Number($('#min-number').val());
    maxNumber = Number($('#max-number').val());
    const sameNumber = Number($('#same-number').val());
    if (numbers.length >= (maxNumber - minNumber + 1) * sameNumber) {
        $('#current-number').html('<i class="bi bi-check-lg"></i>');
        $('#startRoulette').prop('disabled', true); // 数字がすべて出たら Start ボタンを無効化する
        $('#stopRoulette').prop('disabled', true); // 数字がすべて出たら Stop ボタンを無効化する
        $(document).off("keydown"); // 数字がすべて出たら Space キーのイベントリスナーを削除する
        return; // すべての数字が出た場合は処理を終了する
    }
    currentNumber = getRandomNumber();
    $('#current-number').text(String(currentNumber).padStart(2, '0'));
    // ここでアニメーションを適用する
}

function getRandomNumber() {
    let randomNumber;
    let availableNumbers = [];
    const sameNumber = Number($('#same-number').val());

    // まだ選択されていない数字をリストに追加する
    for (let i = minNumber; i <= maxNumber; i++) {
        if (numbers.filter(num => num === i).length < sameNumber) {
            availableNumbers.push(i);
        };
    }

    // 利用可能な数字の中からランダムに1つ選ぶ
    randomNumber = availableNumbers[Math.floor(Math.random() * availableNumbers.length)];

    return randomNumber;
}


function resetRoulette() {
    // Space キーのイベントリスナーを一旦削除する
    $(document).off("keydown", spaceEventListener);

    clearInterval(intervalId);
    numbers = [];
    currentNumber = undefined;
    minNumber = Number($('#min-number').val()); // minNumber を再度取得する
    maxNumber = Number($('#max-number').val()); // maxNumber を再度取得する
    $('#current-number').text('00');
    $('#called-numbers').empty();
    $('#startRoulette').prop('disabled', false).removeClass('d-none');
    $('#stopRoulette').prop('disabled', false);
    $('#stopRoulette').addClass('d-none');

    // Space キーのイベントリスナーを再登録する
    $(document).keydown(spaceEventListener);

    $('.already-display').html(String(numbers.length).padStart(2, '0'));
    const sameNumber = Number($('#same-number').val());
    $('.remain-display').html(String(((maxNumber - minNumber + 1) * sameNumber)).padStart(2, '0'));
}



document.addEventListener(
    "keydown",
    (e) => {
        if (e.keyCode === 13) {
            toggleFullScreen();
        }
    },
    false
);

function toggleFullScreen() {
    const elem = document.getElementById("Content");

    if (!document.fullscreenElement) {
        elem.requestFullscreen();
    } else if (document.exitFullscreen) {
        document.exitFullscreen();
    }
}

// Spaceキーのイベントリスナー関数
function spaceEventListener(e) {
    if (e.keyCode == 32) { // Space キーが押された場合
        e.preventDefault(); // デフォルトの動作を無効化する

        if ($('#startRoulette').is(':visible')) { // スタートボタンが表示されている場合
            startRoulette(); // ルーレットを開始する
        } else if ($('#stopRoulette').is(':visible')) { // ストップボタンが表示されている場合
            stopRoulette(); // ルーレットを停止する
        }
    }
}

// ページ読み込み時にSpaceキーのイベントリスナーを登録する
$(document).keydown(spaceEventListener);

$(document).ready(function () {
    // 初期値を取得して表示する
    let minNumber = parseInt($('#min-number').val());
    let maxNumber = parseInt($('#max-number').val());
    let sameNumber = parseInt($('#same-number').val());

    $('.min-display').text(String(minNumber).padStart(2, '0'));
    $('.max-display').text(String(maxNumber).padStart(2, '0'));
    $('.same-display').text(String(sameNumber).padStart(2, '0'));
    $('.remain-display').text(String((maxNumber - minNumber + 1) * sameNumber).padStart(2, '0'));

    // 最小値が変更されたときの処理
    $('#min-number').on('input', function () {
        minNumber = parseInt($(this).val());
        updateDisplays(minNumber, maxNumber, sameNumber);
    });

    // 最大値が変更されたときの処理
    $('#max-number').on('input', function () {
        maxNumber = parseInt($(this).val());
        updateDisplays(minNumber, maxNumber, sameNumber);
    });

    // 重複回数が変更されたときの処理
    $('#same-number').on('input', function () {
        sameNumber = parseInt($(this).val());
        updateDisplays(minNumber, maxNumber, sameNumber);
    });

    // 表示を更新する関数
    function updateDisplays(min, max, same) {
        $('.min-display').text(String(min).padStart(2, '0'));
        $('.max-display').text(String(max).padStart(2, '0'));
        $('.same-display').text(String(same).padStart(2, '0'));
        $('.remain-display').text(String((max - min) * same + 1).padStart(2, '0'));
    }
});
