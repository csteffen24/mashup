/*
  This array handles all of the images returned from a user's Instagram feed
  Only the images with named location tags are saved to the imageObjects array
*/

var ImagesArray = function() {
	this.imageObjects = [];

	this.instaToken = "42839160.2671010.57239e4234964f129f41422e58c51aa1";
	this.instaClientId = "267101077fa84a42b4ae46894edb044a";
	this.imageCountLimit = 50;
	this.url = "https://api.instagram.com/v1/users/self/feed?count=" + this.imageCountLimit
     + "&access_token=" + this.instaToken + "&client_id=" + this.instaClientId;
};

ImagesArray.prototype.fetchFeed = function(url) {
	var self = this;

	$.ajax({
		url: url,
		dataType: 'jsonp',
		success: function(result){
			var nextUrl = result.pagination.next_url;
			$.each(result.data, function(i, image){
				if (image.location) {
					self.addImageObject(image);
				}
			});
			if (nextUrl !== undefined) {
				self.fetchFeed(nextUrl);
			} else {
				APP.imgFetchingFinished();
			}
		}
	});
};

ImagesArray.prototype.addImageObject = function(image) {
	if (image.location.name) {
		this.imageObjects.push(new ImageObject(image));
	}
};
