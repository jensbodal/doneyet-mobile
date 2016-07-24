(function() {

    angular.module(
        'doneyet',
        [
            'starter.controllers',
            'doneyet.core',
            'doneyet.playlists',
            'doneyet.shared'
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
        '$ionicPlatform'
    ];

    function run($ionicPlatform) {
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