(function(){
	'use strict';

    /**
     * @memberOf motech-common
     * @ngdoc controller
     * @name InputFilterGroupController
     *
     * @description
     * Contains business logic used by the Input Filter Group directive.
     *
     * This controls adding all values of checkboxes to the ng-model when ng-model is empty.
     *
     */

    angular.module('motech-common')
        .controller('InputFilterGroupController', inputFilterGroupController);

    inputFilterGroupController.$inject = ['$scope'];
    function inputFilterGroupController($scope) {
        var ctrl = this;
        this.selectAll = selectAllCheckboxes;

        /**
         *
         * This method adds all values of checkboxes to the ng-model when ng-model is empty.
         *
         * @memberOf InputFilterGroupController
         *
         */

        function selectAllCheckboxes () {
            if (!$scope.ngModel) {
                $scope.ngModel = [];
                angular.forEach($scope.checkboxes, function(checkbox) {
                    $scope.ngModel.push(checkbox.value);
                });
            }
        }

        this.selectAll();
    }

})();