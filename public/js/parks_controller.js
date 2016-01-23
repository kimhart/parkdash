angular.module('ParksApp').controller('ParksController', ParksController);

ParksController.$inject = ['$http'];


function ParksController($http) {
  
  var parks = this;

  parks.all = [];

  parks.selected = {};

  parks.fetch = function(){
    $http
      .get('/api/parks')
      .then(function(response){
        console.log(response);
        parks.all = response.data;
      })
  };

  parks.show = function(park){
    parks.selected = park;
  };

  parks.select = function(park){
    parks.selected = park;
  }
  
  parks.isSelected = function(){
    return parks.selected != undefined;
  }

  var map;

  parks.initMap = function() {
    map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: parks.selected.latitude , lng: parks.selected.longitude},
    zoom: 8
    });
  };


  parks.fetch();


};





