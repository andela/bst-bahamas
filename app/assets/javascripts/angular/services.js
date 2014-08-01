'use strict';

/* Services */
myApp.factory('AppService', ['$resource', '$http', 'Auth',
  function($resource, $http, Auth){
    var selectedAdID = null;
    var paymentParams = null;
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

    var myAds = $resource(HOST+'users/:user_id/classified_ads/:id', {}, {
      index:{
        method:'GET'
      },
      show: {
        method: 'GET'
      },
      delete:{
        method:'DELETE'
      }
    });

    var searchClassifiedAds = $resource(HOST+'classified_ads/search', {}, {
      get:{
        method:'GET'
      }
    });

    var Tags = $resource(HOST+'tags', {}, {
      index:{
        method: 'GET',
        isArray: true
      }
    });

    var charges = $resource( HOST+'charges',{},{
      create:{
        method:'POST'
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
      },
      myAds: function(successCallback, errorCallback) {
        Auth.currentUser().then(function(user) {
          var params = {user_id: user.id};
          myAds.index(params, successCallback, errorCallback);
        }, function(error) {
          errorCallback(error);
        });
      },
      deleteMyAd: function(params, successCallback, errorCallback) {
        Auth.currentUser().then(function(user) {
          params.user_id = user.id;
          myAds.delete(params, successCallback, errorCallback);
        }, function(error) {
          errorCallback(error);
        });
      },
      getTags: function(successCallback, errorCallback) {
        Tags.index(successCallback, errorCallback);
      },
      createCharge: function(params, successCallback, errorCallback) {
        charges.create(params, successCallback, errorCallback);
      },
      setSelectedAdID : function(id) {
        selectedAdID =  id;
      },
      getSelectedAdID : function() {
        return selectedAdID;
      },
      setPaymentParams : function(params) {
        paymentParams = params;
      },
      getPaymentParams : function(params) {
        return paymentParams;
      }
    }
  }]);