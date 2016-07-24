(function () {
    'use strict';

    angular
        .module('doneyet.playlists')
        .config(PlaylistsConfig);

    PlaylistsConfig.$inject = [
        '$stateProvider',
        '$urlRouterProvider'
    ];

    function PlaylistsConfig($stateProvider, $urlRouterProvider) {
        // all unknown hosts go to playlists
        $urlRouterProvider.otherwise('/app/playlists');

        $stateProvider
            .state('doneyet.playlists', {
                url: '/playlists',
                views: {
                    'menuContent': {
                        templateUrl: 'app/playlists/playlists.html',
                        controller: 'PlaylistsController',
                        controllerAs: 'vm'
                    }
                }
            })
            .state('doneyet.single', {
                url: '/playlists/:playlistId',
                views: {
                    'menuContent': {
                        templateUrl: 'app/playlists/playlist.html',
                        controller: 'PlaylistCtrl'
                    }
                }
            });
    }
        

})();