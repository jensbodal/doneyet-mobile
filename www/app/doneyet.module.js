(function() {
    angular.module(
        'doneyet',
        [
            'doneyet.core',
            'doneyet.login',
            'doneyet.menu',
            'doneyet.profile',
            'doneyet.shared',
            'doneyet.timers',
            'jrCrop'
            
        ]
    )
    .run(run)
    .config(function ($stateProvider, $urlRouterProvider) {
        // all unknown routes go to homepage
        $urlRouterProvider.otherwise('/app/login');

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
        '$ionicHistory',
        '$ionicLoading',
        '$ionicPlatform',
        '$localStorage',
        '$location',
        '$rootScope',
        '$state',
        '$timeout',
        'AuthenticationService'
    ];

    function run(
        $http,
        $ionicHistory,
        $ionicLoading,
        $ionicPlatform,
        $localStorage,
        $location,
        $rootScope,
        $state,
        $timeout,
        AuthenticationService
        )
    {
        // if we already have a token cached then use that
        if ($localStorage.token) {
            $http.defaults.headers.common.token = $localStorage.token;
        }

        // redirect to login page if not authenticated
        $rootScope.$on('$locationChangeStart', function (event, next, current) {
            // array of pages that can be loaded without authentication
            var nonAuthPages = ['/app/login', '/login', '/app/logout', '/logout'];
            var restrictedPages = nonAuthPages.indexOf($location.path()) === -1;

            if (restrictedPages && !$localStorage.token) {
                $state.go('doneyet.login');
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
    };


})();