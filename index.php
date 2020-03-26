<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <title>COVID-19 Test</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
    <meta http-equiv="Pragma" content="no-cache" />
    <meta http-equiv="Expires" content="0" />
    <link rel="stylesheet" href="<?php echo "css/style.css?v=".round(microtime(true) * 1000); ?>">

    <link rel="icon" type="image/ico" href="images/robotech .jpg" />
</head>

<body>
    <div id="loader"></div>
    <div class="wrapper" style="background-color:white">

        <div id="counter" style="float:right">
            <div class="form-row">
                <h3 id="qid">1</h3>
                <h2 id="totalqid"> /26 </h2>
            </div>
        </div>
        <form action="" id="wizard">
            <!-- SECTION 1 -->
            <h3 id="title">COVID-19 Test</h3>
            <section>
                <h3 id="question" style="margin:30px"></h3>
                <div class="form-check" id="yesNoSection">
                    <!-- Default unchecked disabled -->
                    <div class="custom-control custom-radio yesDiv">
                        <input type="radio" class="custom-control-input" value="yes" name="choiceButon">
                        <label class="custom-control-label" id="yesRadioLabel" for="choiceButon">YES</label>
                    </div>

                    <!-- Default checked disabled -->
                    <div class="custom-control custom-radio noDiv">
                        <input type="radio" class="custom-control-input" value="no" name="choiceButon">
                        <label class="custom-control-label" id="noRadioLabel" for="choiceButon">NO</label>
                    </div>
                </div>
                <div class="form-group" id="selectForm">
                    <label id="selectLabel" for="select">Choose Language</label>
                    <select class="form-control" id="select" style="margin: 20px;">
                        <option value="arabic">Arabic</option>
                        <option value="english">English</option>
                        <option value="french">French</option>
                    </select>
                </div>

                <div style="width:100%; text-align:center; padding:30px">
                    <button type="button" id="startBtn" class="btn btn-secondary startBtn"
                        onclick="btnStartAction()">start</button>
                </div>
            </section>

            <div id="steper" style="float:right">
                <a href="#" id="stepNext" onclick="stepPreviousAction()" class="previous round">&#8249;</a>
                <a href="#" id="stepPrevious" onclick="stepNextAction()" class="next round">&#8250;</a>
            </div>
        </form>

    </div>

    <script src="js/jquery-3.3.1.min.js"></script>

    <script src="<?php echo "js/coronaTest.js?v=".round(microtime(true) * 1000); ?>"> </script>



</body>
</html>