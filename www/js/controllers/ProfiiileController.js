'use strict';
angular
 .module('starter')
 .controller('ProfileController',function($scope,$rootScope,USER_DATA, $stateParams,
  $ionicModal,UserService, $timeout, ionicMaterialMotion, ionicMaterialInk,$state,AuthService,RelationshipService){
  //Tema başlangıcı
   $scope.$parent.showHeader();
   $scope.$parent.clearFabs();
   $scope.isExpanded = false;
   $scope.$parent.setExpanded(false);
   $scope.$parent.setHeaderFab(true);

   // Set Motion
   $timeout(function() {
     ionicMaterialMotion.slideUp({
       selector: '.slide-up'
     });
   }, 300);

   $timeout(function() {
     ionicMaterialMotion.fadeSlideInRight({
       startVelocity: 3000
     });
   }, 700);

     // Set Ink
   ionicMaterialInk.displayEffect();
   //tema bitti
   $scope.userCount=0;
   $scope.user={};
   $scope.followers = [];
   $scope.isFollowed = false;
   $scope.isOwnProfile = false;
   var _userid=$rootScope.globals.currentUser.id;
   var _username=$rootScope.globals.currentUser.username;
   var _name=$rootScope.globals.currentUser.name;
   var _surname=$rootScope.globals.currentUser.surname;
   var image=$rootScope.globals.currentUser.image;
    
   var getUserId=function(){
       if($stateParams.userid == null){
         return _userid;      
        }else{
         return $stateParams.userid;
        }
   }

   console.log(getUserId());
   //$stateParam'dan profile giren kişinin id bilgisi geliyor...
   //Hesabın sahibi olan kişi $rootScope'ta bulunuyor
   //Viewdaki veriler $scope.user içerisinde dizi olarak tutuluyor.
   UserService.getUserDetail(getUserId()).then(function(data){
        $scope.user=data;

       RelationshipService.getFollowers($scope.user.id).then(function(data) {
            $scope.followers=data;

             angular.forEach($scope.followers,function(user) {
              $scope.userCount++;
                if(_userid == user.id) {
                  $scope.isFollowed = true;
                }

            });
        },function(err){
          console.log(err);
        });

        if(_username  == $scope.user.userName) {
          $scope.isOwnProfile = true;
        }

     },function(err){
      console.log(err);
     });

    $scope.follow = function() {
      RelationshipService.follow(_userid,$scope.user.id).then(function(data) {
        $scope.isFollowed = true;
      })
    };


    $scope.unfollow = function() {
      RelationshipService.unfollow(_userid, $scope.user.id).then(function(data) {
        $scope.isFollowed = false;
      })
    };

    $scope.profilTab=function(getTabID){
      if(getTabID==1){
        $state.go('app.post');
      }
      else if (getTabID==2) {
        $scope.htmlPage="friends.html";
      }else if (getTabID==3) {
        $state.go('app.about');
      }else {
        $scope.htmlPage="post.html";
      }

    }

 });
