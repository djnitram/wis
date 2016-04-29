(function() {
  'use strict';

  angular
    .module('app.home.controllers.homeController', [])
    .controller('homeController', function($rootScope, $scope, $modal, AgendaService, PageService, PostService, SpeakerService, VideoService) {
      var vm = this;

      var postCount = 3;

      if ($rootScope.config.stage == 2) {
        postCount = 6;
      }

      vm.agendas = [];
      vm.session = null;
      vm.numSessions = 0;
      vm.page = {};
      vm.keynoteSpeakers = [];
      vm.featuredSpeakers = [];
      vm.posts = [];
      vm.moreSessions = true;
      vm.highlightVideos = [];

      VideoService
        .getAll()
        .then(function(result) {
          _.forEach(result.data, function(item) {
            if (item.sticky == '1') {
              if (item.video_url) {
                item.video_url = item.video_url.replace('https://youtu.be/', 'https://www.youtube.com/embed/');
                item.video_url = item.video_url + '&modestbranding=1&autohide=1&showinfo=0&controls=1';
              }
              vm.highlightVideos.push(item);
            }
          });
        });

      if ($rootScope.config.stage == 2) {
        AgendaService
          .getAll()
          .then(function(result) {
            vm.agendas = result.data;

            _.forEach(vm.agendas, function(agenda) {
              vm.numSessions = vm.numSessions + agenda.sessions.length;
            });

            var sessionCount = 0;

            _.forEach(vm.agendas, function(agenda) {
              _.forEach(agenda.sessions, function(session) {
                if (!vm.session && moment(agenda.date + ' 2015 ' + session.startTime).isAfter(moment())) {
                  vm.session = session;
                } else if (!vm.session && sessionCount == vm.numSessions - 1) {
                  vm.session = session;
                  vm.moreSessions = false;
                }

                sessionCount++;
              });
            });
          })
        ;

        vm.setNextSession = function() {
          var currentId    = parseInt(vm.session.id, 10);
          var nextSession  = null;
          var sessionCount = 0;

          _.forEach(vm.agendas, function(agenda) {
            _.forEach(agenda.sessions, function(session) {
              if (!nextSession && parseInt(session.id, 10) > currentId) {
                nextSession = session;
              } else if (!nextSession && sessionCount == vm.numSessions - 1) {
                nextSession = session;
                vm.moreSessions = false;
              }

              sessionCount++;
            });
          });

          vm.session = nextSession;
        };
      }

      PageService
        .getAll()
        .then(function(result) {
          var pages = result.data;
          vm.page   = PageService.getBySlug(pages, 'home');
        })
      ;

      PostService
        .getAll()
        .then(function(result) {
          var posts = result.data.data;
          posts     = posts.slice(0, postCount);

          _.forEach(posts, function(post) {
            if (moment(post.published).isAfter(moment().startOf('year'))) {
              PostService
                .getPostMeta()
                .then(function(metadata) {
                  _.forEach(metadata.data, function(md) {
                    if (parseInt(post.id, 10) == parseInt(md.id, 10)) {
                      post.intro = md.intro;
                      post.image = md.image;
                      post.featuredImage = md.featuredImage;
                    }
                  });

                  if (!vm.featuredPost && post.featuredImage) {
                    vm.featuredPost = post;
                  } else {
                    vm.posts.push(post);
                  }
                })
              ;
            }
          });
        })
      ;

      SpeakerService
        .getAll()
        .then(function(result) {
          vm.featuredSpeakers = SpeakerService.filterByFeatured(result.data, 3);
        })
      ;

      SpeakerService
        .getAll()
        .then(function(result) {
          vm.keynoteSpeakers = SpeakerService.filterByType(result.data, "Keynote Speaker");
        })
      ;

      vm.mapOptions = {
        center: new google.maps.LatLng(43.479872, -80.515221),
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        scrollwheel: false,
        navigationControl: false,
        mapTypeControl: false,
        scaleControl: false,
        draggable: false,
        disableDefaultUI: true
      };

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

      $scope.$watch('map', function(map) {
        if (map) {
          new google.maps.Marker({
            map: map,
            icon: './assets/dist/svg/wins-pin.svg',
            position: vm.mapOptions.center
          });
        }
      });
    })
  ;
})();
