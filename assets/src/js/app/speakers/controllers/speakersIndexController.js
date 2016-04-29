(function() {
  'use strict';

  angular
    .module('app.speakers.controllers.speakersIndexController', [])
    .controller('speakersIndexController', function($modal, PageService, SpeakerService) {
      var vm = this;
      vm.page = {};
      vm.speakers = [];

      PageService
        .getAll()
        .then(function(result) {
          var pages = result.data;
          vm.page  = PageService.getBySlug(pages, 'speakers');
        })
      ;

      SpeakerService
        .getAll()
        .then(function(result) {
          vm.speakers = result.data;
          vm.speakers = _.sortByAll(vm.speakers, ['lastName', 'firstName']);
        })
      ;

      vm.showSpeaker = function(speaker) {
        var modalInstance = $modal.open({
          animate: true,
          templateUrl: 'templates/components/speaker.modal.tpl.html',
          controller: function($scope, $modalInstance, speaker) {
            $scope.speaker = speaker;
            $scope.close = function() {
              $modalInstance.dismiss('cancel');
            }
          },
          size: 'lg',
          resolve: {
            speaker: speaker
          }
        });
      };
    })
  ;
})();
