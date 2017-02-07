angular.module('starter')
.controller('UserPostsController',function($scope,PostService,$ionicLoading,$stateParams,UserService){
  var userid = $stateParams.userid;
    $ionicLoading.show({
      content: 'Loading',
      animation: 'fade-in',
      showBackdrop: true,
      maxWidth: 200,
      showDelay: 0
    });

    PostService.getUserPosts(userid).then(function(posts){
       UserService.getUserDetail(userid).then(function(user){
         $scope.user = user;
         $ionicLoading.hide();
       })
      $scope.posts=posts;
      console.log(posts);
    },function(err){
      console.log(err);
    });
})
