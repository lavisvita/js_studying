angular.module('chatApp')
    .controller('homeCtrl', ['$scope', function($scope){
        $scope.links = [
            'register',
            'signin',
            'home',
            'chat'
         ];
    }]);