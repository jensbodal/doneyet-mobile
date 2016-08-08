(function () {
    'use strict';

    angular
    .module('doneyet.profile')
    .controller('ProfileController', ProfileController);

    ProfileController.$inject = [
        'AuthenticationService',
        'TimerService',
        '$cordovaCamera',
        '$localStorage',
        '$scope',
        '$jrCrop',
        '$timeout',
        'imgur'
    ];

    function ProfileController(
        AuthenticationService,  TimerService, $cordovaCamera, $localStorage, $scope, $jrCrop, $timeout, imgur) {
        imgur.setAPIKey('Client-ID 40dbfe0cfea73a7');
        var vm = this;
        var init = init;
        vm.profilePicture = 'http://i.imgur.com/lFuyoJF.png';

        var options = {
            quality: 50,
            destinationType: Camera.DestinationType.FILE_URI,
            sourceType: Camera.PictureSourceType.CAMERA,
            targetWidth: 512,
            targetHeight: 512,
            correctOrientation: true
        };

        vm.username = AuthenticationService.username;
        if (!$localStorage[vm.username]) {
            $localStorage[vm.username] = {};
        }
        //vm.profilePi1ctureURL = 'http://i.imgur.com/Rbebmic.png';
        vm.getProfilePicture = getProfilePicture;
        vm.getPicture = getPicture;

        init();

        function init() {
            if (!$localStorage[vm.username]) {
                $localStorage[vm.username] = {};
            }
            $scope.$on('$ionicView.enter', function (e) {
                vm.username = AuthenticationService.username;
                if ($localStorage[vm.username].profilePicture) {
                    vm.profilePicture = $localStorage[vm.username].profilePicture;
                }
                else {
                    getProfilePicture();
                }
                if (!$localStorage[vm.username]) {
                    $localStorage[vm.username] = {};
                }
            });
        }

        function getProfilePicture() {

            if ($localStorage[vm.username].profilePicture) {
                return $localStorage[vm.username].profilePicture;
            }
            else {
                TimerService.getProfilePicture()
                .then(function (response) {
                    $localStorage[vm.username].profilePicture = response.data.profilePicture;
                    vm.profilePicture = $localStorage[vm.username].profilePicture
                }, function (error) {
                    $localStorage[vm.username].profilePicture = 'http://i.imgur.com/lFuyoJF.png';
                    vm.profilePicture = $localStorage[vm.username].profilePicture;
                });
            }
        }

        function getPicture() {
            $cordovaCamera.getPicture(options)
            .then(
                function (imageData) {
                    vm.picData = imageData;
                    vm.ftFload = true;
                    $jrCrop.crop({
                        url: imageData,
                        circle: true,
                        width: 200,
                        height: 200
                    }).then(function (canvas) {
                        // success!
                        console.log(canvas.toDataURL());
                        imageData = canvas.toDataURL();
                        canvas.toBlob(function (image) {
                            imgur.upload(image).then(function (model) {
                                TimerService.addProfilePicture(model.link)
                                    .then(function () {
                                        $localStorage[vm.username].profilePicture = model.link;
                                        vm.profilePicture = $localStorage[vm.username].profilePicture;
                                    }, function (error) {
                                        console.log('error');
                                        console.log(error);
                                    });
                            });
                        });
                    }, function () {
                        console.log('error cropping image?');
                        // User canceled or couldn't load image.
                    });
                    
                },
                function (err) {
                    console.log('error');
                });
        }


    }
})();