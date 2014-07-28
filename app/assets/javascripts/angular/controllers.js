myApp.controller('IndexCtrl', [
  '$scope', '$location', 'AppService', 'Auth', function($scope, $location, AppService, Auth) {
    $scope.categories =  [];
    $scope.suggestions = [];
    $scope.classifiedAds = [];
    $scope.locations = [];
    $scope.loggedIn = false;

<<<<<<< HEAD
    //get classified ads
    AppService.getClassifiedAds(function(data){
        $scope.classifiedAds = Array.prototype.slice.call(data);
    },
        function(error){
            console.error(error);
        });
=======
    Auth.currentUser().then(function(user) {
      console.log('currentUser found');
      $scope.loggedIn = true;
    }, function(error) {
      $scope.loggedIn = false;
    });

    AppService.searchClassifiedAds(function(data){
        $scope.classifiedAds = data.ads;
    }, function(err){
        console.log(err);
    });

>>>>>>> 7c890e8897637f0e767e882c861a3c8453ad8846
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

    $scope.logout = function() {
      Auth.logout().then(function(oldUser) {
        $scope.loggedIn = false;
        $location.path('/index');
      }, function(error) {
        console.log(error);
      });
    };

    $scope.$on('login', function(){
        $scope.loggedIn = true;
    });

    $scope.$on('logout',function(){
        $scope.loggedIn = false;
    });

    $scope.$watch('loggedIn', function(newValue, oldValue){
        console.log(newValue);
    });
}]);

myApp.controller('HomeCtrl', [
  '$scope', '$location', 'AppService', 'Auth', function($scope, $location, AppService, Auth) {
  }
]);

myApp.controller('LoginCtrl', [
  '$scope', '$location', 'Auth', function($scope, $location, Auth) {
    $scope.login = function() {
      var credentials = {
          email: $scope.email,
          password: $scope.password
      };

      $scope.$on('devise:unauthorized', function(event, xhr, deferred) {
        $scope.showError = true;
      });

      Auth.login(credentials).then(function(user) {
          $scope.$emit('login');
          console.log(user);
          $location.path('/home');
      }, function(error) {
          console.log(error);
          $scope.showError = true;
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
            $scope.$emit('login');
  		    $location.path('/home');
  		}, function(error) {
  		    console.log(error);
          $scope.errors = error.data.errors;
  		});
  	}
  }
]);

myApp.controller('PostAdCtrl', [
  '$scope', '$location', '$upload', 'Auth', function($scope, $location, $upload, Auth) {
    $scope.tags = [
      {name: 'New Item', days: 7, price: 2, selected: false},
      {name: 'Need to sell', days: 7, price: 2, selected: false},
      {name: 'Urgent', days: 7, price: 2, selected: false},
      {name: 'Reduced Price', days: 7, price: 2, selected: false},
      {name: 'Sale', days: 7, price: 2, selected: false}
    ];
    $scope.success = false;
    $scope.selectedTag = null;
    $scope.email = Auth._currentUser ? Auth._currentUser.email : null;
    var params = {};

    $scope.submitForm = function(isValid) {
      if (isValid) {
        if (Auth._currentUser) params.user_id = Auth._currentUser.id;
        params.location_id = $scope.location.id;
        params.category_id = $scope.category.id;
        params.sub_category_id = $scope.subCat.id;
        params.price = $scope.price;
        params.title = $scope.title;
        params.description = $scope.description;
        params.address = $scope.address;
        params.poster_name = $scope.name;
        params.poster_email = $scope.email;
        params.poster_phone_no = $scope.phoneno;
        $upload.upload({
          url: 'http://bst-bahamas.herokuapp.com/classified_ads',
          method: 'POST',
          data: params,
          photo: params.photo // or list of files ($files) for html5 only
        }).success(function(data, status, headers, config) {
          console.log(status);
          $scope.success = true;
        }).error(function(error){
          console.log(error);
          $scope.success = false;
        });
      }
    };

    $scope.onFileSelect = function($files) {
      params.photo = $files[0];
    };
  }
]);

myApp.controller('EditAdCtrl', [
  '$scope', '$location', '$upload', 'AppService', function($scope, $location, $upload, AppService) {
    var params = {id: $location.search()['id']}
    AppService.getClassifiedAd(params, function(data){
      $scope.classifiedAd = data;
    }, function(error){
      console.log(error);
    })
  }
]);

myApp.controller('MyAdsCtrl', [
  '$scope', '$location', 'AppService', function($scope, $location, AppService) {
    $scope.myAds = [];

    AppService.myAds(function(data){
      console.log(data);
    }, function(error){
      console.log(error);
    })
  }
]);

myApp.controller('PaymentCtrl', [
  '$scope', '$location', function($scope, $location) {
    $scope.handleStripe = function(status, response) {
      console.log('got here')
      console.log(response);
      if(response.error) {
        // there was an error. Fix it.
      } else {
        // got stripe token, now charge it or smt
        token = response.id
      }
    }
  }
]);