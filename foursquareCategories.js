/*
	This object handles retreiving the foursquare venue cateogory for a given location. It also
	assigns an icon image to the google map marker based off of the category of the location.
*/
var FoursquareCategories = function(location) {
	this.lat = location.lat;
	this.long = location.long;
	this.name = location.name;

	this.secret = "3T3PSEZNZGCAQ53JPV0XVEGMTSAPM1OYVSL5PX4BLRT0VO4F";
	this.clientId = "CXGMUOWMT2C3MDE03HZYLH4L1NDIFIOQFTSVHWDTWKHUVSRM";
	this.baseUrl = "https://api.foursquare.com/v2/venues/";
	this.url = this.baseUrl +'search?ll=' + this.lat + ',' + this.long
     + ',&query=' + self.name + "&intent= match&client_id=" + this.clientId + 
     "&client_secret=" + this.secret + "&v=20140701";
	this.baseImgUrl = APP.baseUrl + "vendor/";
	this.listUrl = this.baseUrl + "/categories";

	this.categoryId = "";
	this.categoryName = "";
	this.categoryImg = "";

	this.getCategory();
};

FoursquareCategories.prototype.getCategory = function() {
	var self = this;

	$.ajax({
		url: self.url,
		dataType: 'jsonp',
		success: function(result){
			if (result.response.venues.length) {
				var category = result.response.venues[0].categories[0];
				self.categoryId = category.id;
				self.categoryName = category.name;
			} else {
				self.categoryId = null;
				self.categoryName = "other";
			}
		},
		error: function(){
			console.log("error");
			self.categoryId = null;
			self.categoryName = "other";
		}
	});
};

FoursquareCategories.prototype.getIcon = function(categoryId) {
	var imgName;

	if (!categoryId) {
		imgName = "other";
	} else {
		imgName = this.categories.categoryId.imgName;
	}
	return this.baseImgUrl + imgName;
};

FoursquareCategories.prototype.categories = {
	// ADD OBJECT OF FOURSQUARE CATEGORIES - IDS, NAME, IMAGENAME
	/* 
		"44444": {
		 	"name": "Professional & Other Places",
		 	"imgName": "other.svg"
		}
	*/
};