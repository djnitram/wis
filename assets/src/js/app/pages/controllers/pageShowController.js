(function() {
  'use strict';

  angular
    .module('app.page.controllers.pageShowController', [])
    .controller('pageShowController', function($stateParams, PageService, VideoService, $timeout, $scope) {
      var vm = this;
      vm.page = {};

      if ($stateParams.slug == 'waterloos-innovation-ecosystem') {
        vm.mapOptions = {
          center: new google.maps.LatLng(43.463727, -80.525725),
          zoom: 12,
          mapTypeId: google.maps.MapTypeId.ROADMAP,
          scrollwheel: false,
        };

        $scope.$watch('vm.map', function(newMap, oldMap) {
          if (newMap) {

            var markers = [];
            var infoWindow = new google.maps.InfoWindow({
              content: " "
            });
            var icon = './assets/dist/svg/wins-pin.svg';

            var marker = new google.maps.Marker({
              position: new google.maps.LatLng(43.463727, -80.525725),
              map: vm.map,
              icon: icon,
              title: 'The Centre for International Governane Innovation',
              html: '<div class="info-window">\
                      <h3>The Centre for International Governance Innovation</h3>\
                      <address>\
                        67 Erb St W<br>\
                        Waterloo, ON N2L 6C2<br>\
                      </address>\
                      <a href="https://twitter.com/search?q=%23WINS15" target="_blank" class="btn btn-primary"><i class="fa fa-twitter"></i> #WINS15</a>\
                    </div>'
              });

            markers.push(marker);

            marker = new google.maps.Marker({
              position: new google.maps.LatLng(43.4689513459914, -80.5395531825257),
              map: vm.map,
              icon: icon,
              title: 'University of Waterloo; Mike &amp; Ophelia Lazaridis Quantum-Nano Centre',
              html: '<div class="info-window">\
                      <h3>Mike &amp; Ophelia Lazaridis Quantum-Nano Centre<h3>\
                      <h4>University of Waterloo</h4>\
                      <address>\
                        200 University Ave W<br>\
                        Waterloo, ON N2L 3G1<br>\
                      </address>\
                      <a href="https://twitter.com/search?q=%23WINS15" target="_blank" class="btn btn-primary"><i class="fa fa-twitter"></i> #WINS15</a>\
                    </div>'
            });

            markers.push(marker);

            marker = new google.maps.Marker({
              position: new google.maps.LatLng(43.4515307096243, -80.497848878643),
              map: vm.map,
              icon: icon,
              title: 'Communitech Hub',
              html: '<div class="info-window">\
                      <h3>Communitech Hub</h3>\
                      <address>\
                        151 Charles St W<br>\
                        Kitchener, ON N2G 1H6\
                      </address>\
                      <a href="https://twitter.com/search?q=%23WINS15" target="_blank" class="btn btn-primary"><i class="fa fa-twitter"></i> #WINS15</a>\
                    </div>'
            });

            markers.push(marker);

            marker = new google.maps.Marker({
              position: new google.maps.LatLng(43.450193, -80.489673),
              map: vm.map,
              icon: icon,
              title: 'Conrad Centre for the Performing Arts',
              html: '<div class="info-window">\
                      <h3>Conrad Centre for the Performing Arts</h3>\
                      <address>\
                        36 King St W<br>\
                        Kitchener, ON N2G 1A3\
                      </address>\
                      <a href="https://twitter.com/search?q=%23WINS15" target="_blank" class="btn btn-primary"><i class="fa fa-twitter"></i> #WINS15</a>\
                    </div>'
            });

            markers.push(marker);

            marker = new google.maps.Marker({
              position: new google.maps.LatLng(43.449859, -80.489243),
              map: vm.map,
              icon: icon,
              title: 'The Museum',
              html: '<div class="info-window">\
                      <h3>The Museum</h3>\
                      <address>\
                        10 King St W<br>\
                        Kitchener, ON N2G 1A3\
                      </address>\
                      <a href="https://twitter.com/search?q=%23WINS15" target="_blank" class="btn btn-primary"><i class="fa fa-twitter"></i> #WINS15</a>\
                    </div>'
            });

            markers.push(marker);

            _.forEach(markers, function(marker) {
              google.maps.event.addListener(marker, 'click', function() {
                infoWindow.setContent(this.html);
                infoWindow.open(vm.map, this);
              });
            });
          }
        });

        vm.redrawMap = function() {
          $timeout(function() {
            google.maps.event.trigger(vm.map,'resize');
            vm.map.setCenter(vm.mapOptions.center);
            vm.map.setZoom(vm.mapOptions.zoom);
          }, 300);
        }
      }

      PageService
        .getAll()
        .then(function(result) {
          var pages = result.data;
          vm.page   = PageService.getBySlug(pages, $stateParams.slug);
        })
      ;

      if ($stateParams.slug == 'videos') {
        vm.loadingVideos = true; 
        vm.videos = [];
        VideoService
          .getAll()
          .then(function(result) {
            _.forEach(result.data, function(item) {
              if (item.video_url) {
                item.video_url = item.video_url.replace('https://youtu.be/', 'https://www.youtube.com/embed/');
                item.video_url = item.video_url + '&modestbranding=1&autohide=1&showinfo=0&controls=1';
              }
              vm.videos.push(item);
            });

            $timeout(function() {
              vm.loadingVideos = false;
            }, 1500);
          })
        ;
      }
    })
  ;
})();
