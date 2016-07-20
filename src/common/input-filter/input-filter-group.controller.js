(function(){
	'use strict';

    angular.module('motech-common')
        .controller('InputFilterGroupController', inputFilterGroupController);

    inputFilterGroupController.$inject = ['$scope'];
    function inputFilterGroupController($scope) {

        if (!$scope.ngModel) {
            $scope.ngModel = [];
            angular.forEach($scope.checkboxes, function(checkbox) {
                $scope.ngModel.push(checkbox.value);
            });
        }
    }

})();