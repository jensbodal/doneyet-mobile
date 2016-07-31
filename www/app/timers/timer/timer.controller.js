(function () {
    'use strict';

    angular
    .module('doneyet.timers')
    .controller('TimerController', TimerController);

    TimerController.$inject = [
        '$scope',
        '$state',
        '$stateParams',
        'TimerService'
    ];

    function TimerController($scope, $state, $stateParams, TimerService) {
        var vm = this;
        
        vm.addMode = !$stateParams.existingTimer;
        vm.disabled = $stateParams.existingTimer;

        vm.deleteTimer = deleteTimer;
        vm.timer = $stateParams.timer;
        vm.save = save;

        function deleteTimer() {
            if (!vm.timer._id) {
                $state.go('doneyet.timers');
            }
            else {
                TimerService.deleteTimer(vm.timer)
                  .then(function success(response) {
                      console.log("Timer removed");
                      TimerService.loadTimers();
                      $state.go('doneyet.timers');
                  }, function error(response) {
                      console.log(response);
                  });
            }
        }

        function save() {
            vm.disabled = true;
            console.log(vm.timer);
            if (!vm.timer) {
                console.log('SAVE: No timer defined');
            }
            else if (vm.timer._id) {
                console.log('saving');
                // if we have a timer._id we are updating the record
                TimerService.updateTimer(vm.timer)
                  .then(function success(response) {
                      console.log('timer updated');
                      TimerService.loadTimers();
                      $state.go('doneyet.timers');
                  }, function error(response) {
                      console.log('timer not updated :(');
                  });
            }
            else {
                console.log('ADDING');
                // otherwise we are saving a new one
                TimerService.addTimer(vm.timer)
                  .then(function success(response) {
                      console.log("timer.controller.succ.saveTimer");
                      TimerService.loadTimers();
                      $state.go('doneyet.timers');
                  }, function error(response) {
                      console.log("timer.controller.fail.saveTimer");
                  });
            }

            
        }

        var init = init;

        init();

        function init() {

        }
    }
})();