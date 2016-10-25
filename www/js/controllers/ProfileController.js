'use strict';
angular
.module('starter')
.controller('ProfileController',function(ionicMaterialInk,$ionicTabsDelegate,$timeout,$scope,$state,$stateParams,
  $rootScope,UserService,ionicMaterialMotion,RelationshipService,$ionicModal,PostService){
	
		//begin
   $scope.$parent.showHeader();
   $scope.$parent.clearFabs();
   $scope.isExpanded = false;
   $scope.$parent.setExpanded(false);
   $scope.$parent.setHeaderFab(false);

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
   //End
   $ionicTabsDelegate.selectedIndex() == 0

   $scope.isOwnProfile=false;
   $scope.isFollowed=false;
   var currentUser=$rootScope.globals.currentUser;
   var _userid = $rootScope.globals.currentUser.id;
   
   var getUserId = function(){
   	if($stateParams.userid == ""){
   		var userid= _userid;
   		return userid;
   	}else{
   		return $stateParams.userid;
   	}
   }
   
	 $scope.lastUserID=getUserId();
   $scope.followers=[];
   $scope.followedUsers=[];
  
  
   UserService.getUserDetail(getUserId()).then(function(data){
   		$scope.user=data;
   		isOwn($scope.user.id,_userid);
   		RelationshipService.getFollowers(getUserId()).then(function(data){
       $scope.followers = data;
        for (var i = 0, len = $scope.followers.length; i < len; i++) {
          if (_userid == $scope.followers[i].id) {
            $scope.isFollowed = true;
            break;
          }
        }
		},function(err){
			console.log(err);
		});	
   },function(err){
   	console.log(err);
   });
  RelationshipService.getFollowedUsers(getUserId()).then(function(followedUsers){
   $scope.followedUsers=followedUsers;
  },function(err){
   console.log(err);
  })
 
 	console.log($scope.followers);
  $scope.follow = function() {
    
      RelationshipService.follow(_userid, $scope.lastUserID).then(function(data) {
        $scope.isFollowed = true;
      console.log('işlem tamam');
      $state.go('app.home');
    },function(err) {
      alert('hata var hata');
    })
  };
  $scope.unfollow = function() {
    RelationshipService.unfollow(_userid, $scope.lastUserID).then(function(data) {
       $scope.isFollowed = false;
      console.log('işlem tamam');
      $state.go('app.home');
    },function(err) {
      alert('hata var');
    })
      
  };
	$scope.posts=[];
	PostService.getUserPosts(_userid).then(function(data){
		$scope.posts=data;
	},function(err){
		console.log(err);
	})

		$ionicModal.fromTemplateUrl('templates/postmodal.html', {
			scope: $scope,
			animation: 'slide-in-up'
		}).then(function(modal) {
			$scope.modal = modal;
		});
		$scope.data={};
		$scope.post=function(data){
				PostService.addPost(_userid,data.message).then(function(data){
					console.log(data);
					$scope.posts.push(data);
					$scope.modal.hide();
			
				},function(err){
					console.log(err);
				})
			}
			
	var isOwn = function(serviceId,rootId){
		if(serviceId == rootId){
   			$scope.isOwnProfile=true;
   		}else{
   			$scope.isOwnProfile=false;
   		}
	}

});