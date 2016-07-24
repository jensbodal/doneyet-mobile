(function () {
    'use strict';

    angular
    .module('doneyet.playlists')
    .controller('PlaylistsController', PlaylistsController);

    PlaylistsController.$inject = [

    ];

    function PlaylistsController() {
        var vm = this;

        vm.playlists = [
            { title: 'Reggae', id: 1 },
            { title: 'Chill', id: 2 },
            { title: 'Dubstep', id: 3 },
            { title: 'Indie', id: 4 },
            { title: 'Rap', id: 5 },
            { title: 'Cowbell', id: 6 }
        ];
    }
})();