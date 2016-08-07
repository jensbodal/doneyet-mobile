(function () {
    'use strict';

    angular
    .module('doneyet.login')
    .controller('LoginController', LoginController);

    LoginController.$inject = [
        '$ionicLoading',
        '$ionicHistory',
        '$location',
        '$localStorage',
        '$state',
        '$timeout',
        'AuthenticationService'
    ];

    function LoginController($ionicLoading, $ionicHistory, $location, $localStorage, $state, $timeout, AuthenticationService) {
        var vm = this;

        vm.username = '';
        vm.password = '';

        vm.closeLogin = closeLogin;
        vm.login = login;
        vm.logout = logout;
        
        function closeLogin() {
            console.log('closing login');
        }

        function login() {
            vm.username = vm.username.toLowerCase();
            AuthenticationService.login(vm.username, vm.password)
            .then(function (response) {
                $ionicHistory.nextViewOptions({ disableBack: true });
                $state.go('doneyet.timers');
            }, function (error) {
                console.log("Error logging in");
                console.log(error);
            });
        }

        function logout() {
            $ionicLoading.show({
                template: 'Logging out...'
            });

            AuthenticationService.logout();
            $state.go('doneyet.login');
            $timeout(function () {
                $ionicLoading.hide();
                $ionicHistory.clearCache();
                $ionicHistory.clearHistory();
                $ionicHistory.nextViewOptions({ disableBack: true, historyRoot: true });
            }, 30);
        }

        init();

        function init() {
            
        }

    }
})();