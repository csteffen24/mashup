/*
	This object handles the map coming from the Google Maps API

*/
var GoogleMap = function() {
	var midLat = (APP.city.lat.min + APP.city.lat.max) / 2;
	var midLong = (APP.city.long.min + APP.city.long.max) / 2;

	// var nycLatLong = new google.maps.LatLng(40.7435776, -73.98629);
	this.mapOptions = {
		zoom: 13,
		center: new google.maps.LatLng(midLat, midLong)
	};

	this.map = null;
	this.markers = [];
};

GoogleMap.prototype.initialize = function() {
	this.map = new google.maps.Map(document.getElementById('map-canvas'), this.mapOptions);
	this.setStyle();
};

GoogleMap.prototype.plotLocations = function(imageObjects) {
	$.each(imageObjects, function(i, imageObject) {
		var lat = imageObject.location.latitude;
		var long = imageObject.location.longitude;
		var latLong = new google.maps.LatLng(lat, long);

		var existingMarker = this.checkForExistingMarker(latLong);
		if (!existingMarker) {
			var marker = new MapMarker(imageObject);
			this.markers.push(marker);
		} else {
			existingMarker.addImage(imageObject);
		}
	}.bind(this));
};

GoogleMap.prototype.checkForExistingMarker = function(latLong) {
	var existingMarker = null;

	$.each(this.markers, function(i, marker) {
		if (marker.googleMarker.getPosition().equals(latLong)) {
			existingMarker = marker;
			return;
		}
	});

	return existingMarker;
};

GoogleMap.prototype.displayMarkers = function() {
	var map = this.map;
	$.each(this.markers, function(i, marker) {
		marker.displayMarker(map);
	});
};

GoogleMap.prototype.setStyle = function() {
	var style = [
		{
			"featureType": "water",
			"elementType": "geometry",
			"stylers": [
				{
					"color": "#a0d6d1"
				},
				{
					"lightness": 17
				}
			]
		},
		{
			"featureType": "landscape",
			"elementType": "geometry",
			"stylers": [
				{
					"color": "#ffffff"
				},
				{
					"lightness": 20
				}
			]
		},
		{
			"featureType": "road.highway",
			"elementType": "geometry.fill",
			"stylers": [
				{
					"color": "#dedede"
				},
				{
					"lightness": 17
				}
			]
		},
		{
			"featureType": "road.highway",
			"elementType": "geometry.stroke",
			"stylers": [
				{
					"color": "#dedede"
				},
				{
					"lightness": 29
				},
				{
					"weight": 0.2
				}
			]
		},
		{
			"featureType": "road.arterial",
			"elementType": "geometry",
			"stylers": [
				{
					"color": "#dedede"
				},
				{
					"lightness": 18
				}
			]
		},
		{
			"featureType": "road.local",
			"elementType": "geometry",
			"stylers": [
				{
					"color": "#ffffff"
				},
				{
					"lightness": 16
				}
			]
		},
		{
			"featureType": "poi",
			"elementType": "geometry",
			"stylers": [
				{
					"color": "#f1f1f1"
				},
				{
					"lightness": 21
				}
			]
		},
		{
			"elementType": "labels.text.stroke",
			"stylers": [
				{
					"visibility": "on"
				},
				{
					"color": "#ffffff"
				},
				{
					"lightness": 16
				}
			]
		},
		{
			"elementType": "labels.text.fill",
			"stylers": [
				{
					"saturation": 36
				},
				{
					"color": "#333333"
				},
				{
					"lightness": 40
				}
			]
		},
		{
			"elementType": "labels.icon",
			"stylers": [
				{
					"visibility": "off"
				}
			]
		},
		{
			"featureType": "transit",
			"elementType": "geometry",
			"stylers": [
				{
					"color": "#f2f2f2"
				},
				{
					"lightness": 19
				}
			]
		},
		{
			"featureType": "administrative",
			"elementType": "geometry.fill",
			"stylers": [
				{
					"color": "#fefefe"
				},
				{
					"lightness": 20
				}
			]
		},
		{
			"featureType": "administrative",
			"elementType": "geometry.stroke",
			"stylers": [
				{
					"color": "#fefefe"
				},
				{
					"lightness": 17
				},
				{
					"weight": 1.2
				}
			]
		}
	];
	this.map.setOptions({styles: style});
};