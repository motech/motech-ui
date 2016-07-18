(function(){
	'use strict';

    angular.module('motech-common')
        .controller('InputFilterController', inputFilterController);

    inputFilterController.$inject = ['$scope'];
    function inputFilterController($scope) {
        var ctrl = this;
        ctrl.selectedValues = [];

        console.log(ctrl);

        this.checkIfEmpty = function(list) {
            if (list.length === 0) {
                return true;
            }
        };

        this.checkAll = function() {
            ctrl.selectedValues = $scope.search;
            console.log(ctrl.selectedValues);
        };

        this.checkAll();

        console.log('hello this is inputFilterController');

    }

})();