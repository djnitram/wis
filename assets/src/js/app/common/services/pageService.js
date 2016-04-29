(function() {
  'use strict';

  angular
    .module('app.services.pageService', [])
    .factory('PageService', function PageService($http) {
      var getAll = function() {
        return $http.get('./data/pages.json');
      }

      var getOne = function(slug) {
        return $http.get('/pages/' + slug);
      }

      var getBySlug = function(pages, slug) {
        var result = {};

        _.forEach(pages, function(page) {
          if (page.slug == slug) {
            result = page;
          }
        });

        return result;
      }

      return {
        getAll: getAll,
        getOne: getOne,
        getBySlug: getBySlug
      }
    })
  ;
})();
