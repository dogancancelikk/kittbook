/* global angular, document, window */
'use strict';

angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope,USER_DATA,$ionicModal, $ionicPopover,$ionicViewSwitcher,
    $timeout,AuthService,AUTH_EVENTS,$state,$rootScope,$ionicHistory,$ionicPlatform,$window,$mdDialog, $mdBottomSheet, $mdMenu, $mdSelect,$mdUtil, $mdSidenav) {
    //Authentication operations
    //Yetkisiz girişlerin yakalandığı yer
//     $scope._userid=$rootScope.globals.currentUser.id;
    $scope.$on(AUTH_EVENTS.notAuthorized, function (event) {
      alert('Yetkisiz giriş');
    });
        var globals = {};
    globals = window.localStorage.getItem("itemsArray");
    $rootScope.globals.currentUser = globals;

    console.log($rootScope.globals.currentUser);
    //notAuthenticated değerinin uygulamanın içerisinde yakalandığı yer
    $scope.$on(AUTH_EVENTS.notAuthenticated, function (event) {
      AuthService.logout();
      $state.go('app.login', {}, {reload: true});
      alert('session kapanır');
    });

    $scope.navigateTo = function (stateName,objectData) {
    if ($ionicHistory.currentStateName() != stateName) {
        $ionicHistory.nextViewOptions({
            disableAnimate: false,
            disableBack: true
        });

        //Next view animate will display in back direction
        $ionicViewSwitcher.nextDirection('back');

        $state.go(stateName, {
            isAnimated: objectData,
        });
    }
}; // End of navigateTo.

    $scope.authenticated=AUTH_EVENTS.notAuthenticated;
    $scope.logout = function () {
      AuthService.logout();
      $state.go('app.login');
    };

    $scope.goProfile = function(){
        $state.go('app.profile');
    }

    // Form data for the login modal
    $scope.loginData = {};
    $scope.isExpanded = false;
    $scope.hasHeaderFabLeft = false;
    $scope.hasHeaderFabRight = false;

    $ionicPlatform.registerBackButtonAction(function(){
      debugger;
      // if($ionicHistory.currentView().stateName ==="app.home"){
      //   $window.location.reload();
      // }

      // var counter = 0;
      //
      // if($ionicHistory.currentView.stateName === "app.home"){
      //   if(counter === 0){
      //     $window.location.reload();
      //   }
      //   counter ++;
      // }

      if($mdSidenav("left").isOpen()){
    //If side navigation is open it will close and then return
          $mdSidenav('left').close();
      }
      else if(jQuery('[id^=dialog]').length > 0 ){
          //If popup dialog is open it will close and then return
          $mdDialog.cancel();
      }
      else if(jQuery('md-menu-content').length > 0 ){
          //If md-menu is open it will close and then return
          $mdMenu.hide();
      }
      else{
            if($ionicHistory.backView() == null && $ionicHistory.currentView().stateName === 'app.home'){

                //Check is popup dialog is not open.
                if(jQuery('[id^=dialog]').length == 0 ) {

                    // mdDialog for show $mdDialog to ask for
                    // Confirmation to close the application.
                    var confirmPopup = $ionicPopup.confirm({
                      title: 'Onaylama',
                      template: 'Uygulamayı kapatmak istiyor musunuz?'
                    });

                    confirmPopup.then(function(res) {
                      if(res) {
                          ionic.Platform.exitApp();
                      } else {
                        $state.go('app.home');
                      }
                    });
                    // $mdDialog.show({
                    //     controller: 'DialogController',
                    //     templateUrl: 'confirm-dialog.html',
                    //     targetEvent: null,
                    //     locals: {
                    //         displayOption: {
                    //             title: "Onaylama",
                    //             content: "Uygulamayı kapatmak istiyor musunuz?",
                    //             ok: "Evet",
                    //             cancel: "Hayır"
                    //         }
                    //     }
                    // }).then(function () {
                    //
                    //     ionic.Platform.exitApp();
                    // }, function () {
                    // });
                }
            }else if($ionicHistory.backView() == null && $ionicHistory.currentView.stateName !== 'app.home'){
              $state.go('app.home');
            }
            else{
                //Go to the view of lasted state.
                $ionicHistory.goBack();
            }
        }
    },100);

    var navIcons = document.getElementsByClassName('ion-navicon');
    for (var i = 0; i < navIcons.length; i++) {
        navIcons.addEventListener('click', function() {
            this.classList.toggle('active');
        });
    }

    $ionicPlatform.registerBackButtonAction(function(){
      if($ionicHistory.backView() == null ){

              $mdDialog.show({
                  controller: 'DialogController',
                  templateUrl: 'confirm-dialog.html',
                  targetEvent: null,
                  locals: {
                      displayOption: {
                          title: "Confirmation",
                          content: "Do you want to close the application?",
                          ok: "Confirm",
                          cancel: "Cancel"
                      }
                  }
              }).then(function () {
                  //If user tap Confirm at the popup dialog.
                  //Application will close.
                  ionic.Platform.exitApp();
              }, function () {
                  // For cancel button actions.
              }); //End mdDialog
      }
      else{
          //Go to the view of lasted state.
          $ionicHistory.goBack();
      }
    })



    ////////////////////////////////////////
    // Layout Methods
    ////////////////////////////////////////

    $scope.hideNavBar = function() {
        document.getElementsByTagName('ion-nav-bar')[0].style.display = 'none';
    };

    $scope.showNavBar = function() {
        document.getElementsByTagName('ion-nav-bar')[0].style.display = 'block';
    };

    $scope.noHeader = function() {
        var content = document.getElementsByTagName('ion-content');
        for (var i = 0; i < content.length; i++) {
            if (content[i].classList.contains('has-header')) {
                content[i].classList.toggle('has-header');
            }
        }
    };

    $scope.setExpanded = function(bool) {
        $scope.isExpanded = bool;
    };

    $scope.setHeaderFab = function(location) {
        var hasHeaderFabLeft = false;
        var hasHeaderFabRight = false;

        switch (location) {
            case 'left':
                hasHeaderFabLeft = true;
                break;
            case 'right':
                hasHeaderFabRight = true;
                break;
        }

        $scope.hasHeaderFabLeft = hasHeaderFabLeft;
        $scope.hasHeaderFabRight = hasHeaderFabRight;
    };

    $scope.hasHeader = function() {
        var content = document.getElementsByTagName('ion-content');
        for (var i = 0; i < content.length; i++) {
            if (!content[i].classList.contains('has-header')) {
                content[i].classList.toggle('has-header');
            }
        }

    };

    $scope.hideHeader = function() {
        $scope.hideNavBar();
        $scope.noHeader();
    };

    $scope.showHeader = function() {
        $scope.showNavBar();
        $scope.hasHeader();
    };

    $scope.clearFabs = function() {
        var fabs = document.getElementsByClassName('button-fab');
        if (fabs.length && fabs.length > 1) {
            fabs[0].remove();
        }
    };
})

.directive('input', function($timeout) {
  return {
    restrict: 'E',
    scope: {
      'returnClose': '=',
      'onReturn': '&',
      'onFocus': '&',
      'onBlur': '&'
    },
    link: function(scope, element, attr) {
      element.bind('focus', function(e) {
        if (scope.onFocus) {
          $timeout(function() {
            scope.onFocus();
          });
        }
      });
      element.bind('blur', function(e) {
        if (scope.onBlur) {
          $timeout(function() {
            scope.onBlur();
          });
        }
      });
      element.bind('keydown', function(e) {
        if (e.which == 13) {
          if (scope.returnClose) element[0].blur();
          if (scope.onReturn) {
            $timeout(function() {
              scope.onReturn();
            });
          }
        }
      });
    }
  }
})

.controller('FriendsCtrl', function($scope, $stateParams, $timeout, ionicMaterialInk, ionicMaterialMotion) {
    // Set Header

    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.$parent.setHeaderFab('left');

    // Delay expansion
    $timeout(function() {
        $scope.isExpanded = true;
        $scope.$parent.setExpanded(true);
    }, 300);

    // Set Motion
    ionicMaterialMotion.fadeSlideInRight();

    // Set Ink
    ionicMaterialInk.displayEffect();
})

.controller('ActivityCtrl', function($scope, $stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk) {
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = true;
    $scope.$parent.setExpanded(true);
    $scope.$parent.setHeaderFab('right');

    $timeout(function() {
        ionicMaterialMotion.fadeSlideIn({
            selector: '.animate-fade-slide-in .item'
        });
    }, 200);

    // Activate ink for controller
    ionicMaterialInk.displayEffect();
})

.controller('GalleryCtrl', function($scope, $stateParams, $timeout, ionicMaterialInk, ionicMaterialMotion) {
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = true;
    $scope.$parent.setExpanded(true);
    $scope.$parent.setHeaderFab(false);

    // Activate ink for controller
    ionicMaterialInk.displayEffect();

    ionicMaterialMotion.pushDown({
        selector: '.push-down'
    });
    ionicMaterialMotion.fadeSlideInRight({
        selector: '.animate-fade-slide-in .item'
    });

});
