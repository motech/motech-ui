(function(){
    'use strict';

    angular.module('motech-server')
        .directive('motechI18n', directive);

    i18nController.$inject = ['$scope', 'i18nService', 'i18nModal'];
    function i18nController($scope, i18nService, i18nModal){
        this.change = i18nModal.open;
        $scope.changeLanguage = i18nModal.open;
        $scope.$watch(function(){
            return i18nService.getCurrentLanguage();
        }, function(lang){
            $scope.language = lang;
        });
    }

    directive.$inject = ['i18nService', 'i18nModal'];
    function directive (i18nService, i18nModal){
        return {
            restrict: 'EA',
            controller: i18nController
        };
    }

})();