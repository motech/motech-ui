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
				label: 'Email'
			},
			views:{
				tertiaryNav: {
					templateUrl: '/email/nav.html'
				}
			}
		})
		.state('email.send', {
			url: '/send',
			ncyBreadcrumb: {
				label: 'Send Email'
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
				label: 'Settings'
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
				label: 'Logs'
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