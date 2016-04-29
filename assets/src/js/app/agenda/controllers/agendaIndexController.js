(function() {
  'use strict';

  angular
    .module('app.agenda.controllers.agendaIndexController', [])
    .controller('agendaIndexController', function(AgendaService, PageService, $stateParams, $anchorScroll, $timeout) {
      var vm = this;
      vm.page = {};
      vm.agendas = [];
      vm.topics = [];

      PageService
        .getAll()
        .then(function(result) {
          var pages = result.data;
          vm.page   = PageService.getBySlug(pages, 'agenda');
        })
      ;

      vm.search = {
        date: "Sept 16",
        type: ""
      };

      AgendaService
        .getAll()
        .then(function(result) {
          vm.agendas = result.data;
          setTypes();
          setTopics();

          if ($stateParams.id) {
            _.forEach(vm.agendas, function(agenda) {
              _.forEach(agenda.sessions, function(session) {
                if (parseInt($stateParams.id, 10) == parseInt(session.id, 10)) {
                  vm.search.date = session.date;

                  $timeout(function() {
                    $anchorScroll('session-id-' + session.id);
                  }, 300);
                }
              });
            });
          }

          vm.activeSession = $stateParams.id;
        })
      ;

      vm.searchByDate = function(date) {
        vm.search.date = date;
      };

      vm.searchByType = function(type) {
        if (vm.search.type == type) {
          vm.search.type = '';
        } else {
          vm.search.type = type;
        }
      };

      vm.filterByDate = function(input) {
        if (!vm.search.date) {
          return input;
        }

        if (vm.search.date == input.date) {
          return input;
        }
      };

      vm.filterByType = function(input) {
        if (!vm.search.type) {
          return input;
        }

        if (vm.search.type == input.type) {
          return input;
        }
      };

      function setTypes() {
        vm.types = [];

        _.forEach(vm.agendas, function(agenda) {
          _.forEach(agenda.sessions, function(session) {
            vm.types.push(session.type);
          });
        });

        vm.types = _.uniq(vm.types);
      }

      function setTopics() {
        vm.topics = [];

        _.forEach(vm.agendas, function(agenda) {
          _.forEach(agenda.sessions, function(session) {
            _.forEach(session.topics, function(topic) {
              vm.topics.push(topic);
            });
          });
        });

        vm.topics = _.uniq(vm.topics);
      }
    })
  ;
})();
