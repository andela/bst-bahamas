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
.directive('selectedAd', ['$timeout', function($timeout){
    function attachListenersTo(els)
    {
        var _els = Array.prototype.slice.call(els);

        if(_els.length > 0)
        {
            _els.forEach(function(el){
                el.addEventListener('click', function(){
                    zoomImage(el.src);
                });
            });
        }
    }

    function zoomImage(src)
    {
        var veil = document.querySelector('#veil');
        var stage = document.querySelector('#stage');
        veil.style.display = 'inline-block';
        stage.style.backgroundImage = 'url('+src+')';

        veil.addEventListener('click', function(){
            //hide veil when clicked and remove pic
            veil.style.display = "none";
            stage.style.backgroundImage = "";
        });
    }

    return {
        restrict:'EAC',
        replace:true,
        templateUrl:'selected_ad',
        link:function(scope,element,attrs)
        {
            //timeout to trigger another digest cycle b/c adpic was returning null
            $timeout(function(){
                var adpic = document.querySelectorAll('.adpic');
                attachListenersTo(adpic);
            },0);
        }
    };
}])
.directive('sideMenu',function(){

    return {
        restrict:'EAC',
        templateUrl:'sideMenuDir',
        replace:true,
        link:function(scope,element,attrs){

            var trigger = document.querySelector('#trigger');
            var sideMenu = document.querySelector('#sideMenu');
            trigger.addEventListener('click', function(event){
                event.stopPropagation();
                if(scope.menuOpened === true)
                {
                    $(this).animate({left:'60%'},500);
                    $(sideMenu).animate({left:'0'},500);
                }

                if(scope.menuOpened === false)
                {
                    $(this).animate({left:'0'},500);
                    $(sideMenu).animate({left:'-60%'},500);
                }
            });

            document.addEventListener('click', function(event){
                scope.menuOpened = false;
                $(trigger).animate({left:'0'},500);
                $(sideMenu).animate({left:'-60%'},500);

            });
        }
    }
});