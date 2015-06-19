angular
  // .module('angular_weatherApp', [])
  // .controller('GeolocationController'
    //forecast10day/conditions/q/
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
      vm.zip = +$routeParams.zip;

      if (vm.zip) {
        $http
          .get(`http://api.wunderground.com/api/7b7b50d6c7c89ebd/forecast10day/conditions/q/${vm.zip}.json`)
          // .get(`)

          .success(function (data) {
            vm.temp_f = data.current_observation.temp_f;
            vm.tendayarray = data.forecast.simpleforecast.forecastday;
            vm.tendayarray = vm.tendayarray.slice(0, 3);
            console.log(vm.tendayarray);
          });
      } else {
        navigator.geolocation.getCurrentPosition(function (geoposition) {
        var lat = geoposition.coords.latitude;
        var long = geoposition.coords.longitude;

         $http
          .get(`http://api.wunderground.com/api/7b7b50d6c7c89ebd/conditions/q/${lat},${long}.json`)
          .success(function (data) {
            console.log(data);
            vm.temp_f = true;
            vm.geo_data = data.current_observation;
          });

      });
    }
      vm.zipLookup = function (){
        window.location = '/#/' + vm.zip;
      };
});

