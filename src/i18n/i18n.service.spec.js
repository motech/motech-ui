describe('i18n Service', function() {
  var rootScope, httpBackend, translate, i18nService, serverService;

  beforeEach(module('motech-i18n'));
  beforeEach(module('motech-templates'));

  beforeEach(inject(function($rootScope, $httpBackend, $translate, _i18nService_, _ServerService_){
    rootScope = $rootScope;
    httpBackend = $httpBackend;
    translate = $translate;
    i18nService = _i18nService_;
    serverService = _ServerService_;

    serverService.setReady(true);
  }));

  beforeEach(function(){
    httpBackend.when('GET', 'i18n-messages/motech-messages.en.json')
    .respond({
      'sample.message': 'Foo',
      'sample.other': 'Bar',
      'sample.greeting': 'Hello {name}',
      'sample.interoperate': 'The {0} does {1}'
    });

    httpBackend.when('GET', serverService.formatURL('/module/server/lang/locate'))
    .respond({
      'sample.message': 'Message',
      'sample.other': 'Other'
    });

    httpBackend.when('GET', 'i18n-messages/motech-messages.pl.json')
    .respond(404, '');
  });

  beforeEach(function(){
    httpBackend.when('GET', serverService.formatURL('/module/server/lang/list'))
    .respond({
      "en":"English",
      "pl":"Polski"
    });

    var currentLanguage = "en";
    httpBackend.when('GET', serverService.formatURL('/module/server/lang'))
    .respond(function(){
      return [200, currentLanguage];
    });

    httpBackend.when('POST', serverService.formatURL('module/server/userlang'))
    .respond(function(method, url, data){
      var requestData = JSON.parse(data);
      if(requestData.language){
        currentLanguage = requestData.language;
        return [200, ""];
      } else {
        return [500, ""];
      }
    });
  });

  beforeEach(function(){
    spyOn(i18nService, 'getLanguages').and.callThrough();
    spyOn(translate, 'use').and.callThrough();
  });

  it('Can get language configuration from Server', function() {
    var languages = [];

    expect(i18nService.getCurrentLanguage()).not.toBeTruthy();

    i18nService.getLanguages()
    .then(function(_languages){
      languages = _languages;
    });
    
    httpBackend.flush();
    rootScope.$apply();
    
    expect(i18nService.getCurrentLanguage().key).toEqual('en');
    expect(languages.length).toEqual(2);
  });

  it('Can set server language configuration', function(){
    i18nService.setLanguage('pl');

    httpBackend.flush();
    rootScope.$apply();

    expect(i18nService.getCurrentLanguage().key).toBe("pl");
    expect(translate.use.calls.any()).toBeTruthy();
  });

  it('Can have server languages overridden by local languages', function(){
    expect(i18nService.getMessage("sample.message")).toEqual("sample.message");

    i18nService.setLanguage('en');
    httpBackend.flush();
    rootScope.$apply();

    expect(i18nService.getMessage("sample.message")).not.toEqual("sample.message");
    expect(i18nService.getMessage("sample.message")).not.toEqual("Message");
    expect(i18nService.getMessage("sample.message")).toEqual("Foo");
  });

  it('Can fail to load local language, and still load server language', function(){
    expect(i18nService.getMessage("sample.message")).toEqual("sample.message");

    i18nService.setLanguage('pl');
    httpBackend.flush();
    rootScope.$apply();

    expect(i18nService.getMessage("sample.message")).not.toEqual("sample.message");
    expect(i18nService.getMessage("sample.message")).toEqual("Message");
  });

  it('Can interoperate paramerters into a message', function(){
    i18nService.setLanguage('en');
    httpBackend.flush();
    rootScope.$apply();

    expect(i18nService.getMessage("sample.greeting", {'name': "World"})).toEqual('Hello World');
    expect(i18nService.getMessage("sample.interoperate", "Foo", "Bar")).toEqual('The Foo does Bar');
    expect(i18nService.getMessage("sample.interoperate", ["Jack", "Rabbit"])).toEqual('The Jack does Rabbit');
  });

});