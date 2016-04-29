(function() {
  'use strict';

  angular
    .module('app.services.videoService', [])
    .factory('VideoService', function PostService($http, $rootScope) {
      var getAll = function() {
        return $http.get('./data/videos.json');
      };

      return {
        getAll: getAll
      } 
    })
  ;
})();
