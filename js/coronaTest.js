let counter = 0;
let displayCounter = 0;
let questions = [];
let messages = [];
let yesAnswerArr = [];
let noAnswerArr = [];
let lang = "";
let cachedAnswers = [];

$(document).ready(function () {
    $("#restTestBtn").hide();
    $("#closeBtn").hide();
    $("#dialogBtn1").hide();
    $("#ageSlider").hide();
    $("#yesNoSection").hide();
    $("#counter").hide();
    $("#steper").hide();
    $("#loader").hide();
    $("#ageForm").hide();

    $('input[name="choiceButon"]').prop('checked', false);

    changeMainDisplayToLang($('#select').find(":selected").val());


    $('#select').on('change', function () {
        const selectedLang = this.value;
        changeMainDisplayToLang(selectedLang);
    });

});

function changeMainDisplayToLang(lang) {
    let selectLabel = "choose a language";
    let startBtnLabel = "start"
    let title = "COVID-19 Test"
    let yesDiv = "YES"
    let noDiv = "NO"
    if (lang === "arabic") {
        selectLabel = "اختر لغة"
        startBtnLabel = "ابدأ"
        title = "COVID-19 اختبار"
        yesDiv = "نعم"
        noDiv = "كلا"
    }
    if (lang === "french") {
        startBtnLabel = "début";
        selectLabel = "choisissez une langue"
        yesDiv = "OUI"
        noDiv = "NO"
    }

    $("#selectLabel").html(selectLabel)
    $("#title").html(title)
    $("#startBtn").html(startBtnLabel)
    $("#yesRadioLabel").html(yesDiv)
    $("#noRadioLabel").html(noDiv)

}

function btnStartAction() {
    $('#loader').show();
    $('.wrapper').hide();

    $.ajax({
        url: 'readers/csvReader.php',
        success: function (data) {
            lang = $('#select').find(":selected").val();
            data = JSON.parse(data)
            questions = data.questionArr.filter(e => e.lang === lang)
            messages = data.messagesArr.filter(e => e.lang === lang);

            $('#loader').hide();

            $('.wrapper').show();
            $("#startBtn").hide();
            $('#selectForm').hide();

            $("#question").show();
            $("#question").html(questions[counter].question)
            $("#ageSlider").show();
            $("#steper").show();

        }
    });
}

function btnResetAction() {
    counter = 0;
    displayCounter = 0;
    cachedAnswers = [];
    yesAnswerArr = [];
    noAnswerArr = [];
    $('input[name="choiceButon"]').prop('checked', false);
    $('.wrapper').show();
    $('#selectForm').show();
    $('#footer').show();
    $("#startBtn").show();
    $('#resultModal').modal('hide');
    $('#restTestBtn').hide();
    var link = document.getElementById('closeBtn');
    link.click();
}


function isYes(number) {
    return yesAnswerArr.includes(number);
}
function isNo(number) {
    return noAnswerArr.includes(number);
}
function isNoSeq(fromNumb, to) {
    for (var i = fromNumb; i <= to; i++) {
        const isInclud = noAnswerArr.includes(i);
        if (!isInclud)
            return isInclud;
    }
    return true;
}
function isYesSeq(fromNumb, to) {
    for (var i = fromNumb; i <= to; i++) {
        const isInclud = yesAnswerArr.includes(i);
        if (!isInclud)
            return isInclud;
    }
    return true;
}
function twoYes(fromNumb, to) {
    var yesCounter = 0;
    for (var i = fromNumb; i < to; i++) {
        const isInclud = yesAnswerArr.includes(i);
        if (isInclud)
            yesCounter++
        if (yesCounter == 2) {
            return true;
        }
    }
    return false;
}
function anyYes(fromNumb, to) {
    var yesCounter = 0;
    for (var i = fromNumb; i < to; i++) {
        const isInclud = yesAnswerArr.includes(i);
        if (isInclud)
            yesCounter++
        if (yesCounter == 1) {
            return true;
        }
    }
    return false;
}

function getMessage() {
    if (
        (isNo(1) && isYesSeq(2, 4)) ||
        (isNo(1) && isYes(2) && isNo(3) && isYes(4)) ||
        (isNo(1) && isYesSeq(2, 3) && isNo(4)) ||
        (isYesSeq(1, 4) ||
        (isYesSeq(1, 3) && isNo(4)) ||
        (isYes(1) && isNo(2) && isYes(3) && isNo(4)) ||
        (isYes(1) && isNo(2) && isYesSeq(3,4)) ||
        (isYesSeq(1,2) && isNo(3) && isYes(4)))) {
        return messages[0].message;
    }
    if (((isYesSeq(1, 2) && isNoSeq(3, 4)) || 
        (isYes(1) && isNoSeq(2, 4)) ||
        (isNo(1) && isYes(2) && isNoSeq(3, 4)))) {
        return messages[1].message;
    }
    if (isNoSeq(1, 4)) {
        return messages[2].message;
    }
    if (((isYesSeq(3, 4) && isNoSeq(1, 2)) ||
        (isYes(3) && isNoSeq(1, 2) && isNo(4)) ||
        (isYes(4) && isNoSeq(1, 3)) ||
        (isYes(1) && isNoSeq(2, 3) && isYes(4)))) {
        return messages[3].message;
    }
}


function stepNextAction() {
    $(".next").css("color", "black")

    if(counter === 0){
        $("#ageSlider").hide();
        $("#yesNoSection").show();
        $("#counter").show();
        $("#qid").html(displayCounter)
        $("#yesRadioLabel").html(questions[counter].yes)
        $("#noRadioLabel").html(questions[counter].no)
    }


    const value = $('input[name=choiceButon]:checked').val()
    if (!value && counter !== 0) {
        swal('Please Choose Answer');
        return;
    }

    if (counter >= questions.length - 1) {
        console.log(yesAnswerArr);
        console.log(noAnswerArr);

        const cachedValue = cachedAnswers.find(e => e.counter === displayCounter);

        const value = $('input[name=choiceButon]:checked').val()

        if (value === "yes")
            yesAnswerArr.push(displayCounter);
        else {
            noAnswerArr.push(displayCounter);
        }

        if (cachedValue)
            cachedValue.value = value;
        else {
            cachedAnswers.push({ "counter": displayCounter, value })

        }

        const message = getMessage();
        $("#question").hide();
        $("#counter").hide();
        $("#steper").hide();
        $("#yesNoSection").hide();
        if (lang === "arabic") {
            $(".modal-body").css("direction", "rtl");
            $("li").css("direction", "rtl");
            $("li").css("margin-right", "20px");
            $("#modalTitle").html("النتائج");
            $("#closeBtn").html("إغلاق")
            $("#restTestBtn").html("إعادة الفحص")

        }
        else if (lang === "french") {
            $(".modal-body").css("direction", "ltr");
            $("li").css({'direction':'ltr'});
            $("li").css("margin-left", "20px");
            $("#closeBtn").html("Fermer")
            $("#restTestBtn").html("Retester")
            $("#modalTitle").html("Résultat");

        }
        else {
            $(".modal-body").css("direction", "ltr");
            $("li").css({'direction':'ltr'});
            $("li").css("margin-left", "20px");
            $("#closeBtn").html("Close")
            $("#restTestBtn").html("ReTest")
            $("#modalTitle").html("Results");
        }
        $(".modal-content").html(message);
        $('#footer').hide();
        $('#restTestBtn').show();

        var link = document.getElementById('dialogBtn1');
        link.click();

    } else {

        const disCounter = displayCounter;
        const nextCachedValue = cachedAnswers.find(e => e.counter === disCounter + 1);
        const cachedValue = cachedAnswers.find(e => e.counter === displayCounter);

        const value = $('input[name=choiceButon]:checked').val()

        if (value === "yes")
            yesAnswerArr.push(displayCounter);
        else {
            noAnswerArr.push(displayCounter);
        }

        if (cachedValue)
            cachedValue.value = value;
        else {
            cachedAnswers.push({ "counter": displayCounter, value })

        }
        if (!nextCachedValue) {
            $('input[name="choiceButon"]').prop('checked', false);
        }
        displayCounter++
        counter++
        $("#qid").html(displayCounter)
        $("#question").html(questions[counter].question)
        if (nextCachedValue) {
            if (nextCachedValue.value === "yes") {
                $("input[name=choiceButon][value=yes]").prop('checked', true);
            }
            if (nextCachedValue.value === "no") {
                $("input[name=choiceButon][value=no]").prop('checked', true);
            }
        }
    }
}
function stepPreviousAction() {
    $(".previous").css("color", "black")
    if (counter <= 0) {
        return;
    } else {
        displayCounter--
        const cachedValue = cachedAnswers.find(e => e.counter === displayCounter);
        if (cachedValue)
            $("input[name=choiceButon][value=" + cachedValue.value + "]").prop('checked', true);
        $("#qid").html(displayCounter)
        counter--
        $("#question").html(questions[counter].question)
    }
}