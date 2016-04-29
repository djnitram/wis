(function() {
  'use strict';

  angular
    .module('app.home', [
      'app.home.controllers'
    ])
    .config(function($stateProvider) {
      $stateProvider
        .state('app.home', {
          url: '/',
          views: {
            'main@': {
              templateUrl: "templates/pages/home.tpl.html",
              controller: 'homeController as vm'
            }
          }
        })
      ;
    })
  ;
})();
