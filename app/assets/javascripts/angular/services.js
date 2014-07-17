'use strict';

/* Services */
myApp.factory('AppService', ['$resource', '$http',

  function($resource, $http){
    var HOST = 'http://0.0.0.0:3000/';
    var users = $resource(HOST+'users.json', {}, {
      get: {
        method:'GET',
        isArray: true
      }
    });

    return {
      getUsers: function(successCallback, errorCallback) {
        users.get(successCallback, errorCallback);
      }
    }
  }]);

myApp.factory('Categories', function(){
    var categories = [
        {'name':'Buy and Sell','link':''},
        {'name':'Services','link':''},
        {'name':'Cars & Vehicles','link':''},
        {'name':'Animals','link':''},
        {'name':'Vacation Rentals','link':''},
        {'name':'Real Estate','link':''},
        {'name':'Jobs','link':''},
        {'name':'Curriculum Vitae', 'link':''},
        {'name':'Meetings', 'link':''},
        {'name':'Free Stuff','link':''},
        {'name':'Exchange','link':''}
    ];
    //can read from json later or something using $http
    return categories;
})
.factory('Suggestions', function(){
    var suggestions = ['Remote control','Soda','Barbie doll','Watch','Purple pen','Computer','Laptop','Radio','Magic Wand','Toyota','Jeep','Television','Gardener','Fireman','Blah blah'];
    return suggestions;
})
.factory('Locations', function(){
    var locations = [
        {'name':'Grand Bahama'},
        {'name':'Berry Islands'},
        {'name':'Binimi Islands'},
        {'name':'Great Abaco'},
        {'name':'Little Abaco'},
        {'name':'Eleuthra'},
        {'name':'Andros'},
        {'name':'New Providence/Nassau'},
        {'name':'Cat Island'},
        {'name':'San Salvador'},
        {'name':'Long Island'},
        {'name':'Inagua'},
        {'name':'Mayaguana'},
        {'name':'Exumas'},
        {'name':'Crooked Island/Acklins Land'},
        {'name':'Freeport'}
    ];
    return locations;
});