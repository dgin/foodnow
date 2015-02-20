var map;
var service;
var infowindow;

var restaurantMapper = {

    initialize: function(lat, lng) {
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
        types: ['restaurant', 'bakery', 'cafe'],
        rankby: 'PROMINENCE',
        openNow: 'true'
      };

    service = new google.maps.places.PlacesService(map);
    service.nearbySearch(request, restaurantMapper.callback);
    },

    callback: function(results, status) {

        if (status == google.maps.places.PlacesServiceStatus.OK) {
            //console.log(results);
            //var foundGoodPlace = null;
            //var unwantedTypes = ['grocery_or_supermarket', 'gas_station','convenience_store'];
            var rating = 0;
            //var price = 5;
            // Does not return poorly rated restaurants or highly priced ones
            // Will be changeable later
            while (rating < 3.5) {
            //    foundGoodPlace = null;
                randomIndex = Math.ceil(Math.random() * results.length-1);
                place = results[randomIndex];
                //console.log(place);
                rating = place.rating;
                //if (place.price) {
                //    price = place.price_level;
                //}
                //else {
                //    price = 0;
                //}
            //
            //    //dance:
            //
            //    for (var j = 0; j < place.types.length; j++) {
            //        if (foundGoodPlace !== true) {
            //            for (var i = 0; i< unwantedTypes.length; i++) {
            //                if (place.types[i] === unwantedTypes[i]) {
            //                    foundGoodPlace = false;
            //                    break;
            //                }
            //            }
            //        }
            //
            //    }
            //    if (foundGoodPlace !== false) {
            //        foundGoodPlace = true;
            //    }
            //
            }

            coords = [place.geometry.location.k,place.geometry.location.D];
            $('#food_info').html(
                '<p id="restaurant_name" name="' + place.name + '" style="font-weight:bold;color:#c0821f">' + place.name + '</p>' +
                '<p id="restaurant_address" name="' + place.vicinity + '">' + place.vicinity + '</p>' +
                //'<p>' +coords[0]+','+coords[1]+'</p>'
                '<p> Price level (out of four): ' + place.price_level + '</p>'
            );

            // Callback to function directionsFinder.calcRoute
            directionsFinder.calcRoute(coords[0], coords[1]);
        }

    }
};
//var directionsDisplay;
var directionsService = new google.maps.DirectionsService();
var directionsFinder = {

    // Initializes the directions render. Unnecessary and broken.
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

                // Pulling directions from json response
                $.each(response.routes[0].legs[0].steps, function(step, direction) {
                    $('#someDirections').append('<p id="aDirection" class="step">'+direction.instructions+'</p>');
                });
                $("#aDirection").first().html("");

                // Calls cleanup function
                cleanupCSS();

            }
        });
    }
};

function cleanupCSS() {
    //$('.step').last().css("font-size", "20px");
    $('.step:odd').css({
        "background-color" : "#C0821F",
        "color": "#000"
    });
}


function test(data) {
    // Callback to function restaurantMapper.initialize
    restaurantMapper.initialize(data.coords.latitude, data.coords.longitude);
}

function c1() {
    // Callback to function test
    navigator.geolocation.getCurrentPosition(test);
}

// Cleans up the HTML on a new roll
function resetDirections() {
    $('#someDirections').html("");
    $('#likehate_response').html("");
}

c1();
//google.maps.event.addDomListener(window, 'load', directionsFinder.initialize(1,2));

// Onclick event for like and hate button
$('#hate').click(function(){
    $.ajax({
        type: "POST",
        url: "/hate/",
        data: {
            'restaurant_name': $('#restaurant_name').attr('name'),
            'restaurant_address': $('#restaurant_address').attr('name')
            //'csrfmiddlewaretoken': 'csrf_token'
        },
        dataType: "json",
        success: function(response) {
            alert("Like made an ajax!");
        },
        error: function(response, error) {
            $('#likehate_response').html(response.responseText);
            //alert(response.responseText);
            //alert("Something went wrong with the voting process. Please try again.")
        }
    });
});

$('#like').click(function(){
    $.ajax({
        type: "POST",
        url: "/like/",
        data: {
            'restaurant_name': $('#restaurant_name').attr('name'),
            'restaurant_address': $('#restaurant_address').attr('name')
            //'csrfmiddlewaretoken': 'csrf_token'
        },
        dataType: "json",
        success: function(response) {
            alert("Like made an ajax!")
        },
        error: function(response, error) {
            $('#likehate_response').html(response.responseText);
            //alert("Something went wrong with the voting process. Please try again.")
        }
    });
});