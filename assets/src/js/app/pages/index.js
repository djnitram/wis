(function() {
  'use strict';

  angular
    .module('app.page', [
      'app.page.controllers'
    ])
    .config(function($stateProvider) {
      $stateProvider
        .state('app.page', {
          url: '/:slug',
          views: {
            'main@': {
              templateUrl: "templates/pages/page.tpl.html",
              controller: 'pageShowController as vm'
            }
          }
        })
      ;
    })
  ;
})();
