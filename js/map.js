class Map {

	constructor(mapContainer){
		this.mapContainer = mapContainer;
		this.key = 'sk.eyJ1IjoiY2Fycm9sbG9pc2luIiwiYSI6ImNqamRjZDByNzA1NzUzcG1zaDNmaGwxYzYifQ.qh1_b6HPSikjWwRAj_GwyA';
		this.mainlayer;
		this.map;
		this.geojsonLayer;
		this.UI;
		this.markers;
	}

	init(){

		//preload icon crap
		var imgroot = "lib/leaflet/images/marker-icon-";
		$([imgroot+'red.png',imgroot+'green.png',imgroot+'blue.png', imgroot+'yellow.png']).preload();

		//basic layer
		this.map = L.map(this.mapContainer, {
	      'center': [53.3303, -6.2828],
	      'zoom': 11
	    });

		//tileset 
		this.mainlayer = L.tileLayer('https://{s}.tiles.mapbox.com/v4/{mapId}/{z}/{x}/{y}.png?access_token={token}', {
		    subdomains: ['a','b','c','d'],
		    mapId: 'mapbox.streets',
		    token: this.key
		});

		this.mainlayer.addTo(this.map);

		//geojson file
		this.geojsonLayer = new L.geoJSON.ajax("test.geojson", 
			{
				onEachFeature : function(feature, layer){
					var str = '';
					for (var key in feature.properties) {
					    if (Object.prototype.hasOwnProperty.call(feature.properties, key)) {
					    	var prop = key;
					        var val = feature.properties[key];

					        str = str + prop + " : " + val + '<br>';
					    }
					}
					//populate marker pop ups
					layer.bindPopup(str);
				}
			}
		).addTo(this.map);

		var ui = new UI(this.map);
		ui.initButtons();
	}

	logStuff(){
		console.log(this.map);
		console.log(this.mainlayer);
		console.log(this.geojsonLayer);
	}

}

//this.key = 'pk.eyJ1IjoiY2Fycm9sbG9pc2luIiwiYSI6ImNqamNzMzl4bjBnNTMza3AyYWd4cjBnMHUifQ.eI1Tkx4hCMaAQMt8RDHVuQ';