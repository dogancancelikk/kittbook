'use strict';
angular
.module('starter')
.controller('LoginController',function($rootScope,$scope,UserService, ngFB, $timeout, $stateParams,$cordovaOauth,AuthService,$state,$ionicHistory,$http){

  $scope.data = {};

  //login (AuthService servisi kullanılıyor(services.js))
  $scope.login = function (data) {
    AuthService.login(data.username, data.password).then(function (authenticated) {
        $ionicHistory.nextViewOptions({
         disableBack: true
        });
        $state.go('app.home', {});
      }, function (err) {
        alert('hata var');
      });
  };

  $scope.loginmaybegoogle = function(){
    callGoogle();
  }
  var createUser = function(user) {
    UserService.create(user).then(function (response) {
      if (response) {
        AuthService.setCredentials(response);
        $ionicHistory.nextViewOptions({
         disableBack: true
        });
        $state.go('app.home', {});

      } else {
        console.log('Kişi oluşturulma işlemi hatası');
      }
    },
    function(err) {
      alert("Kişi oluşturulurken bir hata oluştu tekrar deneyiniz.");
    });
  }

  var createGoogleAccount = function(response) {
      var profile = response.getBasicProfile();
      var user = {};
      debugger;
      user.name = profile.getGivenName();
      user.surname = profile.getFamilyName();
      user.userName = profile.getId();
      user.email = profile.getEmail();
      user.image = profile.getImageUrl();
      user.googleID = profile.getId();
      UserService.getByGoogleId(profile.getId()).then(function (response) {
        if(response != null &&  response != '' && response.success != false) {
          AuthService.setCredentials(response);
          $ionicHistory.nextViewOptions({
           disableBack: true
          });
          $state.go('app.home', {});
        } else {
          createUser(user);
        }
      },
      function(err) {

      });
    }

  $scope.facebooklogin = function () {
      ngFB.login({scope: 'email'}).then(function (result) {
          if (result.status === 'connected') {

              console.log('Facebook login succeeded');
              console.log(result);
              $http.get("https://graph.facebook.com/v2.8/me", {
                params: {
                    access_token: result.authResponse.accessToken,
                    fields: "email,first_name,last_name,picture",
                    format: "json"
                }
            }).then(function(response){
                var user = {};
                 user.name = response.data.first_name;
                 user.surname = response.data.last_name;
                 user.userName = response.data.id;
                 user.email = response.data.email;
                 user.facebookID = response.data.id;
                 UserService.getByFacebookId(response.data.id).then(function (response) {
                    if(response != null &&  response != '' && response.success != false) {
                      AuthService.setCredentials(response);
                      $ionicHistory.nextViewOptions({
                       disableBack: true
                      });
                      $state.go('app.home', {});
                    } else {
                      createUser(user);
                    }
                  },
                  function(err) {
                    $ionicPopup.alert({
                        title: 'FacebookID!',
                        template: 'Kişi bilgisi alımında hata var'
                   });
                  });
                console.log(response);
            })
          }else {
              $ionicPopup.alert({
                  title: 'Unauthorized!',
                  template: 'User cancelled login or did not fully authorize.'
             });
          }
      });


  };// End login.

  if(window.gapi === undefined){
    $state.reload();
  }else{
    gapi.load('auth2', function() {
      gapi.auth2.init();
    });
  }

  $scope.options = {
      'height' : 35.994,
      'width': 165,  //165
      'onsuccess': function(response) {
        createGoogleAccount(response);
      }
    }
})
.directive('googleSignInButton', function() {
  return {
    scope: {
      buttonId: '@',
      options: '&'
    },
    template: '<div></div>',
    link: function(scope, element, attrs) {
      var div = element.find('div')[0];
      div.id = attrs.buttonId;
      gapi.signin2.render(div.id, scope.options()); //render a google button, first argument is an id, second options
    }
  };
});
