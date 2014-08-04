myApp.controller('IndexCtrl', [
  '$scope', '$location', 'AppService', 'Auth', function($scope, $location, AppService, Auth) {
    $scope.categories =  [];
    $scope.suggestions = [];
    $scope.classifiedAds = [];
    $scope.locations = [];
    $scope.loggedIn = false;
    $scope.showGoogleAds = true;
    $scope.showSpinner = true;
    $scope.pagination = {};
    $scope.pagination.currentPage = 1;
    $scope.pagination.per = 25;
    $scope.totalItems = 25;
    $scope.menuOpened = false;

    $scope.locationHash = {};
    $scope.toggle = function()
    {
        $scope.menuOpened = !$scope.menuOpened;
    }

    Auth.currentUser().then(function(user) {
      $scope.currentUser = user;
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
      $scope.subCategory = null;
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

    $scope.goToHome = function() {
      $location.path('/home');
    };
}]);

//HOMECTRL
myApp.controller('HomeCtrl', [
  '$scope', '$location', 'AppService', function($scope, $location, AppService) {
    $scope.featuredAds = [];
    $scope.currentPage = 1;
    $scope.$parent.showGoogleAds = false;
    $scope.numSlides = 0;
    $scope.loading = true;

    var getFeaturedAds = function() {
      var params = {
        page: $scope.currentPage,
        is_featured: true
      };
      AppService.searchClassifiedAds(params, function(data){
        $scope.numSlides = Math.ceil(data.numResults / 10);
        $scope.featuredAds = data.ads;
        $scope.loading = false;
      }, function(err){
        console.log(err);
        $scope.loading = false;
      });
    }

    getFeaturedAds();

    $scope.clickCategory = function(category) {
      $scope.$parent.category = category;
      $scope.$parent.subCategory = null;
      $scope.$parent.search();
      $scope.$parent.selectedAd = null;
      $scope.$parent.selected = "";
      $scope.$parent.showGoogleAds = true;
      $location.path('/index');
    };

    $scope.clickSubCategory = function(category, subCategory) {
      $scope.$parent.category = category;
      $scope.$parent.subCategory = subCategory;
      $scope.$parent.search();
      $scope.$parent.selectedAd = null;
      $scope.$parent.selected = "";
      $scope.$parent.showGoogleAds = true;
      $location.path('/index');
    };

    $scope.showAd = function(id) {
      $scope.$parent.showAd(id);
      $scope.$parent.showGoogleAds = true;
      $location.path('/index');
    }

    $scope.range = function(max) {
      var input = [];
      for (var i = 0; i < max; i += 1) input.push(i);
      return input;
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
  '$scope', '$location', '$upload', 'Auth', 'AppService', function($scope, $location, $upload, Auth, AppService) {
    $scope.tags = [];
    $scope.success = false;
    $scope.loading = false;
    $scope.selectedTag = null;
    $scope.isFeatured = false;
    $scope.totalPrice = 0;
    $scope.email = Auth._currentUser ? Auth._currentUser.email : null;
    var params = {};

    AppService.getTags(function(data){
      $scope.tags = data;
    }, function(error){
      console.log(error);
    });

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
        params.is_featured = $scope.isFeatured;
        if ($scope.selectedTag) params.tag = $scope.selectedTag.name;

        if ($scope.isFeatured || $scope.selectedTag) {
          var price = 0;
          var charges = [];
          if ($scope.isFeatured) {
            price = price + 5;
            charges.push({name: 'Featured', cost: 5});
          }
          if ($scope.selectedTag) {
            price = price + $scope.selectedTag.price;
            charges.push({name: $scope.selectedTag.name, cost: $scope.selectedTag.price});
          }
          var paymentParams = {
            classifiedAd: params,
            charges: charges,
            amount: price
          }
          AppService.setPaymentParams(paymentParams);
          $location.path('/payment_form');
        } else {
          $scope.loading = true;
          $('#veil').show();
          $upload.upload({
            url: 'http://bst-bahamas.herokuapp.com/classified_ads',
            method: 'POST',
            data: params,
            photo: params.photo // or list of files ($files) for html5 only
          }).success(function(data, status, headers, config) {
            $scope.success = true;
            $scope.loading = false;
            $('#veil').hide();
          }).error(function(error){
            $scope.showError = true;
            $scope.loading = false;
            $('#veil').hide();
          });
        }
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
    //var params = {id: $location.search()['id']}

    AppService.getTags(function(data){
      $scope.tags = data;
    }, function(error){
      console.log(error);
    });

    var params = {id: AppService.getSelectedAdID()}
    AppService.getClassifiedAd(params, function(data){
      $scope.classifiedAd = data;

      for(var i = 0; i < $scope.$parent.locations.length; i++) {
        if ($scope.$parent.locations[i].id == $scope.classifiedAd.location_id){
          $scope.location = $scope.$parent.locations[i];
          break;
        }
      }

      for(var i = 0; i < $scope.$parent.categories.length; i++) {
        if ($scope.$parent.categories[i].id == $scope.classifiedAd.category_id){
          $scope.category = $scope.$parent.categories[i];
          for(var j = 0; j < $scope.category.sub_category.length; j++) {
            if ($scope.category.sub_category[j].id == $scope.classifiedAd.sub_category_id){
              $scope.subCat = $scope.category.sub_category[j];
              break;
            }
          }
        }
      }

    }, function(error){
      console.log(error);
    })
  }
]);


//MYADSCTRL
myApp.controller('MyAdsCtrl', [
  '$scope', '$location', 'AppService', function($scope, $location, AppService) {
    $scope.myAds = [];
    $scope.loading = true;

    AppService.myAds(function(data){
      $scope.myAds = data.ads;
      $scope.loading = false;
    }, function(error){
      $scope.loading = false;
    })

    $scope.getID = function(id)
    {
      AppService.setSelectedAdID(id);
      $location.path('/edit_ad');
    }

    $scope.delete = function(ad)
    {
      AppService.deleteMyAd({id: ad.id}, function(data){
        ad.isDeleted = true;
      }, function(error){
        console.log(error);
      });
    }
  }
]);

//PAYMENTCTRL
myApp.controller('PaymentCtrl', [
  '$scope', '$location', '$upload', 'AppService', function($scope, $location, $upload, AppService) {
    $scope.paymentParams = AppService.getPaymentParams();
    $scope.loading = false;

    $scope.handleStripe = function(status, response) {
      console.log(response);
      if(response.error) {
        // there was an error. Fix it.
      } else {
        var params = {
          amount: $scope.paymentParams.amount,
          token: response.id
        };
        $scope.loading = true;
        $('#veil').show();
        AppService.createCharge(params, function(data){
          if ($scope.paymentParams.classifiedAd) {
            $upload.upload({
              url: 'http://bst-bahamas.herokuapp.com/classified_ads',
              method: 'POST',
              data: $scope.paymentParams.classifiedAd,
              photo: $scope.paymentParams.classifiedAd.photo
            }).success(function(data, status, headers, config) {
              $scope.success = true;
              $scope.loading = false;
              $('#veil').hide();
            }).error(function(error){
              $scope.loading = false;
              $scope.errorMessage = "An error occurred while posting your ad.";
              $('#veil').hide();
            });
          }
        }, function(error){
          $scope.loading = false;
          $scope.errorMessage = error.data.message;
          $('#veil').hide();
        });
      }
    }
  }
]);