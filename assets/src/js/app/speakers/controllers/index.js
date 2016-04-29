(function() {
  'use strict';

  angular
    .module('app.speakers.controllers', [
      'app.speakers.controllers.speakersIndexController',
      'app.speakers.controllers.speakersKeynoteController',
      'app.speakers.controllers.speakersFiresideController'
    ])
  ;
})();
