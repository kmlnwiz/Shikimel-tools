let playerCount = 0;
let playerCount_label = 0;
let addBtnDisabled = false;
let mode = "simple";
let pointSet = [1, 1];
let actionStack = []; // 一つの操作履歴を使いまわす

function updateButtons() {
    $('#addPlayerBtn').prop('disabled', addBtnDisabled);
    $('#undoBtn').prop('disabled', actionStack.length === 0);

    const id = $('[name="options-rule"]:checked').attr('id').slice(-1);
    rankCalc(id);
    toggleRankDisplay();
};

function toggleRankDisplay() {
    const onRankDisplay = $('#rankDisplay:checked').prop('checked');
    $(`.rank`).removeClass('d-block').addClass('d-none');
    if (onRankDisplay) {
        $(`.onRankDisplay`).removeClass('d-none').addClass('d-block');
    } else {
        $(`.offRankDisplay`).removeClass('d-none').addClass('d-block');
    };
};

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
                <div id="${playerId}-rank" class="col-12 p-0 text-center h4 text-primary text-nowrap py-1 bg-indigo text-white rounded-pill onRankDisplay rank d-none">1st</div>
                <div id="" class="col-12 p-0 text-center h4 text-primary text-nowrap py-1 bg-indigo text-white rounded-pill offRankDisplay rank">＊＊＊</div>
                        </div>
                    <h4 class="card-title g-0 px-2"><input class="form-control form-control-lg fs-3 fw-bold vertical-text border-0" type="text" value="" placeholder="${playerName}" style="height:15rem;"></h4>
                    <div class="mb-2">
                        <div id="${playerId}-1" class="text-center h1 fw-bold total-score text-nowrap py-1 rule1 d-block" style="font-size:2.75rem;">0</div>
                        <div id="${playerId}-2" class="text-center h1 fw-bold total-score text-nowrap py-1 rule2 d-none" style="font-size:2.75rem;">0</div>
                        <div id="${playerId}-3" class="text-center h1 fw-bold total-score text-nowrap py-1 rule3 d-none" style="font-size:2.75rem;">0</div>
                        <div id="${playerId}-4" class="text-center h1 fw-bold total-score text-nowrap py-1 rule4 d-none" style="font-size:2.75rem;">0</div>
                        <div id="${playerId}-5" class="text-center h1 fw-bold total-score text-nowrap py-1 rule5 d-none" style="font-size:2.75rem;">0</div>
                        <div class="row g-0 px-2">
                        <div class="col-12 p-0 text-center h3 text-primary text-nowrap py-1"><i class="bi bi-circle pe-2"></i><span id="${playerId}-o" class="o-score">0</span></div>
                        <div class="col-12 p-0 text-center h3 text-danger text-nowrap py-1"><i class="bi bi-x-lg pe-2"></i><span id="${playerId}-x" class="x-score">0</span></div>
                        </div>
                        <div class="row g-0 px-2 mt-0">
                            <div class="col p-0 pe-1">
                            <button class="btn btn-primary btn-circle w-100 py-2 increment"><i class="bi bi-circle"></i></button>
                            </div>
                            <div class="col p-0 ps-1">
                            <button class="btn btn-danger btn-circle w-100 py-2 decrement"><i class="bi bi-x-lg"></i></button>
                            </div>
                        </div>
                        <div class="row g-0 px-2 mt-2">
                            <!--<div class="col-4 px-0 ps-1 text-center">
                                <input type="checkbox" class="btn-check form-check-input win-player" id="win-player-checkbox-${playerId}">
                                <label class="btn btn-outline-primary w-100 py-1 d-flex align-items-center justify-content-center" for="win-player-checkbox-${playerId}"><i class="bi bi-trophy"></i></label>
                            </div>
                            <div class="col-4 px-1 text-center">
                                <input type="checkbox" class="btn-check form-check-input lose-player" id="lose-player-checkbox-${playerId}">
                                <label class="btn btn-outline-danger w-100 py-1 d-flex align-items-center justify-content-center" for="lose-player-checkbox-${playerId}"><i class="bi bi-heartbreak"></i></label>
                            </div>-->
                            <div class="col-12 px-0 text-center">
                                <button class="btn btn-outline-warning w-100 py-1 delete-player"><i class="bi bi-trash"></i></button>
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
};

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
                const id = $('[name="options-rule"]:checked').attr('id').slice(-1);
                rankCalc(id);
            });
        });
    });
});

function updateScore(playerId, value, pointSet, isUndo = false) {
    const oScoreElem = $(`#${playerId} .o-score`);
    const xScoreElem = $(`#${playerId} .x-score`);
    let oScore = parseInt(oScoreElem.text());
    let xScore = parseInt(xScoreElem.text());
    let totalScore = 0;

    if (!isUndo) {
        actionStack.push({
            playerId,
            value,
            pointSet
        }); // 操作を履歴に追加
    };
    console.log(actionStack);

    // 点数を更新
    if (!isUndo) {
        if (value > 0) {
            oScore += pointSet[0];
        } else {
            xScore += pointSet[1];
        }
    } else {
        if (value > 0) {
            oScore -= pointSet[0];
        } else {
            xScore -= pointSet[1];
        };
    };


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
};

$(document).ready(function () {
    updateButtons();

    $('#addPlayerBtn').click(addPlayer);

    $('#playerList').on('click', '.increment', function () {
        const playerId = $(this).closest('.player-card').attr('id');
        const plusPointSet = Number($('#plusPointSet').val());
        const minusPointSet = Number($('#minusPointSet').val());
        pointSet = [plusPointSet, minusPointSet];
        updateScore(playerId, 1, pointSet);
    });

    $('#playerList').on('click', '.decrement', function () {
        const playerId = $(this).closest('.player-card').attr('id');
        const plusPointSet = Number($('#plusPointSet').val());
        const minusPointSet = Number($('#minusPointSet').val());
        pointSet = [plusPointSet, minusPointSet];
        updateScore(playerId, -1, pointSet);
    });

    $('#rankDisplay').click(function () {
        toggleRankDisplay();
    });

    $('#undoBtn').click(function () {
        if (actionStack.length > 0) {
            const lastAction = actionStack.pop();
            const playerId = lastAction.playerId;
            const value = lastAction.value;
            // undoの場合は値が1なら-1、値が-1なら1を渡すように修正
            const pointSet = lastAction.pointSet;
            updateScore(playerId, value, pointSet, true);
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
            if (e.shiftKey && e.keyCode === 13) {
                toggleFullScreen();
            };
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
                    const pointSet = lastAction.pointSet;
                    updateScore(playerId, value, pointSet, true);
                };
            };
        },
        false,
    );

    function toggleFullScreen() {
        const elem = document.getElementById("contentArea");

        if (!document.fullscreenElement) {
            elem.requestFullscreen();
        } else if (document.exitFullscreen) {
            document.exitFullscreen();
        };
    };
});


function toggleRule(id) {
    $(`.total-score`).removeClass('d-block').addClass('d-none');
    $(`.rule${id}`).removeClass('d-none').addClass('d-block');

    rankCalc(id)
};

function rankCalc(id) {

    const rankArray = [];
    for (let i = 0; i <= playerCount; i++) {
        const targetId = [`player${i + 1}-${id}`, `player${i + 1}-o`, `player${i + 1}-x`];
        const elementTotal = document.getElementById(targetId[0]);
        const elementPlus = document.getElementById(targetId[1]);
        const elementMinus = document.getElementById(targetId[2]);

        if (elementTotal) {
            rankArray.push({
                playerId: `player${i + 1}`,
                plusPoint: Number(elementPlus.textContent),
                minusPoint: Number(elementMinus.textContent),
                totalPoint: Number(elementTotal.textContent)
            });
        };
    };

    console.log(rankArray);

    // ソートの条件を追加
    const sortedPlayers = rankArray.sort((a, b) => {
        if (b.totalPoint !== a.totalPoint) {
            return b.totalPoint - a.totalPoint;  // totalPointが大きい方を上位
        } else if (b.plusPoint !== a.plusPoint) {
            return b.plusPoint - a.plusPoint;  // plusPointが大きい方を上位
        } else {
            return a.minusPoint - b.minusPoint;  // minusPointが小さい方を上位
        };
    });

    let currentRank = 1;
    let previousTotalPoint = sortedPlayers[0]?.totalPoint;
    let previousPlusPoint = sortedPlayers[0]?.plusPoint;
    let previousMinusPoint = sortedPlayers[0]?.minusPoint;
    let skippedRanks = 0;

    for (let i = 0; i < sortedPlayers.length; i++) {
        const targetPlayerId = sortedPlayers[i].playerId;

        if (i > 0) {
            const player = sortedPlayers[i];

            // totalPoint, plusPoint, minusPointが全て異なる場合に順位を更新
            if (player.totalPoint !== previousTotalPoint ||
                player.plusPoint !== previousPlusPoint ||
                player.minusPoint !== previousMinusPoint) {
                currentRank += skippedRanks + 1;
                skippedRanks = 0;
            } else {
                skippedRanks++;
            };

            previousTotalPoint = player.totalPoint;
            previousPlusPoint = player.plusPoint;
            previousMinusPoint = player.minusPoint;
        };

        $(`#${targetPlayerId}-rank`).text(getOrdinalSuffix(currentRank));
    };
};

function getOrdinalSuffix(number) {
    const suffixes = ["th", "st", "nd", "rd"];
    const remainder10 = number % 10;
    const remainder100 = number % 100;

    if (remainder100 >= 11 && remainder100 <= 13) {
        return number + "th";
    } else if (remainder10 >= 1 && remainder10 <= 3) {
        return number + suffixes[remainder10];
    } else {
        return number + "th";
    };
};
