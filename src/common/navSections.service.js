(function(){
    'use strict';

    angular.module('motech-common')
        .service('NavSectionService', service);

    service.$inject = [];
    function service(){
        var sections = [];
        var activeSection = false;

        this.sections = sections;
        this.add = addSection;
        this.activate = makeSectionActive;
        this.isActive = isSectionActive; 

        function isSection(name){
            if(sections.indexOf(name) < 0){
                return false;
            }
            return true;
        }
        function addSection(name){
            if(!isSection(name)){
                sections.push(name);
            }
        }
        function isSectionActive(name){
            if(name == activeSection){
                return true;
            }
            return false;
        }
        function makeSectionActive(name){
            if(isSection(name)){
                activeSection = name;
            }
        }

        return this;
    }

})();