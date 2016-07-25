(function () {
    'use strict';

    angular
    .module('doneyet.menu')
    .controller('MenuController', MenuController);

    MenuController.$inject = [
        '$state',
        'AuthenticationService'
    ];

    function MenuController($state, AuthenticationService) {
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

        }

    }
})();