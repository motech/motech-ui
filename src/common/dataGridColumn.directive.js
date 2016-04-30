(function(){

	angular.module('motech-common')
		.directive('motechDataGridColumn', columnDirective);

	columnDirective.$inject = [];
	function columnDirective(){
		return {
			restrict: 'A',
			scope: true,
			require: '^^motechDataGrid',
			link: function(scope, element, attrs, DataGridCtrl){
				var sortable = false;
				if('sortable' in attrs){
					sortable = true;
				}
				if('fitted' in attrs){
					element.addClass('data-cell-fitted');
				}
				DataGridCtrl.addColumn(attrs['motechDataGridColumn'], attrs['title'], sortable, element.attr('class'));
			}
		}
	}
})();