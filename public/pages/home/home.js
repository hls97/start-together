angular.module('start')
.controller('homeCtrl', function($scope, $rootScope, $state){
    $rootScope.activePage = 'home';


    $scope.num = null;
    $scope.key = null;

    $scope.submit = function(){

        $state.go('lobby', {
            'num': $scope.num,
            'key': $scope.key
        });
    }
});
