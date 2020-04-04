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
                                
    <div class="navBar">
        <nav id="navToolbar" class="navbar navbar-expand-md navbar-light bg-light">
         <a class="navbar-brand" href="#">    <div class="web-logo">
        <img src="images/redcross.png" alt="Lebanese Red Cross" width="60" height="60">
    </div></a>
            <button type="button" id="toogleBtn" class="navbar-toggler" data-toggle="collapse" data-target="#navbarCollapse">
                <span class="navbar-toggler-icon">        
                    </span>
            </button>

            <div class="collapse navbar-collapse justify-content-end" id="navbarCollapse">
                <div class="navbar-nav">
                    <a id="houseItem" onclick="showHouse()" href="pdfShowHouse.php" class="nav-item nav-link active">العزل المنزلي</a>
                    <a id="awarenessItem" onclick="showAwarness()" href="pdfShowAwarness.php" class="nav-item nav-link">الكورونا؟</a>
                    <a id="wrongConceptsItem" onclick="showWrongConcepts()" href="pdfViewerPage.php" class="nav-item nav-link">مغالطات</a>
                    <a id="homeItem" onclick="showHome()" href="index.php" class="nav-item nav-link">الرئيسية</a>

                </div>
            </div>
        </nav>
    </div>  

    <iframe id="pdfViewer" onload="$('.iframe-loading').css('display', 'none');" src="https://docs.google.com/viewer?srcid=1KJuYx8PwW7NWuO4yJMiIEE1ElXmGSxY3&pid=explorer&efh=false&a=v&chrome=false&embedded=true" width="100%" height="100%"></iframe>
    
    <div class = "iframe-loading">
        <div class="iframe-placeholder"> </div>
        <div class="iframe-placeholder-text">... الرجاء الانتظار </div>
    </div>
    
    <script src="<?php echo "js/coronaTest.js?v=".round(microtime(true) * 1000); ?>"> </script>

</body>

</html>