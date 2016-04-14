(function(){
	'use strict';

	angular.module('motech-email')
		.config(emailRoutes);

	emailRoutes.$inject = ['$stateProvider'];
	function emailRoutes ($stateProvider) {
		$stateProvider
		.state('email', {
			abstract: true,
			url: '/email',
			views:{
				mainNav: {
					templateUrl: '/common/nav-main.html'
				},
				secondaryNav: {
					templateUrl: '/common/nav-secondary.html'
				}
			}
		})
		.state('email.send', {
			parent: 'email',
			url: '/send',
			views: {
				appArea: {
					templateUrl: '/email/send.html',
					controller: 'EmailSendCtrl'
				}
			}
		});
	}

})();