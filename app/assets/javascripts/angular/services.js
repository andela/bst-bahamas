'use strict';

/* Services */
myApp.factory('AppService', ['$resource', '$http',

  function($resource, $http){
    var HOST = 'http://bst-bahamas.herokuapp.com/' /* Production URL, comment out in development */
    // var HOST = 'http://localhost:3000/'; /* DO NOT COMMIT THIS LINE */
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

    var classifiedAds = $resource(HOST+'users/:id/classified_ads', {}, {
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
      },
      getClassifiedAds: function(successCallback, errorCallback) {
        var classifiedAdsArray = classifiedAds.get(successCallback, errorCallback);
      },
      createClassifiedAd: function(successCallback, errorCallback) {

      }
    }
  }]);