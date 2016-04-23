'use strict';

/**
 * Config for the router
 */

angular.module('app')
  .config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('lines', {
        url: "/lines",
        templateUrl: 'views/lines.html',
        controller: 'MainCtrl'
      })
      .state('main', {
        url: "/",
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      $urlRouterProvider.otherwise("/");
  });
