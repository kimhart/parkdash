angular.module('ParksApp').controller('ParksController', ParksController);

ParksController.$inject = ['$http'];


function ParksController($http) {
  
  var parks = this;

  parks.all = [];

  parks.selected = {};

  parks.fetch = function(){
    console.log('fetching...');
    $http
      .get('/api/parks')
      .then(function(response){
        console.log(response);
        parks.all = response.data;
      })
  };

  parks.show = function(park){
    parks.selected = park;
    console.log(park);
    // show info for this park;
    // or change location
  };


  parks.fetch();

};




