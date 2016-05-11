(function () {
    'use strict';

    angular.module('motech-admin')
        .controller('BundlesListController', bundlesListController);

    bundlesListController.$inject = ['$scope', '$rootScope', 'BundlesFactory', 'bundles'];
    function bundlesListController ($scope, $rootScope, BundlesFactory, bundles) {
        if(bundles){
            $scope.bundles = bundles;
        } else {
            setBundles();
        }

        $rootScope.$on('motech.refresh', setBundles);

        function setBundles () {
            BundlesFactory.query(function(bundles){
                $scope.bundles = bundles;
            });
        }
    }

})();