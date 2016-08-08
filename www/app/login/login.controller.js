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
        'AuthenticationService',
        'TimerService'
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
        AuthenticationService,
        TimerService
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
                    $localStorage.$reset();
                    $ionicHistory.nextViewOptions({ disableBack: true });
                    if (!$localStorage[vm.username]) {
                        $localStorage[vm.username] = {};
                    }
                    TimerService.getProfilePicture()
                    .then(function (response) {
                        $localStorage[vm.username].profilePicture = response.data.profilePicture;
                    }, function (error) {
                        $localStorage[vm.username].profilePicture = 'http://i.imgur.com/lFuyoJF.png';
                    });
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
            $localStorage.$reset();
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
            $scope.$on('$ionicView.enter', function (e) {
                vm.username = '';
                vm.password = '';
                $ionicHistory.clearCache();
                $ionicHistory.clearHistory();
            });
        }

    }
})();