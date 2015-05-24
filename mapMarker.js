/*
	This object handles each marker on the google map. Each has a location, a category 
	and an array of images taken at that location.
*/
var MapMarker = function(imageObject) {
	var location = imageObject.location;
	this.lat = location.latitude;
	this.long = location.longitude;
	this.name = location.name;

	this.imageObject = imageObject;
	this.googleMarker = new google.maps.Marker({
		position: new google.maps.LatLng(this.lat, this.long),
		title: this.name
	});
	google.maps.event.addListener(this.googleMarker, 'click', this.displayImageModal.bind(this));

	this.imagesArray = [imageObject.imageInfo];
};

MapMarker.prototype.addImage = function(image) {
	this.imagesArray.push(image.imageInfo);
};

MapMarker.prototype.displayMarker = function(map) {
	if (this.imageObject.imageLocatedInCity()) {
		// this.setCategoryMarker(map);
		this.googleMarker.setMap(map);
		this.googleMarker.setAnimation(google.maps.Animation.DROP);
	}
};

MapMarker.prototype.displayImageModal = function() {
	var swipeboxObj = $.map(this.imagesArray, function(image) {
		return {
			href: image.images.standard_resolution.url,
			title: image.caption.text
		};
	});

	$.swipebox(swipeboxObj);
};

MapMarker.prototype.setCategoryMarker = function(map) {
	var location = { lat: this.lat, long: this.long, name: this.name };
	var category = new FoursquareCategories(location);
	var icon = category.getIcon(category.getCategory);
	this.googleMarker.setIcon(icon);
};

