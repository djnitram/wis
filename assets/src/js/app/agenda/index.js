(function() {
  'use strict';

  angular
    .module('app.agenda', [
      'app.agenda.controllers'
    ])
    .config(
      [
        '$stateProvider',
        function($stateProvider) {
          $stateProvider
            .state('app.agenda', {
             url: '/agenda',
              views: {
                'main@': {
                  templateUrl: "templates/pages/agenda.tpl.html",
                  controller: 'agendaIndexController as vm'
                }
              }
            })
          ;
        }
      ]
    )
  ;
})();
