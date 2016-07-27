(function () {
    'use strict';

    angular.module('motech-admin')
        .controller('BundlesListController', bundlesListController);

    bundlesListController.$inject = ['$scope', '$rootScope', 'BundlesFactory'];
    function bundlesListController ($scope, $rootScope, BundlesFactory) {
        $scope.bundles = [];
        $scope.search = {};
        BundlesFactory.query(function(bundles){
            $scope.bundles = bundles;
        });

        $scope.allBundlesCount = function () {
            if ($scope.bundles) {
                return $scope.bundles.length;
            } else {
                return 0;
            }
        };

        $scope.activeBundlesCount = function () {
            var count = 0;
            angular.forEach($scope.bundles, function (bundle) {
                count += bundle.isActive() ? 1 : 0;
            });

            return count;
        };

        $scope.installedBundlesCount = function () {
            var count = 0;
            angular.forEach($scope.bundles, function (bundle) {
                count += bundle.isInstalled() ? 1 : 0;
            });

            return count;
        };

        $scope.resolvedBundlesCount = function () {
            var count = 0;
            angular.forEach($scope.bundles, function (bundle) {
                count += bundle.isResolved() ? 1 : 0;
            });

            return count;
        };

    }

})();