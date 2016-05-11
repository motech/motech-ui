(function(){
    'use strict';

    angular.module('motech-common')
        .directive('motechNavSection', directive);

    directive.$inject = ['NavSectionService'];
    function directive(NavSectionService){
        return {
            restrict: 'EA',
            replace: true,
            transclude: true,
            templateUrl: '/common/navSection.html',
            scope:{
                activeClass: '@',
                name: '@'
            },
            link: function(scope, element, attrs){
                NavSectionService.add(scope.name);
                scope.$watch(hasActiveElement, function(active){
                    if(active){
                        NavSectionService.activate(scope.name);
                    }
                });

                scope.$watch(function(){
                    return NavSectionService.isActive(scope.name);
                }, function(isActive){
                    if(isActive){
                        element.addClass("active");
                    } else {
                        element.removeClass("active");
                    }
                })

                function hasActiveElement(){
                    var classes = [];
                    if(scope.activeClass){
                        classes = scope.activeClass.split(' ');
                    }
                    var active = false;
                    classes.forEach(checkClass);

                    function checkClass(name){
                        if(jQuery('.'+name, element).length > 0){
                            active = true;
                        }
                    }

                    return active;
                }
            }
        }
    }

})();