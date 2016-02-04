'use strict';

/**
 * @ngdoc service
 * @name jolokiaJsMonitorApp.jolokiaClient
 * @description
 * # jolokiaClient
 * Factory in the jolokiaJsMonitorApp.
 */
angular.module('jolokiaJsMonitorApp')
  .factory('jolokiaClient', function () {

    var jolokiaUrlBase = 'http://localhost:8080/jolokia';
    // Create a new jolokia client accessing the agent on the same
    // Host which serves this document:
    var j4p = new Jolokia(jolokiaUrlBase);
    var jolokiaResponse;

    // Public API here
    return {
      getHeapMemoryUsage: function () {

        // Request the memory information asynchronously and print it on
        // the console
        j4p.register(function(resp1,resp2) {
           console.log("HeapMemory used: " + resp1.value);
           console.log("ThreadCount: " + resp2.value);
         },
         { type: "READ", mbean: "java.lang:type=Memory", attribute: "HeapMemoryUsage", path: "used"},
         { type: "READ", mbean: "java.lang:type=Threading", attribute: "ThreadCount"});

        j4p.start(10000);

        return jolokiaResponse;
      } // getHeapMemoryUsage()
    };
  });
