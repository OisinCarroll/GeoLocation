<?php

	error_reporting(E_ALL);
	ini_set('display_errors', TRUE);
	ini_set('display_startup_errors', TRUE);

	$gupload = false;
	
	if (
		$_SERVER['REQUEST_METHOD'] == 'POST' &&
		file_exists($_FILES['jsonupload']['tmp_name']) &&
		is_uploaded_file($_FILES['jsonupload']['tmp_name']) 
		) {

		$currentDir = getcwd();
	    $uploadDirectory = "geojson";

	    $errors = [];

	    $fileExtensions = ['geojson']; 

	    $fileName = $_FILES['jsonupload']['name'];
	    $fileSize = $_FILES['jsonupload']['size'];
	    $fileTmpName  = $_FILES['jsonupload']['tmp_name'];
	    $fileType = $_FILES['jsonupload']['type'];
	    $fileExtension = strtolower(explode('.',$fileName)[1]);

	    $uploadPath = $currentDir . '\\' . $uploadDirectory . '\\' . basename("new.geojson");

	    echo "fileName: " . $fileName . "<br>";
	    echo "fileSize: " . $fileSize . "<br>";
	    echo "fileTmpName: " . $fileTmpName . "<br>";
	    echo "fileType: " . $fileType . "<br>";
	    echo "fileExtension: " . $fileExtension . "<br>";

        if (! in_array($fileExtension,$fileExtensions)) {
            $errors[] = "This file extension is not allowed. Geojson only";
        }

        if ($fileSize > 2000000) {
            $errors[] = "This file is more than 2MB.";
        }

        if (empty($errors)) {
            $didUpload = move_uploaded_file($fileTmpName, $uploadPath);

            if ($didUpload) {
                echo "The file " . basename($fileName) . " has been uploaded";
                $gupload = true;
            } else {
                echo "An error occurred somewhere.";
            }
        } else {
            foreach ($errors as $error) {
                echo $error . "These are the errors" . "\n";
            }
        }
    }

?>

<!doctype html>

<html lang="en">

	<head>

		<script type='text/javascript'>window.gupload = '<?=$gupload?>';</script>

		<meta charset="utf-8">

		<title>GeoMapping</title>

		<link rel="stylesheet" href="lib/leaflet/leaflet.css?v=1.3.1" />
		<link rel="stylesheet" href="css/style.css?v=<?=rand(1,100);?>" />

		<script 
			src="https://code.jquery.com/jquery-3.3.1.min.js"
	 		integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8="
	  		crossorigin="anonymous">
	    </script>

		<script src="lib/leaflet/leaflet-src.js?v=1.3.1?>"></script>
		<script src="lib/leaflet/leafletAjax.js?v=1.3.1"></script>
		<script src='js/map.js?v=1.1'></script>
		<script src='js/ui.js?v=1.1'></script>
		<script src='js/main.js?v=1.1'></script>

	</head>

	<body>

		<div class='container'>

			<div id="map">
				<p class='msg-box noselect'></p>
				<div class='palette'>
					<div id='blue' class='tile'></div>
					<div id='red' class='tile'></div>
					<div id='green' class='tile'></div>
					<div id='yellow' class='tile'></div>
				</div>
			</div>	

			<div class='buttons'>
				<button class='btn change_color_btn'>Change Marker Color</button>
				<button class='btn draw_rect_btn'>Select Box</button>
				<button class='btn upload_btn'>Upload Geojson File</button>

				<form id='upload_form' class='upload_form' enctype="multipart/form-data" action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]); ?>" method="post">
					<input class='choose_file' type="file" name="jsonupload" id="fileupload">
					<input class='submit_file' class="upload-video-form-input" type="hidden" name="form_submitted" value="yes" />
					<input type="submit" value="submit" />
				</form>
			</div>

		</div>

	</body>

</html>