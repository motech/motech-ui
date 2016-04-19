(function(){
	'use strict';

	angular.module('motech-common')
		.service('SidebarService', service);

	service.$inject = [];
	function service() {

		this.open = false;

		this.show = show;
		this.hide = hide;
		this.toggle = toggle;

		function show(){
			this.open = true;
		}
		function hide(){
			this.open = false;
		}
		function toggle(){
			if(this.open){
				this.hide();
			} else {
				this.show();
			}
		}

		return this;
	}

})();