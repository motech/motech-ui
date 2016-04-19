(function(){
	'use strict';

	angular.module('motech-email')
		.config(emailRoutes);

	emailRoutes.$inject = ['$stateProvider'];
	function emailRoutes ($stateProvider) {
		$stateProvider
		.state('email', {
			url: '/email',
			views:{
				mainNav: {
					templateUrl: '/common/nav-main.html'
				},
				secondaryNav: {
					templateUrl: '/common/nav-secondary.html'
				},
				tertiaryNav: {
					templateUrl: '/email/nav.html'
				},
				appArea: {
					template: '<ui-view />'
				}
			}
		})
		.state('email.send', {
			url: '/send',
			templateUrl: '/email/send.html',
			controller: 'EmailSendController'
		})
		.state('email.settings', {
			url: '/settings',
			templateUrl: '/email/settings.html',
			controller: 'EmailSettingsController as SettingsCtrl'
		})
		.state('email.logs', {
			url: '/logs',
            templateUrl: '/email/logs.html',
            controller: 'EmailLogsController'
        })
        .state('email.logs.export', {
        	url: '/export',
        	onEnter: openExportModal
        })
        .state('email.logs.filter', {
        	url: '/filters',
        	controller: 'EmailLogsFilterController'
        });
	}

	openExportModal.$inject = ['$compile','BootstrapDialog'];
	function openExportModal ($compile, BootstrapDialog) {
		BootstrapDialog.show({
			title: "Look ma!",
			message: $compile('<email-export></email-export>')
		});
	}

})();