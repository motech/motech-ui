
describe('List directive',function(){
  var scope, element, MotechListCtrl, directiveScope;
  beforeEach(module('motech-common'));
  beforeEach(module('motech-templates'));

  beforeEach(inject(function($compile, $rootScope,$controller){
    scope = $rootScope.$new();
    element = angular.element('<motech-list>'+
                                '<motech-list-item>'+
                                  '<motech-list-column column-title="foo" ></motech-list-column>'+
                                  '<motech-list-column column-title="bar" sortable="true"></motech-list-column>'+
                                  '<motech-list-collapsible></motech-list-collapsible>'+
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
    var count = element.find("li[ng-repeat|='column in MotechListCtrl.columns']").length;
    expect(count).toBe(2);
  });

  describe('- list item directive', function(){

    it('should insert a list element with a class="list-item"', function(){
      expect(element.find('li.list-item').attr('class')).toBeDefined();
    });

    it('should add a description element for each motech-list-column',function(){
      var list = element.find('dl');
      var count = list.find('dd').length;
      expect(count).toBe(2);
    });
  });

  describe('- list collapsed directive', function(){

    it('should add a div element with class="motech-list-collapsible',function(){
      var collapsibleElement = element.find('li.list-item').find('div.motech-list-collapsible');
      expect(collapsibleElement.attr('class')).toBeDefined();
    });

    it('should insert a toggle button',function(){
      var toggleButton = element.find('a.list-item-collapsible-toggle');
      expect(toggleButton[0].outerHTML).toContain('Toggle');
    });
  });

});