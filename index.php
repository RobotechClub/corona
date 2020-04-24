<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <title>COVID-19 Test</title>
    <meta charset="utf-8">
    <title>COVID-19 Test</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
    <meta http-equiv="Pragma" content="no-cache" />
    <meta http-equiv="Expires" content="0" />
    <link rel="stylesheet" href="<?php echo "css/style.css?v=".round(microtime(true) * 1000); ?>">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js"></script>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css">
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js"></script>

</head>

<body>
                                
    <div id="loader"></div>
    <div class="wrapper" style="background-color:white">

        <div id="counter" style="float:right">
            <div class="form-row">
                <h3 id="qid">1</h3>
                <h2 id="totalqid"> /4 </h2>
            </div>
        </div>
        <form action="" id="wizard">
            <!-- SECTION 1 -->
            <h3 id="title">COVID-19 Test</h3>
            <section>
                <h3 id="question" style="margin:20px"></h3>
                <div class="form-check" id="yesNoSection">

                    <!-- Default unchecked disabled -->
                    <div class="form-check yesDiv">
                        <input type="radio" class="form-check-input radioInput" value="yes" name="choiceButon" id="radioInputYes">
                        <label class="form-check-label" id="yesRadioLabel" for="choiceButon">YES</label>
                    </div>

                    <!-- Default checked disabled -->
                    <div class="form-check noDiv">
                        <input type="radio" class="form-check-input" value="no" name="choiceButon" id="radioInputNo">
                        <label class="form-check-label" id="noRadioLabel" for="choiceButon">NO</label>
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

                <div style="width:100%; text-align:center;">
                    <button type="button" id="startBtn" class="btn btn-secondary startBtn"
                        onclick="btnStartAction()">start</button>
                </div>
            </section>

            <div id="steper" style="float:right">
                <a href="#" id="stepPrevious" onclick="stepPreviousAction()" class="previous round">&#8249;</a>
                <a href="#" id="stepNext" onclick="stepNextAction()" class="next round">&#8250;</a>

            </div>
        </form>

    </div>


    <!-- Modal -->
    <div class="modal fade modal-lg" id="resultModal" data-backdrop="static" data-keyboard="false" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle"
        aria-hidden="true">
        <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="modalTitle">Results</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body modal-xl">
                    ...
                </div>
                <div class="modal-footer">
                    <button type="button" id="closeBtn" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button type="button" id="restTestBtn" class="btn btn-primary" onclick="btnResetAction()">ReTest</button>
                </div>
            </div>
        </div>
    </div>
    <footer id="footer">
      <div class = "div-footer">
          <div style="float:left">
            <p>Powered By RoboTech Halba</p>
          </div>
          <div class="leftFooter">

               <a href="#" class="fa fa-phone"></a> (+961) 71 75 72 71 / 76 13 10 28 
                 <a href="https://www.facebook.com/RoboTechHalbaAkkar" class="fa fa-facebook"></a>
                 <a href="https://www.instagram.com/robotechhalba/" class="fa fa-instagram"></a>
          </div>
      </div>
    </footer>
    <script src="<?php echo "js/coronaTest.js?v=".round(microtime(true) * 1000); ?>"> </script>

</body>

</html>