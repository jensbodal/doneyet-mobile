(function () {
    'use strict';

    angular
    .module('doneyet.playlists')
    .controller('PlaylistsController', PlaylistsController);

    PlaylistsController.$inject = [
        '$scope',
        '$state',
        'TimerService'
    ];

    function PlaylistsController($scope, $state, TimerService) {
        var vm = this;
        var init = init;
        vm.getTimers = getTimers;

        init();

        function getTimers() {
            return TimerService.getTimers();
        }

        function init() {
            TimerService.loadTimers().then(function () {
                console.log("HERE");
                console.log(TimerService.getTimers());
            })

            
        }

        console.log("me");
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