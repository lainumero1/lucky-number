let EMPTY_PAGE = true;
function darkMode() {
    $("#light-dark").prop('checked', true);
    $("body").css("background-color", "black");
    $(".description").css("color", "lightgrey");
    $("#light-dark").css("background-color", "#0d6efd");
    $("input.number-scroll").css({"background-color": "dimgrey"});
    $("input.number-input").css({"background-color": "dimgrey"});
    $("h3").css("color", "lightgrey");
    $("label").css("color", "lightgrey");
    $("#result").css("color", "lightgrey");
    if ($("#keep-history").is(":checked")) {
        $("#keep-history").css("background-color", "#0d6efd");
    }
    else {
        $("#keep-history").css("background-color", "dimgrey");
    }
}

function lightMode() {
    $("#light-dark").prop('checked', false);
    $("body").css("background-color", "white");
    $(".description").css("color", "black");
    $("#light-dark").css("background-color", "lightgrey");
    $("input.number-scroll").css({"background-color": "lightgrey"});
    $("input.number-input").css({"background-color": "lightgrey"});
    $("h3").css("color", "black");
    $("label").css("color", "black");
    $("#result").css("color", "black");
    $("#keep-history").css("background-color", "lightgrey");
    if ($("#keep-history").is(":checked")) {
        $("#keep-history").css("background-color", "#0d6efd");
    }
    else {
        $("#keep-history").css("background-color", "lightgrey");
    }
}

if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark').matches){
    darkMode()
}
else{
    lightMode()
}

$("#light-dark").click(function () {
    if ($("#light-dark").is(":checked")) {
        darkMode()
    }
    else {
        lightMode()
    }
})

$("#keep-history").click(function () {
    if ($("#keep-history").is(":checked")) {
        $("#keep-history").css("background-color", "#0d6efd");
    }
    else {
        $("#keep-history").css("background-color", "lightgrey");
        if ($("#light-dark").is(":checked")) {
            $("#keep-history").css("background-color", "dimgrey");
        }
        else {
            $("#keep-history").css("background-color", "lightgrey");
        }
    }
})

$("#clear-history").click(function () {
    $("#result").empty();
})

$("#confirm-button").click(function (){
    let MINIMUM = parseInt($("#minimum").val());
    let MAXIMUM = parseInt($("#maximum").val());
    let EXCLUSION = $("#exclusion").val().split(',').map(Number);
    let PICKS_COUNT = parseInt($("#picks").val());
    if (! MINIMUM || ! MAXIMUM || ! PICKS_COUNT){
        $(".result-container").append('<p id="error" style="color: red">The range must be defined first!</p>');
        setTimeout(function () {
            $("#error").remove();
        }, 2000);
    }
    else if (PICKS_COUNT < 1) {
        $(".result-container").append('<p id="error" style="color: red">A lottery draws at least one number!</p>');
        setTimeout(function () {
            $("#error").remove();
        }, 2000);
    }
    else if (MINIMUM >= MAXIMUM) {
        $(".result-container").append('<p id="error" style="color: red">Maximum pick must be larger than minimum pick!</p>');
        setTimeout(function () {
            $("#error").remove();
        }, 2000);
    }
    else if (MAXIMUM - MINIMUM - EXCLUSION.length + 1 < PICKS_COUNT) {
        $(".result-container").append('<p id="error" style="color: red">Please delete some of the exclusions or pick fewer numbers!</p>');
        setTimeout(function () {
            $("#error").remove();
        }, 2000);
    }
    else if (EMPTY_PAGE === true) {
        $("#result").append('<img src="buffer.gif" class="buffering" width="16px" height="16px">');
        let OUTCOME = [];
        let CONTINUE_DRAW = true;
        let LOOP_COUNT = 0;
        while (CONTINUE_DRAW === true) {
            let RESULT = Math.floor(Math.random() * (MAXIMUM - MINIMUM + 1)) + MINIMUM;
            if (OUTCOME.find(i => i === RESULT) || EXCLUSION.find(i => i === RESULT)) {
                continue;
            }
            else{
                OUTCOME[LOOP_COUNT] = RESULT;
                LOOP_COUNT += 1;
            }
            if (LOOP_COUNT === PICKS_COUNT){
                break;
            }
        }
        setTimeout(function () {
            $(".buffering").remove();
            // $(".result-container").append('<p id="result"></p>');
            $("#result").append(OUTCOME.toString());
        }, 1500);
        EMPTY_PAGE = false;
    }
    else {
        if (!$("#keep-history").is(":checked")) {
            $("#result").empty();
        }
        else {
            $("#result").append('<br>');
        }
        $("#result").append('<img src="buffer.gif" class="buffering" width="16px" height="16px">');
        let OUTCOME = [];
        let CONTINUE_DRAW = true;
        let LOOP_COUNT = 0;
        while (CONTINUE_DRAW === true) {
            let RESULT = Math.floor(Math.random() * (MAXIMUM - MINIMUM + 1)) + MINIMUM;
            if (OUTCOME.find(i => i === RESULT) || EXCLUSION.find(i => i === RESULT)) {
                continue;
            }
            else{
                OUTCOME[LOOP_COUNT] = RESULT;
                LOOP_COUNT += 1;
            }
            if (LOOP_COUNT === PICKS_COUNT){
                break;
            }
        }
        setTimeout(function () {
            $(".buffering").remove();
            // $(".result-container").append('<p id="result"></p>');
            $("#result").append(OUTCOME.toString());
        }, 1500);
        EMPTY_PAGE = false;
    }
});

$(".number-scroll").on("mousewheel", function (event){
    event.preventDefault();
    let INCREMENT = 1;
    let VALUE = Math.round(parseFloat($(this).val()) * 10) / 10;
    if (!(VALUE)) {
        VALUE = 0;
    }
    if (event.originalEvent.deltaY < 0) {
        $(this).val(VALUE + INCREMENT);
    }
    else {
        $(this).val(VALUE - INCREMENT);
    }
});