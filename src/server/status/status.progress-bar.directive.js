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
                var percentage = 0;

                scope.$on('motech.statusCheck.start', setStartupPercentage);
                scope.$on('motech.statusCheck.update', setStartupPercentage);
                scope.$on('motech.statusCheck.stop', setStartupPercentage);

                function setStartupPercentage() {
                    if(ServerStatusService.running || ServerStatusService.errors && ServerStatusService.errors.length < 1) {
                        element.removeClass('ng-hide');
                        percentage = (ServerStatusService.startedPercentage) ? ServerStatusService.startedPercentage : 0;
                        element.find('.progress-bar').text(percentage + '%').css({width: percentage + '%'}).attr('aria-valuenow', percentage);
                        if (ServerStatusService.errors.length > 0) {
                            element.find('.progress-bar').removeClass('active progress-bar-striped').addClass('progress-bar-danger');
                        }
                    } else {
                        element.addClass('ng-hide');
                    }
                }
            }
        };
    }

})();