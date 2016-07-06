(function () {
    'use strict';

    angular.module('motech-admin')
        .config(adminRoutes);

    adminRoutes.$inject = ['$stateProvider'];
    function adminRoutes ($stateProvider) {
        $stateProvider
        .state('admin', {
            url: '/admin',
            ncyBreadcrumb: {
                label: 'Admin'
            }
        })
        .state('admin.bundles', {
            url: '/bundles',
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
        .state('admin.bundles.bundle', {
            url: '/:bundleId',
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
        .state('admin.settings', {
            url: '/settings',
            ncyBreadcrumb: {
                label: 'Settings'
            },
            views: {
                'appArea@' : {
                    templateUrl: '/admin/settings/settings.html',
                    controller: 'SettingsController'
                },
                'secondaryNav@': {
                    templateUrl: '/admin/settings/nav.html'
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