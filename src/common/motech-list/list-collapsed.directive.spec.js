describe('List-collapsed directive', function(){
    var scope, element;

    beforeEach(module('motech-common'));
    beforeEach(module('motech-templates'));
    beforeEach(inject(function($compile, $rootScope){
        scope = $rootScope.$new();
        element = angular.element('<motech-list>'+
                                      '<motech-list-collapsible></motech-list-collapsible>'+
                                  '</motech-list>');
        $compile(element)(scope);
        scope.$digest();
    }));

    it('should add a div element with class="motech-list-collapsible', function(){
        var collapsibleElement = element.find('div.motech-list-collapsible');
        expect(collapsibleElement.attr('class')).toBeDefined();
    });

    it('should insert a toggle button', function(){
        var toggleButton = element.find('a.list-item-collapsible-toggle');
        expect(toggleButton[0].outerHTML).toContain('Toggle');
    });
});