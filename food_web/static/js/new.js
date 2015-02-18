/**
 * Created by danielgin on 2/16/15.
 */
var map;
var service;
var infowindow;

var restaurantMapper = {

    initialize: function(lat, lng) {
        var deferred = $.Deferred();
        var currentLocation = new google.maps.LatLng(lat,lng);

        map = new google.maps.Map(document.getElementById('map'), {
            center: currentLocation,
            zoom: 15
        });

    var request = {
        location: currentLocation,
        //Change radius depending on where you are!
        radius: '500',
        types: ['food','restaurant'],
        rankby: 'distance'
      };

    service = new google.maps.places.PlacesService(map);
    service.nearbySearch(request, restaurantMapper.callback);
    return deferred.promise();
    },

    callback: function(results, status) {
        console.log(status);
        if (status == google.maps.places.PlacesServiceStatus.OK) {
            randomIndex = Math.round(Math.random() * results.length);
            console.log(results[randomIndex]);
            place = results[randomIndex];
            coords = [place.geometry.location.k,place.geometry.location.D];
            $('#food_info').html(
                '<p>' + place.name + '</p>' +
                '<p>' + place.vicinity + '</p>' +
                '<p>' +coords[0]+','+coords[1]+'</p>'
            );

            //return place;
        }

    }
};


var geoLocation = {
    getLocation: function() {
        var deferred = $.Deferred();
        // if geo location is supported
        if(navigator.geolocation) {
            // get current position and pass the results to getPostalCode or time out after 5 seconds if it fails
            navigator.geolocation.getCurrentPosition(deferred.resolve, this.geoLocationError, {
                timeout: 10000
            });
        } else {
            //geo location isn't supported
            console.log('Your browser does not support Geo Location.');
        }
        return deferred.promise();
    },
    geoLocationError: function() {
        console.log('Geo Location failed.');
    }
};


var findRandomRestaurant = function() {

    var chained = geoLocation.getLocation().then(function (data) {
        console.log(data.coords.longitude, data.coords.latitude);
    //
    //    return data;
    //}).then(function(data){
        var restaurant = restaurantMapper.initialize(data.coords.latitude, data.coords.longitude);
        //console.log(restaurant);
        //return [place.geometry.location.k,place.geometry.location.D];
        return restaurant;
    }).then(function(data){
        console.log(1, data);
    })

};

//var newRest = function() {
//    var chained = geoLocation.getLocation().then(function(data){
//        return data;
//
//        var newChained = new Promise(
//            function(resolve, reject) {
//
//            }
//        );
//    })
//}

var mapDirections = $.when(restaurantMapper.initialize);


$(document).ready(function() {
    console.log("hello");
    findRandomRestaurant();
    //console.log(get_location());

    //setTimeout(function() { initialize(y[0],y[1]); }, 4000);
    //setTimeout(function() {
    //    $('#food_info').html(place.name);
    //}, 8000);
});



/*
function get_location() {
    navigator.geolocation.getCurrentPosition(show_map, handle_error);
}

function show_map(position) {
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;
    lat = latitude;
    long = longitude;
    y = [lat, long];
    //return [lat, long];
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
*/
//var map;
//var service;
//var infowindow;
//function initialize(lat, lng) {
//  var currentLocation = new google.maps.LatLng(lat,lng);
//
//  map = new google.maps.Map(document.getElementById('map'), {
//      center: currentLocation,
//      zoom: 15
//    });
//
//  var request = {
//    location: currentLocation,
//    radius: '100',
//    types: ['food','restaurant'],
//    rankby: 'distance'
//  };
//
//  service = new google.maps.places.PlacesService(map);
//  service.nearbySearch(request, callback);
//}

//function callback(results, status) {
//  if (status == google.maps.places.PlacesServiceStatus.OK) {
//      randomIndex = Math.round(Math.random() * results.length);
//      console.log(randomIndex)
//      //for (var i = 0; i < Math.min(results.length, 20); i++) {
//      console.log(results[randomIndex]);
//      place = results[randomIndex];
//      //var place = results[i];
//      //createMarker(results[i]);
//  //}
//  //  console.log(results[0])
//  }
//}
