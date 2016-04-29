(function() {
  'use strict';

  angular
    .module('app.sponsors.controllers.sponsorsIndexController', [])
    .controller('sponsorsIndexController', function(PageService, SponsorService) {
      var vm  = this;
      vm.page = {};
      vm.levels = [];

      PageService
        .getAll()
        .then(function(result) {
          var pages = result.data;
          vm.page   = PageService.getBySlug(pages, 'sponsors');
        })
      ;

      SponsorService
        .getLevels()
        .then(function(result) {
          vm.levels = result.data;
        })
      ;
    })
  ;
})();
