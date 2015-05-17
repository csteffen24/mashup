/*
	This is the base app (globally defined as APP) to handle CityStalker
*/

var InstaApp = function() {
	this.imagesArray = new ImagesArray();
	this.map;
	this.baseUrl = "/Users/csteffen/advanced-js/instagram/";

	this.city = {
		name: "New York",
		lat: {
			min: 40.495992,
			max: 40.915568,
		},
		long: {
			min: -74.257159,
			max: -73.699215
		}
	};
};

InstaApp.prototype.initListeners = function() {
	// WHY NOT THIS.$("SEARCH") ??
	this.map = new GoogleMap();
	// EVENTUALLY ADD IN SEARCH CITY
	$("#search").click(function() {
		$(".loader").show();
		this.imagesArray.fetchFeed(this.imagesArray.url);
		this.map.initialize();
		$("h3").text(this.city.name);
	}.bind(this));
};

InstaApp.prototype.imgFetchingFinished = function() {
	this.map.plotLocations(this.imagesArray.imageObjects);
	$(".loader").hide();
	this.map.displayMarkers();
};
