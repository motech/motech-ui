(function(){
    'use strict';

    angular.module('motech-common')
        .directive('ngSubmit', function(BootstrapDialog){
            return {
                require: '?form',
                priority: 10,
                link: {
                    pre: function(scope, element, attrs, formCtrl){
                        element.on('submit', function(event){
                            if(formCtrl && formCtrl.$invalid){
                                event.stopImmediatePropagation();
                                event.preventDefault();

                                formCtrl.$setSubmitted();
                                scope.$apply();
                                
                                event.target.focus();
                            }
                        });
                    }
                }
            };
        });

})();