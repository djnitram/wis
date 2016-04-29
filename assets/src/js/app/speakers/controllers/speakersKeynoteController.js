(function() {
  'use strict';

  angular
    .module('app.speakers.controllers.speakersKeynoteController', [])
    .controller('speakersKeynoteController', function($modal, SpeakerService) {
      var vm = this;
      vm.speakers = [];

      SpeakerService
        .getAll()
        .then(function(result) {
          vm.speakers = SpeakerService.filterByType(result.data, "Keynote Speaker");
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
