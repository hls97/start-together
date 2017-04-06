angular
.module('start', ['btford.socket-io',
                'ui.router'
])
.factory('mySocket', function (socketFactory) {
     var mySocket = socketFactory();
  return mySocket;
})
.config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/');
    $stateProvider
    // .state('login',{
    //     url: '/',
    //     templateUrl: 'views/login.html',
    //     controller: 'LoginCtrl',
    //     params:{
    //         from: null,
    //         who: null
    //     }
    // })
    .state('lobby', {
        url:'/lobby',
        templateUrl: 'pages/lobby/lobby.html',
        controller: 'lobbyCtrl'
    });


})
