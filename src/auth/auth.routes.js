(function () {
    'use strict';

    angular.module('motech-auth')
        .config(authRoutes);

    authRoutes.$inject = ['$routeProvider']
    function authRoutes($routeProvider){
        $routeProvider
        .when('/login', {
            templateUrl: '/auth/loginPage.html'
        })
        .when('/logout',{

        });
    }

})();