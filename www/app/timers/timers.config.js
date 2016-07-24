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
        // all unknown hosts go to playlists
        $urlRouterProvider.otherwise('/app/playlists');

        $stateProvider
            .state('doneyet.timers', {
                url: '/playlists',
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