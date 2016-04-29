(function() {
  'use strict';

  angular
    .module('app.blog.controllers', [
      'app.blog.controllers.blogIndexController',
      'app.blog.controllers.blogShowController',
      'app.blog.controllers.blogRelatedController'
    ])
  ;
})();
