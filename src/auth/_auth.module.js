(function () {
    'use strict';

    angular
        .module('motech-auth', [])
        .run(checkAuth);

    function checkAuth(){
        console.log("Checking auth");
    }
})();