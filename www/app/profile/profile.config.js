(function () {
    'use strict';

    angular
        .module('doneyet.profile')
        .config(ProfileConfig);

    ProfileConfig.$inject = [
        '$stateProvider'
    ];

    function ProfileConfig($stateProvider) {
        $stateProvider
            .state('doneyet.profile', {
                url: '/profile',
                views: {
                    'menuContent': {
                        templateUrl: 'app/profile/profile.html',
                        controller: 'ProfileController',
                        controllerAs: 'vm'
                    }
                }
            });
    }

})();