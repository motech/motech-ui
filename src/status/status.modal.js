(function () {
	'use strict';

	angular.module('motech-status')
		.service('ServerStatusModal', statusModal)
		.run(statusModalListeners);

	statusModalListeners.$inject = ['$rootScope', 'ServerStatusModal'];
	function statusModalListeners($rootScope, ServerStatusModal) {
		console.log('ServerStatusModalService: adding listeners');
		$rootScope.$on('motech.statusCheck.start', function(){
			ServerStatusModal.show();
		});
		$rootScope.$on('motech.statusCheck.stop', function(){
			ServerStatusModal.hide();
		});
	}

	statusModal.$inject = ['$q', '$rootScope', 'BootstrapDialog', 'ServerStatusService'];
	function statusModal ($q, $rootScope, BootstrapDialog, ServerStatusService) {
		console.log("Hello from ServerStatusModalService")

		var modal = new BootstrapDialog({
			title: 'MOTECH Server Status',
			message: 'checking status',
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