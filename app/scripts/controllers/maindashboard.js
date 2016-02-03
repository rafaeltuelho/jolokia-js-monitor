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

      $scope.status;
      $scope.currentHeapUsage;

      getHeapMemoryUsage();

      function getHeapMemoryUsage() {
        let heapUsage = jolokiaClient.getHeapMemoryUsage();

        $scope.labels = ["Initial", "Max", "Used", "Commited"];
        $scope.data = [heapUsage.init, heapUsage.max, heapUsage.used, heapUsage.committed];


      }



  }]);
