(function() {
  'use strict';

  angular
    .module('app.services.speakerService', [])
    .factory('SpeakerService', function SpeakerService($http) {
      var filterByType = function(speakers, type) {
        var results = [];

        _.forEach(speakers, function(speaker) {
          if (speaker.type == type) {
            results.push(speaker);
          }
        });

        return results;
      };

      var filterByFeatured = function(speakers, count) {
        var counter = 0;
        var results = [];

        _.forEach(speakers, function(speaker) {
          if (counter < count && !speaker.type) {
            results.push(speaker);
            counter++;
          }
        });

        return results;
      };

      var getAll = function() {
        return $http.get('./data/speakers.json');
      };

      return {
        getAll: getAll,
        filterByType: filterByType,
        filterByFeatured: filterByFeatured
      }
    })
  ;
})();
