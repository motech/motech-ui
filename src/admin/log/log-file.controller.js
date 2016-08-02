(function () {
    'use strict';

    angular.module('motech-admin')
        .controller('LogFileController', logFileController);

    logFileController.$inject = ['$scope', 'ServerService', 'LogFileFactory'];
    function logFileController($scope, ServerService,  LogFileFactory) {

        this.refresh = refresh;
        this.getFileLogPath = getFileLogPath;

        function refresh() {
            LogFileFactory.getLog().then(updateLog);
        }

        function updateLog(log) {
            $scope.log = log;
        }

        function getFileLogPath() {
           return ServerService.formatURL('/module/admin/api/log/raw');
        }

        refresh();
    }

})();
