(function(){
    'use strict';

    angular.module('motech-server')
        .directive('motechI18nForm', directive);

    controller.$inject = ['$scope', 'i18nService', 'LoadingModal'];
    function controller($scope, i18nService, LoadingModal){
        $scope.languages = i18nService.languages;

        LoadingModal.open();
        i18nService.getLanguages()
        .then(function(languages){
            $scope.languages = languages;
            $scope.languages.forEach(function(lang){
                if(lang.current){
                    $scope.language = lang.key;
                }
            });
            LoadingModal.close();
        });

        $scope.setLanguage = function(lang){
            LoadingModal.open();
            i18nService.setLanguage(lang)
            .finally(function(){
                LoadingModal.close();
                $scope.$emit('motech.refresh');
            });
        };
    }

    directive.$inject = [];
    function directive(){
        return {
            restrict: 'EA',
            replace: true,
            templateUrl: '/server/i18n.form.html',
            controller: controller,
            controllerAs: 'i18nFormCtrl'
        };
    }

})();