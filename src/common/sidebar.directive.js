(function(){
	'use strict';

	angular.module('motech-common')
		.directive('motechSidebar', motechSidebar);

	motechSidebar.$inject = ['$rootScope'];
	function motechSidebar ($rootScope) {
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
				jQuery('body').on('click','.motech-sidebar-button', function(){
					event.preventDefault();
					show();
				});
				$rootScope.$on('$stateChangeStart', function(){
					hide();
					element.remove();
				});
				jQuery('body').on('click', '.app-sidebar-backdrop', function(event){
					event.preventDefault();
					hide();
				});

				scope.$on('$destroy', function(){
					jQuery('body').off('click','.motech-sidebar-button');
					jQuery('body').off('click', '.app-sidebar-backdrop');
				});

				function show(){
					element.addClass('is-open');
					jQuery('.motech-sidebar-button').addClass('active');
					jQuery('body').append('<div class="app-sidebar-backdrop"></div>');
				}
				function hide(){
					element.removeClass('is-open');
					jQuery('.motech-sidebar-button').removeClass('active');
					jQuery('.app-sidebar-backdrop').remove();
				}
			}
		}
	}

})();