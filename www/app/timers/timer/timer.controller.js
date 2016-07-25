(function () {
    'use strict';

    angular
    .module('doneyet.timers')
    .controller('TimerController', TimerController);

    TimerController.$inject = [
        '$stateParams'
    ];

    function TimerController($stateParams) {
        var vm = this;
        vm.timer = $stateParams.timer;

        var init = init;

        init();

        function init() {

        }
    }
})();