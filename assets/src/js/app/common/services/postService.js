(function() {
  'use strict';

  angular
    .module('app.services.postService', [])
    .factory('PostService', function PostService($http, $rootScope) {
      var getAll = function() {
        return $http.get('./posts.php', { cache: true });
      };

      var getOne = function(id) {
        return $http.get('./post.php?id=' + id, { cache: true });
      };

      var getRelated = function(id) {
        return $http.get('/related/' + id);
      };

      var getPostMeta = function() {
        return $http.get('./data/posts2.json');
      };

      return { 
        getPostMeta: getPostMeta,
        getAll: getAll,
        getOne: getOne,
        getRelated: getRelated
      }
    })
  ;
})();
