const pointArray = {
    Simple: {
        plus: 0,
        minus: 0,
        plus_count: 0,
        minus_count: 0
    },
    Updown: {
        plus: 0,
        minus: 0,
        plus_count: 0,
        minus_count: 0,
        point: 0
    },
    Mn: {
        plus: 0,
        minus: 0,
        plus_count: 0,
        minus_count: 0,
        point: 0
    },
    By: {
        plus: 0,
        minus: 10,
        plus_count: 0,
        minus_count: 0,
        point: 0
    },
    Minusup: {
        plus: 0,
        minus: 0,
        plus_count: 0,
        minus_count: 0,
        point: 0
    },
    Swedish: {
        plus: 0,
        minus: 0,
        plus_count: 0,
        minus_count: 0,
    },
};

const log = {
    Simple: [JSON.parse(JSON.stringify(pointArray.Simple))],
    Updown: [JSON.parse(JSON.stringify(pointArray.Updown))],
    Mn: [JSON.parse(JSON.stringify(pointArray.Mn))],
    By: [JSON.parse(JSON.stringify(pointArray.By))],
    Minusup: [JSON.parse(JSON.stringify(pointArray.Minusup))],
    Swedish: [JSON.parse(JSON.stringify(pointArray.Swedish))]
};

const max = 9999;
//console.log(pointArray)

$(function () {
    //得点イベント
    $('#Simple-plus-btn').on('click', Simple);
    $('#Simple-minus-btn').on('click', Simple);
    $('#Updown-plus-btn').on('click', Updown);
    $('#Updown-minus-btn').on('click', Updown);
    $('#Mn-plus-btn').on('click', Mn);
    $('#Mn-minus-btn').on('click', Mn);
    $('#By-plus-btn').on('click', By);
    $('#By-minus-btn').on('click', By);
    $('#Minusup-plus-btn').on('click', Minusup);
    $('#Minusup-minus-btn').on('click', Minusup);
    $('#Swedish-plus-btn').on('click', Swedish);
    $('#Swedish-minus-btn').on('click', Swedish);

    //リセットイベント
    $('#Simple-reset').on('click', Simple_reset);
    $('#Updown-reset').on('click', Updown_reset);
    $('#Mn-reset').on('click', Mn_reset);
    $('#By-reset').on('click', By_reset);
    $('#Minusup-reset').on('click', Minusup_reset);
    $('#Swedish-reset').on('click', Swedish_reset);

    //リセットイベント
    $('#Simple-unit-reset').on('click', Simple_unit_reset);
    $('#Updown-unit-reset').on('click', Updown_unit_reset);
    $('#Mn-unit-reset').on('click', Mn_unit_reset);
    $('#By-unit-reset').on('click', By_unit_reset);
    $('#Minusup-unit-reset').on('click', Minusup_unit_reset);
    $('#Swedish-unit-reset').on('click', Swedish_unit_reset);
});

function Simple() {
    if ($(this).val() == 0) {
        if (pointArray.Simple.minus < max) {
            pointArray.Simple.minus += Number($('#Simple-unit-minus-pt').val());
            pointArray.Simple.minus_count++;
        };
    } else if ($(this).val() == 1) {
        if (pointArray.Simple.plus < max) {
            pointArray.Simple.plus += Number($('#Simple-unit-plus-pt').val());
            pointArray.Simple.plus_count++;
        };
    };

    log.Simple.push(JSON.parse(JSON.stringify(pointArray.Simple)));

    $('#Simple-plus').html(pointArray.Simple.plus);
    $('#Simple-plus-count').html(`${pointArray.Simple.plus}（${pointArray.Simple.plus_count}）`);
    $('#Simple-minus').html(pointArray.Simple.minus);
    $('#Simple-minus-count').html(`${pointArray.Simple.minus}（${pointArray.Simple.minus_count}）`);
};

function Updown() {
    if ($(this).val() == 0) {
        if (pointArray.Updown.minus < max) {
            pointArray.Updown.minus += Number($('#Updown-unit-minus-pt').val());
            pointArray.Updown.point = 0;
            pointArray.Updown.minus_count++;
        };
    } else if ($(this).val() == 1) {
        if (pointArray.Updown.plus < max) {
            pointArray.Updown.plus += Number($('#Updown-unit-plus-pt').val());
            pointArray.Updown.point += Number($('#Updown-unit-plus-pt').val());
            pointArray.Updown.plus_count++;
        };
    };

    log.Updown.push(JSON.parse(JSON.stringify(pointArray.Updown)));

    $('#Updown-point').html(pointArray.Updown.point);
    $('#Updown-plus-count').html(`${pointArray.Updown.plus}（${pointArray.Updown.plus_count}）`);
    $('#Updown-minus-count').html(`${pointArray.Updown.minus}（${pointArray.Updown.minus_count}）`);
};

function Mn() {
    if ($(this).val() == 0) {
        if (pointArray.Mn.minus < max) {
            pointArray.Mn.minus += Number($('#Mn-unit-minus-pt').val());
            pointArray.Mn.point -= Number($('#Mn-unit-minus-pt').val());
            pointArray.Mn.minus_count++;
        };
    } else if ($(this).val() == 1) {
        if (pointArray.Mn.plus < max) {
            pointArray.Mn.plus += Number($('#Mn-unit-plus-pt').val());
            pointArray.Mn.point += Number($('#Mn-unit-plus-pt').val());
            pointArray.Mn.plus_count++;
        };
    };

    log.Mn.push(JSON.parse(JSON.stringify(pointArray.Mn)));

    $('#Mn-point').html(pointArray.Mn.point);
    $('#Mn-plus-count').html(`${pointArray.Mn.plus}（${pointArray.Mn.plus_count}）`);
    $('#Mn-minus-count').html(`${pointArray.Mn.minus}（${pointArray.Mn.minus_count}）`);
};

function By() {
    if ($(this).val() == 0) {
        if (pointArray.By.minus > 0) {
            pointArray.By.minus -= Number($('#By-unit-minus-pt').val());
            pointArray.By.minus < 0 ? pointArray.By.minus = 0 : '';
            pointArray.By.point = pointArray.By.plus * pointArray.By.minus;
            pointArray.By.minus_count++;
        };
    } else if ($(this).val() == 1) {
        if (pointArray.By.plus < max) {
            pointArray.By.plus += Number($('#By-unit-plus-pt').val());
            pointArray.By.point += Number($('#By-unit-plus-pt').val());
            pointArray.By.point = pointArray.By.plus * pointArray.By.minus;
            pointArray.By.plus_count++;
        };
    };

    log.By.push(JSON.parse(JSON.stringify(pointArray.By)));

    $('#By-point').html(pointArray.By.point);
    $('#By-plus-count').html(`${pointArray.By.plus}（${pointArray.By.plus_count}）`);
    $('#By-minus-count').html(`${pointArray.By.minus}（${pointArray.By.minus_count}）`);
};

function Minusup() {
    if ($(this).val() == 0) {
        if (pointArray.Minusup.minus < max) {
            pointArray.Minusup.minus += Number($('#Minusup-unit-minus-pt').val()) * (pointArray.Minusup.minus_count + 1);
            pointArray.Minusup.point -= Number($('#Minusup-unit-minus-pt').val()) * (pointArray.Minusup.minus_count + 1);
            pointArray.Minusup.minus_count++;
        };
    } else if ($(this).val() == 1) {
        if (pointArray.Minusup.plus < max) {
            pointArray.Minusup.plus += Number($('#Minusup-unit-plus-pt').val());
            pointArray.Minusup.point += Number($('#Minusup-unit-plus-pt').val());
            pointArray.Minusup.plus_count++;
        };
    };

    log.Minusup.push(JSON.parse(JSON.stringify(pointArray.Minusup)));

    $('#Minusup-point').html(pointArray.Minusup.point);
    $('#Minusup-plus-count').html(`${pointArray.Minusup.plus}（${pointArray.Minusup.plus_count}）`);
    $('#Minusup-minus-count').html(`${pointArray.Minusup.minus}（${pointArray.Minusup.minus_count}）`);
};

function Swedish() {
    if ($(this).val() == 0) {
        if (pointArray.Swedish.minus < 10 && pointArray.Swedish.plus < 10) {
            function Swedish_Minus(num) {
                if (num < 1) {
                    const minus = 1;
                    return minus;
                } else if (num < 3) {
                    const minus = 2;
                    return minus;
                } else if (num < 6) {
                    const minus = 3;
                    return minus;
                } else {
                    const minus = 4;
                    return minus;
                };
            };
            pointArray.Swedish.minus += Swedish_Minus(pointArray.Swedish.plus);
            pointArray.Swedish.minus_count++;
        };
    } else if ($(this).val() == 1) {
        if (pointArray.Swedish.plus < 10 && pointArray.Swedish.minus < 10) {
            pointArray.Swedish.plus += Number($('#Swedish-unit-plus-pt').val());
            pointArray.Swedish.plus_count++;
        };
    };

    if (pointArray.Swedish.plus < 10 && pointArray.Swedish.minus < 10) {
        log.Swedish.push(JSON.parse(JSON.stringify(pointArray.Swedish)));
    };

    $('#Swedish-plus').html(pointArray.Swedish.plus);
    $('#Swedish-plus-count').html(`${pointArray.Swedish.plus}（${pointArray.Swedish.plus_count}）`);
    $('#Swedish-minus').html(pointArray.Swedish.minus);
    $('#Swedish-minus-count').html(`${pointArray.Swedish.minus}（${pointArray.Swedish.minus_count}）`);
};

function Simple_reset() {
    pointArray.Simple.plus = 0;
    pointArray.Simple.minus = 0;
    pointArray.Simple.plus_count = 0;
    pointArray.Simple.minus_count = 0;

    log.Simple = [JSON.parse(JSON.stringify(pointArray.Simple))];

    $('#Simple-plus').html(pointArray.Simple.plus);
    $('#Simple-plus-count').html(`${pointArray.Simple.plus}（${pointArray.Simple.plus_count}）`);
    $('#Simple-minus').html(pointArray.Simple.minus);
    $('#Simple-minus-count').html(`${pointArray.Simple.minus}（${pointArray.Simple.minus_count}）`);
};

function Updown_reset() {
    pointArray.Updown.plus = 0;
    pointArray.Updown.minus = 0;
    pointArray.Updown.point = 0;
    pointArray.Updown.plus_count = 0;
    pointArray.Updown.minus_count = 0;

    log.Updown = [JSON.parse(JSON.stringify(pointArray.Updown))];

    $('#Updown-point').html(pointArray.Updown.point);
    $('#Updown-plus-count').html(`${pointArray.Updown.plus}（${pointArray.Updown.plus_count}）`);
    $('#Updown-minus-count').html(`${pointArray.Updown.minus}（${pointArray.Updown.minus_count}）`);
};

function Mn_reset() {
    pointArray.Mn.plus = 0;
    pointArray.Mn.minus = 0;
    pointArray.Mn.point = 0;
    pointArray.Mn.plus_count = 0;
    pointArray.Mn.minus_count = 0;

    log.Mn = [JSON.parse(JSON.stringify(pointArray.Mn))];

    $('#Mn-point').html(pointArray.Mn.point);
    $('#Mn-plus-count').html(`${pointArray.Mn.plus}（${pointArray.Mn.plus_count}）`);
    $('#Mn-minus-count').html(`${pointArray.Mn.minus}（${pointArray.Mn.minus_count}）`);
};

function By_reset() {
    pointArray.By.plus = 0;
    pointArray.By.minus = 10;
    pointArray.By.point = 0;
    pointArray.By.plus_count = 0;
    pointArray.By.minus_count = 0;

    log.By = [JSON.parse(JSON.stringify(pointArray.By))];

    $('#By-point').html(pointArray.By.point);
    $('#By-plus-count').html(`${pointArray.By.plus}（${pointArray.By.plus_count}）`);
    $('#By-minus-count').html(`${pointArray.By.minus}（${pointArray.By.minus_count}）`);
};

function Minusup_reset() {
    pointArray.Minusup.plus = 0;
    pointArray.Minusup.minus = 0;
    pointArray.Minusup.point = 0;
    pointArray.Minusup.plus_count = 0;
    pointArray.Minusup.minus_count = 0;

    log.Minusup = [JSON.parse(JSON.stringify(pointArray.Minusup))];

    $('#Minusup-point').html(pointArray.Minusup.point);
    $('#Minusup-plus-count').html(`${pointArray.Minusup.plus}（${pointArray.Minusup.plus_count}）`);
    $('#Minusup-minus-count').html(`${pointArray.Minusup.minus}（${pointArray.Minusup.minus_count}）`);
};

function Swedish_reset() {
    pointArray.Swedish.plus = 0;
    pointArray.Swedish.minus = 0;
    pointArray.Swedish.plus_count = 0;
    pointArray.Swedish.minus_count = 0;

    log.Swedish = [JSON.parse(JSON.stringify(pointArray.Swedish))];

    $('#Swedish-plus').html(pointArray.Swedish.plus);
    $('#Swedish-plus-count').html(`${pointArray.Swedish.plus}（${pointArray.Swedish.plus_count}）`);
    $('#Swedish-minus').html(pointArray.Swedish.minus);
    $('#Swedish-minus-count').html(`${pointArray.Swedish.minus}（${pointArray.Swedish.minus_count}）`);
};

function Simple_unit_reset() {
    $('#Simple-unit-minus-pt').val(1)
    $('#Simple-unit-plus-pt').val(1)
};

function Updown_unit_reset() {
    $('#Updown-unit-minus-pt').val(1)
    $('#Updown-unit-plus-pt').val(1)
};

function Mn_unit_reset() {
    $('#Mn-unit-minus-pt').val(1)
    $('#Mn-unit-plus-pt').val(1)
};

function By_unit_reset() {
    $('#By-unit-minus-pt').val(1)
    $('#By-unit-plus-pt').val(1)
};

function Minusup_unit_reset() {
    $('#Minusup-unit-minus-pt').val(1)
    $('#Minusup-unit-plus-pt').val(1)
};

function Swedish_unit_reset() {
    $('#Swedish-unit-minus-pt').val(1)
    $('#Swedish-unit-plus-pt').val(1)
};

$(document).on('click', '#Simple-undo', function () {
    if (log.Simple.length > 1) {
        log.Simple = log.Simple.slice(0, -1);
        pointArray.Simple = JSON.parse(JSON.stringify(log.Simple[log.Simple.length - 1]));

        $('#Simple-plus').html(pointArray.Simple.plus);
        $('#Simple-plus-count').html(`${pointArray.Simple.plus}（${pointArray.Simple.plus_count}）`);
        $('#Simple-minus').html(pointArray.Simple.minus);
        $('#Simple-minus-count').html(`${pointArray.Simple.minus}（${pointArray.Simple.minus_count}）`);
    };
});

$(document).on('click', '#Updown-undo', function () {
    if (log.Updown.length > 1) {
        log.Updown = log.Updown.slice(0, -1);
        pointArray.Updown = JSON.parse(JSON.stringify(log.Updown[log.Updown.length - 1]));

        $('#Updown-point').html(pointArray.Updown.point);
        $('#Updown-plus-count').html(`${pointArray.Updown.plus}（${pointArray.Updown.plus_count}）`);
        $('#Updown-minus-count').html(`${pointArray.Updown.minus}（${pointArray.Updown.minus_count}）`);
    };
});

$(document).on('click', '#Mn-undo', function () {
    if (log.Mn.length > 1) {
        log.Mn = log.Mn.slice(0, -1);
        pointArray.Mn = JSON.parse(JSON.stringify(log.Mn[log.Mn.length - 1]));

        $('#Mn-point').html(pointArray.Mn.point);
        $('#Mn-plus-count').html(`${pointArray.Mn.plus}（${pointArray.Mn.plus_count}）`);
        $('#Mn-minus-count').html(`${pointArray.Mn.minus}（${pointArray.Mn.minus_count}）`);
    };
});

$(document).on('click', '#By-undo', function () {
    if (log.By.length > 1) {
        log.By = log.By.slice(0, -1);
        pointArray.By = JSON.parse(JSON.stringify(log.By[log.By.length - 1]));

        $('#By-point').html(pointArray.By.point);
        $('#By-plus-count').html(`${pointArray.By.plus}（${pointArray.By.plus_count}）`);
        $('#By-minus-count').html(`${pointArray.By.minus}（${pointArray.By.minus_count}）`);
    };
});

$(document).on('click', '#Minusup-undo', function () {
    if (log.Minusup.length > 1) {
        log.Minusup = log.Minusup.slice(0, -1);
        pointArray.Minusup = JSON.parse(JSON.stringify(log.Minusup[log.Minusup.length - 1]));

        $('#Minusup-point').html(pointArray.Minusup.point);
        $('#Minusup-plus-count').html(`${pointArray.Minusup.plus}（${pointArray.Minusup.plus_count}）`);
        $('#Minusup-minus-count').html(`${pointArray.Minusup.minus}（${pointArray.Minusup.minus_count}）`);
    };
});

$(document).on('click', '#Swedish-undo', function () {
    if (log.Swedish.length > 1) {
        log.Swedish = log.Swedish.slice(0, -1);
        pointArray.Swedish = JSON.parse(JSON.stringify(log.Swedish[log.Swedish.length - 1]));

        console.log(log.Swedish);

        $('#Swedish-plus').html(pointArray.Swedish.plus);
        $('#Swedish-plus-count').html(`${pointArray.Swedish.plus}（${pointArray.Swedish.plus_count}）`);
        $('#Swedish-minus').html(pointArray.Swedish.minus);
        $('#Swedish-minus-count').html(`${pointArray.Swedish.minus}（${pointArray.Swedish.minus_count}）`);
    };
});
