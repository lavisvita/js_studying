angular.module('chatApp').factory('socket', ['$rootScope', function($rootScope){
    var socket = io.connect('http://localhost:3000');
    return {
        on: function (eventName, callback) {
            socket.on(eventName, function () {
                var args = arguments;
                $rootScope.$apply(function () {
                    callback.apply(socket, args);
                });
            });
        },
        emit: function (eventName, data, callback) {
            socket.emit(eventName, data, function () {
                var args = arguments;
                $rootScope.$apply(function () {
                    if (callback) {
                        callback.apply(socket, args);
                    }
                });
            })
        }

        }
}]);
function chatCtrl($scope, $http, socket, $cookies) {
    $scope.messages = [{
        nickName: '',
        text: ''
    }];
    $scope.nickName = $cookies.get('nickName');
    socket.on('send:message', function (message) {
        $scope.messages.push(message);
    });
    $scope.sendMessage = function (msg) {
        $scope.msg = msg;
        socket.emit('send:message', {
            nickName: $scope.nickName,
            message: $scope.msg
        });
        $scope.messages.push({
           nickName: $scope.nickName,
           text:$scope.msg
        });
        $scope.msg = '';
    };
}
angular.module('chatApp')
    .controller('chatCtrl', ['$scope', '$http', 'socket', '$cookies', chatCtrl]);