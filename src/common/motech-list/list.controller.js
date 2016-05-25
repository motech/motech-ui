(function () {
    'use strict';

    angular.module('motech-common')
        .controller('MotechListController', controller);

    controller.$inject = ['$scope'];
    function controller($scope){
        var ctrl = this;
        ctrl.columns = [];
        ctrl.hasCollapsibleColumn = false;

        function findColumnById(id){
            var found = false;
            ctrl.columns.forEach(function(column){
                if(column.id === id){
                    found = true;
                }
            });
            return found;
        }

        
        this.addCollapsibleColumn = function(){
            ctrl.hasCollapsibleColumn = true;
        };

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