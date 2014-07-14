myApp.controller('HomeCtrl', ['$scope', function($scope) {
	$scope.foo = 'bar';
}]);

myApp.controller('IndexCtrl', [
  '$scope', '$location', 'AppService', function($scope, $location, AppService) {
    $scope.users = [];
    AppService.getUsers(function(data){
    	$scope.users = data;
    }, function(error){
    	console.log(error);
    })
  }
]);