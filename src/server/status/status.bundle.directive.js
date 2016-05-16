(function () {
    'use strict';

    angular.module('motech-server')
        .directive('motechBundleStatus', statusDirective);

    statusDirective.$inject = ['ServerStatusService'];
    function statusDirective(ServerStatusService) {
        return {
            restrict: 'EA',
            replace: true,
            scope:{
                id: "=",
                name: "="
            },
            templateUrl: '/server/status.bundle.html',
            link: function (scope, element, attrs) {
                scope.$on('motech.statusCheck.start', update);
                scope.$on('motech.statusCheck.update', update);
                scope.$on('motech.statusCheck.stop', update);

                function update() {
                    scope.started = ServerStatusService.isBundleStarted(scope.id);
                    scope.error = ServerStatusService.hasBundleError(scope.id);
                }
            }
        };
    }

})();