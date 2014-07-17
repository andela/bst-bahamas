'use strict';

/* Services */
myApp.factory('AppService', ['$resource', '$http',

  function($resource, $http){
    var HOST = 'http://localhost:3000/';
    var users = $resource(HOST+'users', {}, {
      get: {
        method:'GET',
        isArray: true
      }
    });
      
    var categories = $resource( HOST+'category',{},{
        get:{
            method:'GET',
            isArray:true
        }
    });

        
    var location = $resource( HOST+'location',{},{
        get:{
            method:'GET',
            isArray:true
        }
    });
      
    return {
      getUsers: function(successCallback, errorCallback) {
        var userArray = users.get(successCallback, errorCallback);
          return userArray;
      },
      getCategories: function(successCallback, errorCallback) {
        var categoriesArray = categories.get(successCallback, errorCallback);
        return categoriesArray;
      },
      getLocations: function(successCallback, errorCallback) {
        var locationArray = location.get(successCallback, errorCallback);
          return locationArray;
      }
    }
  }]);