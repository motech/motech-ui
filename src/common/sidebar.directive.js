(function(){
	'use strict';

	angular.module('motech-common')
		.directive('motechSidebar', motechSidebar);

	motechSidebar.$inject = ['$rootScope', 'SidebarService'];
	function motechSidebar ($rootScope, SidebarService) {
		return {
			restrict: 'EA',
			transclude: true,
			templateUrl: '/common/sidebar.html',
			replace: true,
			scope: {
				title: "@?"
			},
			link: function(scope, element, attrs) {
				element.appendTo('.app');
				$rootScope.$on('$stateChangeStart', function(){
					element.remove();
					SidebarService.close();
				});
				scope.$watch(function(){
					return SidebarService.open;
				}, function(open){
					if(open){
						element.addClass('is-open');
					} else {
						element.removeClass('is-open');
					}
				});
			}
		}
	}

})();