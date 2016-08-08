(function () {
    'use strict';

    angular
      .module('doneyet.shared')
      .service('TimerService', TimerService);

    TimerService.$inject = [
      '$http'
    ];

    function TimerService($http) {
        var service = {};
        var baseUrl = 'http://jensbodal.com:8888';
        var timers;

        service.addTimer = addTimer;
        service.deleteTimer = deleteTimer;
        service.getTimers = getTimers;
        service.getTimer = getTimer;
        service.loadTimers = loadTimers;
        service.updateTimer = updateTimer;

        service.addProfilePicture = addProfilePicture;
        service.getProfilePicture = getProfilePicture;

        return service;

        function addProfilePicture(url) {
            var pictureData = {
                profilePicture: url
            };

            return $http.post(baseUrl + '/api/user/profile-picture', pictureData)
            .then(function (response) {
                console.log('posted');
                console.log(response);
                return response;
            }, function (error) {
                console.log('error');
                console.log(error);
            });
        }

        function getProfilePicture() {
            return $http.get(baseUrl + '/api/user/profile-picture')
            .then(function (response) {
                return response;
            }, function (error) {
                return error;
            });
        }

        function addTimer(timer) {
            return $http.post(baseUrl + '/api/timers', timer)
              .then(function successCallback(response) {
                  console.log("SUCCESS");
              }, function errorCallback(response) {
                  console.log("FAIL");
              });
        }

        function deleteTimer(timer) {
            return $http.delete(baseUrl + '/api/timers/' + timer._id)
              .then(function successCallback(response) {
                  return "delete successful";
              }, function errorCallback(response) {
                  console.log("DELETE ERROR: " + response);
              });
        }

        function getTimers() {
            return timers;
        }

        function getTimer(timer) {
            return $http.get(baseUrl + '/api/timers/' + timer._id)
            .then(function (response) {
                return response.data;
            }, function (error) {
                console.log(error);
            });
        }

        function loadTimers() {
            return $http.get(baseUrl + '/api/timers')
              .then(function success(response) {
                  timers = response.data;
              }, function (response) {
                  console.log('[ERROR: TimerService.loadTimers()]');
              });
        }

        function updateTimer(timer) {
            return $http.put(baseUrl + '/api/timers', timer)
              .then(function successCallback(response) {
                  console.log('succ update');
              }, function errorCallback(response) {
                  console.log('err update');
              });
        }

    }
})();
