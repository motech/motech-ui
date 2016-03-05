(function () {
	'use strict';

	angular.module('motech-server')
		.service('ServerStatusModal', statusModal)
		.run(statusModalListeners);

	statusModalListeners.$inject = ['$rootScope', 'ServerStatusService', 'ServerStatusModal'];
	function statusModalListeners($rootScope, ServerStatusService, ServerStatusModal) {
		console.log('ServerStatusModalService: adding listeners');
		$rootScope.$on('motech.statusCheck.update', function(){
			ServerStatusModal.show();
		});
		$rootScope.$on('motech.statusCheck.stop', function(){
			if(ServerStatusService.hasErrors()){
				ServerStatusModal.show();
			} else {
				ServerStatusModal.hide();
			}
		});
	}

	statusModal.$inject = ['$q', '$compile', '$rootScope', 'BootstrapDialog', 'ServerStatusService'];
	function statusModal ($q, $compile, $rootScope, BootstrapDialog, ServerStatusService) {
		console.log("Hello from ServerStatusModalService")

		var modal = new BootstrapDialog({
			title: 'MOTECH Server Status',
			message: $compile('<motech-server-status />')($rootScope),
			buttons: [],
			closable: false
		});

		this.show = showModal;
		this.hide = hideModal;

		function showModal() {
			modal.open();
		}
		function hideModal() {
			modal.close();
		}

	}

})();