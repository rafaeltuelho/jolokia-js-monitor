'use strict';

/**
 * @ngdoc function
 * @name jolokiaJsMonitorApp.controller:MaindashboardCtrl
 * @description
 * # MaindashboardCtrl
 * Controller of the jolokiaJsMonitorApp
 */
angular.module('jolokiaJsMonitorApp')
  .controller('MaindashboardCtrl', ['$scope', 'jolokiaClient',
    function ($scope, jolokiaClient) {

      var context = cubism.context()
                      .serverDelay(0)
                      .clientDelay(0)
                      .step(1e3)
                      .size(720);

      var jolokiaUrlBase = 'http://localhost:8080/jolokia';
      // Create a new jolokia client accessing the agent on the same
      // Host which serves this document:
      var j4p = new Jolokia(jolokiaUrlBase);
      var jolokia = context.jolokia(jolokiaUrlBase);
      var handle;

      $scope.status;
      $scope.labels = ["Initial", "Max", "Used", "Commited"];
      getHeapMemoryUsage();

      function getHeapMemoryUsage() {
        //let heapUsage = jolokiaClient.getHeapMemoryUsage();
        // Request the memory information asynchronously and print it on
        // the console
        /**/
        handle = j4p.register(function(heapUsage, threading) {
           //console.log("HeapMemory: " + heapUsage.value.used);
           //console.log("ThreadCount: " + threading.value);

           $scope.data = [heapUsage.value.init, heapUsage.value.max, heapUsage.value.used, heapUsage.value.committed];
           $scope.currentHeapUsage = heapUsage.value.used;

           console.log($scope.data);
           console.log($scope.currentHeapUsage);

         },
         { type: "READ", mbean: "java.lang:type=Memory", attribute: "HeapMemoryUsage"},
         { type: "READ", mbean: "java.lang:type=Threading", attribute: "ThreadCount"});

        j4p.start(10000);

        console.log('jolokia handler started!!!');
        /**/
        /*
        j4p.request(
        {
          type: "read",
          mbean: "java.lang:type=Memory",
          attribute: "HeapMemoryUsage"
        },
        {
          success: function(response) {
              let heapUsage = response.value;
              console.log(JSON.stringify(response.value));
              $scope.data = [heapUsage.init, heapUsage.max, heapUsage.used, heapUsage.committed];
              $scope.currentHeapUsage = heapUsage.used;

              console.log($scope.data);
              console.log($scope.currentHeapUsage);
              //console.log("Heap-Memory used: " + heapMemoryUsage);
          }
        });
        */

        // Read periodically the Heap-Memory use and take 'HeapMemory Usage' as name/label.
        var metricMem = jolokia.metric({
                              type: 'READ',
                              mbean: 'java.lang:type=Memory',
                              attribute: 'HeapMemoryUsage',
                              path: 'used'
                              }, "HeapMemory Usage");

        var metricThreads = jolokia.metric({
                                  type: "READ",
                                  mbean: "java.lang:type=Threading",
                                  attribute:"ThreadCount"
                                  }, "ThreadCount");

        jolokia.start();

        d3.select("#div_chart_mem").call(function(div) {

          div.append("div")
              .attr("class", "axis")
              .call(context.axis().orient("top"));

          div.selectAll(".horizon")
              .data([metricMem, metricThreads])
            .enter().append("div")
              .attr("class", "horizon")
              .call(context.horizon());

          div.append("div")
              .attr("class", "rule")
              .call(context.rule());

        });

        // On mousemove, reposition the chart values to match the rule.
        context.on("focus", function(i) {
          d3.selectAll(".value").style("right", i == null ? null : context.size() - i + "px");
        });
      }



  }]);
