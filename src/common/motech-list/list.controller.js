(function () {
    'use strict';

    angular.module('motech-common')
        .controller('MotechListController', controller);

    /**
     * @memberOf motech-common
     * @ngdoc controller
     * @name  MotechListController
     *
     * @description
     * Keeps track of list columns which is used to generate columns and column headings by {@link motech-common.motechList}.
     * 
     */

    controller.$inject = ['$scope'];
    function controller($scope){
        var ctrl = this;
        ctrl.columns = [];
        ctrl.hasCollapsibleColumn = false;

        /**
         * Sets controller to know it has a collapsible column.
         *
         * @memberOf MotechListController
         */
        this.addCollapsibleColumn = function(){
            ctrl.hasCollapsibleColumn = true;
        };

        /**
         * Registerd a column as a motech-list column
         *
         * @memberOf MotechListController
         * 
         * @param {String} id Unique id used within the motech-list.
         * @param {String} title Human readable name for the column.
         * @param {Boolean} sortable If this column should expose controls to be sorted.
         */
        this.addColumn = function (id, title, sortable) {
            if(sortable){
                sortable = true;
            } else {
                sortable = false;
            }

            if(!findColumnById(id)){
                ctrl.columns.push({
                    id: id,
                    name: title,
                    sortable: sortable
                });
            }
            broadcastReady();
        };

        function findColumnById(id){
            var found = false;
            ctrl.columns.forEach(function(column){
                if(column.id === id){
                    found = true;
                }
            });
            return found;
        }

        var readyTimeout;
        function broadcastReady(){
            if(readyTimeout){
                clearTimeout(readyTimeout);
            }
            readyTimeout = setTimeout(function(){
                $scope.$broadcast('motech-list.ready');
            }, 10);
        }

    }

})();