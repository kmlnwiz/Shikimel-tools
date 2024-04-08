let linesToConnect = []; // 線で結ぶための線の情報を保持する配列

function dataLoad() {
    $('#canvas-area').empty();
    // canvas 要素を取得
    const canvasElements = document.querySelectorAll('canvas');

    // canvas 要素をループして削除
    canvasElements.forEach(function (canvas) {
        canvas.remove();
    });
    isVisible = {};

    const fileInput = document.getElementById('formFile');
    const file = fileInput.files[0];
    if (file) { // ファイルが選択されている場合のみ処理を実行
        // 拡張子をチェックしてtxtファイルのみを受け付ける
        const fileName = file.name;
        const fileExtension = fileName.split('.').pop().toLowerCase();
        if (fileExtension !== 'txt') {
            alert("txtファイルのみを選択してください。");
            return; // 不正なファイルの場合は処理を終了する
        }

        const reader = new FileReader();

        reader.onload = function (event) {
            const fileContent = event.target.result;
            const lines = fileContent.trim().split('\n');
            const title = lines.shift().split('\t')[1];
            const dataArray = lines.map(line => line.split('\t'));

            const dataList = {
                title: title,
                data: dataArray
            };
            console.log(dataList);

            // 読み込み完了後に処理を行う
            processFileData(dataList);
        };

        reader.readAsText(file, 'UTF-8');
    } else {
        alert("ファイルが選択されていません。");
    };
};

function processFileData(dataList) {

    let html = '';

    for (let i = 0; i < dataList.data.length; i++) {

        html += `<div class="col px-1 mb-5">
            <div class="card touch-none matching-card card-top-${dataList.data[i][0]} border-primary" style="height:43vh;" data-pair="${dataList.data[i][0].replace('pair', '')}">
                <div class="card-header fs-1 fw-bold text-center">
                    ${String(i + 1).padStart(2, '0')}
                </div>
                <div class="card-body fs-3 fw-bold vertical-text align-content-center text-center">
                    ${dataList.data[i][1]}
                </div>
            </div>
        </div>`;

        linesToConnect.push(String(i + 1).padStart(2, '0'));
    };

    shuffleArray(dataList.data);

    for (let i = 0; i < dataList.data.length; i++) {
        html += `<div class="col px-1 mt-5">
            <div class="card touch-none matching-card card-bottom-${dataList.data[i][0]} border-danger" style="height:43vh;">
                <div class="card-header fs-1 fw-bold text-center">
                    ${String(i + 1).padStart(2, '0')}
                </div>
                <div class="card-body fs-3 fw-bold vertical-text align-content-center text-center">
                    ${dataList.data[i][2]}
                </div>
            </div>
        </div>`;
    };

    $('#content-title').html(dataList.title);
    $('#content-area').html(html);

    setTimeout(function () {
        drawLines(linesToConnect);
    }, 100); // 100ミリ秒後にdrawLines()関数を実行
};

let isVisible = {}; // 各ペアの表示状態を記録するオブジェクト

function drawLines(linesToConnect) {


    const previousVisibility = {}; // 前回の表示状態を保持するオブジェクト

    // すべての既存の線を取得し、表示状態を保存する
    $('.connection-line').each(function () {
        const linePair = $(this).attr('class').match(/line-pair(\d+)/)[1];
        previousVisibility[linePair] = isVisible[linePair];
    });

    // すべての既存の線を削除
    $('.connection-line').remove();

    linesToConnect.forEach(line => {
        const topCard = $(`.card-top-pair${line}`);
        const bottomCard = $(`.card-bottom-pair${line}`);

        const topOffset = topCard.offset();
        const bottomOffset = bottomCard.offset();

        const startX = topOffset.left + topCard.width() / 2;
        const startY = topOffset.top + topCard.height();

        const endX = bottomOffset.left + bottomCard.width() / 2;
        const endY = bottomOffset.top;

        const canvas = document.createElement('canvas');
        canvas.className = `connection-line line-pair${line}`;
        canvas.width = Math.abs(endX - startX);
        canvas.height = Math.abs(endY - startY);
        canvas.style.left = Math.min(startX, endX) + 'px';
        canvas.style.top = Math.min(startY, endY) + 'px';

        const context = canvas.getContext('2d');
        context.beginPath();

        context.moveTo(startX - parseInt(canvas.style.left), startY - parseInt(canvas.style.top));
        context.lineTo(endX - parseInt(canvas.style.left), endY - parseInt(canvas.style.top));

        context.strokeStyle = 'rgba(0, 0, 0, 0.1)';
        context.lineWidth = 1;
        context.stroke();

        // canvas-area要素にキャンバスを追加
        $('#canvas-area').append(canvas);

        // 表示状態を更新
        if (previousVisibility[line] !== undefined) {
            isVisible[line] = previousVisibility[line]; // 前回の表示状態を保持
        } else {
            isVisible[line] = false; // 初回表示時は非表示に設定
        }

        // 前回表示していた場合、再度表示する
        if (isVisible[line]) {
            $(`.line-pair${line}`).fadeIn();
        }
    });
};

$(window).on('resize', function () {
    drawLines(linesToConnect); // ウィンドウのリサイズ時に再描写
});

$(document).on('click', '.matching-card[data-pair]', function () {
    // クリックされたcard-top-pairのdata-pair属性の値を取得
    const dataPair = $(this).attr('data-pair');
    //console.log(dataPair);
    // 対応するconnection-line要素を取得
    const line = $(`.line-pair${dataPair}`);
    // 表示されている場合は非表示にし、非表示の場合は表示する
    line.fadeToggle();

    // 表示状態を更新
    isVisible[dataPair] = !isVisible[dataPair];

    // クリックされた要素の.card-bodyと、対応するcard-bottom-pair要素の.card-bodyにクラスを追加または削除する
    $(this).toggleClass('opacity-15');
    //$(this).find('.card-body').toggleClass('bg-dark text-white');
    $(`.card-bottom-pair${dataPair}`).toggleClass('opacity-15');
    //$(`.card-bottom-pair${dataPair}`).find('.card-body').toggleClass('bg-dark text-white');
});


document.addEventListener(
    "keydown",
    (e) => {
        if (e.keyCode === 13) {
            toggleFullScreen();
        };
    },
    false
);

function toggleFullScreen() {
    const elem = document.getElementById("Content");

    if (!document.fullscreenElement) {
        elem.requestFullscreen();
    } else if (document.exitFullscreen) {
        document.exitFullscreen();
    };
};


document.getElementById('temp-dl').addEventListener('click', function () {
    // ダウンロード用のリンクを作成する
    const link = document.createElement('a');

    // リンクの属性を設定してファイルをダウンロードする
    link.href = 'template.txt'; // ファイルのパスを指定
    link.download = 'template.txt'; // ダウンロード時のファイル名を指定

    // リンクをクリックしてファイルをダウンロードする
    link.click();
});

function DocsLoad() {
    const txt = `title	タイトル
pair01	要素1-01	要素2-01
pair02	要素1-02	要素2-02
pair03	要素1-03	要素2-03
pair04	要素1-04	要素2-04
pair05	要素1-05	要素2-05
pair06	要素1-06	要素2-06
pair07	要素1-07	要素2-07
pair08	要素1-08	要素2-08
pair09	要素1-09	要素2-09
pair10	要素1-10	要素2-10
pair11	要素1-11	要素2-11
pair12	要素1-12	要素2-12
pair13	要素1-13	要素2-13
pair14	要素1-14	要素2-14
pair15	要素1-15	要素2-15
pair16	要素1-16	要素2-16
pair17	要素1-17	要素2-17
pair18	要素1-18	要素2-18
pair19	要素1-19	要素2-19
pair20	要素1-20	要素2-20
`;
    $('#TextAreaDocs').val(txt);
};

DocsLoad();
