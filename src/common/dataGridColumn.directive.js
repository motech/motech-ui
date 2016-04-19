(function(){

	angular.module('motech-common')
		.directive('motechDataGridColumn', columnDirective);

	columnDirective.$inject = [];
	function columnDirective(){
		return {
			restrict: 'EA',
			replace: false,
			require: '^^motechDataGrid',
			link: function(scope, element, attrs, DataGridCtrl){
				var sortable = false;
				if('sortable' in attrs){
					sortable = true;
				}
				DataGridCtrl.addColumn(attrs['motechDataGridColumn'], attrs['title'], sortable, element.attr('class'));
			}
		}
	}
})();