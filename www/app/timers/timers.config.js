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
                url: '/playlists/:playlistId',
                views: {
                    'menuContent': {
                        templateUrl: 'app/timers/playlist.html',
                        controller: 'PlaylistCtrl'
                    }
                }
            });
    }
        

})();