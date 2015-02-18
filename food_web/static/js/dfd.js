/**
 * Created by danielgin on 2/16/15.
 */

var map;
var service;
var infowindow;

var restaurantMapper = {

    initialize: function(lat, lng) {
        //var deferred = $.Deferred();
        currentLat = lat;
        currentLong = lng;
        var currentLocation = new google.maps.LatLng(lat,lng);

        map = new google.maps.Map(document.getElementById('map'), {
            // Required
            center: currentLocation,
            zoom: 15,

            // Makes map non-interactive(so it doesnt get messed up by fat fingers)
            disableDefaultUI: false,
            scrollwheel: false,
            draggable: false,
            // Styles Google map so that it looks good
            styles: [{"featureType":"administrative","elementType":"all","stylers":[{"visibility":"on"},{"lightness":33}]},{"featureType":"landscape","elementType":"all","stylers":[{"color":"#f2e5d4"}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#c5dac6"}]},{"featureType":"poi.park","elementType":"labels","stylers":[{"visibility":"on"},{"lightness":20}]},{"featureType":"road","elementType":"all","stylers":[{"lightness":20}]},{"featureType":"road.highway","elementType":"geometry","stylers":[{"color":"#c5c6c6"}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#e4d7c6"}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#fbfaf7"}]},{"featureType":"water","elementType":"all","stylers":[{"visibility":"on"},{"color":"#acbcc9"}]}],

        });

        var firstIcon = '../static/img/person.png';
        //Places map marker at your current location
        var beachMarker = new google.maps.Marker({
            position: currentLocation,
            map: map,
            title: "You",
            icon: firstIcon
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
    //return deferred.promise();
    },

    callback: function(results, status) {
        //console.log(status);
        if (status == google.maps.places.PlacesServiceStatus.OK) {
            var foundGoodPlace = null;
            var unwantedTypes = ['grocery_or_supermarket', 'bar', 'gas_station','convenience_store'];
            //while (foundGoodPlace !== true) {
                console.log(results);
                randomIndex = Math.ceil(Math.random() * results.length-1);
                //console.log(randomIndex);
                //console.log(results.length);
                place = results[randomIndex];
                //console.log(place);

                //for (var i = 0; i < place.types.length; i++) {
                //    for (var i = 0; i< unwantedTypes.length; i++) {
                //        if (place.types[i] === unwantedTypes[i]) {
                //            foundGoodPlace = false;
                //            break;
                //        }
                //    }
                //}
                //if (foundGoodPlace !== false) {
                //    foundGoodPlace = true;
                //}

            //}

            coords = [place.geometry.location.k,place.geometry.location.D];
            $('#food_info').html(
                '<p style="font-weight:bold;color:#C0821F">' + place.name + '</p>' +
                '<p>' + place.vicinity + '</p>' +
                '<p>' +coords[0]+','+coords[1]+'</p>'
            );

            //console.log("Finished foodieness");
            // Callback to function directionsFinder.calcRoute
            directionsFinder.calcRoute(coords[0], coords[1]);
            //return place;
        }

    }
};
var directionsDisplay;
var directionsService = new google.maps.DirectionsService();
var directionsFinder = {
    //initialize : function(lat, lng) {
    //    directionsDisplay = new google.maps.DirectionsRenderer();
    //    var mapOptions = {
    //        zoom: 7,
    //        center: new google.maps.LatLng(37.7933, -122.39945),
    //        styles: [{"featureType":"administrative","elementType":"all","stylers":[{"visibility":"on"},{"lightness":33}]},{"featureType":"landscape","elementType":"all","stylers":[{"color":"#f2e5d4"}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#c5dac6"}]},{"featureType":"poi.park","elementType":"labels","stylers":[{"visibility":"on"},{"lightness":20}]},{"featureType":"road","elementType":"all","stylers":[{"lightness":20}]},{"featureType":"road.highway","elementType":"geometry","stylers":[{"color":"#c5c6c6"}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#e4d7c6"}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#fbfaf7"}]},{"featureType":"water","elementType":"all","stylers":[{"visibility":"on"},{"color":"#acbcc9"}]}]
    //    };
    //    var map = new google.maps.Map(document.getElementById('map',mapOptions));
    //    directionsDisplay.setMap(map);
    //    directionsDisplay.setPanel(document.getElementById('directions'));
    //
    //},

    calcRoute: function(lat, lng) {
        //var start = document.getElementById('start').value;
        //var end = document.getElementByid('end').value;
        //console.log("Reached the directions service.");
        //console.log(currentLat);
        //console.log(currentLong);

        //Defines inputs
        var userLocation = new google.maps.LatLng(currentLat,currentLong);
        var restaurantLocation = new google.maps.LatLng(lat,lng);

        // Adds a map marker for restaurant location
        var end_marker = '../static/img/restaurant.png';
        var restMarker = new google.maps.Marker({
            position: restaurantLocation,
            map: map,
            animation: google.maps.Animation.DROP,
            icon: end_marker,
            title: "Food"
        });

        // Finds directions using the given inputs
        var request = {
            origin: userLocation,
            destination: restaurantLocation,
            travelMode: google.maps.TravelMode.WALKING
        };
        directionsService.route(request, function(response, status){
            if (status == google.maps.DirectionsStatus.OK) {
                //console.log(response);
                // Pulling directions from json response
                //console.log(response.routes[0].legs[0].steps);
                $.each(response.routes[0].legs[0].steps, function(step, direction) {
                    //console.log(direction.instructions);
                    $('#someDirections').append('<p id="aDirection" class="step">'+direction.instructions+'</p>');
                });
                //$("#aDirection").first().css("color", "#204d74");
                $("#aDirection").first().html("");

                cleanupCSS();

            //    $('#directions').html(
            //    '<p>' + place.name + '</p>' +
            //    '<p>' + place.vicinity + '</p>' +
            //    '<p>' +coords[0]+','+coords[1]+'</p>'
            //);
                //directionsDisplay.setDirections(response);
            }
        });
    }
};

function cleanupCSS() {
    //$('.step').last().css("font-size", "20px");
    $('.step:odd').css({
        //"background-color" : "#a94442",
        "background-color" : "#C0821F",
        "color": "#000"
    });
    //console.log("Done.");
}


function test(data) {
    //console.log("Workr");
    //console.log(data);
    //console.log(data.coords.latitude, data.coords.longitude);

    // Callback to function restaurantMapper.initialize
    restaurantMapper.initialize(data.coords.latitude, data.coords.longitude);
}

function c1() {
    // Callback to function test
    navigator.geolocation.getCurrentPosition(test)
}

function resetDirections() {
    $('#someDirections').html("");
}

c1();
//google.maps.event.addDomListener(window, 'load', directionsFinder.initialize(1,2));