(function () {
    'use strict';

    angular
        .module('doneyet.timers')
        .config(PlaylistsConfig);

    PlaylistsConfig.$inject = [
        '$stateProvider',
        '$urlRouterProvider'
    ];

    function PlaylistsConfig($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('doneyet.timers', {
                url: '/timers',
                views: {
                    'menuContent': {
                        templateUrl: 'app/timers/timers.html',
                        controller: 'TimersController',
                        controllerAs: 'vm'
                    }
                }
            })
            .state('doneyet.timer', {
                url: '/timers/timer',
                params: {
                    timer: null
                },
                views: {
                    'menuContent': {
                        templateUrl: 'app/timers/timer/timer.html',
                        controller: 'TimerController',
                        controllerAs: 'vm'
                    }
                }
            });
    }

})();