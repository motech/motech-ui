describe('List directive', function(){
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

    it('should replace tagname MOTECH-LIST with SECTION', function(){
        expect(element.prop("tagName")).toEqual("SECTION");
    });

    it('should contain a list-column-header with a sortBy button', function(){
        var sortButton= element.find("a[ng-click|='sortBy(column.id)']");
        expect(sortButton[0].outerHTML).toContain('Sort by bar');
    });

    it('should create two list-column-header elements', function(){
        var numberOfElements = element.find("li[ng-repeat|='column in MotechListCtrl.columns']").length;
        expect(numberOfElements).toBe(2);
    });
});