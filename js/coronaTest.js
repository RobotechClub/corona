let counter = 0;
let displayCounter = 1;
let questions = [];
let messages = [];
let yesAnswerArr = [];
let noAnswerArr = [];
let lang = "";

$(document).ready(function () {
    $("#yesNoSection").hide();
    $("#counter").hide();
    $("#steper").hide();
    $("#loader").hide();

    $('input[name="choiceButon"]').prop('checked', false);
});

function btnStartAction() {
    startBtn
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

            $("#question").html(questions[counter].question)
           
            $("#yesRadioLabel").html(questions[counter].yes)
            $("#noRadioLabel").html(questions[counter].no) 

        }
    });



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
    if (isYes(1) || isYes(2) || isYes(3) && isNoSeq(4, 26)) {
        return messages[0];
    }

    if ((isYes(1) || isYes(2) || isYes(3) && isYes(4) || isYes(5) || isYes(6) || isYes(7))
        || isYes(1) || isYes(2) || isYes(3) && isNoSeq(4, 7) && twoYes(8, 12)
        || isNoSeq(1, 3) && isYes(4) || isYes(5) || isYes(6) || isYes(7) && isYes(8) || isYes(9) || isYes(10) || isYes(11) || isYes(12)) {

        return messages[1];
    }

    if (isYes(1) || isYes(2) || isYes(3) && isNoSeq(4, 7) && anyYes(8, 12)
        || (isNoSeq(1, 3) && anyYes(4, 7) && isNoSeq(8, 12))){
        return messages[2];
    }

    if (isNoSeq(1, 12)) {
        return messages[3];
    }
    if (isNoSeq(1, 7) && isYesSeq(8, 12)){
        return messages[4];
    }
}


function stepNextAction() {
    const value = $('input[name=choiceButon]:checked').val()

    if(!value){
        alert("Please choose answer")
        return;
    }

    if (counter >= questions.length - 1) {
        const message = getMessage();
        $("#question").hide();
        $("#counter").hide();
        $("#steper").hide();
        $("#yesNoSection").html(message);

    } else {
        const value = $('input[name=choiceButon]:checked').val()
        if (value === "yes")
            yesAnswerArr.push(displayCounter);
        else {
            noAnswerArr.push(displayCounter);
        }
        displayCounter++
        counter++
        $("#qid").html(displayCounter)

        $("#question").html(questions[counter].question)
    }
}
function stepPreviousAction() {
    if (counter <= 0) {
        return;
    } else {
        displayCounter--
        $("#qid").html(displayCounter)
        counter--
        $("#question").html(questions[counter].question)
    }
}