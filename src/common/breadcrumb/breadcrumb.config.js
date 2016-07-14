(function () {
    'use strict';

    angular.module('motech-common')
        .config(function($breadcrumbProvider) {
            $breadcrumbProvider.setOptions({
                templateUrl: 'common/breadcrumb/breadcrumb.template.html'
            });
        });
})();