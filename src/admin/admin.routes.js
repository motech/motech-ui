(function () {
    'use strict';

    angular.module('motech-admin')
        .config(adminRoutes);

    adminRoutes.$inject = ['$stateProvider'];
    function adminRoutes ($stateProvider) {
        $stateProvider
        .state('bundles', {
            url: '/bundles',
            resolve: {
                bundles: getBundlesList
            },
            views: {
                'appArea@': {
                    templateUrl: '/admin/bundles/bundles-list.html',
                    controller: 'BundlesListController'
                },
                'secondaryNav@': {
                    templateUrl: '/admin/bundles/nav.html'
                }
            }
        });
    }

    getBundlesList.$inject = ['$q', 'BundlesFactory'];
    function getBundlesList ($q, BundlesFactory) {
        var deferred = $q.defer();
        BundlesFactory.query(function (data) {
            deferred.resolve(data);
        }, function(){
            deferred.reject([]);
        });
        return deferred.promise;
    }
})();