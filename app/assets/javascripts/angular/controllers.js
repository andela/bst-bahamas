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
    $scope.sortByOptions = [
      {name: "Date Posted (High)", value: "created_at DESC"},
      {name: "Date Posted (Low)", value: "created_at ASC"},
      {name: "Price (High)", value: "price DESC"},
      {name: "Price (Low)", value: "price ASC"}
    ];
    $scope.sortBy = $scope.sortByOptions[0];

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
      angular.forEach($scope.categories, function(category){
        category.sub_category.sort(function(a,b){
            return a.id - b.id;
        });
      });

    },function(error) {
      console.log(error);
    });

    //get locations
    AppService.getLocations(function(data) {
      angular.copy(data, $scope.locations);

      $scope.locations.sort(function(a,b){
        return a.id - b.id;
      });
      angular.forEach($scope.locations, function(location){
        $scope.locationHash[location.id] = location.name;
      });

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
      if ($scope.sortBy) params.sort_by = $scope.sortBy.value;

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
        $scope.currentUser = null;
        $scope.loggedIn = false;
        $location.path('/index');
      }, function(error) {
        console.log(error);
      });
    };

    $scope.doSearch = function() {
      if ($location.path() != '/index') $location.path('/index');
      $scope.search();
      $scope.selectedAd = null;
      $scope.selected = "";
    }

    $scope.selectCategory = function() {
      if ($location.path() != '/index') $location.path('/index');
      $scope.subCategory = null;
      $scope.search();
      $scope.selectedAd = null;
      $scope.selected = "";
    };

    $scope.selectLocation = function() {
      if ($location.path() != '/index') $location.path('/index');
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

    $scope.checkImgLinks = function(link_names)
    {
        $scope.selectedAdImgs = [];
        var regex = new RegExp('missing');
        //link_name corresponds to photo_medium_url, photo_1_medium_url
        link_names.forEach(function(link_name){
            var link = $scope.selectedAd[link_name] ? $scope.selectedAd[link_name] : undefined;
            if(!regex.test(link))
            {
                $scope.selectedAdImgs.push(link);
            }
        });
    }
    
    $scope.showAd = function(id)
    {
      
      $scope.showSpinner = true;
      AppService.getClassifiedAd({'id':id}, function(data){
        $scope.category = null;
        $scope.sub_category = null;
        $scope.selectedAd = data;
        $scope.showSpinner = false;
        $scope.checkImgLinks.call(null, ['photo_medium_url','photo_1_medium_url','photo_2_medium_url']);
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
  '$scope', '$location', 'Auth', 'AppService', function($scope, $location, Auth, AppService) {
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
          $scope.$parent.currentUser = user;
          $location.path('/home');
      }, function(error) {
          $scope.showError = true;
      });
    };

    $scope.forgotPassword = function() {
      $scope.showForgotPassword = true;
    };

    $scope.resetPassword = function() {
      var params = {email: $scope.email};
      AppService.resetPassword(params, function(data){
        $scope.success = true;
        $scope.error = false;
        $scope.showForgotPassword = false;
      }, function(error){
        $scope.success = false;
        $scope.error = true;
      })
    };

    $scope.updatePassword = function() {
      var params = {
        reset_password_token: $location.search()['reset_password_token'],
        password: $scope.password,
        password_confirmation: $scope.passwordConfirmation
      }
      AppService.updatePassword(params, function(data){
        $scope.success = true;
      }, function(error){
        $scope.errors = error.data.errors;
      })
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
        $scope.$parent.currentUser = registeredUser;
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
          AppService.createAd(params, function(data){
            scope.success = true;
            $scope.loading = false;
            $('#veil').hide();
          }, function(error){
            $scope.showError = true;
            $scope.loading = false;
            $('#veil').hide();
          });
        }
      }
    };

    $scope.onFileSelect = function($files) {
      params.photo = $files[0];
      if ($files[1]) params.photo_1 = $files[1];
      if ($files[2]) params.photo_2 = $files[2];
    };
  }
]);


//EDITCTRL
myApp.controller('EditAdCtrl', [
  '$scope', '$location', '$upload', 'AppService', function($scope, $location, $upload, AppService) {
    $scope.tags = [];
    $scope.selectedTag = null;
    $scope.successMsg = null;
    $scope.errorMsg = null;

    AppService.getTags(function(data){
      $scope.tags = data;
    }, function(error){
      console.log(error);
    });

    var params = {
      id: AppService.getSelectedAdID() ? AppService.getSelectedAdID() : $location.search()['id']
    }
    AppService.getClassifiedAd(params, function(data){
      $scope.classifiedAd = data;
      $scope.isFeatured = data.is_featured;

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

      for(var i = 0; i < $scope.tags.length; i++) {
        if ($scope.tags[i].name == $scope.classifiedAd.tag){
          $scope.selectedTag = $scope.tags[i];
          break;
        }
      }
    }, function(error){
      console.log(error);
    });

    $scope.submitForm = function(isValid) {
      if (isValid) {
        params.id = $scope.classifiedAd.id;
        params.location_id = $scope.location.id;
        params.category_id = $scope.category.id;
        params.sub_category_id = $scope.subCat.id;
        params.price = $scope.classifiedAd.price;
        params.title = $scope.classifiedAd.title;
        params.description = $scope.classifiedAd.description;
        params.poster_name = $scope.classifiedAd.poster_name;
        params.poster_email = $scope.classifiedAd.poster_email;
        params.poster_phone_no = $scope.classifiedAd.poster_phone_no;
        params.is_featured = $scope.isFeatured;
        if ($scope.selectedTag) params.tag = $scope.selectedTag.name;

        if (($scope.isFeatured && !$scope.classifiedAd.is_featured) || ($scope.selectedTag && ($scope.selectedTag.name != $scope.classifiedAd.tag))) {
          var price = 0;
          var charges = [];
          if ($scope.isFeatured && !$scope.classifiedAd.is_featured) {
            price = price + 5;
            charges.push({name: 'Featured', cost: 5});
          }
          if ($scope.selectedTag && ($scope.selectedTag.name != $scope.classifiedAd.tag)) {
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
          AppService.updateAd(params, function(data){
            $scope.success = true;
            $scope.loading = false;
            $('#veil').hide();
            $scope.successMsg = "Your ad has been successfully updated!";
          }, function(error){
            $scope.showError = true;
            $scope.loading = false;
            $('#veil').hide();
            $scope.errorMsg = "An error occurred while attempting to update your ad.";
          });
        }
      }
    };

    $scope.onFileSelect = function($files) {
      params.photo = $files[0];
      if ($files[1]) params.photo_1 = $files[1];
      if ($files[2]) params.photo_2 = $files[2];
    };

    $scope.delete = function() {
      $scope.loading = true;
      $('#veil').show();
      AppService.deleteAd({id: $scope.classifiedAd.id}, function(data){
        $scope.success = true;
        $scope.loading = false;
        $('#veil').hide();
        $scope.successMsg = "Your ad has been successfully deleted.";
      }, function(error){
        $scope.showError = true;
        $scope.loading = false;
        $('#veil').hide();
        $scope.errorMsg = "An error occurred while attempting to delete your ad.";
      });
    }
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
      AppService.deleteAd({id: ad.id}, function(data){
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
            if ($scope.paymentParams.classifiedAd.id) {
              AppService.updateAd($scope.paymentParams.classifiedAd, function(data){
                $scope.success = true;
                $scope.loading = false;
                $('#veil').hide();
              }, function(error){
                $scope.loading = false;
                $scope.errorMessage = "An error occurred while updating your ad.";
                $('#veil').hide();
              });
            } else {
              AppService.createAd($scope.paymentParams.classifiedAd, function(data){
                $scope.success = true;
                $scope.loading = false;
                $('#veil').hide();
              }, function(error){
                $scope.loading = false;
                $scope.errorMessage = "An error occurred while posting your ad.";
                $('#veil').hide();
              });
            }
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