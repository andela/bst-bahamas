myApp.controller('HomeCtrl', ['$scope', 'Auth', function($scope, Auth) {
	$scope.foo = 'bar';
	// var credentials = {
 //        email: 'user@domain.com',
 //        password: 'password1'
 //    };

 //    Auth.login(credentials).then(function(user) {
 //        console.log(user);
 //    }, function(error) {
 //        console.log(error);
 //    });
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

myApp.controller('RegisterCtrl', [
  '$scope', '$location', 'Auth', function($scope, $location, Auth) {
  	$scope.register = function() {
  		var credentials = {
  		    email: $scope.email,
  		    password: $scope.password,
  		    password_confirmation: $scope.passwordConfirmation
  		};

  		Auth.register(credentials).then(function(registeredUser) {
  		    console.log(registeredUser);
  		    $location.path('/users');
  		}, function(error) {
  		    console.log(error);
  		});
  	}
  }
]);