function UI(map){

	this.mapObj = map;
	this.change_color_btn_state = false;
	this.draw_rect_btn_state = false;
	this.editableLayers;
	this.selectedMarkerData = [];

	this.initButtons = function(){
		initChangeColorButton();
		initLassoButton();
		initUploadButton();
	}

	function removeColorPalette(){
		$('.palette').css('display', 'none');
		$('.msg-box').html("").css('opacity', 0);
		$('.leaflet-marker-pane img').removeClass('marker-selected').off();
		this.change_color_btn_state = false;
	}
	
	function isMarkerInsideRect(marker, rect) {
	    var rectPoints = rect.getLatLngs()[0];       
	    var x = marker.geometry.coordinates[0], y = marker.geometry.coordinates[1];

	    var inside = false;
	    for (var i = 0, j = rectPoints.length - 1; i < rectPoints.length; j = i++) {
	        var x1 = rectPoints[i].lat, y1 = rectPoints[i].lng;
	        var x2 = rectPoints[j].lat, y2 = rectPoints[j].lng;

	        var intersect = ((y1 > y) != (y2 > y))
	            && (x < (x2 - x1) * (y - y1) / (y2 - y1) + 1);
	        if (intersect) inside = !inside;
	    }

	    return inside;
	};

	function getMarkersFromLayer(map) {
	  	var features = [];
	 	map.eachLayer( function(layer) {
		    if(layer instanceof L.Marker) {
			    if(map.getBounds().contains(layer.getLatLng())) {
			    	features.push(layer.feature);
			    }
		    }
	  	});
	  	return features;
	}

	function checkCoordinates(rect, p1, p2){
		var markerData = [];
		var markers = getMarkersFromLayer(map);
		$.each(markers, function(index, item){
			if(isMarkerInsideRect(item, rect)){
				markerData.push(item.properties);
			}
		});
		this.selectedMarkerData = markerData;

	}

	function initChangeColorButton(){
		this.draw_rect_btn_state = false;
		this.change_color_btn_state = false;
		$('.change_color_btn').on('click', function(){
			if(!this.change_color_btn_state){ //if palette is not currently visible
				//display palette
				$('.palette').css('display', 'block');
				$('.msg-box').html('Click on the marker you wish to change then click on a color from the palette below');
				$('.msg-box').animate({opacity: 1}, 250, function(){});
				//select marker
				$('.leaflet-marker-pane img').on('click', function(){
					var $this = $(this);
					$('.leaflet-marker-pane img').removeClass('marker-selected');
					$(this).addClass('marker-selected');
				});
				this.change_color_btn_state = true;
			}else{ //palette is visible, remove it
				//hide palette
				$('.palette').css('display', 'none');
				$('.msg-box').animate({opacity: 0}, 250, function(){$('.msg-box').html('');});
				$('.leaflet-marker-pane img').removeClass('marker-selected').off();
				//this.initShowMarkerInfo(); //reinstate default marker click 
				this.change_color_btn_state = false;
			}
		});

		$('.tile').on('click', function(){
			var color = $(this).attr('id');
			$('.marker-selected').attr('src', 'lib/leaflet/images/marker-icon-'+color+'.png');
		});
	}

	function initLassoButton(){	
		var cc = this.checkCoordinates;
		var editableLayers = new L.FeatureGroup();

		this.draw_rect_btn_state = false;
		this.change_color_btn_state = false;
		//class variable closure test

		$('.draw_rect_btn').on('click', function(){
			removeColorPalette();
			if(!this.draw_rect_btn_state){ //very similar to above, could combine events
				map.dragging.disable();

				$('.leaflet-container').addClass('selection-cursor');
				$('.msg-box').html('Click and drag an area to select one or more markers');
				$('.msg-box').animate({opacity: 1}, 250, function(){});

				var corner1, corner2;
				map.on('mousedown', function(e){
					console.log(e.latlng.lat + ", " + e.latlng.lng);
					corner1 = e.latlng;
				});
				map.on('mouseup', function(e){
					console.log(e.latlng.lat + ", " + e.latlng.lng);
					corner2 = e.latlng;

					var bounds = [corner1, corner2];
					map.addLayer(editableLayers);
    				var rect = L.rectangle(bounds, {color:"red", weight:1});
    				rect.addTo(map);
    				checkCoordinates(rect, corner1, corner2);
				});
				this.draw_rect_btn_state = true;

			}else{
				map.dragging.enable();
				map.removeLayer(editableLayers);
				editableLayers = null;
				$('.leaflet-container').removeClass('selection-cursor');
				$('.msg-box').animate({opacity: 0}, 250, function(){});
				this.draw_rect_btn_state = false;
				map.off();
				//map.removeLayer(this.editableLayers);
			}
		});
	}

	function initUploadButton(){

		$('.upload_btn').on('click', function(){
			$('.choose_file').trigger('click');
		});
		$(".choose_file").change(function (){
	       var fileName = $(this).val();
	       $('#upload_form').submit();
	    });

	}
}