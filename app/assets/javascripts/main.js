myApp = angular.module('BstBahamas', ['angularFileUpload', 'ngRoute', 'ngResource', 'Devise','ui.bootstrap']);

myApp.config([
  '$routeProvider', '$locationProvider', 'AuthProvider', function($routeProvider, $locationProvider, AuthProvider) {

    // $locationProvider.html5Mode(true);

    return $routeProvider.
    when('/', {
      templateUrl: '../templates/index.html',
      controller: 'IndexCtrl'
    }).
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
    when('/post_ad', {
      templateUrl: '../templates/account/create_ad.html',
      controller: 'CreateAdCtrl'
    }).
    otherwise({
      redirectTo: '/'
    });
  }
]);