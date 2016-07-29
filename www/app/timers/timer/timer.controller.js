(function () {
    'use strict';

    angular
    .module('doneyet.timers')
    .controller('TimerController', TimerController);

    TimerController.$inject = [
        '$scope',
        '$stateParams'
    ];

    function TimerController($scope, $stateParams) {
        var vm = this;

        vm.disabled = true;

        vm.timer = $stateParams.timer;
        vm.fuck = fuck;
        
        function fuck() {
            console.log('asdfa');
        }

        var init = init;

        init();

        function init() {

        }
    }
})();