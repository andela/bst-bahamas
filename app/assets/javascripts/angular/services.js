'use strict';

/* Services */
myApp.factory('AppService', ['$resource', '$http',

  function($resource, $http){
    var HOST = 'http://bst-bahamas.herokuapp.com/' /* Production URL, comment out in development */
    // var HOST = 'http://localhost:3000/'; /* Can commit this line in develop branch */

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

    var classifiedAds = $resource(HOST+'classified_ads/:id', {}, {
      index:{
        method:'GET',
        isArray:true
      },
      show: {
        method: 'GET'
      }
    });

    var searchClassifiedAds = $resource(HOST+'classified_ads/search', {}, {
      get:{
        method:'GET'
      }
    });

    return {
      getCategories: function(successCallback, errorCallback) {
        var categoriesArray = categories.get(successCallback, errorCallback);
        return categoriesArray;
      },
      getLocations: function(successCallback, errorCallback) {
        var locationArray = location.get(successCallback, errorCallback);
        return locationArray;
      },
      getClassifiedAds: function(successCallback, errorCallback) {
        var classifiedAdsArray = classifiedAds.index(successCallback, errorCallback);
        return classifiedAdsArray;
      },
      getClassifiedAd: function(params, successCallback, errorCallback) {
        classifiedAds.show(params, successCallback, errorCallback)
      },
      searchClassifiedAds: function(params, successCallback, errorCallback) {
        searchClassifiedAds.get(params, successCallback, errorCallback);
      }
    }
  }]);