(function () {
    'use strict';

    angular.module('motech-common')
        .controller('MotechListController', controller);

    controller.$inject = ['$scope'];
    function controller($scope){
        var columns = [];

        $scope.columns = columns;

        function findColumnById(id){
            var found = false;
            columns.forEach(function(column){
                if(column.id === id){
                    found = true;
                }
            });
            return found;
        }

        this.addColumn = function (id, title, sortable, cssClasses) {
            if(sortable){
                sortable = true;
            } else {
                sortable = false;
            }

            if(!findColumnById(id)){
                columns.push({
                    id: id,
                    name: title,
                    sortable: sortable,
                    cssClasses: cssClasses
                });
            }
            broadcastReady();
        };

        var readyTimeout;
        function broadcastReady(){
            if(readyTimeout){
                clearTimeout(readyTimeout);
            }
            readyTimeout = setTimeout(function(){
                $scope.$broadcast('datagrid.ready');
            }, 10);
        }

    }

})();