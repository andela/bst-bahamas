Stripe.setPublishableKey('pk_test_4UDyZ8tCUJ5UbHZOSbikbToA');

myApp = angular.module('BstBahamas',
  ['angularFileUpload', 'ngRoute', 'ngResource', 'Devise','ui.bootstrap', 'angularPayments', 'angular-carousel']);
myApp.config([
  '$routeProvider', '$locationProvider', 'AuthProvider', function($routeProvider, $locationProvider, AuthProvider) {

    // $locationProvider.html5Mode(true);

    return $routeProvider.
    when('/index', {
      templateUrl: '../templates/index.html',
    }).
    when('/', {
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
      templateUrl: '../templates/account/post_ad.html',
      controller: 'PostAdCtrl'
    }).
    when('/edit_ad', {
      templateUrl: '../templates/account/edit_ad.html',
      controller: 'EditAdCtrl'
    }).
    when('/my_ads', {
      templateUrl: '../templates/account/my_ads.html',
      controller: 'MyAdsCtrl'
    }).
    when('/payment_form', {
      templateUrl: '../templates/stripe/payment_form.html',
      controller: 'PaymentCtrl'
    }).
    otherwise({
      redirectTo: '/'
    });
  }
]);