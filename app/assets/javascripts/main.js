myApp = angular.module('BstBahamas', ['ngRoute', 'ngResource', 'Devise']);

myApp.config([
  '$routeProvider', 'AuthProvider', function($routeProvider, AuthProvider) {

  	AuthProvider.loginPath('/users/log_in');
  	AuthProvider.loginMethod('POST');

    return $routeProvider.
    when('/users', {
      templateUrl: '../templates/index.html',
      controller: 'IndexCtrl'
    }).
    when('/register', {
      templateUrl: '../templates/register.html',
      controller: 'RegisterCtrl'
    }).
    otherwise({
      templateUrl: '../templates/home.html',
      controller: 'HomeCtrl'
    });
  }
]);