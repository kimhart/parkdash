angular.module('ParksApp').factory('ParksFactory', ['$http', function($http) {
  var parksFactory = {};

  parksFactory.getParksData = function(parkName) {
    return $http.get('/parks');
  }



  return parksFactory;
}]);