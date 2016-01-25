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

  parks.getWeather = function(){
    $.ajax({
    url : "http://api.wunderground.com/api/f7c25337aea3b20c/geolookup/conditions/q/"+parks.selected.zip+".json",
    dataType : "jsonp",
    success : function(parsed_json) {
      var temp_f = parsed_json['current_observation']['temp_f'];
      var weather = parsed_json['current_observation']['weather'];
      var wind = parsed_json['current_observation']['wind_mph'];
      var iconUrl = parsed_json['current_observation']['icon_url'];
      var icon = parsed_json['current_observation']['icon'];
      var feelsLikeTempF = parsed_json['current_observation']['feelslike_f'];
      var forecastLink = parsed_json['current_observation']['forecast_url'];

      var $currentTempDiv = $('.actual-temp').html(temp_f + '&#176 F');
      var $feelsLikeDiv = $('.feels-like').html('Feels like: ' + feelsLikeTempF + '&#176 F');
      var $iconDiv = $('#weather-icon').html("<img class='icon' src='" + iconUrl + "' alt='" + icon + "'>");
      var $conditionDiv = $('#weather-condition').html("<p>" + weather + "</p>");
      var $windDiv = $('.wind').html('<p> Wind: ' + wind + ' mph </p>');
      var $forecastDiv = $('#10forecast').html('<a href="' + forecastLink + '" target="_blank" class="forecast-link">View 10-Day Forecast</a>')
      }
    });
  }

  parks.switchToC = function(){
    $.ajax({
    url : "http://api.wunderground.com/api/f7c25337aea3b20c/geolookup/conditions/q/"+parks.selected.zip+".json",
    dataType : "jsonp",
    success : function(parsed_json) {
      var temp_c = parsed_json['current_observation']['temp_c'];
      var feelsLikeTempC = parsed_json['current_observation']['feelslike_c'];
      var $currentTempDiv = $('.actual-temp').html(temp_c + '&#176 C');
      var $feelsLikeDiv = $('.feels-like').html('Feels like: ' + feelsLikeTempC + '&#176 C');
      }
    });
  };
    
  parks.switchToC2 = function(){
    $.ajax({
    url : "http://api.wunderground.com/api/f7c25337aea3b20c/geolookup/forecast/q/"+parks.selected.zip+".json",
    dataType : "jsonp",
    success : function(parsed_json) {
      var today = parsed_json.forecast.simpleforecast.forecastday[0];
      var high_c = today.high.celsius;
      var low_c = today.low.celsius;
      var $highLowDiv = $('#high').html('H: ' + high_c + '&#176 C / L: ' + low_c + '&#176 C');
      }
    });
  };

   parks.switchToF = function(){
    $.ajax({
    url : "http://api.wunderground.com/api/f7c25337aea3b20c/geolookup/conditions/q/"+parks.selected.zip+".json",
    dataType : "jsonp",
    success : function(parsed_json) {
      var temp_f = parsed_json['current_observation']['temp_f'];
      var feelsLikeTempF = parsed_json['current_observation']['feelslike_f'];
      var $currentTempDiv = $('.actual-temp').html(temp_f + '&#176 F');
      var $feelsLikeDiv = $('.feels-like').html('Feels like: ' + feelsLikeTempF + '&#176 F');
      }
    });
  };
    
  parks.switchToF2 = function(){
    $.ajax({
    url : "http://api.wunderground.com/api/f7c25337aea3b20c/geolookup/forecast/q/"+parks.selected.zip+".json",
    dataType : "jsonp",
    success : function(parsed_json) {
      var today = parsed_json.forecast.simpleforecast.forecastday[0];
      var high_f = today.high.fahrenheit;
      var low_f = today.low.fahrenheit;
      var $highLowDiv = $('#high').html('H: ' + high_f + '&#176 C / L: ' + low_f + '&#176 C');
      }
    });
  };


  parks.getForecast = function(){
    $.ajax({
    url : "http://api.wunderground.com/api/f7c25337aea3b20c/geolookup/forecast/q/"+parks.selected.zip+".json",
    dataType : "jsonp",
    success : function(parsed_json) {
      var today = parsed_json.forecast.simpleforecast.forecastday[0];
      var weekday = today.date.weekday;
      var monthShort = today.date.monthname_short + ".";
      var date = today.date.day;
      var high_f = today.high.fahrenheit;
      var low_f = today.low.fahrenheit;
      var high_c = today.high.celsius;
      var low_c = today.low.celsius;

      var $dateDiv = $('#date').html('<h3>' + weekday + ', ' + monthShort + ' ' + date + '</h3>')
      var $highLowDiv = $('#high').html('H: ' + high_f + '&#176 F / L: ' + low_f + '&#176 F');
      }
    });
  }



  parks.showInsta = function(event){
    if(parks.selected.name === 'YOSEMITE'){
      var $instaDiv = $('#instagram-div');
      var $instaHashtag = $('#instagram-hashtag');
      $instaHashtag.html('<iframe src="http://widget.websta.me/in/tag:yosemite/?r=1&w=2&h=3&b=1&bg=FFFFFF&p=5" allowtransparency="true" frameborder="0" scrolling="no" style="border:none;overflow:hidden;width:230px; height: 345px" ></iframe> <!-- websta - websta.me -->');
    } else if(parks.selected.name === 'BRYCE CANYON'){
      var $instaDiv = $('#instagram-div');
      var $instaHashtag = $('#instagram-hashtag');
      $instaHashtag.html('<img class="instalogo" src="http://cdn.scahw.com.au/cdn-1cfbb585c92bb70/imagevaultfiles/id_304949/cf_3/instagram-text-logo.png"><br><br><strong>#brycecanyon</strong>');
      $instaDiv.html('<iframe src="http://widget.websta.me/in/tag:brycecanyon/?r=1&w=2&h=3&b=1&bg=FFFFFF&p=5" allowtransparency="true" frameborder="0" scrolling="no" style="border:none;overflow:hidden;width:230px; height: 345px" ></iframe> <!-- websta - websta.me -->');
    } else if(parks.selected.name === 'DEATH VALLEY'){
      var $instaDiv = $('#instagram-div');
      var $instaHashtag = $('#instagram-hashtag');
      $instaHashtag.html('<img class="instalogo" src="http://cdn.scahw.com.au/cdn-1cfbb585c92bb70/imagevaultfiles/id_304949/cf_3/instagram-text-logo.png"><br><br><strong>#deathvalley</strong>');
      $instaDiv.html('<iframe src="http://widget.websta.me/in/tag:deathvalley/?r=1&w=2&h=3&b=1&bg=FFFFFF&p=5" allowtransparency="true" frameborder="0" scrolling="no" style="border:none;overflow:hidden;width:230px; height: 345px" ></iframe> <!-- websta - websta.me -->');
    } else if(parks.selected.name === 'JOSHUA TREE'){
      var $instaDiv = $('#instagram-div');
      var $instaHashtag = $('#instagram-hashtag');
      $instaHashtag.html('<img class="instalogo" src="http://cdn.scahw.com.au/cdn-1cfbb585c92bb70/imagevaultfiles/id_304949/cf_3/instagram-text-logo.png"><br><br><strong>#joshuatree</strong>');
      $instaDiv.html('<iframe src="http://widget.websta.me/in/tag:joshuatree/?r=1&w=2&h=3&b=1&bg=FFFFFF&p=5" allowtransparency="true" frameborder="0" scrolling="no" style="border:none;overflow:hidden;width:230px; height: 345px" ></iframe> <!-- websta - websta.me -->');
    } else if(parks.selected.name === 'REDWOOD'){
      var $instaDiv = $('#instagram-div');
      var $instaHashtag = $('#instagram-hashtag');
      $instaHashtag.html('<img class="instalogo" src="http://cdn.scahw.com.au/cdn-1cfbb585c92bb70/imagevaultfiles/id_304949/cf_3/instagram-text-logo.png"><br><br><strong>#redwoodNP</strong>');
      $instaDiv.html('<iframe src="http://widget.websta.me/in/tag:redwoodNP/?r=1&w=2&h=3&b=1&bg=FFFFFF&p=5" allowtransparency="true" frameborder="0" scrolling="no" style="border:none;overflow:hidden;width:230px; height: 345px" ></iframe> <!-- websta - websta.me -->');
    } else if (parks.selected.name === 'SEQUOIA AND KINGS CANYON'){
      var $instaDiv = $('#instagram-div');
      var $instaHashtag = $('#instagram-hashtag');
      $instaHashtag.html('<img class="instalogo" src="http://cdn.scahw.com.au/cdn-1cfbb585c92bb70/imagevaultfiles/id_304949/cf_3/instagram-text-logo.png"><br><br><strong>#sequoiakingscanyon</strong>');
      $instaDiv.html('<iframe src="http://widget.websta.me/in/tag:sequoiakingscanyon/?r=1&w=2&h=3&b=1&bg=FFFFFF&p=5" allowtransparency="true" frameborder="0" scrolling="no" style="border:none;overflow:hidden;width:230px; height: 345px" ></iframe> <!-- websta - websta.me -->');
    } else {
      $instaHashtag.html('Recent Photos #'+parks.selected.name+"'")
      $instaDiv.html('No posts right now — check back later!')
  };
};



  parks.fetch();


};





