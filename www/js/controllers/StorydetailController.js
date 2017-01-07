'use strict';
angular.module('starter')
.controller('StorydetailController', function($rootScope,$scope,$stateParams,
    StoryService,$ionicModal,$timeout,ionicMaterialMotion,ionicMaterialInk,$state,AuthService,ChapterService,
    $ionicSlideBoxDelegate,$ionicScrollDelegate, LibraryService, $ionicLoading,$mdToast,$ionicHistory) {
 
  var backView = $ionicHistory.backView();
      console.log($ionicHistory.viewHistory().views);
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

  //Parallax Theme

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
    $scope.ifLimitto =true;
    $scope.descriptionLimit=260;

    $scope.increaseDescription = function(){
      $scope.descriptionLimit = 3000;
        $scope.ifLimitto =false;
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

    StoryService.getStoryWithID($stateParams.storyid).then(function(data){
      $scope.story=data;
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
          image:chapter.image,
          id:chapter.id
        })
      });

    });


    $ionicModal.fromTemplateUrl('templates/modal.html', {
      scope: $scope
    }).then(function(modal) {
      $scope.modal = modal;
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
