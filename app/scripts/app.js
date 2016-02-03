'use strict';

/**
 * @ngdoc overview
 * @name jlokiaJsMonitorApp
 * @description
 * # jlokiaJsMonitorApp
 *
 * Main module of the application.
 */
angular
  .module('jolokiaJsMonitorApp', [
    'ngAnimate',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'chart.js'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .when('/mainDashboard', {
        templateUrl: 'views/maindashboard.html',
        controller: 'MaindashboardCtrl',
        controllerAs: 'mainDashboard'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
