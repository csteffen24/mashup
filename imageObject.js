/*
	This object handles each instagram image
*/

var ImageObject = function(image) {
	this.location = image.location;
	this.imageInfo = {
		images: image.images,
		link: image.link,
		caption: image.caption,
		user: image.user
	};
};

ImageObject.prototype.imageLocatedInCity = function() {
	var location = this.location;

	var latitudeInNYC = APP.city.lat.min < location.latitude < APP.city.lat.max;
	var longitudeInNYC = APP.city.long.min < location.longitude && location.longitude < APP.city.long.max;
	return latitudeInNYC && longitudeInNYC;
};