myApp.controller('IndexCtrl', ['$scope', 'AppService',function($scope, AppService) {
//    $scope.model = {'category':'All Categories','location':'All Locations'};
    $scope.categories =  [];
    $scope.suggestions = [];
    $scope.classifiedAds = [];
    $scope.locations = [];
    $scope.loggedIn = false;
    
    AppService.getClassifiedAds(function(data){
        $scope.classifiedAds = data;
    }, function(err){
        console.log(err);
    });

    //get categories
    AppService.getCategories(function(data) {
      angular.copy(data, $scope.categories);
    },function(error) {
      console.log(error);
    });

    //get locations
    AppService.getLocations(function(data) {
      angular.copy(data, $scope.locations);
    },function(error) {
      console.log(error);
    });
    
    $scope.$on('login', function(){
        $scope.loggedIn = true;
    });
    
    $scope.$watch('loggedIn', function(newValue, oldValue){
        console.log(newValue);
    });
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
          $scope.$emit('login');
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

myApp.controller('PostAdCtrl', [
  '$scope', '$location', '$upload', function($scope, $location, $upload) {
    $scope.onFileSelect = function($files) {
      $scope.upload = $upload.upload({
        url: 'http://bst-bahamas.herokuapp.com/classified_ads',
        method: 'POST',
        data: {location_id: 1,
          sub_category_id: 1,
          title: $scope.title,
          price: $scope.price,
          description: $scope.description,
          poster_name: $scope.name,
          poster_email: $scope.email,
          photo: $files[0]},
        photo: $files[0] // or list of files ($files) for html5 only
      }).success(function(data, status, headers, config) {
        console.log(status);
      }).error(function(error){
        console.log(error);
      });
    };
  }
]);

myApp.controller('ManageAdCtrl', [
  '$scope', '$location', '$upload', 'AppService', function($scope, $location, $upload, AppService) {
    var params = {id: $location.search()['id']}
    AppService.getClassifiedAd(params, function(data){
      $scope.classifiedAd = data;
    }, function(error){
      console.log(error);
    })
  }
]);