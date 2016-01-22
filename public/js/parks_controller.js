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
  };

  // parks.getMap = function(park){
  //   var mapDiv = document.getElementById('map');
  //   var parkLat = parks.selected.latitude;
  //   var parkLng = parks.selected.longitude;
  //   var map = new google.maps.Map(mapDiv, 
  //     {center: 
  //           lat: parkLat, 
  //           lng: parkLng
  //       },
  //       zoom: 8,
  //     tilt: false
  //   });

  parks.select = function(park){
    parks.selected = park;
  }
  
  parks.isSelected = function(){
    return parks.selected != undefined;
  }



  parks.fetch();

};




