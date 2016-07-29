(function() {
    angular.module(
        'doneyet',
        [
            'doneyet.core',
            'doneyet.login',
            'doneyet.menu',
            'doneyet.shared',
            'doneyet.timers'
            
        ]
    )
    .run(run)
    .config(function ($stateProvider, $urlRouterProvider) {
        // all unknown routes go to homepage
        // this should be /app/login and remove service login below
        $urlRouterProvider.otherwise('/app/timers');

        $stateProvider
        .state('doneyet', {
            url: '/app',
            abstract: true,
            templateUrl: 'app/menu/menu.html',
            controller: 'MenuController',
            controllerAs: 'vm'

        });
    });

    run.$inject = [
        '$http',
        '$ionicPlatform',
        '$localStorage',
        '$location',
        '$rootScope',
        'AuthenticationService'
    ];

    function run($http, $ionicPlatform, $localStorage, $location, $rootScope, AuthenticationService) {
        AuthenticationService.login('coors').then(function () {
            if ($localStorage.authenticatedUser) {
                $http.defaults.headers.common.token = $localStorage.token;
                $http.defaults.headers.common.username = $localStorage.authenticatedUser;
                $http.defaults.headers.common.uuid = $localStorage.uuid;
            }

            // redirect to login page if not authenticated
            $rootScope.$on('$locationChangeStart', function (event, next, current) {
                // array of pages that can be loaded without authentication
                var nonAuthPages = ['/app/login', '/login'];
                var restrictedPages = nonAuthPages.indexOf($location.path()) === -1;

                if (restrictedPages && !$localStorage.authenticatedUser) {
                    $location.path('/app/login');
                }
            });


            $ionicPlatform.ready(function () {
                // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
                // for form inputs)
                if (cordova.platformId === 'ios' && window.cordova && window.cordova.plugins.Keyboard) {
                    cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                    cordova.plugins.Keyboard.disableScroll(true);
                }
                if (window.StatusBar) {
                    // org.apache.cordova.statusbar required
                    StatusBar.styleDefault();
                }
            });
        });
    };


})();