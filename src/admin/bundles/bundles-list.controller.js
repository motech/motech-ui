(function () {
    'use strict';

    angular.module('motech-admin')
        .controller('BundlesListController', bundlesListController);

    bundlesListController.$inject = ['$scope', '$rootScope', 'BundlesFactory'];
    function bundlesListController ($scope, $rootScope, BundlesFactory) {
        BundlesFactory.query(function(bundles){
            $scope.bundles = bundles;
        });
    }

})();