angular
  .module('angular_weatherApp', [])

  .controller('GeolocationController', function ($http){
    var vm = this;

    navigator.geolocation.getCurrentPosition(function (geoposition) {
      var lat = geoposition.coords.latitude;
      var long = geoposition.coords.longitude;

      $http
      .get(`http://api.wunderground.com/api/7b7b50d6c7c89ebd/conditions/q/${lat},${long}.json`)
      .success(function (data) {
        vm.temp_f = data.current_observation.temp_f;
      });
    });
      $http
      .get(`http://api.wunderground.com/api/7b7b50d6c7c89ebd/conditions/q/ + zip + , function (data) {

};

  });





