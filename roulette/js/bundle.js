function startRoulette() {
    intervalId = setInterval(rotateElement, 1);

    $('#startRoulette').addClass('d-none').prop('disabled', true); // Start ボタンを非表示にして無効化する
    $('#stopRoulette').removeClass('d-none');
}

function stopRoulette() {
    clearInterval(intervalId);

    //要素を減らしていく
    if (isEleReduce) {
        if (rouletteArr[currentElement]['attr']) {
            remainHit--;
        };
        rouletteArr.splice(currentElement, 1);
    };

    $('#remain-display').html(`${rouletteArr.length}/100`);
    $('#remain-hit-display').html(`${remainHit}/${hitRate}`);

    $('#startRoulette').removeClass('d-none').prop('disabled', false); // Start ボタンを表示して有効化する
    $('#stopRoulette').addClass('d-none');

    if (rouletteArr.length < 1) {
        $('#current-element').html('<i class="bi bi-check-lg"></i>');
        $('#startRoulette').prop('disabled', true); // 数字がすべて出たら Start ボタンを無効化する
        $('#stopRoulette').prop('disabled', true); // 数字がすべて出たら Stop ボタンを無効化する
        // Space キーのイベントリスナーを一旦削除する
        $(document).off("keydown", spaceEventListener);
        return; // すべての数字が出た場合は処理を終了する
    };
};

function rotateElement() {
    if (rouletteArr.length < 1) {
        $('#current-element').html('<i class="bi bi-check-lg"></i>');
        $('#startRoulette').prop('disabled', true); // 数字がすべて出たら Start ボタンを無効化する
        $('#stopRoulette').prop('disabled', true); // 数字がすべて出たら Stop ボタンを無効化する
        return; // すべての数字が出た場合は処理を終了する
    };
    currentElement = (getRandomElement());

    if (!rouletteArr[currentElement]['attr']) {
        displayStr = `<div class="alert alert-light border rounded-5"><div style="font-size:0.5em!important;">No.${String((rouletteArr[currentElement]['no'])).padStart(3, '0')}</div>\nハズレ</div>`;
    } else {
        displayStr = `<div class="alert alert-danger rounded-5"><div style="font-size:0.5em!important;">No.${String((rouletteArr[currentElement]['no'])).padStart(3, '0')}</div>\n<span class="text-danger">アタリ</span></div>`;
    };
    $('#current-element').html(displayStr);
    // ここでアニメーションを適用する
};

function getRandomElement() {

    // 利用可能な要素からランダムに1つ選ぶ
    randomElement = Math.floor(Math.random() * rouletteArr.length);

    return randomElement;
}

function resetRoulette() {

    // Space キーのイベントリスナーを一旦削除する
    $(document).off("keydown", spaceEventListener);

    hitRate = Number($('#hit-rate').val());
    remainHit = hitRate;

    trueArr = [...Array(hitRate)].map((_, i) => ({
        no: i + 1,
        attr: true
    }));
    let falseArr = [...Array(100 - hitRate)].map((_, i) => ({
        no: i + 1 + hitRate,
        attr: false
    }));

    rouletteArr = [...falseArr, ...trueArr];
    console.log(rouletteArr);

    isEleReduce = $('#ele-reduce').prop('checked');

    $('#remain-display').html(`${rouletteArr.length}/100`);
    $('#remain-hit-display').html(`${remainHit}/${hitRate}`);

    // Space キーのイベントリスナーを再登録する
    $(document).keydown(spaceEventListener);
    $('#startRoulette').prop('disabled', false); // 数字がすべて出たら Start ボタンを無効化する
    $('#stopRoulette').prop('disabled', false); // 数字がすべて出たら Stop ボタンを無効化する
};

// Spaceキーのイベントリスナー関数
function spaceEventListener(e) {
    if (e.keyCode == 32) { // Space キーが押された場合
        e.preventDefault(); // デフォルトの動作を無効化する

        if ($('#startRoulette').is(':visible')) { // スタートボタンが表示されている場合
            startRoulette(); // ルーレットを開始する
        } else if ($('#stopRoulette').is(':visible')) { // ストップボタンが表示されている場合
            stopRoulette(); // ルーレットを停止する
        };
    };
};

// ページ読み込み時にSpaceキーのイベントリスナーを登録する
$(document).keydown(spaceEventListener);

resetRoulette();
