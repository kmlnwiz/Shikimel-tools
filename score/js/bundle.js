let playerCount = 0;
let playerCount_label = 0;
let addBtnDisabled = false;
let mode = "simple";
const increment = 1;
let actionStack = []; // 一つの操作履歴を使いまわす

function updateButtons() {
    $('#addPlayerBtn').prop('disabled', addBtnDisabled);
    $('#undoBtn').prop('disabled', actionStack.length === 0);
}

function addPlayer() {
    if (playerCount >= 20) return;
    playerCount++;
    playerCount_label++;
    const playerId = `player${playerCount_label}`;
    const playerName = `プレイヤー ${playerCount_label}`;
    const playerCard = `
        <div id="${playerId}" class="col player-card px-1">
            <div class="card">

                <div class="card-body pb-0">
                    <h5 class="card-title"><input class="form-control form-control-lg fs-3 fw-bold vertical-text border-0" type="text" value="" placeholder="${playerName}" style="height:15rem;"></h5>
                    <div class="mb-2">
                        <div id="${playerId}-1" class="text-center h1 fw-bold total-score rule1 d-block" style="font-size:2.75rem;">0</div>
                        <div id="${playerId}-2" class="text-center h1 fw-bold total-score rule2 d-none" style="font-size:2.75rem;">0</div>
                        <div id="${playerId}-3" class="text-center h1 fw-bold total-score rule3 d-none" style="font-size:2.75rem;">0</div>
                        <div id="${playerId}-4" class="text-center h1 fw-bold total-score rule4 d-none" style="font-size:2.75rem;">0</div>
                        <div id="${playerId}-5" class="text-center h1 fw-bold total-score rule5 d-none" style="font-size:2.75rem;">0</div>
                        <div class="row">
                        <div class="col p-0 pe-1 text-center h2 o-score text-primary">0</div>
                        <div class="col p-0 ps-1 text-center h2 x-score text-danger">0</div>
                        </div>
                        <div class="row mt-0">
                            <div class="col p-0 pe-1">
                            <button class="btn btn-primary btn-circle w-100 increment"><i class="bi bi-circle"></i></button>
                            </div>
                            <div class="col p-0 ps-1">
                            <button class="btn btn-danger btn-circle w-100 decrement"><i class="bi bi-x-lg"></i></button>
                            </div>
                        </div>
                        <div class="row mt-2">
                            <!--<div class="col-4 px-0 ps-1 text-center">
                                <input type="checkbox" class="btn-check form-check-input win-player" id="win-player-checkbox-${playerId}">
                                <label class="btn btn-outline-primary w-100 d-flex align-items-center justify-content-center" for="win-player-checkbox-${playerId}"><i class="bi bi-trophy"></i></label>
                            </div>
                            <div class="col-4 px-1 text-center">
                                <input type="checkbox" class="btn-check form-check-input lose-player" id="lose-player-checkbox-${playerId}">
                                <label class="btn btn-outline-danger w-100 d-flex align-items-center justify-content-center" for="lose-player-checkbox-${playerId}"><i class="bi bi-heartbreak"></i></label>
                            </div>-->
                            <div class="col-12 px-0 text-center">
                                <button class="btn btn-outline-warning w-100 delete-player"><i class="bi bi-trash"></i></button>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    $('#playerList').append(playerCard);
    updateButtons();

    // チェックされているラジオボタンのIDの末尾を取得する
    const id = $('[name="options-rule"]:checked').attr('id').slice(-1);
    $(`.total-score`).removeClass('d-block').addClass('d-none');
    $(`.rule${id}`).removeClass('d-none').addClass('d-block');

    // 他のイベントリスナーや初期化の処理などもここに記述する
}

$(document).ready(function () {
    // プレイヤー削除ボタンのクリックイベントを追加
    $('#playerList').on('click', '.delete-player', function () {
        const playerId = $(this).closest('.player-card').attr('id');
        $('#confirmationModal').modal('show'); // モーダルを表示

        const inputValue = $(this).closest('.player-card').find('input').val();
        const placeholder = $(this).closest('.player-card').find('input').attr('placeholder');
        const displayText = inputValue ? inputValue : placeholder;
        $('#delete-player-id').text(`【${displayText}】`);

        $('#confirmDeleteBtn').click(function () {
            // 削除の処理を行う
            $('#' + playerId).fadeOut(150, function () {
                $(this).remove(); // 親のプレイヤーカードを削除
                updateButtons(); // ボタンの状態を更新
                playerCount--;
            });
        });
    });
});

function updateScore(playerId, value, isUndo = false) {
    const oScoreElem = $(`#${playerId} .o-score`);
    const xScoreElem = $(`#${playerId} .x-score`);
    let oScore = parseInt(oScoreElem.text());
    let xScore = parseInt(xScoreElem.text());
    let totalScore = 0;

    if (!isUndo) {
        actionStack.push({
            playerId,
            value
        }); // 操作を履歴に追加
    }

    // 点数を更新
    if (!isUndo) {
        if (value > 0) {
            oScore += increment;
        } else {
            xScore += increment;
        }
    } else {
        if (value > 0) {
            oScore -= increment;
        } else {
            xScore -= increment;
        }
    }


    // 表示を更新
    oScoreElem.text(oScore);
    xScoreElem.text(xScore);
    for (let i = 0; i < 5; i++) {
        const totalScoreElem = $(`#${playerId} .rule${i + 1}`)
        i === 0 ? totalScore = oScore : '';
        i === 1 ? totalScore = oScore - xScore : '';
        //i === 2 ? totalScore = oScore - xScore : '';
        i === 3 ? totalScore = oScore * (10 - xScore) : '';
        //i === 4 ? totalScore = oScore - xScore : '';
        totalScoreElem.text(totalScore);
    };

    updateButtons();
}

$(document).ready(function () {
    updateButtons();

    $('#addPlayerBtn').click(addPlayer);

    $('#playerList').on('click', '.increment', function () {
        const playerId = $(this).closest('.player-card').attr('id');
        updateScore(playerId, 1);
    });

    $('#playerList').on('click', '.decrement', function () {
        const playerId = $(this).closest('.player-card').attr('id');
        updateScore(playerId, -1);
    });

    $('#undoBtn').click(function () {
        if (actionStack.length > 0) {
            const lastAction = actionStack.pop();
            const playerId = lastAction.playerId;
            const value = lastAction.value;
            // undoの場合は値が1なら-1、値が-1なら1を渡すように修正
            updateScore(playerId, value, true);
        }
    });


    $('#resetBtn').click(function () {
        $('.o-score, .x-score, .total-score').text('0');
        actionStack = []; // 操作履歴をクリア
        updateButtons();
    });

    $('#toggleMode').change(function () {
        mode = this.checked ? "difference" : "simple";
    });


    $(document).ready(function () {
        //
        $('#playerList').on('click', '.win-player', function () {
            const playerId = $(this).closest('.player-card').attr('id');
            if ($(this).prop('checked')) {
                $(this).closest('.player-card').find('.card').addClass('border-primary border bg-primary bg-opacity-25');
                $(this).closest('.player-card').find('.card').append('<div class="win-message text-center fw-bold h1 text-primary w-100 position-absolute border-top border-bottom border-primary bg-white top-50">勝</div>');
            } else {
                $(this).closest('.player-card').find('.card').removeClass('border-primary border-danger border bg-primary bg-danger bg-opacity-25');
                $(this).closest('.player-card').find('.win-message').remove();
            };
        });

        $('#playerList').on('click', '.lose-player', function () {
            const playerId = $(this).closest('.player-card').attr('id');
            if ($(this).prop('checked')) {
                $(this).closest('.player-card').find('.card').addClass('border-danger border bg-danger bg-opacity-25');
                $(this).closest('.player-card').find('.card').append('<div class="lose-message text-center fw-bold h1 text-danger w-100 position-absolute border-top border-bottom border-danger bg-white top-50">負</div>');
            } else {
                $(this).closest('.player-card').find('.card').removeClass('border-primary border-danger border bg-primary bg-danger bg-opacity-25');
                $(this).closest('.player-card').find('.lose-message').remove();
            };
        });
    });


    document.addEventListener(
        "keydown",
        (e) => {
            if (e.keyCode === 13) {
                toggleFullScreen();
            }
        },
        false,
    );

    document.addEventListener(
        "keydown",
        (e) => {
            if (e.keyCode === 46) {
                if (actionStack.length > 0) {
                    const lastAction = actionStack.pop();
                    const playerId = lastAction.playerId;
                    const value = lastAction.value;
                    // undoの場合は値が1なら-1、値が-1なら1を渡すように修正
                    updateScore(playerId, value, true);
                }
            }
        },
        false,
    );

    function toggleFullScreen() {
        const elem = document.getElementById("contentArea");

        if (!document.fullscreenElement) {
            elem.requestFullscreen();
        } else if (document.exitFullscreen) {
            document.exitFullscreen();
        }
    }
});


function toggleRule(id) {
    $(`.total-score`).removeClass('d-block').addClass('d-none');
    $(`.rule${id}`).removeClass('d-none').addClass('d-block');
};
