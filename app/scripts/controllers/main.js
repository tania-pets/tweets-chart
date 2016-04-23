'use strict';

/**
 * @ngdoc function
 * @name app.controller:MainCtrl
 * @description
 * # MainCtrl
 * Main Controller. Calls TwitterService to fetch statuses for selected query and applies o scope
 * in order to display graphs
 */
angular.module('app')
  .controller('MainCtrl', function ($scope, TwitterService) {
    $scope.loading  = true;
    $scope.queries = ['#vodafone', 'eurobank'];
    $scope.options = {query : '#vodafone'};
    $scope.loadTweets =  function() {
      $scope.loading  = true;
      TwitterService.searchTweets($scope.options.query, function(error, tweets) {
        $scope.loading  = false;
        if (error) {
          $scope.error =  error;
        } else {
          $scope.statuses = tweets.statuses;
        }
        $scope.$apply();
      })
    }
    $scope.loadTweets();

  });
