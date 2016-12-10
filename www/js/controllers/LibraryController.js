angular.module('starter')
.controller('LibraryController',function(LibraryService,$scope,$rootScope,$stateParams){
  var _userid = $rootScope.globals.currentUser.id;

  var getUserId = function(){
   if($stateParams.userid == ""){
     var userid= _userid;
     return userid;
   }else{
     return $stateParams.userid;
   }
  }

  LibraryService.getLibrary(getUserId()).then(function(storiesInLibrary){
    console.log(storiesInLibrary);
    $scope.userStories=storiesInLibrary;
  },function(err){
      console.log(err);
  });
});
