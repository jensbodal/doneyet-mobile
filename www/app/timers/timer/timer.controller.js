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
        var init = init;

        init();

        function init() {
            console.log("TIMER LO");
            console.log($stateParams.timer);
        }
    }
})();