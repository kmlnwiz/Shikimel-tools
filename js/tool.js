function modal(array) {
    let html = '';
    //modal window
    html += `<div class="modal fade" id="detailModal-q-${array.id}" tabindex="-1" aria-labelledby="detailModalLabel-q-${array.id}" aria-hidden="true" data-bs-backdrop="static">`;
    html += `<div class="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
        <div class="modal-content">
        <div class="modal-header py-2">
        <h4 class="modal-title fw-bold touch-none" id="detailModalLabel-q-${array.id}">クイズNo.${quiz_no}　<span class="badge bg-success">詳細</span></h4>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>`;
    html += `<div class="modal-body">`;

    html += `<dl class="row lh-base">
        <dt class="col-12 mb-1"><span class="badge bg-primary me-1 text-center touch-none" style="width:6.5em;">ジャンル</span></dt>
        <dd class="col-12">${array.genreText}</dd>
        </dl>`;

    if (array.question == "") {
        html += `<dl class="row lh-base">
            <dt class="col-12 mb-1"><span class="badge bg-primary me-1 text-center touch-none" style="width:6.5em;">問題</span></dt>
            <dd class="col-12">問題文が設定されていません。<br>
            <span class="d-inline-block small text-center float-end border rounded-pill bg-light fw-bold" style="width:6.00em;">${strCount(array.question)}文字</span></dd>
            </dl>`;
    } else {
        html += `<dl class="row lh-base">
            <dt class="col-12 mb-1"><span class="badge bg-primary me-1 text-center touch-none" style="width:6.5em;">問題</span></dt>
            <dd class="col-12">${replace(array.question)}<br>
            <span class="d-inline-block small text-center float-end border rounded-pill bg-light fw-bold" style="width:6.00em;">${strCount(array.question)}文字</span></dd>
            </dl>`;
    }

    if (array.answer == "") {
        html +=
            `<dl class="row lh-base border-bottom">
                <dt class="col-12 mb-1"><span class="badge bg-primary me-1 text-center touch-none" style="width:6.5em;">正解</span></dt>
                <dd class="col-12">正解が設定されていません。</dd>
                </dl>`;
    } else {
        html += `<dl class="row lh-base border-bottom">
            <dt class="col-12 mb-1"><span class="badge bg-primary me-1 text-center touch-none" style="width:6.5em;">正解</span></dt>`;
        array.answer.forEach(answer => {
            html += `<dd class="d-flex align-items-center ms-1 my-1">`;
            html += `<div class="flex-fill">`;
            html += `<a class="" href="https://www.google.co.jp/search?q=${encodeURIComponent(rubyDelete(answer))}" target="_blank" rel="noopener noreferrer">${ruby(answer)}</a>`;
            html += `</div>`;
            html += `<div class="vr mx-1"></div>`;
            //リンクボタン
            html += `<div class="d-flex align-items-center">`;
            html += `<a class="me-1 btn btn-sm btn-outline-secondary small-size d-inline-block" style="width:7.5em" href="https://ja.wikipedia.org/w/index.php?title=%E7%89%B9%E5%88%A5:%E6%A4%9C%E7%B4%A2&search=${encodeURIComponent(rubyDelete(answer))}" target="_blank" rel="noopener noreferrer">Wikipedia</a>`;
            html += `<a class="me-1 btn btn-sm btn-outline-secondary small-size d-inline-block" style="width:8.50em" href="https://kotobank.jp/gs/?q=${encodeURIComponent(rubyDelete(answer))}" target="_blank" rel="noopener noreferrer">コトバンク</a>`;
            html += `</div>`;
            html += `</dd>`;
        });
        html += `</dl>`;
    };


    if (array.q_desc == "") { } else {
        html +=
            `<dl class="row lh-base border-bottom">
            <dt class="col-12 mb-1"><span class="badge bg-secondary me-1 text-center touch-none" style="width:6.5em;">解説・備考</span></dt>
            <dd class="col-12">${textToURL(ruby(array.q_desc))}</dd>
            </dl>`;
    }

    /*html += `<dl class="row lh-base">
    <dt class="col-12 mb-1"><span class="badge bg-secondary me-1 text-center touch-none" style="width:6.5em;">難易度</span></dt>
    <dd class="col-12">${difficult_text}</dd>
    </dl>`;*/

    /*html += `<dl class="row lh-base">
        <dt class="col-12 mb-1"><span class="badge bg-secondary me-1 text-center touch-none" style="width:6.5em;">カテゴリー</span></dt>
        <dd class="col-12">${array.categoryName}</dd>
        </dl>`;*/

    html += `<dl class="row lh-base">
        <dt class="col-12 mb-1"><span class="badge bg-secondary me-1 text-center touch-none" style="width:6.5em;">最終更新</span></dt>
        <dd class="col-12">${dateMolding(array.modified)}</dd>
        </dl>`;
    html += `</div>
        <div class="modal-footer py-1">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">閉じる</button>
        </div>
        </div></div></div>`;
    //modal ここまで
    return html;
};

//ルビ出力関係
//(hoge|huga) -> <ruby><rb>hoge</rb><rt>fuga</rt></ruby>
function ruby(text) {
    let x = text;
    //console.log(x);
    if (String(text).length) {
        x = x.replaceAll('(', '<ruby><rb class="touch-none">');
        x = x.replaceAll('|', '</rb><rt>');
        x = x.replaceAll(')', '</rt></ruby>');
    };
    return x;
};

function rubyDelete(text) {
    let x = text;
    //console.log(x);
    if (String(text).length) {
        x = x.replaceAll('(', '');
        x = x.replaceAll(/\|([\u3040-\u309F]*[\u30A0-\u30FF]*)\)/g, '');
    };
    return x;
};

function replace(text) {
    let x = text;
    if (String(text).length) {
        //フリガナ
        x = x.replaceAll('(', '<ruby><rb class="touch-none">');
        x = x.replaceAll('|', '</rb><rt>');
        x = x.replaceAll(')', '</rt></ruby>');
        //右上文字
        //x = x.replaceAll(/\^(\-*\d+)/g, '<span class="align-text-top small-size">$1</span>');
        //右下文字
        //x = x.replaceAll(/\_(\-*\d+)/g, '<span class="align-text-bottom small-size">$1</span>');
    };
    return x;
};

function dateMolding(date) {
    date = date.replaceAll('-', '/')
    return date;
};

function escapeHtml(data) {
    //data = data.replace(/&/g, '&amp;');
    data = data.replace(/>/g, '&gt;');
    data = data.replace(/</g, '&lt;');
    data = data.replace(/"/g, '&quot;');
    data = data.replace(/'/g, '&#x27;');
    data = data.replace(/`/g, '&#x60;');
    return data;
};

function new_mark(date, text) {
    let result = '';
    let y = date.slice(0, 4);
    let m = date.slice(5, 7);
    let d = date.slice(8, 10);

    keep_day = 3; // この日数表示されます
    old_day = new Date(y + "/" + m + "/" + d);
    new_day = new Date();
    d = (new_day - old_day) / (1000 * 24 * 3600);

    if (d <= keep_day) {
        return result = `<span class="badge me-1 px-0 border text-danger border-danger touch-none" style="width:3.0em;">${text}</span>`;
    } else {
        return result = '';
    };
};

function confirmCheck() {
    if (document.getElementById("confirm") != null) {
        const condtion = $('#confirm').prop("checked");
        console.log(condtion);
        if (condtion) {
            $('#submit').prop('disabled', false);
        } else {
            $('#submit').prop('disabled', true);
        }
    };
};

$(function () {
    $('#topbar-h-label').on('click', function () {
        topbarHidden = $("#topbar-h").prop("checked");
        if (topbarHidden) {
            $('.topbar-hidden-label').html('概要<i class="mx-1 bi bi-eye-fill"></i>');
            $('.quiz-topbar').removeClass('d-none');
            $('.numbering').addClass('d-none');
            $('.quiz-topbar').css('pointer-events', 'auto');
        } else {
            $('.topbar-hidden-label').html('概要<i class="mx-1 bi bi-eye-slash-fill"></i>');
            $('.quiz-topbar').addClass('d-none');
            $('.numbering').removeClass('d-none');
            $('.quiz-topbar').css('pointer-events', 'none');
        };
    });
});

function order(array) {

    data_sort = $('#orderSelect').val();
    if (data_sort) {

        if (data_sort == 1) {
            for (let i = 0; i < array.length; i++) {
                var j = Math.floor(Math.random() * (i + 1));
                var tmp = array[i];
                array[i] = array[j];
                array[j] = tmp;
            }
        } else if (data_sort == 2) {
            array = array.sort(function (a, b) {
                if (Number(a.id) < Number(b.id)) return -1;
                if (Number(a.id) > Number(b.id)) return 1;
                return 0;
            })
        } else if (data_sort == 3) {
            array = array.sort(function (a, b) {
                if (Number(a.id) < Number(b.id)) return 1;
                if (Number(a.id) > Number(b.id)) return -1;
                return 0;
            })
        } else if (data_sort == 4) {
            array = array.sort(function (a, b) {
                if (a.modified > b.modified) return -1;
                if (a.modified < b.modified) return 1;
            })
        } else if (data_sort == 5) {
            array = array.sort(function (a, b) {
                if (Number(a.difficult || 0) < Number(b.difficult || 0)) return -1;
                if (Number(a.difficult || 0) > Number(b.difficult || 0)) return 1;
                if (Number(a.id) < Number(b.id)) return -1;
                if (Number(a.id) > Number(b.id)) return 1;
                return 0;
            })
        } else if (data_sort == 6) {
            array = array.sort(function (a, b) {
                if (Number(a.difficult || 0) < Number(b.difficult || 0)) return 1;
                if (Number(a.difficult || 0) > Number(b.difficult || 0)) return -1;
                if (Number(a.id) < Number(b.id)) return -1;
                if (Number(a.id) > Number(b.id)) return 1;
                return 0;
            })
        } else if (data_sort == 7) {
            array = array.sort(function (a, b) {
                if (strCount(a.question) < strCount(b.question)) return 1;
                if (strCount(a.question) > strCount(b.question)) return -1;
                if (Number(a.difficult || 0) < Number(b.difficult || 0)) return 1;
                if (Number(a.difficult || 0) > Number(b.difficult || 0)) return -1;
                return 0;
            })
        } else if (data_sort == 8) {
            array = array.sort(function (a, b) {
                if (strCount(a.question) > strCount(b.question)) return 1;
                if (strCount(a.question) < strCount(b.question)) return -1;
                if (Number(a.difficult || 0) > Number(b.difficult || 0)) return 1;
                if (Number(a.difficult || 0) < Number(b.difficult || 0)) return -1;
                return 0;
            });
        };

    } else {
        array = array.sort(function (a, b) {
            a_id = a.id;
            b_id = b.id;
            if (parseInt(a_id) > parseInt(b_id)) {
                return 1;
            } else {
                return -1;
            };
        });
    };
    filt(array);
};

//$('#orderSelect option').on("Click",order);

function getParam(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
};


function feedback(array) {
    let html = '';
    //modal window
    html += `<div class="modal fade" id="fdModal-q-${array.id}" tabindex="-1" aria-labelledby="fdModalLabel-q-${array.id}" aria-hidden="true" data-bs-backdrop="static">`;
    html += `<div class="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
        <div class="modal-content">
        <div class="modal-header py-2">
        <h4 class="modal-title fw-bold touch-none" id="fdModalLabel-q-${array.id}">クイズNo.${array.id}　<span class="badge bg-danger">報告</span></h4>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>`;

    html += `<div class="modal-body"><form class="feedback_form was-validated" action="hd_send.php" method="post" target="_blank" rel="noopener">`;
    html += `<div class="row">`

    html += `<div class="col-md-6">`;
    html += `<div class="border-bottom h4 my-3 fw-bold">クイズデータ</div>`;

    //ジャンル
    html += `<div class="mb-3">
    <div class="border-bottom h5">ジャンル</div>
    <span>${array.genreText ? array.genreText : 'ジャンルが設定されていません。'}</span>
    </div>`;
    //

    //問題
    html += `<div class="mb-3">
    <div class="border-bottom h5">問題</div>
    <span>${array.question ? replace(array.question) : '問題が設定されていません。'}</span>
    </div>`;
    //

    //正解
    html += `<div class="mb-3">
    <div class="border-bottom h5">正解</div>`;
    array.answer.forEach(ans => {
        html += `<span class="d-block">${replace(ans)}</span>`;
    });
    html += `</div>`;
    //

    //解説
    html += `<div class="mb-3">
    <div class="border-bottom h5">解説・備考</div>
    <span>${array.q_desc ? array.q_desc : '解説がありません。'}</span>
    </div>`;
    //

    //最終更新
    html += `<div class="mb-3">
    <label for="locked-config" class="form-label mb-1 touch-none">最終更新</label>
    ${dateMolding(array.modified)}
    </div>`;
    //

    html += `</div>`


    html += `<div class="col-md-6">`;
    html += `<div class="border-bottom h4 my-3 fw-bold">報告フォーム</div>`;

    //種別
    html += `<div class="mb-3">
    <label for="type-${array.id}" class="form-label touch-none"><span class="text-danger">*</span>種別選択</label>
    <select class="form-select is-invalid" id="type-${array.id}" name="category" required>

    <option value="" hidden>選択してください</option>
    <option value="1">問題文に誤りがある</option>
    <option value="2">正解に誤りがある</option>
    <option value="3">解説・備考に誤りがある</option>
    <option value="5">フィードバック</option>
    <option value="4">その他</option>

    </select>
    </div>`;
    //

    //内容
    html += `<div class="mb-3">
    <label for="contents-${array.id}" class="form-label touch-none"><span class="text-danger">*</span>内容 <small>500文字まで</small></label>

    <input type="hidden" name="quiz_id" value="${array.id}">
    <textarea id="contents-${array.id}" class="question form-control is-invalid" name="comment" rows="6" onkeyup="lengthCount(${array.id})" value="" required></textarea>

    <span id="question-length-${array.id}" class="fw-bold text-end d-block m-1">0</span>
    </div>`;
    //

    //
    html += `<div class="mb-3">
    <div class="alert alert-warning">
    <p class="small my-1 touch-none">寄せられた報告等については、クイズの修正やクオリティ向上のためのみに利用されます。また、全ての報告等に対応することはできません。<br>不適切な内容や荒らしが発覚した場合はサイトの閲覧を制限する場合があります。</p>
    <input type="checkbox" id="confirm-${array.id}" class="btn-check check" autocomplete="off" required><label for="confirm-${array.id}" class="btn btn-outline-danger btn-sm">確認</label>
    </div>
    </div>`;
    //

    html += `</div>`
    html += `</div>`

    html += `</div></form>
        <div class="modal-footer py-1">
        <button type="submit" class="btn btn-primary me-1" onClick="fb_send(${array.id})" data-bs-dismiss="modal">送信する</button>
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">閉じる</button>
        </div>

        </div>
        </div>
        </div>`;
    //modal ここまで
    return html;
};

function textToURL(text) {
    const txt = text.replace(/(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig, "<a href='$1'>$1</a>");
    return txt;
};

//テキストエリア　自動拡張
$(document).on('keyup', '.textarea-ans', function () {

    // textarea要素に入力された値の行数
    const lines = ($(this).val() + '\n').match(/\n/g).length;

    console.log(lines)
    // 高さを再計算
    $(this).css('height', `calc(${1.5 * lines}em + 0.75rem + 2px)`);
});

$(function () {
    //ページ内のaタグ群を取得。aTagsに配列として代入。
    var aTags = $('a');
    //全てのaタグについて処理
    aTags.each(function () {
        //aタグのhref属性からリンク先url取得
        var url = $(this).attr('href');
        //念のため、href属性は削除
        $(this).removeAttr('href');
        //クリックイベントをバインド
        $(this).click(function () {
            location.href = url;
        });
    });
});

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * i); // 元々のインデックスと同じにならないように修正

        if (j >= i) {
            j = i - 1; // jがi以上になるのを防ぐ
        }

        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}
