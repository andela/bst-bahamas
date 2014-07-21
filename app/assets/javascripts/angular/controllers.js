myApp.controller('IndexCtrl', ['$scope', 'AppService',function($scope, AppService) {

    $scope.categories =  [];
    $scope.suggestions = [];
    $scope.classifiedAds = [];
    //get categories
    AppService.getCategories(

        function(data)
        {
            angular.copy(data,$scope.categories);
            $scope.getSubCategories($scope.categories); //get subcategories for suggestions
        },
        function(error)
        {
            console.log(error);
        });

    $scope.locations = [];
    //get locations
    AppService.getLocations(
        function(data)
        {
            angular.copy(data, $scope.locations);
        },
        function(error)
        {
            console.log(error);
    });

    $scope.getSubCategories = function(categories)
    {
        categories.forEach(function(category){
            category.sub_category.forEach(function(sub){
                $scope.suggestions.push(sub.name);
            });
        });
    }
    
    $scope.getClassifiedAds(function(data){
        angular.copy(data, $scope.classifiedAds);    
    }
    );
}]);

myApp.controller('HomeCtrl', [
  '$scope', '$location', 'AppService', 'Auth', function($scope, $location, AppService, Auth) {
    $scope.users = [];
    AppService.getUsers(function(data){
    	$scope.users = data;
    }, function(error){
    	console.log(error);
    });

    $scope.logout = function() {
      Auth.logout().then(function(oldUser) {
        if (oldUser) console.log(oldUser.email + " you're signed out.");
        $location.path('/index');
      }, function(error) {
        console.log(error);
      });
    };
  }
]);

myApp.controller('LoginCtrl', [
  '$scope', '$location', 'Auth', function($scope, $location, Auth) {
    $scope.login = function() {
      var credentials = {
          email: $scope.email,
          password: $scope.password
      };

      Auth.login(credentials).then(function(user) {
          console.log(user);
          $location.path('/home');
      }, function(error) {
          console.log(error);
          $scope.errorMessage = "Password " + error.data.errors.password[0];
      });
    }
  }
]);

myApp.controller('SignUpCtrl', [
  '$scope', '$location', 'Auth', function($scope, $location, Auth) {
  	$scope.signUp = function() {
  		var credentials = {
  		    email: $scope.email,
  		    password: $scope.password,
  		    password_confirmation: $scope.passwordConfirmation
  		};

  		Auth.register(credentials).then(function(registeredUser) {
  		    console.log(registeredUser);
  		    $location.path('/home');
  		}, function(error) {
  		    console.log(error);
          $scope.errorMessage = "Password " + error.data.errors.password[0];
  		});
  	}
  }
]);