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
                adImg.classList.add('zoomed');
                veil.style.display = 'block';
            });
            
            veil.addEventListener('click', function(event){
                adImg.classList.remove('zoomed');
                
                if(veil.style.display !== 'none')
                {
                    veil.style.display = 'none';
                }
            });
        }
    };
})
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