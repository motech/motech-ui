describe('List-item directive', function(){
    var scope, element;

    beforeEach(module('motech-common'));
    beforeEach(module('motech-templates'));
    beforeEach(inject(function($compile, $rootScope){
        scope = $rootScope.$new();
        element = angular.element('<motech-list>'+
                                      '<motech-list-item>'+
                                          '<motech-list-column column-title="foo" ></motech-list-column>'+
                                          '<motech-list-column column-title="bar" sortable="true"></motech-list-column>'+
                                      '</motech-list-item>'+
                                  '</motech-list>');
        $compile(element)(scope);
        scope.$digest();
    }));

    it('should insert a list element with a class="list-item"', function(){
        expect(element.find('li.list-item').attr('class')).toBeDefined();
    });

    it('should add a description element for each motech-list-column', function(){
        var list = element.find('dl');
        var numberOfElements = list.find('dd').length;
        expect(numberOfElements).toBe(2);
    });
});