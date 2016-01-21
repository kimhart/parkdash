angular.module('ParksApp').controller('ParksController', ParksController);

ParksController.$inject = ['$http', '$scope'];

// ParksController.$inject = ['$scope'];

function ParksController($http, $scope) {

  console.log('$SCOPE ', $scope);
  
  var parks = this;

  parks.all = [];

  parks.fetch = function(){
    $http
      .get('/parks')
      .then(function(response){
        parks.all = response.data;
        console.log(parks.all[0].name)
      })
    };

  parks.fetch();

};




