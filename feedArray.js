var FeedArray = function() {
	this.locationObjects = [];
	this.nextUrl = "https://api.instagram.com/v1/users/self/feed?count=100&access_token=42839160.2671010.57239e4234964f129f41422e58c51aa1&client_id=267101077fa84a42b4ae46894edb044a";
};

FeedArray.prototype.addLocationObject = function(image) {
	var location = image.location;

	if (location.name && this.locationIsInNYC(location)) {
		console.log("in here!");
		this.locationObjects.push(image);
	}
};

FeedArray.prototype.locationIsInNYC = function(location) {
	// MAKE THIS DYNAMIC
	var latitudeInNYC = 40.495992 < location.latitude < 40.915568;
	var longitudeInNYC = -74.257159 < location.longitude && location.longitude < -73.699215;
	return latitudeInNYC && longitudeInNYC;
};

FeedArray.prototype.fetchFeed = function() {
	var self = this;

	$.ajax({
		url: self.nextUrl,
		dataType: 'jsonp',
		success: function(result){
			self.nextUrl = result.pagination.next_url;
			$.each(result.data, function(i, image){
				if (image.location) {
					self.addLocationObject(image);
				}
			});
			if (self.nextUrl !== undefined) {
				self.fetchFeed();
			} else {
				APP.feedFinished();
			}
		}
	});
};