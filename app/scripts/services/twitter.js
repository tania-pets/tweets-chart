/*
* Makes requests to twitters search api, using the stored auth token
*(if not stored, authservice is called to acquire it)
*/
(function() {
  'use strict';

  angular.module('app')
    .factory('TwitterService',
      function(AuthService) {
        function getToken(cb) {
          if (!AuthService.isTwitterAuthenticated()) {
            AuthService.authorize(function(err, response) {
              if (err) {
                cb(err, null);
              } else {
                cb(null, response);
              }
            })
          } else {
            cb(null, AuthService.getTwitterToken());
          }
        }
        return {
          //searchs query term in twitters search api
          searchTweets: function searchTweets(query, clb) {
            getToken(function(error, bearer) {
              if (error) {
                clb(error, null);
              } else {
                var cb = new Codebird;
                cb.setBearerToken(bearer);
                var params = {q: query, include_entities: 0, count: 500, since:'2016-04-22', until:'2016-04-23'};
                cb.__call("search_tweets", params,
                    function (reply) {
                      clb(null, reply);
                    }, true
                );

              }
            })
          }
        };
      }
    )
  ;
}());
