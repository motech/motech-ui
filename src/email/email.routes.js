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
				appArea: {
					template: '<ui-view />'
				}
			}
		})
		.state('email.send', {
			url: '/send',
			templateUrl: '/email/send.html',
			controller: 'EmailSendCtrl',
			controllerAs: 'EmailSendCtrl'
		});
	}

})();