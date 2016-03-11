var chatApp = angular.module('chatApp', ['ngRoute', 'ngCookies'])
    .config(['$routeProvider', function($routeProvider){
        $routeProvider
            .when('/register', {
                templateUrl: '/register',
                controller: 'registerCtrl'
            })
            .when('/signin', {
                templateUrl: '/signin',
                controller: 'signinCtrl'
            })
            .when('/index', {
                templateUrl: '/index',
                controller: 'homeCtrl'
            })
            .when('/chat', {
                templateUrl: '/chat',
                controller: 'chatCtrl'
            })
            .otherwise({
                redirectTo: '/'
            })
    }]);
