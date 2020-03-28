let counter = 0;
let displayCounter = 1;
let questions = [];
let messages = [];
let yesAnswerArr = [];
let noAnswerArr = [];
let lang = "";
let cachedAnswers = [];

$(document).ready(function () {
    $("#yesNoSection").hide();
    $("#counter").hide();
    $("#steper").hide();
    $("#loader").hide();

    $('input[name="choiceButon"]').prop('checked', false);
    
    changeMainDisplayToLang($('#select').find(":selected").val());


    $('#select').on('change', function() {
        const selectedLang = this.value;
        changeMainDisplayToLang(selectedLang);
      });

});

function changeMainDisplayToLang(lang){
    let selectLabel = "choose a language";
    let startBtnLabel = "start"
    let title = "COVID-19 Test"
    if(lang === "arabic"){
        selectLabel = "اختر لغة"
        startBtnLabel = "ابدأ"
        title = "COVID-19 اختبار"
    }
    if(lang === "french"){
        startBtnLabel = "début";
        selectLabel = "choisissez une langue"
    }

    $("#selectLabel").html(selectLabel)
    $("#title").html(title)
    $("#startBtn").html(startBtnLabel)
}

function btnStartAction() {
    $('#loader').show();
    $('.wrapper').hide();

    $.ajax({
        url: 'dataReader.php',
        success: function (data) {
            lang = $('#select').find(":selected").val();
            data = JSON.parse(data)
            console.log(data)
            const obj = data.find(e => e.sheetName === lang)
            questions = obj.questionArr;
            messages = obj.messagesArr;

            $('#loader').hide();

            $('.wrapper').show();
            $("#startBtn").hide();
            $('#selectForm').hide();
            $("#yesNoSection").show();
            $("#counter").show();
            $("#steper").show();
            $("#question").show();

            $("#question").html(questions[counter].question)
            $("#qid").html(displayCounter)
            $("#yesRadioLabel").html(questions[counter].yes)
            $("#noRadioLabel").html(questions[counter].no)

        }
    });
}

function btnResetAction(){
    counter = 0;
    displayCounter = 1;
    $('.wrapper').show();
    $('#selectForm').show();
    $("#startBtn").show();
    $('#resultModal').modal('hide');
}


function isYes(number) {
    return yesAnswerArr.includes(number);
}
function isNo(number) {
    return noAnswerArr.includes(number);
}
function isNoSeq(fromNumb, to) {
    for (var i = fromNumb; i < to; i++) {
        const isInclud = noAnswerArr.includes(i);
        if (!isInclud)
            return isInclud;
    }
    return true;
}
function isYesSeq(fromNumb, to) {
    for (var i = fromNumb; i < to; i++) {
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
    if ( (isYes(1) || isYes(2) || isYes(3)) && isNoSeq(4, 26)) {
        return messages[0];
    }

    if ((isYes(1) || isYes(2) || isYes(3)) && (isYes(4) || isYes(5) || isYes(6) || isYes(7))
        || ((isYes(1) || isYes(2) || isYes(3)) && isNoSeq(4, 7) && twoYes(8, 12))
        || (isNoSeq(1, 3) && (isYes(4) || isYes(5) || isYes(6) || isYes(7)) && (isYes(8) || isYes(9) || isYes(10) || isYes(11) || isYes(12)))) {

        return messages[1];
    }

    if (isYes(1) || isYes(2) || isYes(3) && isNoSeq(4, 7) && anyYes(8, 12)
        || (isNoSeq(1, 3) && anyYes(4, 7) && isNoSeq(8, 12))) {
        return messages[2];
    }

    if (isNoSeq(1, 12)) {
        return messages[3];
    }
    if (isNoSeq(1, 7) && isYesSeq(8, 12)) {
        return messages[4];
    }
}


function stepNextAction() {
    const value = $('input[name=choiceButon]:checked').val()
    if (!value) {
        alert("Please choose answer")
        return;
    }

    if (counter >= questions.length - 1) {
        const message = getMessage();
        $("#question").hide();
        $("#counter").hide();
        $("#steper").hide();
        $("#yesNoSection").hide();
        $(".modal-body").html(message);
       
        $('#resultModal').modal('show');


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