(function() {
  'use strict';

  angular
    .module('app.services', [
      'app.services.agendaService',
      'app.services.pageService',
      'app.services.postService',
      'app.services.speakerService',
      'app.services.sponsorService',
      'app.services.videoService'
    ])
  ;
})();
