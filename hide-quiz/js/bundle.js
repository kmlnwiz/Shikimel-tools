// Main function that runs on page load
function ready() {
    let data = [{
        question: $('#question-text').val() !== "" ? escapeHtml($('#question-text').val()) : escapeHtml($('#question-text').attr('placeholder'))
    }];
    output(data);
};

// Function to generate HTML content based on the input data
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

// Function to escape HTML characters
function escapeHtml(str) {
    return str.replace(/[&<>"']/g, match => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;'
    }[match]));
}

// Event listener for toggling full-screen mode with the Enter key
document.addEventListener("keydown", (e) => {
    if (e.keyCode === 13) {
        toggleFullScreen();
    }
}, false);

// Function to toggle full-screen mode
function toggleFullScreen() {
    const elem = document.getElementById("contentArea");
    const overlayElem = document.getElementById("overlay");

    if (!document.fullscreenElement) {
        elem.requestFullscreen();
        overlayElem.requestFullscreen();
    } else if (document.exitFullscreen) {
        document.exitFullscreen();
    }
}

// Event listener for toggling the visibility of elements
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

// Function to toggle all elements open or closed
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
    }
}

// Function to generate an image from the content
function generateImg() {
    //$('.blind-1').addClass('d-none').removeClass('d-block');
    //$('.blind-2').removeClass('d-none').addClass('d-block');

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
        }).then(canvas => {
            const imgData = canvas.toDataURL();
            canvasElement.src = imgData;

            //$('.blind-2').addClass('d-none').removeClass('d-block');
            //$('.blind-1').removeClass('d-none').addClass('d-block');
            $('#imgContent').find('#imgAns').remove();
        });
    }, 200);
};

// Automatically execute the ready function when the page loads
$(document).ready(ready);

function lengthCount() {
    let str = $('#question-text').val();
    let strLength = String(str).length;
    $('#question-length').html(strLength);
};
