(function () {
    'use strict';

    angular
    .module('doneyet.menu')
    .controller('MenuController', MenuController);

    MenuController.$inject = [
        '$state',
        'AuthenticationService',
        '$timeout',
        '$ionicLoading',
        '$ionicHistory'
    ];

    function MenuController($state, AuthenticationService, $timeout, $ionicLoading, $ionicHistory) {
        var vm = this;
        vm.loggedIn = loggedIn;
        vm.logout = logout;

        function loggedIn() {
            return AuthenticationService.loggedIn;
        }

        function logout() {
            AuthenticationService.logout();
            console.log('logg menu out');
            $state.go('doneyet.login');
        }

        init();

        function init() {
            console.log("menu init");
        }
    }
})();