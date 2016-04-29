(function() {
  'use strict';

  angular
    .module('app.blog', [
      'app.blog.controllers'
    ])
    .config(function($stateProvider) {
      $stateProvider
        .state('app.blog', {
          url: '/blog',
          views: {
            'main@': {
              templateUrl: "templates/pages/blog.tpl.html",
              controller: 'blogIndexController as vm'
            }
          }
        })
        .state('app.blog.show', {
          url: '/:id',
          views: {
            'main@': {
              templateUrl: "templates/components/post.full.tpl.html",
              controller: 'blogShowController as vm'
            },
            'related-posts@app.blog.show': {
              templateUrl: "templates/partials/posts.related.tpl.html",
              controller: 'blogRelatedController as vm'
            }
          }
        })
      ;
    })
  ;
})();
