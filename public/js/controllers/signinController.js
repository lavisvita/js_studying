angular.module('chatApp')
    .controller('signinCtrl', ['$scope', '$http','$location', function($scope, $http, $location){
        $scope.getAuth = function(username, password){
            console.log('username: ' + username + '\n' + 'password: ' + password);

            var authData = [username, password];
            var req = {
                method: 'post',
                url: '/signin',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                data: authData
            };
            $http(req).then(function successCallback(response) {
                var data = response;
                    if(data.data == true) $location.path('/chat');
                    else $location.path('/register');
                }, function errorCallback(response) {
                console.log(response);
                    console.log(response.data);
                });
        };
    }]);