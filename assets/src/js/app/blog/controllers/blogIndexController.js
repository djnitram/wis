(function() {
  'use strict';

  angular
    .module('app.blog.controllers.blogIndexController', [])
    .controller('blogIndexController', function BlogIndexController(PostService) {
      var vm   = this;
      vm.posts = [];
      vm.term = '';
      vm.tempTerm = '';
      vm.loadingPosts = true;

      vm.search = function() {
        vm.term = vm.tempTerm;
      };

      function hydratePost(id) {
        PostService
          .getOne(id)
          .then(function(result) {
            var post = result.data.data;

            if (vm.featuredPost && vm.featuredPost.id == post.id) {
              vm.featuredPost.description = post.description;
            } else {
              for (var i = 0; i < vm.posts.length; i++) {
                if (vm.posts[i].id == post.id) {
                  vm.posts[i].description = post.description;
                }
              }
            }
          }, function() {
            hydratePost(id); // Try again
          })
        ;
      }

      function hydratePostMetaData() {
        PostService
          .getPostMeta()
          .then(function(result) {
            var postMetaDatum = result.data;

            _.forEach(postMetaDatum, function(postMetaData) {
              for (var i = 0; i < vm.posts.length; i++) {
                if (vm.posts[i].id == postMetaData.id) {
                  vm.posts[i].image = postMetaData.image;
                  vm.posts[i].featuredImage = postMetaData.featuredImage;
                  vm.posts[i].description = postMetaData.description;
                }
              }
            });

            _.forEach(vm.posts, function(post) {
              if (!post.description) {
                hydratePost(post.id);
              }
            });

            setFeaturedPost();
          })
        ;
      }

      function setFeaturedPost() {
        for (var i = 0; i < vm.posts.length; i++) {
          if (!vm.featuredPost && vm.posts[i].featuredImage) {
            vm.featuredPost = vm.posts[i];
            break;
          }
        }

        vm.loadingPosts = false;
      }

      PostService
        .getAll()
        .then(function(result) {
          var posts = result.data.data;

          _.forEach(posts, function(post) {
            if (moment(post.published).isAfter(moment().startOf('year'))) {
              vm.posts.push(post);
            }
          });

          hydratePostMetaData();
        })
      ;
    })
  ;
})();
