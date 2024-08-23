function ready() {
    let data = [{
        question: $('#question-text').val() !== "" ? escapeHtml($('#question-text').val()) : escapeHtml($('#question-text').attr('placeholder'))
    }];
    output(data);
};

function output(array) {
    console.log(array);

    let html = '';
    let open_count = 0;
    let count = 0;

    //let color = ["pink", "indigo", "orange", "green", "primary"];
    //let randomColor = color[Math.floor(Math.random() * color.length)];

    array.forEach((item, i) => {
        const str_len = item.question.split('').length;
        open_count += str_len;

        for (let j = 0; j < str_len; j++) {
            html += `<div class="col" style="padding: 0.125rem !important;"><div id="str_a${i}-${j + 1}" class="str-blind blind-1 py-4 m-0 border bg-dark bg-gradient text-white fw-bold text-center touch-none rounded-3" style="font-size:5.0rem;">${j + 1 + count}</div>`;
            html += `<div id="str_b${i}-${j + 1}" class="str-blind blind-2 col py-4 m-0 border bg-white text-dark fw-bold text-center touch-none rounded-3 d-none border-secondary" style="font-size:5.0rem;">${item.question[j]}<br><small class="fw-nomal fs-3 opacity-50 fw-bold position-absolute text-center" style="width:3rem; margin-left: -1.4rem !important; margin-top: -0.75rem !important; pointer-events:none;">${j + 1}</small></div></div>`;
        }
        count += str_len;
    });

    $("#output-area").html(html);
    $("#open-count").html(open_count);
    $("#open-count-max").html(open_count);
    $("#open-count").val(open_count);
    $("#opened-count").html(0);
};

function escapeHtml(str) {
    return str.replace(/[&<>"']/g, match => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;'
    }[match]));
}

document.addEventListener("keydown", (e) => {
    if (e.keyCode === 13) {
        toggleFullScreen();
    }
}, false);

function toggleFullScreen() {
    const elem = document.getElementById("Content");

    if (!document.fullscreenElement) {
        elem.requestFullscreen().then(() => {
            document.documentElement.style.overflow = 'auto';
            document.body.style.overflow = 'auto';
            elem.style.overflow = 'auto';
            elem.style.height = '100vh';
        }).catch(err => {
            console.error(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
        });
    } else if (document.exitFullscreen) {
        document.exitFullscreen().then(() => {
            document.documentElement.style.overflow = '';
            document.body.style.overflow = '';
            elem.style.overflow = '';
            elem.style.height = '';
        }).catch(err => {
            console.error(`Error attempting to exit full-screen mode: ${err.message} (${err.name})`);
        });
    };
};

$(document).on("click", 'div[id^="str_a"], div[id^="str_b"]', function (event) {
    const isA = event.target.id.startsWith("str_a");
    const str_no = event.target.id.replace(isA ? "str_a" : "str_b", "");
    const targetA = `#str_a${str_no}`;
    const targetB = `#str_b${str_no}`;

    $(targetA).toggleClass('d-none d-block');
    $(targetB).toggleClass('d-none d-block');

    const open_count = Number($('#open-count').text());
    $('#open-count').html(isA ? open_count - 1 : open_count + 1);
    $('#opened-count').html(isA ? $("#open-count-max").html() - open_count + 1 : $("#open-count-max").html() - open_count - 1);
});

function toggleAll(open) {
    const str_a = $(`div[id^="str_a"]`);
    const str_b = $(`div[id^="str_b"]`);

    if (open) {
        str_a.addClass('d-none').removeClass('d-block');
        str_b.removeClass('d-none').addClass('d-block');
        $('#open-count').html(0);
        $('#opened-count').html(escapeHtml($('#open-count').val()));
    } else {
        str_b.addClass('d-none').removeClass('d-block');
        str_a.removeClass('d-none').addClass('d-block');
        $('#open-count').html(escapeHtml($('#open-count').val()));
        $('#opened-count').html(0);
    };
};

function generateImg() {
    document.querySelector('#imgDlBtn').addEventListener('click', downloadImg);
    setTimeout(() => {
        const content = document.querySelector('#imgContent');
        const canvasElement = document.querySelector('#imgCanvas');

        html2canvas(content, {
            windowWidth: 1600,
            windowHeight: 900,
            scrollX: 0,
            scrollY: window.scrollY,
            backgroundColor: window.getComputedStyle(document.body).backgroundColor,
            allowTaint: true,
            proxy: true,
            useCORS: true,
            scale: 1 // 解像度を2倍に設定
        }).then(canvas => {
            imgData = canvas.toDataURL();
            canvasElement.src = imgData;

            $('#imgContent').find('#imgAns').remove();
        });
    }, 200);
};

function downloadImg() {
    const link = document.createElement('a');
    link.href = imgData;
    link.download = `${document.querySelector("#opened-count").textContent || 'image'}.png`;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};

$('#modalClose').on('Click', function () {
    document.querySelector('#imgDlBtn').removeEventListener('click', downloadImg);
});

$(document).ready(ready);

function lengthCount() {
    let str = $('#question-text').val();
    let strLength = String(str).length;
    $('#question-length').html(strLength);
};
