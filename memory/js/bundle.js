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

    const itemCount = dataList.data.length;
    $('#content-area').removeClass(function (index, className) {
        return (className.match(/(^|\s)row-cols-xl\S+/g) || []).join(' ');
    });
    $('#content-area').addClass(`row-cols-xl-${itemCount}`);

    for (let i = 0; i < dataList.data.length; i++) {

        const fontSize = dataList.data[i][1].length >= 10 ? 'fs-2' : 'fs-1';
        html += `<div class="col px-1 mb-3">
            <div class="card touch-none memory-card card-top-${dataList.data[i][0]} border-primary" style="height:44vh;" data-pair="${dataList.data[i][0].replace('pair', '')}">
                <div class="card-header fs-2 fw-bold text-center">
                    ${String(i + 1).padStart(2, '0')}
                </div>
                <div class="card-body my-0 py-0 ${fontSize} fw-bold vertical-text align-content-center text-center bg-dark text-opacity">
                    ${dataList.data[i][1]}
                </div>
            </div>
        </div>`;
    };

    shuffleArray(dataList.data);

    for (let i = 0; i < dataList.data.length; i++) {

        const fontSize = dataList.data[i][2].length >= 10 ? 'fs-2' : 'fs-1';
        html += `<div class="col px-1 mt-3">
            <div class="card touch-none memory-card card-bottom-${dataList.data[i][0]} border-danger" style="height:44vh;" data-pair="${dataList.data[i][0].replace('pair', '')}">
                <div class="card-header fs-2 fw-bold text-center">
                    ${String(i + 1).padStart(2, '0')}
                </div>
                <div class="card-body memory-hide my-0 py-0 ${fontSize} fw-bold vertical-text align-content-center text-center bg-dark text-opacity">
                    ${dataList.data[i][2]}
                </div>
            </div>
        </div>`;
    };

    $('#content-title').html(dataList.title);
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
