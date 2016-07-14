(function(){
    'use strict';

    angular.module('motech-server')
        .factory('PagiableServiceFactory', factory);

    factory.$inject = ['$q', '$http'];
    function factory ($q, $http) {
        var service = {};
        
        var url = "";

        var searchData = {};

        service.loaded = false;
        service.totalPages = 0;
        service.totalRecords = 0;
        service.currentPage = 0;
        service.rowsPerPage = 10;

        service.get = query;
        service.getPage = getPage;

        function getPage(number){
            return query({
                page: number
            });
        }
        function query(params){
            var deferred = $q.defer();
            service.loaded = false;
            searchData = angular.extend(searchData, params);
            for(var key in searchData){
                if(Array.isArray(searchData[key])){
                    searchData[key] = searchData[key].join(",");
                }
            }
            $http({
                method: 'GET',
                url: url,
                params: angular.extend({
                    rows: service.rowsPerPage,
                    page: 1
                }, searchData),
                paramSerializer: jQuery.param
            }).then(function(response){
                service.totalPages = response.data.total;
                service.totalRecords = response.data.records;
                service.currentPage = response.data.page;
                
                deferred.resolve(response.data.rows);
            }).catch(function(){
                deferred.reject([]);
            }).finally(function(){
                service.loaded = true;
            });

            return deferred.promise;
        }

        return function(_url){
            url = _url;
            return service;
        };
    }

})();