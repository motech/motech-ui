(function () {
    'use strict';

    angular.module('motech-server')
        .directive('progressBar', progressBar);

    progressBar.$inject = ['ServerStatusService'];
    function progressBar(ServerStatusService) {
        return {
            restrict: 'EA',
            replace: true,
            templateUrl: '/server/status/status.progress-bar.html',
            link: function (scope, element, attrs) {

                scope.$on('motech.statusCheck.start', setStartupPercentage);
                scope.$on('motech.statusCheck.update', setStartupPercentage);
                scope.$on('motech.statusCheck.stop', setStartupPercentage);

                function setStartupPercentage() {
                    if(ServerStatusService.errors && ServerStatusService.errors.length < 1) {
                        element.removeClass('ng-hide');
                        var percentage = (ServerStatusService.startedPercentage) ? ServerStatusService.startedPercentage : 0;
                        element.find('.progress-bar').text(percentage + '%').css({width: percentage + '%'}).attr('aria-valuenow', percentage);
                    }
                }
            }
        };
    }

})();