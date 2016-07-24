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

        vm.timers = [];

        vm.loadTimer = loadTimer;

        init();

        function init() {
            TimerService.loadTimers().then(function () {
                vm.timers = TimerService.getTimers();
            })
        }

        function loadTimer(timer) {
            console.log(timer);
            $state.go('doneyet.timer', { timer: timer });
        }
    }
})();