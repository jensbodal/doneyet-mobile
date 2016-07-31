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

        vm.addTimer = addTimer;
        vm.loadTimer = loadTimer;

        init();

        function init() {
            $scope.$on('$ionicView.enter', function (e) {
                TimerService.loadTimers().then(function () {
                    if (!angular.equals(vm.timers, TimerService.getTimers())) {
                        vm.timers = TimerService.getTimers();
                    }
                })
            });
        }

        function addTimer() {
            var timer = {};
            $state.go('doneyet.timer', { timer: timer, existingTimer: false });
        }

        function loadTimer(timer) {
            TimerService.getTimer(timer)
            .then(function (response) {
                if (!angular.equals(response, timer)) {
                    timer = response;
                }
                $state.go('doneyet.timer', { timer: timer, existingTimer: true });
            })
        }
    }
})();