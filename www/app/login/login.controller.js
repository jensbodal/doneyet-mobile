(function () {
    'use strict';

    angular
    .module('doneyet.login')
    .controller('LoginController', LoginController);

    LoginController.$inject = [
        '$ionicLoading',
        '$ionicHistory',
        '$ionicPopup',
        '$location',
        '$localStorage',
        '$scope',
        '$state',
        '$timeout',
        'AuthenticationService'
    ];

    function LoginController(
        $ionicLoading,
        $ionicHistory,
        $ionicPopup,
        $location,
        $localStorage,
        $scope,
        $state,
        $timeout,
        AuthenticationService
        ) {
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
                if (response) {
                    $ionicHistory.nextViewOptions({ disableBack: true });
                    $state.go('doneyet.timers');
                }
                else {
                    console.log("Error logging in");
                    $ionicPopup.show({
                        title: 'Incorrect Credentials!',
                        subTitle: 'Check your username and password',
                        scope: $scope,
                        buttons: [
                          {
                              text: '<b>OK</b>',
                              type: 'button-positive'
                          }
                        ]
                    });
                }
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
            }, 0);
        }

        init();

        function init() {
            
        }

    }
})();