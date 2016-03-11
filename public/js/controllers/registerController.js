function registrationCtrl($scope, $http, $location){
            $scope.getRegData = function(user,username, password){
                console.log('user: '+ user + '\n' +'username: ' + username + '\n' + 'password: ' + password);

                var authData = [user, username, password];
                var req = {
                    method: 'post',
                    url: '/user/add',
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                    data: authData
                };
                $http(req).then(function successCallback(response) {
                    var data = response;
                    console.log(data.data);
                    if(data.data == true) $location.path('/signin');
                    else $location.path('/register');
                }, function errorCallback(response) {
                    console.log(response);
                    console.log(response.data);
                });
            };
}
angular.module('chatApp')
.controller('registerCtrl', ['$scope', '$http', '$location', registrationCtrl]);