'use strict';

describe('Controller: MaindashboardCtrl', function () {

  // load the controller's module
  beforeEach(module('jolokiaJsMonitorApp'));

  var MaindashboardCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MaindashboardCtrl = $controller('MaindashboardCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(MaindashboardCtrl.awesomeThings.length).toBe(3);
  });
});
