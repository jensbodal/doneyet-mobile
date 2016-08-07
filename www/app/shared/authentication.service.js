(function () {
    'use strict';

    angular
      .module('doneyet.shared')
      .factory('AuthenticationService', AuthenticationService);

    AuthenticationService.$inject = [
      '$http',
      '$localStorage'
    ];

    function AuthenticationService($http, $localStorage) {
        var service = {};
        var baseUrl = 'http://www.jensbodal.com:8888';

        service.login = login;
        service.logout = logout;
        service.loggedIn = false;
        service.username = '';


        return service;

        function login(username, password) {
            service.username = username;
            var config = {
                username: username,
                password: password
            };

            return $http.post(baseUrl + '/api/authenticate', config)
                .then(function success(response) {
                    console.log(response);
                    console.log('HEY MOM');
                    // store login state in service
                    service.loggedIn = true;

                    var user = response.data.user;
                    var token = response.data.token;
                    var promiseResponse = {
                        user: user,
                        token: token
                    };
                    // store username and token so that user remains logged in between page refreshes
                    $localStorage.authenticatedUser = user.username;
                    $localStorage.uuid = user._id;
                    $localStorage.token = token;

                    // add auth token to header for all requests made by the $http service
                    $http.defaults.headers.common.token = $localStorage.token;

                    // indicate successful login
                    console.log(response);

                    return (promiseResponse);
                },
            function error(response) {
                return false;
            });

        }


        function logout() {
            // remove user from local storage and clear http auth header
            service.loggedIn = false;
            delete $localStorage.authenticatedUser;
            delete $localStorage.uuid;
            delete $localStorage.token;
            $http.defaults.headers.common.token = '';
            $http.defaults.headers.common.username = '';
            $http.defaults.headers.common.uuid = '';
        }
    }
})();
