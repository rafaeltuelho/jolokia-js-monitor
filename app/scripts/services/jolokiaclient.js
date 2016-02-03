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

    var jolokiaUrlBase = 'http://localhost:8080/jolokia/';
    // Create a new jolokia client accessing the agent on the same
    // Host which serves this document:
    var j4p = new Jolokia(jolokiaUrlBase);
    var heapMemoryUsage;

    // Public API here
    return {
      getHeapMemoryUsage: function () {

      // Request the memory information asynchronously and print it on
      // the console
      j4p.request(
          {
            type: "read",
            mbean: "java.lang:type=Memory",
            attribute: "HeapMemoryUsage"
          },
          {
            success: function(response) {
                heapMemoryUsage = response.value;
                console.log(JSON.stringify(response.value));
                //console.log("Heap-Memory used: " + heapMemoryUsage);
            }
          });

        return heapMemoryUsage;
      } // getHeapMemoryUsage()
    };
  });
