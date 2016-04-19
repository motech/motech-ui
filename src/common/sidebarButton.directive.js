(function(){
	'use strict';

	angular.module('motech-common')
		.directive('motechSidebarButton', sidebarButtonDirective);

	sidebarButtonDirective.$inject = ['SidebarService'];
	function sidebarButtonDirective (SidebarService){
		return {
			restrict: 'A',
			link: function(scope, element, attrs){
				element.addClass('motech-sidebar-button');
				element.on('click', function(event){
					event.preventDefault();
					SidebarService.toggle();
					scope.$apply();
				});
				scope.$watch(function(){
					return SidebarService.open;
				}, function(open){
					if(open){
						element.addClass('active');
					} else {
						element.removeClass('active');
					}
				});
			}
		}
	}

})();