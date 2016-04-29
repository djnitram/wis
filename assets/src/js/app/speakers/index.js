(function() {
  'use strict';

  angular
    .module('app.speakers', [
      'app.speakers.controllers'
    ])
    .config(function($stateProvider) {
      $stateProvider
        .state('app.speakers', {
          url: '/speakers',
          views: {
            'main@': {
              templateUrl: "templates/pages/speakers.tpl.html",
              controller: 'speakersIndexController as vm'
            },
            'keynote-speakers@app.speakers': {
              templateUrl: "templates/partials/speakers.keynote.tpl.html",
              controller: 'speakersKeynoteController as vm'
            },
            'fireside-speakers@app.speakers': {
              templateUrl: "templates/partials/speakers.fireside.tpl.html",
              controller: 'speakersFiresideController as vm'
            }
          }
        })
      ;
    })
  ;
})();
