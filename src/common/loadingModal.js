(function(){
	'use strict';

	angular.module('motech-common')
		.service('LoadingModal', loadingModal);

	loadingModal.$inject = ['$q', 'BootstrapDialog'];
	function loadingModal($q, BootstrapDialog){
		var dialog = new BootstrapDialog({
			title: 'Loading',
			message: 'Loading',
			closable: false
		});

		this.open = showModal;
		this.close = hideModal;

		function showModal(){
			dialog.open();
		}
		function hideModal(){
			dialog.close();
		}

		return this;
	}

})();