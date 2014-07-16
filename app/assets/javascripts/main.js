myApp = angular.module('BstBahamas', ['ngRoute', 'ngResource', 'Devise']);

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
    otherwise({
      templateUrl: '../templates/index.html',
      controller: 'IndexCtrl'
    });
  }
]);