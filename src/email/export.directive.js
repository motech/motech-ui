(function(){
    'use strict';

    angular.module('motech-email')
        .directive('emailExport', emailExport);

    function emailExport () {
        return {
            restrict: 'EA',
            scope: {
                close: "&"
            },
            templateUrl: '/email/export.html',
            controller: ['$scope', 'ServerService', function($scope, ServerService){
                $scope.export = function(){
                    var url = "/module/email/emails/export?range="+$scope.range+"&month="+$scope.month;
                    window.location.replace(ServerService.formatURL(url));
                    $scope.close();
                }
            }]
        };
    }

})();