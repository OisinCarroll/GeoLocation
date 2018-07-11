<!doctype html>

<html lang="en">

	<head>

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

				<form class='upload_form' enctype="multipart/form-data" action="" method="POST">
					<input class='choose_file' type="file" name="file" id="file">
					<input class='submit_file' class="upload-video-form-input" type="hidden" name="form_submitted" value="yes" />
					<input type="submit" value="submit" />
				</form>
			</div>

		</div>

	</body>

</html>