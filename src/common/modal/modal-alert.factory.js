(function(){
    'use strict';

    angular.module('motech-common')
        .factory('MotechAlert', alert);
    
    alert.$inject = ['$q', 'ModalFactory'];
    function alert($q, ModalFactory) {
        return function(message, title){
            var deferred = $q.defer();
            ModalFactory.showAlert(message, title, function(){
                deferred.resolve();
            });
            return deferred.promise;
        };
    }

})();