(function(){
    'use strict';

    angular.module('motech-email')
        .config(emailRoutes);

    emailRoutes.$inject = ['$stateProvider'];
    function emailRoutes ($stateProvider) {
        $stateProvider
        .state('email', {
            url: '/email',
            ncyBreadcrumb: {
                label: 'email'
            },
            views:{
                secondaryNav: {
                    templateUrl: '/email/nav.html'
                }
            },
            redirectTo: 'email.send'
        })
        .state('email.send', {
            url: '/send',
            ncyBreadcrumb: {
                label: 'email.send'
            },
            views:{
                'appArea@': {
                    templateUrl: '/email/send.html',
                    controller: 'EmailSendController'
                }
            }
        })
        .state('email.settings', {
            url: '/settings',
            ncyBreadcrumb: {
                label: 'email.settings'
            },
            views:{ 
                'appArea@': {
                    templateUrl: '/email/settings.html',
                    controller: 'EmailSettingsController as SettingsCtrl',
                    resolve: {
                        'emailSettings': emailSettingsResolver
                    }
                }
            }
        })
        .state('email.logs', {
            url: '/logs',
            ncyBreadcrumb: {
                label: 'email.logging'
            },
            views:{
                'appArea@': {
                    templateUrl: '/email/logs.html',
                    controller: 'EmailLogsController'
                }
            }
        });
    }

    emailSettingsResolver.$inject = ['$q', 'EmailSettingsFactory'];
    function emailSettingsResolver ($q, EmailSettingsFactory){
        var deferred = $q.defer();
        EmailSettingsFactory.get(function(data){
            deferred.resolve(data);
        });
        return deferred.promise;
    }

})();