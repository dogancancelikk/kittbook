'use strict';
angular.module('starter')
.controller('DiscoverStoryController',function($rootScope,$scope,$stateParams,
    StoryService,$ionicModal,$timeout,$state,AuthService,ChapterService,
    $ionicSlideBoxDelegate,$ionicScrollDelegate, LibraryService, $ionicLoading,$mdToast,$ionicHistory,$ionicPopup){

  // var backView = $ionicHistory.backTitle();
  //     console.log(backView);
      $ionicLoading.show({
      content: 'Loading',
      animation: 'fade-in',
      showBackdrop: true,
      maxWidth: 200,
      showDelay: 0
    });
  //Begin
  // Set Header
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = false;
    $scope.$parent.setExpanded(false);
    $scope.$parent.setHeaderFab(false);

  $ionicSlideBoxDelegate.update();
  $scope.onUserDetailContentScroll = onUserDetailContentScroll


   function onUserDetailContentScroll(){
    var scrollDelegate = $ionicScrollDelegate.$getByHandle('userDetailContent');
    var scrollView = scrollDelegate.getScrollView();
    $scope.$broadcast('userDetailContent.scroll', scrollView);
  }
  var userid=$rootScope.globals.currentUser.id;
  var libraryid = $rootScope.globals.currentUser.libraryid;
  console.log(libraryid);
   $scope.alreadyHave=false;
   $scope.isOwnStory = false;
   $scope.ifLimitto =false;
   $scope.descriptionLimit=260;
   $scope.comments = [];
   $scope.rate;

    StoryService.discoverStory().then(function(story){
      $scope.story = story;
      $scope.chapters=[];
      ChapterService.getStoryChapter(story.id,true).then(function(chapters){
        console.log(chapters.length);
        angular.forEach(chapters,function(chapter){
          $scope.chapters.push({
            name:chapter.name,
            text:chapter.text,
            id:chapter.id
          })
        });
      });
      StoryService.getComments(story.id).then(function(data){
         if(data){
           $scope.comments = data;
         }
       })
      StoryService.readStory(story.id, userid);
      checkDescriptionCharCount(story.description);
      if($rootScope.globals.currentUser.id == story.ownerID){
        $scope.isOwnStory = true;
      }else{
        LibraryService.hasStory(libraryid,story.id).then(function(data){
            console.log(data);
            if(data==true){
              $scope.alreadyHave=true;
            }else{
              $scope.alreadyHave=false;
            }
          },function(err){
            console.log(err);
          });
      }
      $ionicLoading.hide();
    });

    $ionicModal.fromTemplateUrl('templates/modal.html', {
      scope: $scope
    }).then(function(modal) {
      $scope.modal = modal;
      $scope.comment={};
      $scope.sendComment = function(comment){
        $scope.comment = {};
        console.log(comment);
        StoryService.addComment(userid,$scope.story.id,comment.message).then(function(data){
          console.log(data);
          $scope.comments.push(data);
        })
      }
    });


    $scope.increaseDescription = function(){
      $scope.descriptionLimit = 3000;
        $scope.ifLimitto =false;
    }
    function checkDescriptionCharCount(description){
        if(description.length >= 260){
          $scope.ifLimitto = true;
        }else{
          $scope.ifLimitto = false;
        }
    }
    $scope.deleteStoryFromLibrary = function(){
      LibraryService.deleteStoryFromLibrary(libraryid,$scope.story.id).then(function(data){
        console.log(data);
        $scope.alreadyHave=false;
        $state.go("app.storydetail",{storyid:$scope.story.id},{inherit:false});
        $mdToast.show({
            controller: 'toastController',
            templateUrl: 'toast.html',
            hideDelay: 800,
            position: 'bottom',
            locals: {
                displayOption: {
                    title: 'Kitaplığınızdan çıkarıldı.'
                }
            }
        });
        $ionicLoading.hide();
      },function(err){
        console.log(err);
      })
    }

      $ionicModal.fromTemplateUrl('templates/modal.html', {
        scope: $scope
      }).then(function(modal) {
        $scope.modal = modal;
      });
      $scope.addToLibrary = function() {
        LibraryService.addStoryToLibrary(libraryid, $scope.story.id).then(function(data) {
          console.log(data);
          $ionicLoading.show();
            $scope.alreadyHave = true;
            $mdToast.show({
                controller: 'toastController',
                templateUrl: 'toast.html',
                hideDelay: 800,
                position: 'bottom',
                locals: {
                    displayOption: {
                        title: 'Kitaplığınıza Eklendi.'
                    }
                }
            });
              $ionicLoading.hide();
        },function(err){
          console.log(err);
        });
      }

})
.filter('limitHtml', function() {
    return function(text, limit) {

        var changedString = String(text).replace(/<[^>]+>/gm, '');
        var length = changedString.length;

        return changedString.length > limit ? changedString.substr(0, limit - 1) : changedString;
    }
});
