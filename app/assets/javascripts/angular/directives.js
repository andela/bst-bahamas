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
        templateUrl:'classified_ad',
        link:function(scope,element,attrs){

        }
    };
})
.directive('selectedAd', function(){
    return {
        restrict:'EAC',
        replace:true,
        templateUrl:'selected_ad',
        link:function(scope,element,attrs)
        {
            var adImg = document.querySelector('#default');
            var veil = document.querySelector('#veil');
            
            adImg.addEventListener('click', function(event){
                adImg.setAttribute('class','zoomed');
                veil.style.display = 'block';
            });
            
            veil.addEventListener('click', function(event){
                if(veil.style.display !== 'none')
                {
                    veil.style.display = 'none';
                    adImg.removeAttribute('class');
                }
            },true);
        }
    };
});