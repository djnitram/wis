(function() {
  'use strict';

  angular
    .module('app.services.sponsorService', [])
    .factory('SponsorService', function SponsorService($http) {
      var getLevels = function() {
        return $http.get('./data/levels.json');
      };

      var getAll = function() {
        return $http.get('./data/sponsors.json');
      };

      return {
        getLevels: getLevels,
        getAll: getAll
      }
    })
  ;
})();
