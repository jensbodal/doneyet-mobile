(function () {
    'use strict';

    angular
        .module('doneyet.login')
        .config(LoginConfig);

    LoginConfig.$inject = [
        '$stateProvider',
        '$urlRouterProvider'
    ];

    function LoginConfig($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('doneyet.login', {
                url: '/login',
                views: {
                    'menuContent': {
                        templateUrl: 'app/login/login.html',
                        controller: 'LoginController',
                        controllerAs: 'vm'
                    }
                }
            })
            .state('doneyet.logout', {
                url: '/logout',
                views: {
                    'menuContent': {
                        templateUrl: 'app/login/logout.html',
                        controller: 'LoginController',
                        controllerAs: 'vm'
                    }
                }
            });
    }

})();