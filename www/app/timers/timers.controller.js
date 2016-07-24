(function () {
    'use strict';

    angular
    .module('doneyet.timers')
    .controller('TimersController', TimersController);

    TimersController.$inject = [
        '$scope',
        '$state',
        'TimerService'
    ];

    function TimersController($scope, $state, TimerService) {
        var vm = this;
        var init = init;
        vm.timers;

        init();

        function init() {
            TimerService.loadTimers().then(function () {
                vm.timers = TimerService.getTimers();
            })
        }
    }
})();