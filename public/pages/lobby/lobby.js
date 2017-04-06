angular.module('start')
.controller('lobbyCtrl', function($scope, $rootScope, $interval, $stateParams, $state, mySocket){
    $rootScope.activePage = 'lobby';

    $scope.num = $stateParams.num;
    $scope.key = $stateParams.key;

    if(!$scope.num || !$scope.key){
        $state.go('home');
    }

    var lobby = 'r-' + $scope.num + '-k-' + $scope.key

    mySocket = io.connect();

     mySocket.emit('room', lobby);


    $scope.seconds = null;
    $scope.stopTime;
    $scope.toggleTime = 1;
    $scope.totalTime = 60;
    $scope.percent = 0.0;

    mySocket.on('start', function () {
        $scope.startTimer()
    });
    mySocket.on('stop', function () {
        $scope.stopTimer()
    });
    mySocket.on('change', function (val) {
        $scope.seconds = val
        $scope.$apply()
    });

    $scope.emitStart = function(){
        mySocket.emit('start',{'lobby': lobby});
        $scope.startTimer()
    }
    $scope.emitStop = function(){
        mySocket.emit('stop',{'lobby': lobby});
        $scope.stopTimer()
    }
    $scope.emitChange = function(){
        mySocket.emit('change',{'val':$scope.seconds, 'lobby': lobby});
    }
    $scope.startTimer = function(){
        if($scope.stopTime !== undefined){
            $interval.cancel($scope.stopTime);
        }

        $scope.stopTime = $interval($scope.decSeconds, 1000);
    }

    $scope.decSeconds = function(){
        $scope.seconds--;
        $scope.percent = ($scope.totalTime-$scope.seconds)/$scope.totalTime;
        if($scope.seconds == 0){
            $interval.cancel($scope.stopTime);
            $scope.openToast();
        }
    }

    $scope.stopTimer = function(){
        $interval.cancel($scope.stopTime);

    }
});
