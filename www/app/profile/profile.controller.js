(function () {
    'use strict';

    angular
    .module('doneyet.profile')
    .controller('ProfileController', ProfileController);

    ProfileController.$inject = [
        '$cordovaCamera',
        '$localStorage',
        '$scope',
        '$jrCrop',
        '$timeout'
    ];

    function ProfileController($cordovaCamera, $localStorage, $scope, $jrCrop, $timeout) {
        var vm = this;
        var init = init;

        var options = {
            quality: 50,
            destinationType: Camera.DestinationType.FILE_URI,
            sourceType: Camera.PictureSourceType.CAMERA
        };

        vm.username = $localStorage.authenticatedUser;
        //vm.profilePictureURL = 'http://i.imgur.com/Rbebmic.png';
        vm.getProfilePicture = getProfilePicture;
        vm.getPicture = getPicture;

        init();

        function init() {
            $scope.$on('$ionicView.enter', function (e) {
            });
        }

        function getProfilePicture() {
            if ($localStorage.profilePicture) {
                return $localStorage.profilePicture;
            }
            else {
                return 'http://i.imgur.com/Rbebmic.png';
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
                        $localStorage.profilePicture = imageData;
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