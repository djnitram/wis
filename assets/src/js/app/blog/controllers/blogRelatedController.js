(function() {
  'use strict';

  angular
    .module('app.blog.controllers.blogRelatedController', [])
    .controller('blogRelatedController', function BlogRelatedController(PostService) {
      var vm = this;
      vm.posts = [];

      PostService
        .getRelated()
        .then(function(result) {
          vm.posts = result.data;
        })
      ;
    })
  ;
})();
