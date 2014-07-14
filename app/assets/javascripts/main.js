myApp = angular.module('BstBahamas', ['ngRoute', 'ngResource']);

myApp.config([
  '$routeProvider', function($routeProvider) {
    return $routeProvider.
    when('/users', {
      templateUrl: '../templates/index.html',
      controller: 'IndexCtrl'
    }).
    otherwise({
      templateUrl: '../templates/home.html',
      controller: 'HomeCtrl'
    });
  }
]);