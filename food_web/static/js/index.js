/**
 * Created by danielgin on 2/16/15.
 */
// Geolocation
function get_location() {
    navigator.geolocation.getCurrentPosition(show_map, handle_error);
}

function show_map(position) {
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;
    lat = latitude;
    long = longitude;

    return [lat, long];
}

function handle_error(err) {
    if (err.code == 1) {
        //User said no
        alert("This app won't work unless you tell it where you are!");
    }
    else {
        alert("Oops! Something went wrong. Please try again.");
    }
}

// Google Maps Places Library
var map;
var service;
var infowindow;

function initialize() {
  var rspace = new google.maps.LatLng(37.7916479,-122.40194989999999);

  map = new google.maps.Map(document.getElementById('map'), {
      center: rspace,
      zoom: 15
    });

  var request = {
    location: rspace,
    radius: '1000',
    types: ['food','restaurant']
  };

  service = new google.maps.places.PlacesService(map);
  service.nearbySearch(request, callback);
}

function callback(results, status) {
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
        //console.log(results[i]);
      //var place = results[i];
      //createMarker(results[i]);
    }
    console.log(results[0])
  }
}


// Runs our functions
$(document).ready(function() {
    var x = get_location();
    console.log(x);
    initialize();
});
