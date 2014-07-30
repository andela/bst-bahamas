myApp.controller('IndexCtrl', [
  '$scope', '$location', 'AppService', 'Auth', function($scope, $location, AppService, Auth) {
    $scope.categories =  [];
    $scope.suggestions = [];
    $scope.classifiedAds = [];
    $scope.locations = [];
    $scope.loggedIn = false;
    $scope.showSpinner = true;
    $scope.pagination = {};
    $scope.pagination.currentPage = 1;
    $scope.pagination.per = 25;
    $scope.totalItems = 25;
    $scope.menuOpened = false;
      
    $scope.toggle = function()
    {
        $scope.menuOpened = !$scope.menuOpened;
    }
    
    Auth.currentUser().then(function(user) {
      console.log('currentUser found');
      $scope.loggedIn = true;
    }, function(error) {
      $scope.loggedIn = false;
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

    $scope.search = function() {
      var params = {};
      params.page = $scope.pagination.currentPage;
      if ($scope.query) params.q = $scope.query;
      if ($scope.location) params.location_id = $scope.location.id;
      if ($scope.category) params.category_id = $scope.category.id;
      if ($scope.subCategory) params.sub_category_id = $scope.subCategory.id;

      $scope.showSpinner = true;
      AppService.searchClassifiedAds(params, function(data){
        $scope.classifiedAds = data.ads;
        $scope.showSpinner = false;
        $scope.totalItems = data.numResults;
        $scope.pagination.per = data.per;
      }, function(err){
        console.log(err);
        $scope.showSpinner = false;
      });
    }

    //get classified ads on first page load
    $scope.search();

    $scope.logout = function() {
      Auth.logout().then(function(oldUser) {
        $scope.loggedIn = false;
        $location.path('/index');
      }, function(error) {
        console.log(error);
      });
    };

    $scope.selectCategory = function() {
      $scope.subCategory = null;
      $scope.search();
      $scope.selectedAd = null;
      $scope.selected = "";
    };

    $scope.selectLocation = function() {
      $scope.search();
      $scope.selectedAd = null;
      $scope.selected = "";
    };

    $scope.clickCategory = function(category) {
      $scope.category = category;
      $scope.search();
      $scope.selectedAd = null;
      $scope.selected = "";
    };

    $scope.clickSubCategory = function(subCategory) {
      $scope.subCategory = subCategory;
      $scope.search();
      $scope.selectedAd = null;
      $scope.selected = "";
    };

    $scope.pageChanged = function() {
      $scope.search();
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


    $scope.showAd = function(id)
    {
      $scope.showSpinner = true;
      AppService.getClassifiedAd({'id':id}, function(data){
        $scope.selectedAd = data;
        $scope.showSpinner = false;
        $scope.selected = "selected"
      }, function(error){
        console.error(error);
        $scope.showSpinner = false;
      });
    }

    //returns to default view
    $scope.backToAds = function()
    {
      $scope.selectedAd = null;
      $scope.selected = "";
    }

    $scope.goToIndex = function() {
      $location.path('/index');
    };
}]);

//HOMECTRL
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

//SIGNUPCTRL
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

//POSTADCTRL
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


//EDITCTRL
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


//MYADSCTRL
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

//PAYMENTCTRL
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