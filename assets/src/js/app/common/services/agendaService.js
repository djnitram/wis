(function() {
  'use strict';

  angular
    .module('app.services.agendaService', [])
    .factory('AgendaService', function AgendaService($http) {
      var getAll = function() {
        return $http.get('./data/agenda.json');
      }

      return {
        getAll: getAll
      }
    })
  ;
})();
