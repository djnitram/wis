(function() {
  angular
    .module('app.sponsors', [
      'app.sponsors.controllers'
    ])
    .config(function($stateProvider) {
      $stateProvider
        .state('app.sponsors', {
          url: '/sponsors',
          views: {
            'main@': {
              templateUrl: "templates/pages/sponsors.tpl.html",
              controller: 'sponsorsIndexController as vm'
            }
          }
        })
      ;
    })
  ;
})();
