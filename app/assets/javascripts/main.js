myApp = angular.module('BstBahamas', ['angularFileUpload', 'ngRoute', 'ngResource', 'Devise','ui.bootstrap']);

myApp.config([
  '$routeProvider', 'AuthProvider', function($routeProvider, AuthProvider) {

    return $routeProvider.
    when('/home', {
      templateUrl: '../templates/home.html',
      controller: 'HomeCtrl'
    }).
    when('/login', {
      templateUrl: '../templates/account/login.html',
      controller: 'LoginCtrl'
    }).
    when('/sign_up', {
      templateUrl: '../templates/account/sign_up.html',
      controller: 'SignUpCtrl'
    }).
    when('/create_ad', {
      templateUrl: '../templates/account/create_ad.html',
      controller: 'CreateAdCtrl'
    }).
    otherwise({
      templateUrl: '../templates/index.html',
      controller: 'IndexCtrl'
    });
  }
]);