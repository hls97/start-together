angular.module('start')
.controller('lobbyCtrl', function($scope, $interval, mySocket){
    $scope.seconds = 30;
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
    });

    $scope.emitStart = function(){
        mySocket.emit('start',{});
        $scope.startTimer()
    }
    $scope.emitStop = function(){
        console.log("stop")
        mySocket.emit('stop',{});
        $scope.stopTimer()
    }
    $scope.emitChange = function(){
        console.log("CHANGING")
        mySocket.emit('change',{val:$scope.seconds});
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
