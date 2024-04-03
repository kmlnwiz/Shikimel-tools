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
                <div class="card-body">
                    <h5 class="card-title"><input class="form-control form-control-lg fs-2 fw-bold vertical-text border-0" type="text" value="" placeholder="${playerName}" style="height:8.75em;"></h5>
                    <div class="mb-2">
                        <div class="text-center h1 fw-bold total-score" style="font-size:3.5rem;">0</div>
                        <div class="row">
                        <div class="col pe-1 text-center h3 o-score">0</div>
                        <div class="col ps-1 text-center h3 x-score">0</div>
                        </div>
                        <div class="row">
                            <div class="col pe-1">
                            <button class="btn btn-primary btn-circle w-100 increment"><i class="bi bi-circle"></i></button>
                            </div>
                            <div class="col ps-1">
                            <button class="btn btn-danger btn-circle w-100 decrement"><i class="bi bi-x-lg"></i></button>
                            </div>
                        </div>
                        <div class="row mt-2">
                            <div class="col">
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
}

$(document).ready(function () {
    // プレイヤー削除ボタンのクリックイベントを追加
    $('#playerList').on('click', '.delete-player', function () {
        playerCount--;
        $(this).closest('.player-card').fadeOut(150, function () {
            $(this).closest('.player-card').remove(); // 親のプレイヤーカードを削除
        });
        updateButtons(); // ボタンの状態を更新
    });
});

function updateScore(playerId, value, isUndo = false) {
    const oScoreElem = $(`#${playerId} .o-score`);
    const xScoreElem = $(`#${playerId} .x-score`);
    const totalScoreElem = $(`#${playerId} .total-score`);
    let oScore = parseInt(oScoreElem.text());
    let xScore = parseInt(xScoreElem.text());
    let totalScore = parseInt(totalScoreElem.text());

    if (!isUndo) {
        actionStack.push({
            playerId,
            value
        }); // 操作を履歴に追加
    }

    // 点数を更新
    if (!isUndo) {
        if (mode === "simple") {
            if (value > 0) {
                oScore += increment;
            } else {
                xScore += increment;
            }
        } else {
            if (value > 0) {
                if (oScore > 0) oScore -= increment;
                else xScore += increment;
            } else {
                if (xScore > 0) xScore -= increment;
                else oScore += increment;
            }
        }
    } else {
        if (mode === "simple") {
            if (value > 0) {
                oScore -= increment;
            } else {
                xScore -= increment;
            }
        }
    }

    totalScore = oScore - xScore;

    // 表示を更新
    oScoreElem.text(oScore);
    xScoreElem.text(xScore);
    totalScoreElem.text(totalScore);

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
