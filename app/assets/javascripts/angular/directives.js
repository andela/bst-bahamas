'use strict';

myApp.directive('myAdSense', function() {
  return {
    restrict: 'A',
    transclude: true,
    replace: true,
    template: '<div id="ads" ng-transclude></div>',
    link: function (scope, element, attrs) {}
  }
})