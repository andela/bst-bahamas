'use strict';

myApp.directive('myAdSense', function() {
  return {
    restrict: 'A',
    transclude: true,
    replace: true,
    template: '<div ng-transclude></div>',
    link: function (scope, element, attrs) {}
  }
}).directive('featuredAds',function(){
    return {
        restrict:'EAC',
        replace:true,
        template:"<div class='featured'><h4 id='sidePanelTitle'>{{model.category}}</h4><ul><li ng-repeat='item in items'>{{item.description}}</li></ul><hr></div>",
        link:function(scope,element,attrs){
         
        }
    };
});