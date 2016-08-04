(function () {
    'use strict';

    angular.module('motech-admin')
        .config(adminRoutes);

    adminRoutes.$inject = ['$stateProvider'];
    function adminRoutes ($stateProvider) {
        $stateProvider
        .state('bundles', {
            url: '/bundles',
            ncyBreadcrumb: {
                label: 'admin.manageModules'
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
        })
        .state('bundles.bundle', {
            url: '/:bundleId',
            ncyBreadcrumb: {
                label: 'admin.manageModules'
            },
            resolve: {
                bundle: getBundle
            },
            views: {
                'appArea@': {
                    templateUrl: '/admin/bundles/bundle.html',
                    controller: 'BundleController'
                }
            }
        })
        .state('bundles.bundleSettings', {
            url: 'bundleSettings/:bundleId',
            ncyBreadcrumb: {
                label: 'admin.manageModuleSettings'
            },
            views: {
                'appArea@': {
                    templateUrl: '/admin/bundles/bundle-settings.html',
                    controller: 'BundleSettingsController'
                }
            }
        });
    }

    getBundle.$inject = ['$q', '$state', '$stateParams', 'BundlesFactory'];
    function getBundle ($q, $state, $stateParams, BundlesFactory) {
        var deferred = $q.defer();
        BundlesFactory.details({
            bundleId: $stateParams.bundleId
        },function (data) {
            deferred.resolve(data);
        }, function(){
            deferred.reject();
            $state.go('bundles');
        });
        return deferred.promise;
    }

})();