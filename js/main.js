(function() {
  angular
    .module('app', [
      'ui.router',
      'app.blog'
    ])
    .run(
      [
        '$rootScope', '$state', '$stateParams',
        function ($rootScope,   $state,   $stateParams) {
          $rootScope.$state = $state;
          $rootScope.$stateParams = $stateParams;
        }
      ]
    )
    .config(
      [
        '$stateProvider', '$urlRouterProvider',
        function($stateProvider, $urlRouterProvider) {
          $urlRouterProvider.otherwise('/');

          $stateProvider
            .state('summit', {
              url: '/',
              templateUrl: "templates/pages/summit.tpl.html"
            })
            .state('agenda', {
              url: '/agenda',
              templateUrl: "templates/pages/agenda.tpl.html"
            })
            .state('speakers', {
              url: '/speakers',
              templateUrl: "templates/pages/speakers.tpl.html"
            })
            .state('about', {
              url: '/about',
              templateUrl: "templates/pages/about.tpl.html"
            })
            .state('sponsors', {
              url: '/sponsors',
              templateUrl: "templates/pages/sponsors.tpl.html"
            })
            .state('register', {
              url: '/register',
              templateUrl: "templates/pages/register.tpl.html"
            })
          ;
        }
      ]
    )
  ;

  angular
    .module('app.blog', [
      'ui.router',
      'app.blog.controllers'
    ])
    .config(
      [
        '$stateProvider',
        function($stateProvider) {
          $stateProvider
            .state('blog', {
              url: '/blog',
              templateUrl: "templates/pages/blog.tpl.html",
              controller: 'blogIndexController as vm'
            })
            .state('blog.show', {
              url: '/:id',
              views: {
                '@': {
                  templateUrl: "templates/components/post.full.tpl.html",
                  controller: 'blogShowController as vm'
                },
                'related-posts@blog.show': {
                  templateUrl: "templates/partials/posts.related.tpl.html",
                  controller: 'blogRelatedController as vm'
                }
              }
            })
          ;
        }
      ]
    )
  ;

  angular
    .module('app.blog.controllers', [
      'app.blog.controllers.blogIndexController',
      'app.blog.controllers.blogShowController',
      'app.blog.controllers.blogRelatedController'
    ])
  ;

  angular
    .module('app.blog.controllers.blogIndexController', [])
    .controller('blogIndexController', function() {
      var vm   = this;
      vm.posts = [];
      vm.featuredPost = {};

      for (var i = 0; i < 10; i++) {
        vm.posts.push(generatePost());
      }

      vm.featuredPost = generatePost();
    })
  ;

  angular
    .module('app.blog.controllers.blogRelatedController', [])
    .controller('blogRelatedController', function() {
      var vm = this;
      vm.posts = [];

      for (var i = 0; i < 3; i++) {
        vm.posts.push(generatePost());
      }
    })
  ;

  angular
    .module('app.blog.controllers.blogShowController', [])
    .controller('blogShowController', function() {
      var vm  = this;
      vm.post = generatePost();
    })
  ;

  /**
   * Helper functions
   * @todo create service
   */
  function generatePost() {
    return {
      id: faker.random.number(),
      title: faker.lorem.sentence(),
      subtitle: faker.lorem.sentence(),
      date: Date.parse(faker.date.recent()),
      excerpt: faker.lorem.paragraph(),
      image: faker.image.imageUrl(370,279,imageCategory()),
      featuredImage: faker.image.imageUrl(1920, 604, imageCategory()),
      relatedImage: faker.image.imageUrl(370, 324, imageCategory()),
      author: {
        name: faker.name.findName(),
        avatar: faker.image.imageUrl(256, 256, 'people'),
        handle: faker.internet.userName(),
        bio: faker.lorem.paragraph()
      }
    }
  }

  function imageCategory() {
    var categories = ['cats', 'nightlife', 'abstract', 'transport', 'city', 'food', 'nightlife', 'technics', 'people', 'business'];
    return categories[Math.floor(Math.random()*categories.length)];
  }
})();
