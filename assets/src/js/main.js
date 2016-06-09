(function(angular, faker) {
  angular.module('templates', []);
  angular
    .module('app', [
      'ngFx',
      'ngAnimate',
      'ngAria',
      'ui.bootstrap',
      'ui.router',
      'anim-in-out',
      'ui.map',
      'slick',
      '720kb.socialshare',
      'templates',
      'app.services',
      'app.home',
      'app.agenda',
      'app.blog',
      'app.speakers',
      'app.sponsors',
      'app.page'
    ])
    .filter("sanitize", function($sce) {
      return function(htmlCode) {
        if (htmlCode) {
          htmlCode = htmlspecialchars_decode(htmlCode);
        }
        return $sce.trustAsHtml(htmlCode);
      }
    })
    .filter("trustsrc", function($sce) {
      return function(url) {
        return $sce.trustAsResourceUrl(url);
      }
    })
    .filter('truncate', function () {
      return function (value, wordwise, max, tail) {
        if (!value) return '';

        max = parseInt(max, 10);
        if (!max) return value;
        if (value.length <= max) return value;

        value = value.substr(0, max);
        if (wordwise) {
          var lastspace = value.lastIndexOf(' ');
          if (lastspace != -1) {
            value = value.substr(0, lastspace);
          }
        }

        return value + (tail || ' …');
      };
    })
    .directive('script', function() {
      return {
        restrict: 'E',
        scope: false,
        link: function(scope, elem, attr)
        {
          if (attr.type==='text/javascript-lazy')
          {
            var s = document.createElement("script");
            s.type = "text/javascript";
            var src = elem.attr('src');
            if(src!==undefined)
            {
                s.src = src;
            }
            else
            {
                var code = elem.text();
                s.text = code;
            }
            document.head.appendChild(s);
            elem.remove();
          }
        }
      };
    })
    .run(function ($rootScope,   $state,   $stateParams) {
      $rootScope.$state = $state;
      $rootScope.$stateParams = $stateParams;

      $rootScope.config = {
        stage: 2,
        apikey: '595c4eb9bf3cd1c3f3f8c0e936158acf',
        fbid: '1065397456805193',
        url: 'https://www.waterlooinnovationsummit.com'
      };

      $rootScope.$on("$stateChangeSuccess", function (event, currentRoute, previousRoute) {
        if (currentRoute.name == 'app.sponsors') {
          $rootScope.showSponsors = false;
        } else {
          $rootScope.showSponsors = true;
        }

        if (currentRoute.name == 'app.home') {
          var tint = $('.tint-src').html();
          $('.tint-widget-main').html(tint);
        }

        window.scrollTo(0, 0);
      });

      xhook.before(function(request, callback) {
        //skip browsers that dont use XDR
        if(!window.XDomainRequest)
          return callback();
        //skip requests that aren't cross domain
        var url = request.url;
        var loc = window.location;
        var hostname = loc.hostname + (loc.port ? ":"+loc.port : "");
        if(!/^https?:\/\/([^\?\/]+)/.test(url) || RegExp.$1 === hostname)
          return callback();

        //if not GET, force POST
        var method = request.method;
        if(method !== 'GET') method = 'POST';
        //force same protocol
        url = url.replace(/^https?:/,loc.protocol);
        //request!
        var xdr = new window.XDomainRequest();
        xdr.timeout = request.timeout;
        //proxy events
        var proxy = function(e) {
          xdr['on'+e] = function() {
            request.xhr.dispatchEvent(e);
          };
        };
        var events = ['progress','timeout','error'];
        for(var i = 0; i < events.length; ++i )
          proxy(events[i]);
        //custom onload
        xdr.onload = function() {
          callback({
            status: 200,
            statusText: "OK",
            headers: {
              'Content-Type': xdr.contentType
            },
            text: xdr.responseText
          })
        };
        xdr.open(method, url);
        xdr.send(request.body);
        return
      });
    })
    .config(function($locationProvider, $stateProvider, $urlRouterProvider) {
      $locationProvider.html5Mode(true);

      $urlRouterProvider.otherwise('/');
      // From stackoverflow.com/questions/24420578/handling-trailing-slashes-in-angularui-router
      $urlRouterProvider.rule(function($injector, $location) {
        var path = $location.path();
        var hasTrailingSlash = path[path.length-1] === '/';
        if(hasTrailingSlash) {
          //if last charcter is a slash, return the same url without the slash  
          var newPath = path.substr(0, path.length - 1); 
          return newPath; 
        } 
      });
      $stateProvider
        .state('app', {
          url: '',
          abstract: true,
          views: {
            'sponsors@': {
              templateUrl: "templates/partials/sponsors.tpl.html",
              controller: function($scope, SponsorService) {
                $scope.vm = {};
                $scope.vm.sponsors = [];

                SponsorService
                  .getAll()
                  .then(function(result) {
                    $scope.vm.sponsors = result.data;
                  })
                ;
              }
            }
          }
        })
      ;
    })
  ;
})(window.angular, window.faker);

function onGoogleReady() {
  var html = document.getElementsByTagName('body')[0];
  window.angular.bootstrap(html, ['app']);
}

function htmlspecialchars_decode(string, quote_style) {
  var optTemp = 0,
    i = 0,
    noquotes = false;
  if (typeof quote_style === 'undefined') {
    quote_style = 2;
  }
  string = string.toString()
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>');
  var OPTS = {
    'ENT_NOQUOTES'          : 0,
    'ENT_HTML_QUOTE_SINGLE' : 1,
    'ENT_HTML_QUOTE_DOUBLE' : 2,
    'ENT_COMPAT'            : 2,
    'ENT_QUOTES'            : 3,
    'ENT_IGNORE'            : 4
  };
  if (quote_style === 0) {
    noquotes = true;
  }
  if (typeof quote_style !== 'number') {
    // Allow for a single string or an array of string flags
    quote_style = [].concat(quote_style);
    for (i = 0; i < quote_style.length; i++) {
      // Resolve string input to bitwise e.g. 'PATHINFO_EXTENSION' becomes 4
      if (OPTS[quote_style[i]] === 0) {
        noquotes = true;
      } else if (OPTS[quote_style[i]]) {
        optTemp = optTemp | OPTS[quote_style[i]];
      }
    }
    quote_style = optTemp;
  }
  if (quote_style & OPTS.ENT_HTML_QUOTE_SINGLE) {
    string = string.replace(/&#0*39;/g, "'"); // PHP doesn't currently escape if more than one 0, but it should
    // string = string.replace(/&apos;|&#x0*27;/g, "'"); // This would also be useful here, but not a part of PHP
  }
  if (!noquotes) {
    string = string.replace(/&quot;/g, '"');
  }
  // Put this in last place to avoid escape being double-decoded
  string = string.replace(/&amp;/g, '&');

  return string;
}
