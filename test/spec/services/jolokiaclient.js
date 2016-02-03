'use strict';

describe('Service: jolokiaClient', function () {

  // load the service's module
  beforeEach(module('jolokiaJsMonitorApp'));

  // instantiate service
  var jolokiaClient;
  beforeEach(inject(function (_jolokiaClient_) {
    jolokiaClient = _jolokiaClient_;
  }));

  it('should do something', function () {
    expect(!!jolokiaClient).toBe(true);
  });

});
