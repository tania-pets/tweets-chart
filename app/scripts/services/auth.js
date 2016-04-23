/*Acquires a bearer access token based on twitter's client key/secret and stores it in localStorage
* The token is to be used to make twitter API calls
*/
(function() {
  'use strict';

  angular.module('app')
    .factory('AuthService', [
      '$http','$localStorage', 'Config',
      function factory(
        $http, $localStorage, Config
      ) {
        return {
          //gets the token and stores it in localstorage
          authorize: function authorize(clb) {
            var cb = new Codebird;
            cb.setConsumerKey(Config.twitter.clientKey, Config.twitter.clientSecret);
            cb.__call("oauth2_token", {}, function (reply, err) {
               if (err) {
                 console.log("error" + err.error);
                 clb(err.error, null);
                }
                if (reply) {
                  $localStorage.twitter_token = reply.access_token;
                  clb(null, reply.access_token);
                }
            });
          },
          getTwitterToken: function getTwitterToken() {
            return $localStorage.twitter_token;
          },
          //checks if a token already exists
          isTwitterAuthenticated: function isAuthenticated() {
            return Boolean($localStorage.twitter_token);
          }
        };
      }
    ])
  ;
}());
