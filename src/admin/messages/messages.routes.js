(function () {
    'use strict';

    angular.module('motech-admin')
        .config(adminRoutes);

    adminRoutes.$inject = ['$stateProvider'];
    function adminRoutes ($stateProvider) {
        $stateProvider
        .state('messages', {
            url: '/messages',
            ncyBreadcrumb: {
                label: 'Messages'
            },
            views:{
                secondaryNav: {
                    templateUrl: '/admin/messages/nav.html'
                }
            },
            redirectTo: 'messages.messages'
        })
        .state('messages.messages', {
            url: '/messages/messages',
            ncyBreadcrumb: {
                label: 'Messages'
            },
            views:{
                'appArea@': {
                    templateUrl: '/admin/messages/messages.html',
                    controller: 'MessagesController'
                }
            }
        })
        .state('messages.settings', {
            url: '/settings',
            ncyBreadcrumb: {
                label: 'Settings'
            },
            views: {
                'appArea@': {
                    templateUrl: '/admin/messages/settings.html',
                    controller: 'MessagesSettingsController'
                }
            }
        });
    }

})();