angular
.module('start', ['btford.socket-io',
                'ui.router',
                'ngLoadScript'
])
.factory('mySocket', function (socketFactory) {
     var mySocket = socketFactory();

     return mySocket;

})
.config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/');
    $stateProvider
    .state('home',{
        url: '/',
        templateUrl: 'pages/home/home.html',
        controller: 'homeCtrl'
    })
    .state('lobby', {
        url:'/lobby',
        templateUrl: 'pages/lobby/lobby.html',
        controller: 'lobbyCtrl',
        params:{
            num: null,
            key: null
        }
    });


})
