myApp.controller('IndexCtrl', ['$scope', 'AppService','$compile',function($scope, AppService,$compile) {

    $scope.model = {'category':'All Categories','location':'All Locations'};
    var obj = document.querySelector('#category');
    //obj.children[0].innerHTML = $scope.model.category;
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

myApp.controller('CreateAdCtrl', [
  '$scope', '$location', '$upload', 'Auth', function($scope, $location, $upload, Auth) {
    $scope.onFileSelect = function($files) {
      $scope.upload = $upload.upload({
        url: 'http://localhost:3000/classified_ads',
        method: 'POST',
        data: {location_id: 1, sub_category_id: 1, poster_name: $scope.name, poster_email: $scope.email, photo: $files[0]},
        photo: $files[0] // or list of files ($files) for html5 only
      }).success(function(data, status, headers, config) {
        console.log(status);
      }).error(function(error){
        console.log(error);
      });
    };
  }
]);