function dataLoad() {

    const fileInput = document.getElementById('formFile');
    const file = fileInput.files[0];
    if (file) { // ファイルが選択されている場合のみ処理を実行
        // 拡張子をチェックしてtxtファイルのみを受け付ける
        const fileName = file.name;
        const fileExtension = fileName.split('.').pop().toLowerCase();
        if (fileExtension !== 'txt') {
            alert("txtファイルのみを選択してください。");
            return; // 不正なファイルの場合は処理を終了する
        };

        const reader = new FileReader();

        reader.onload = function (event) {
            const fileContent = event.target.result;
            const lines = fileContent.trim().split('\n');
            const title = lines.shift().split('\t')[1];
            const dataArray = lines.map(line => line.replace("\r", "").split('\t'));

            const dataList = {
                title: title,
                data: dataArray
            };

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

    const itemCount = dataList.data.length;
    let incorrectCount = 0;

    if ($('#setRandom').prop('checked')) {
        shuffleArray(dataList.data);
    };
    console.log(dataList);


    const maxLength = dataList.data.reduce((max, item) => {
        const length = item[1].length;
        return Math.max(max, length);
    }, 0);
    console.log(maxLength);

    let colSize = 'col-2';
    if (maxLength > 14) {
        colSize = 'col-12';
    } else if (maxLength > 10) {
        colSize = 'col-6';
    } else if (maxLength > 7) {
        colSize = 'col-4';
    } else if (maxLength > 4) {
        colSize = 'col-3';
    };

    for (let i = 0; i < dataList.data.length; i++) {

        if (dataList.data[i].length == 3) {
            dataList.data[i].push("");
        }

        dataList.data[i][2] == '1' ? incorrectCount++ : '';

        let fontSize;
        if (dataList.data[i][1].length > 14) {
            fontSize = 'fs-4';
        } else if (dataList.data[i][1].length > 10) {
            fontSize = 'fs-3';
        } else if (dataList.data[i][1].length > 7) {
            fontSize = 'fs-2';
        } else {
            fontSize = 'fs-1'; // Default font size if none of the conditions are met
        };

        const isCorrect = dataList.data[i][2] == '0' ? 'correctOption' : 'incorrectOption';

        html += `<div class="col ${colSize}" style="padding: 0.125rem !important;"><div id="str_a${i}" class="${isCorrect} str-blind blind-2 py-2 m-0 border bg-white text-dark fw-bold text-center touch-none rounded-3 border-secondary" style="font-size:5.0rem;">${dataList.data[i][1]}</div>`;

        const bgColor = dataList.data[i][2] == '0' ? 'bg-success' : 'bg-danger';

        html += `<div id="str_b${i}" class="str-blind blind-3 col py-2 m-0 border ${bgColor} text-white fw-bold text-center touch-none rounded-3 d-none border-secondary" style="font-size:5.00rem;">${dataList.data[i][1]}<br><small class="fw-nomal fs-3 opacity-75 fw-bold position-absolute text-center" style="width:${dataList.data[i][3].length * 3}rem; margin-left: -${dataList.data[i][3].length * 1.4}rem !important; margin-top: -1.75rem !important; pointer-events:none;">${dataList.data[i][3] !== "" ? dataList.data[i][3] : "　"}</small></div></div>`;
    };

    if ($('#dobonDisplay').prop('checked')) {
        $('#content-title').html(`${dataList.title} （ドボン数：${incorrectCount}/${dataList.data.length}）`);
    } else {
        $('#content-title').html(`${dataList.title} （選択肢数：${dataList.data.length}）`);
    };
    $('#content-area').html(html);

};

$(document).on('click', '.memory-card', function () {
    // クリックされたcard-top-pairのdata-pair属性の値を取得
    const dataPair = $(this).attr('data-pair');
    //console.log(dataPair);

    // クリックされた要素の.card-bodyにクラスを追加または削除する
    $(this).find('.card-body').toggleClass('bg-dark text-opacity');
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

$(document).on("click", 'div[id^="str_a"], div[id^="str_b"]', function (event) {
    const isA = event.target.id.startsWith("str_a");
    const str_no = event.target.id.replace(isA ? "str_a" : "str_b", "");
    const targetA = `#str_a${str_no}`;
    const targetB = `#str_b${str_no}`;

    $(targetA).toggleClass('d-none d-block');
    $(targetB).toggleClass('d-none d-block');
});

$(document).on("click", '.correctOption', function () {
    var audio = new Audio('se/Quiz-Correct_Answer02-2.mp3');
    audio.play();
});

$(document).on("click", '.incorrectOption', function () {
    var audio = new Audio('se/Quiz-Wrong_Buzzer02-3.mp3');
    audio.play();
});

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
Element01	選択肢01	0	解説
Element02	選択肢02	0	解説
Element03	選択肢03	0	解説
Element04	選択肢04	0	解説
Element05	選択肢05	0	解説
Element06	選択肢06	0	解説
Element07	選択肢07	0	解説
Element08	選択肢08	0	解説
Element09	選択肢09	0	解説
Element10	選択肢10	0	解説
Element11	選択肢11	0	解説
Element12	選択肢12	0	解説
Element13	選択肢13	0	解説
Element14	選択肢14	0	解説
Element15	選択肢15	0	解説
Element16	選択肢16	0	解説
Element17	選択肢17	0	解説
Element18	選択肢18	0	解説
Element19	選択肢19	1	解説
Element20	選択肢20	1	解説
`;
    $('#TextAreaDocs').val(txt);
};

DocsLoad();
