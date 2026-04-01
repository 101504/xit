<!DOCTYPE html>
<html lang="nl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0">
    <title>Ray-Ban · Smart Kiosk</title>
    
    <!-- CSS Files -->
    <link rel="stylesheet" href="assets/css/kiosk.css">
    
    <!-- Analytics & Tracking -->
    <script src="assets/js/modules/tracking.js"></script>
</head>
<body>
    <div id="kiosk">
        <!-- Welcome Screen -->
        <div id="welcome-screen" class="screen active">
            <?php include 'pages/welcome.php'; ?>
        </div>
        
        <!-- Camera Screen -->
        <div id="camera-screen" class="screen">
            <?php include 'pages/camera.php'; ?>
        </div>
        
        <!-- Analyzing Screen -->
        <div id="analyzing-screen" class="screen">
            <?php include 'pages/analyzing.php'; ?>
        </div>
        
        <!-- Results Screen -->
        <div id="results-screen" class="screen">
            <?php include 'pages/results.php'; ?>
        </div>
        
        <!-- Try-On Screen -->
        <div id="tryon-screen" class="screen">
            <?php include 'pages/tryon.php'; ?>
        </div>
    </div>
    
    <!-- Core JavaScript -->
    <script src="assets/js/modules/data.js"></script>
    <script src="assets/js/modules/svg.js"></script>
    <script src="assets/js/modules/camera.js"></script>
    <script src="assets/js/app-kiosk.js"></script>
</body>
</html>
