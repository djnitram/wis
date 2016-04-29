(function() {
  'use strict';

  angular
    .module('app.blog.controllers.blogShowController', [])
    .controller('blogShowController', function BlogShowController($scope, $stateParams, $timeout, $modal, PostService) {
      var vm  = this;
      vm.post = {};

      $scope.$watch('vm.post.description_raw', function(description) {
        if (description) {
          $timeout(function() {
            $('.download-button a').on('click', function(e) {
              $(this).attr('disabled', 'disabled');

              e.preventDefault();

              var url = $(this).attr('href');

              if (ga && typeof ga === 'function') {
                ga('create', 'UA-57195104-4', 'auto');
                ga('send', {
                  hitType: 'event',
                  eventCategory: 'PDF',
                  eventAction: 'download',
                  eventLabel: 'WATERLOO_INNOVATION_SUMMIT_OCT_2015_POST'
                });

                $timeout(function() {
                  window.location = url;
                }, 1000);
              }
            });

            $('.post-content').fitVids();
          }, 300);
        }
      });

      PostService
        .getOne($stateParams.id)
        .then(function(result) {
          PostService
            .getPostMeta()
            .then(function(metadata) {
              _.forEach(metadata.data, function(md) {
                if (parseInt(md.id, 10) == parseInt(result.data.data.id, 10)) {
                  result.data.data.intro = md.intro;
                  result.data.data.image = md.image;
                  result.data.data.featuredImage = md.featuredImage;
                  result.data.data.facebookImage = md.facebookImage;
                  result.data.data.backgroundPosition = md.backgroundPosition;
                }
              });

              if (result.data.data.description_raw) {
                result.data.data.description_raw = result.data.data.description_raw.replace(/\/waterloo-innovation-summit/g, 'https://uwaterloo.ca/waterloo-innovation-summit');
              }
              vm.post = result.data.data;
            })
          ;
        })
      ;

      vm.showProfile = function(author) {
        var modalInstance = $modal.open({
          animate: true,
          templateUrl: 'templates/components/speaker.modal.tpl.html',
          controller: function($scope, $modalInstance, speaker) {
            $scope.speaker = author;
            $scope.close = function() {
              $modalInstance.dismiss('cancel');
            }
          },
          size: 'lg',
          resolve: {
            speaker: author
          }
        });
      };
    })
  ;
})();
