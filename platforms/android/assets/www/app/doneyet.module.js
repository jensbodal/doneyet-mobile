(function() {

    angular.module(
        'doneyet',
        [
            'starter.controllers',
            'doneyet.core',
            'doneyet.playlists',
            'doneyet.shared',
            'doneyet.timer'
        ]
    )
    .run(run)
    .config(function($stateProvider, $urlRouterProvider) {
        $stateProvider
        .state('doneyet', {
            url: '/app',
            abstract: true,
            templateUrl: 'app/menu/menu.html',
            controller: 'AppCtrl'
        });
    });

    run.$inject = [
        '$http',
        '$ionicPlatform'
    ];
    //57945a064fc73c0b1b648cea
    function run($http, $ionicPlatform) {
        $http.defaults.headers.common.uuid = '57945a064fc73c0b1b648cea';

        $ionicPlatform.ready(function() {
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