(function(){
    'use strict';

    angular.module('motech-common')
    .factory('CommonFactory', function() {
        var root = {};
        root.parseResponse = function (responseData, defaultMsg) {
            var msg = { value: '', literal: false, params: [] };

            if ((typeof(responseData) === 'string') && responseData.startsWith('key:') && !responseData.endsWith('key')) {
                if (responseData.indexOf('params:') !== -1) {
                    msg.value = responseData.split('\n')[0].split(':')[1];
                    msg.params = responseData.split('\n')[1].split(':')[1].split(',');
                } else {
                    msg.value = responseData.split(':')[1];
                }
            } else if ((typeof(responseData) === 'string') && responseData.startsWith('literal:')) {
                msg.value = responseData.split(':')[1];
                msg.literal = true;
            } else if (defaultMsg) {
                msg.value = defaultMsg;
            }
            return msg;
        };
        return root;
    });
})();
