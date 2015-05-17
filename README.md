# Mashup project

CityStalker pulls in geotagged photos from your Instagram feed to show you interesting places in your city that
your friends have recently visited.

It uses the Instagram API to grab your feed (right now it's MY feed until I can get authentication working locally) and
displays photos using the Google Maps API. If you hover over a map marker, you can see the name of a location - and if you
click, you can see the photo(s) taken at that location.

It also has the functionality to categorize locations using FourSquare's API. If there is a very close matching location
(by name and lat/long coordinates), it will pull in the category and display the appropriate icon on the map marker. For now,
most of the functionality is there, but the list of category and IDs and their associated icons is not completed, so this
feature is turned off.