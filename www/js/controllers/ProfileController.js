'use strict';
angular
.module('starter')
.controller('ProfileController',function($ionicTabsDelegate,$timeout,$scope,$state,$stateParams,
  $rootScope,UserService,RelationshipService,$ionicModal,PostService,$ionicLoading,$ionicHistory){

    $ionicLoading.show({
    content: 'Loading',
    animation: 'fade-in',
    showBackdrop: true,
    maxWidth: 200,
    showDelay: 0
  });
  var backView = $ionicHistory.backTitle();
      console.log(backView);
		//begin
   $scope.$parent.showHeader();
   $scope.$parent.clearFabs();
   $scope.isExpanded = false;
   $scope.$parent.setExpanded(false);
   $scope.$parent.setHeaderFab(false);


	 $scope.ifFollowedUser = false;
	$scope.ifUnFollowedUser = false;
	$scope.ifNeedEditProfile = false;

   $ionicTabsDelegate.selectedIndex() == 3;
   $scope.user = {};
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
   PostService.getUserPosts(getUserId()).then(function(posts){
      UserService.getUserDetail(getUserId()).then(function(user){
        $scope.user = user;
        $ionicLoading.hide();
      })
     $scope.posts=posts;
     console.log(posts);
   },function(err){
     console.log(err);
   });
	 function checkProfileStatus(){
		if($scope.isOwnProfile === false && $scope.isFollowed === true){
			 $scope.ifFollowedUser = true;
		 }else if($scope.isOwnProfile === false && $scope.isFollowed === false){
			 $scope.ifUnFollowedUser = true;
		 }else if($scope.isOwnProfile){
			 $scope.ifNeedEditProfile = true;
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

				checkProfileStatus();
        $ionicLoading.hide();
		},function(err){
			console.log(err);
		});

    RelationshipService.getFollowedUsers(getUserId()).then(function(followedUsers){
     $scope.followedUsers=followedUsers;
    },function(err){
     console.log(err);
    });



   },function(err){
   	console.log(err);
   });



 	console.log($scope.followers);
  $scope.follow = function() {
        $ionicLoading.show({
        content: 'Loading',
        animation: 'fade-in',
        showBackdrop: true,
        maxWidth: 200,
        showDelay: 0
      });
    RelationshipService.follow(_userid, $scope.lastUserID).then(function(data) {

        $scope.isFollowed = true;
        $ionicLoading.hide();

    },function(err) {
      alert('hata var hata');
    })
  };

  $scope.deletePost = function(post) {
        $ionicLoading.show({
        content: 'Loading',
        animation: 'fade-in',
        showBackdrop: true,
        maxWidth: 200,
        showDelay: 0
      });
    PostService.deletePost(post.id).then(function(response) {
       var index = $scope.posts.indexOf(post);
       $scope.posts.splice(index, 1);
       console.log("işlem başarılı");
       $ionicLoading.hide();
    }, function(error) {
        Alert('Bir Hata var');
    }).finally(function() {
        alert('işlem bitti');
    });
  }

  $scope.unfollow = function() {
    RelationshipService.unfollow(_userid, $scope.lastUserID).then(function(data) {
       $scope.isFollowed = false;
      console.log('işlem tamam');

    },function(err) {
      alert('hata var');
    })

  };
	$scope.posts=[];

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
