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
  }])