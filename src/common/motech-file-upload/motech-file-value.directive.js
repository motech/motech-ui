(function () {

    angular.module('motech-common')
        .directive('motechFileValue', directive);

    directive.$inject = ['$parse'];
    function directive($parse){
        return {
            restrict: 'EA',
            replace: true,
            transclude: true,
            link: function linkFunction(scope, element, attrs){
                var model = $parse(attrs.motechFileValue),
                modelSetter = model.assign;

                element.bind('change', function () {
                    scope.$apply(function () {
                        modelSetter(scope.$parent, element[0].files[0]);
                    });
                });
            }
        };
    }

})();