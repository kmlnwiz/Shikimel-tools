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

    for (let i = 0; i < dataList.data.length; i++) {

        const fontSize = dataList.data[i][1].length >= 10 ? 'fs-0' : 'fs-0';
        html += `<div class="col px-1 mb-2">
            <div class="card touch-none ranking-card card-top-${dataList.data[i][0]} border-primary" data-pair="${dataList.data[i][0].replace('pair', '')}">
            <div class="row g-0">
                <div class="card-header fs-0 fw-bold text-center col-2 border-end border-bottom-0">
                    ${String(i + 1).padStart(2, '0')}位
                </div>
                <div class="card-body ranking-hide my-0 py-0 ${fontSize} fw-bold align-content-center text-center bg-dark text-opacity col-10">
                    ${dataList.data[i][1]}\t${dataList.data[i].length > 2 ? dataList.data[i][2] : ''}
                </div>
                </div>
            </div>
        </div>`;
    };

    $('#content-title').html(dataList.title);
    $('#content-area').html(html);

};

$(document).on('click', '.ranking-card', function () {
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
    const txt = `title	国土最大面積が大きい順
rank    01	ロシア	17,124,442km²
rank    02	カナダ	9,984,670km²
rank    03	アメリカ	9,634,060km²
rank    04	中国	9,631,420km²
rank    05	ブラジル	8,515,767km²
rank    06	オーストラリア	7,692,024km²
rank    07	インド	3,287,263km²
rank    08	アルゼンチン	2,780,400km²
rank    09	カザフスタン	2,724,900km²
rank    10	アルジェリア	2,505,742km²
`;
    $('#TextAreaDocs').val(txt);
};

DocsLoad();
