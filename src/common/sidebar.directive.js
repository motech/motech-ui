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
				element.insertAfter('.app');
				jQuery('body').on('click','.motech-sidebar-button', function(event){
					event.preventDefault();
					if($(event.target).hasClass('active')){
						hide();
					} else {
						show();
					}
				});
				element.on('click', 'header .close', function(event){
					event.preventDefault();
					hide();
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
					var spacing = jQuery('.app').width() - jQuery('.app .container').width();
					element.addClass('is-open');
					jQuery('.motech-sidebar-button').addClass('active');
					jQuery('.app-container').css('right', 180-spacing/2).addClass('sidebar-showing');
				}
				function hide(){
					element.removeClass('is-open');
					jQuery('.motech-sidebar-button').removeClass('active');
					jQuery('.app-container').removeClass('sidebar-showing');
					//jQuery('.app-sidebar-backdrop').remove();
				}
			}
		}
	}

})();