describe('Angular Busy Button: Module', function() {
  
  var element,
      $compile,
      $rootScope;
  
  beforeEach(module('angular-busy-button'));
  
  beforeEach(inject(function(_$compile_, _$rootScope_){
    $compile = _$compile_;
    $rootScope = _$rootScope_;
    element = $compile('<button busy-button="myFunc()">Click Me</button>')($rootScope);
    $rootScope.$digest();
  }));
  
  it('should set the element to busy on click', inject(function($q, $timeout, $log) {
    var element = $compile('<button busy-button>Click Me</button>')($rootScope);
    var scope = element.isolateScope();
    element[0].click();
    expect(scope.busyFlag).toBe(true);
  }));
  
  it('should log a warning message to the user for bad promise', inject(function($log) {
    spyOn($log, 'warn');
    $rootScope.myFunc = function() {
      return true;
    };
    var element = $compile('<button busy-button="myFunc()">Click Me</button>')($rootScope);
    var scope = element.isolateScope();
    element[0].click();
    expect($log.warn).toHaveBeenCalled();
  }));
  
  it('should work with function that returns promise', inject(function($q, $timeout, $log) {
    spyOn($log, 'warn');
    $rootScope.myFunc = function() {
      var deferred = $q.defer();
      deferred.resolve();
      return deferred.promise;
    };
    var element = $compile('<button busy-button="myFunc()">Click Me</button>')($rootScope);
    var scope = element.isolateScope();
    element[0].click();
    expect($log.warn).not.toHaveBeenCalled();
  }));
  
});