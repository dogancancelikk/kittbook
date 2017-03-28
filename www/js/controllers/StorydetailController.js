'use strict';
angular.module('starter')
.controller('StorydetailController', function($rootScope,$scope,$stateParams,
    StoryService,$ionicModal,$timeout,$state,AuthService,ChapterService,
    $ionicSlideBoxDelegate,$ionicScrollDelegate, LibraryService, $ionicLoading,$mdToast,$ionicHistory,$ionicPopup) {

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
  //Parallax End

   $scope.storyid=$stateParams.storyid;
   var userid=$rootScope.globals.currentUser.id;
   var libraryid = $rootScope.globals.currentUser.libraryid;
   console.log(libraryid);
    $scope.alreadyHave=false;
    $scope.isOwnStory = false;
    $scope.ifLimitto =false;
    $scope.descriptionLimit=260;
    $scope.comments = [];
  $scope.rate;

    $scope.increaseDescription = function(){
      $scope.descriptionLimit = 3000;
        $scope.ifLimitto =false;
    }
    $scope.points = [1,2,3,4,5];
    $scope.rateStory = function(){
      //   var myPopup = $ionicPopup.show({
      //   template: '<md-select placeholder="Puanlar" ng-model="rate">'+
      //       '<md-option><em>Seçiniz</em></md-option>'+
      //       '<md-option ng-value="1">'+
      //        '1'+
      //      '</md-option>'+
      //                 '<md-option ng-value="2">'+
      //        '2'+
      //      '</md-option>'+
      //                 '<md-option ng-value="3">'+
      //        '3'+
      //      '</md-option>'+
      //                 '<md-option ng-value="4">'+
      //        '4'+
      //      '</md-option>'+
      //                 '<md-option ng-value="5">'+
      //        '5'+
      //      '</md-option>'+
      //     '</md-select>',
      //   title: 'Puan Ver',
      //   scope: $scope,
      //   buttons: [
      //     { text: 'İptal' },
      //     {
      //       text: '<b>Puan Ver</b>',
      //       type: 'button-positive',
      //       onTap: function(e) {
      //        e.preventDefault();
      //       }
      //     }
      //   ]
      // });
      //
      // myPopup.then(function(res) {
      //   debugger;
      //   console.log('Tapped!', res);
      // });
    }

    function checkDescriptionCharCount(description){
        if(description.length >= 260){
          $scope.ifLimitto = true;
        }else{
          $scope.ifLimitto = false;
        }
    }

  $scope.deleteStoryFromLibrary = function(){
    LibraryService.deleteStoryFromLibrary(libraryid,$scope.storyid).then(function(data){
      console.log(data);
      $scope.alreadyHave=false;
      $state.go("app.storydetail",{storyid:$scope.storyid},{inherit:false});
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
      LibraryService.addStoryToLibrary(libraryid, $scope.storyid).then(function(data) {
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
    StoryService.readStory($stateParams.storyid, userid);

    StoryService.getStoryWithID($stateParams.storyid).then(function(data){
     StoryService.getComments(data.id).then(function(data){

        if(data){
          $scope.comments = data;
        }
      })
      $scope.story=data;
      checkDescriptionCharCount(data.description);
      $scope.storyid=data.id;
      if($rootScope.globals.currentUser.id == data.ownerID){
        $scope.isOwnStory = true;
      }else{
        LibraryService.hasStory(libraryid,$scope.storyid).then(function(data){
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
    },function(err){
        console.log(err);
    });

    $scope.deneme=function(){
      console.log("dene dene dene");
    }

    $scope.chapters=[];
    ChapterService.getStoryChapter($scope.storyid,true).then(function(chapters){
      console.log(chapters.length);
      angular.forEach(chapters,function(chapter){
        $scope.chapters.push({
          name:chapter.name,
          text:chapter.text,
          id:chapter.id
        })
      });
    });

    $ionicModal.fromTemplateUrl('templates/modal.html', {
      scope: $scope
    }).then(function(modal) {
      $scope.modal = modal;
      $scope.comment={};
      $scope.sendComment = function(comment){
        $scope.comment = {};
        console.log(comment);
        StoryService.addComment(userid,$scope.storyid,comment.message).then(function(data){
          console.log(data);
          $scope.comments.push(data);
        })
      }
    });

    $scope.createChapter=function(chapterName){
      ChapterService.addStoryChapter(1,chapterName,'B',$stateParams.storyid,userid,'bu bir texttir.')
      .then(function(data){
        console.log(data);
      });
      $scope.modal.hide();
    }

})
.filter('limitHtml', function() {
    return function(text, limit) {

        var changedString = String(text).replace(/<[^>]+>/gm, '');
        var length = changedString.length;

        return changedString.length > limit ? changedString.substr(0, limit - 1) : changedString;
    }
});
