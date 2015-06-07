angular
  // .module('angular_weatherApp', [])
  // .controller('GeolocationController', function ($http){
    .module('angular_weatherApp', ['ngRoute'])
    .config(function ($routeProvider) {
      $routeProvider
        .when('/', {
          controller: 'GeolocationController',
          controllerAs: 'weather',
          templateUrl: 'views/current.html'
        })
        .when('/:zip', {
          controller: 'GeolocationController',
          controllerAs: 'weather',
          templateUrl: 'views/current.html'
        });
    })

    .controller('GeolocationController', function ($http, $routeParams) {
      var vm = this;

      navigator.geolocation.getCurrentPosition(function (geoposition) {
        var lat = geoposition.coords.latitude;
        var long = geoposition.coords.longitude;
      vm.zip = +$routeParams.zip;

      if (vm.zip) {
        $http
          .get(`http://api.wunderground.com/api/7b7b50d6c7c89ebd/conditions/q/${lat},${long}.json`)
          .get(`http://api.wunderground.com/api/7b7b50d6c7c89ebd/conditions/q/${vm.zip}.json`)
          .success(function (data) {
            vm.temp_f = data.current_observation.temp_f;
          });
      } else {
        navigator.geolocation.getCurrentPosition(function (geoposition) {
        var lat = geoposition.coords.latitude;
        var long = geoposition.coords.longitude;

         $http
          .get(`http://api.wunderground.com/api/7b7b50d6c7c89ebd/conditions/q/${lat},${long}.json`)
          .success(function (data) {
            vm.temp_f = data.current_observation.temp_f;
          });

      });
    }
      vm.zipLookup = function (){
        window.location = '/#/' + vm.zip;
      };
  });
});

