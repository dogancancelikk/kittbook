// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic','starter.controllers','ionic-material', 'ionMdInput','timer','jrCrop',
    'angularMoment','ngCookies','ionic-modal-select','ChatModule','ngMessages','ngFileUpload','ngOpenFB','ngCordova','ngCordovaOauth','angularTrix','ngSanitize','ngMaterial','ionic.ion.imageCacheFactory'])


    .controller('toastController', function ($scope, displayOption) {
        $scope.displayOption = displayOption;
    })
  .directive('headerShrink', function($document) {
  return {
    restrict: 'A',
    link: function($scope, $element, $attr) {
      var resizeFactor, scrollFactor, blurFactor;
      var header = $document[0].body.querySelector('.about-header');
      $scope.$on('userDetailContent.scroll', function(event,scrollView) {
        if (scrollView.__scrollTop >= 0) {
          scrollFactor = scrollView.__scrollTop/3.5;
          header.style[ionic.CSS.TRANSFORM] = 'translate3d(0, +' + scrollFactor + 'px, 0)';
        } else if (scrollView.__scrollTop > -70) {
          resizeFactor = -scrollView.__scrollTop/100 + 0.99;
          // blurFactor = -scrollView.__scrollTop/50;
          header.style[ionic.CSS.TRANSFORM] = 'scale('+resizeFactor+','+resizeFactor+')';
          // header.style.webkitFilter = 'blur('+blurFactor+'px)';
        }
      });
    }
  }
})

.constant("FACEBOOK_APP_ID","1793002480912477")
.run( function( $rootScope ) {
  // Load the facebook SDK asynchronously
  (function(){
     // If we've already installed the SDK, we're done
     if (document.getElementById('facebook-jssdk')) {return;}
     // Get the first script element, which we'll use to find the parent node
     var firstScriptElement = document.getElementsByTagName('script')[0];
     // Create a new script element and set its id
     var facebookJS = document.createElement('script');
     facebookJS.id = 'facebook-jssdk';
     // Set the new script's source to the source of the Facebook JS SDK
     facebookJS.src = '//connect.facebook.net/en_US/sdk.js';
     // Insert the Facebook JS SDK into the DOM
     firstScriptElement.parentNode.insertBefore(facebookJS, firstScriptElement);
   }());
})

.run(function(ngFB,FACEBOOK_APP_ID){
    ngFB.init({appId:FACEBOOK_APP_ID});
})

.run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
        }
    });
})
//http://www.w3schools.com/w3css/tryw3css_templates_social.htm#
 .run(function ($rootScope, $state, AuthService, $cookieStore,$http,$ionicHistory,$window,$ionicNavBarDelegate) {
   var currentUser = JSON.parse(localStorage.getItem('currentUser'));
   $rootScope.globals = currentUser || {};
        if ($rootScope.globals) {

            $rootScope.authenticated = true;
        }
      $rootScope.$on("$ionicView.beforeEnter", function(event, data){
       // handle event

      //  if(data.stateName === "app.home"){
      //
      //    $ionicHistory.removeBackView();
      //    $ionicHistory.clearHistory();
      //    $ionicHistory.clearCache();
      //     console.log($ionicHistory);
      //  }
    });

    $rootScope.$on("$ionicView.enter", function(event, data){
       $ionicNavBarDelegate.showBar(true);
      // debugger;
      // if($ionicHistory.currentView().stateName === "app.home"){
      //   if(stateControlCounter === 0){
      //     $window.location.reload();
      //   }
      //   stateControlCounter ++;
      // }
      // debugger;
      // if(data.stateName === 'app.home' && $ionicHistory.backView() !== null){
      //   $window.location.reload();
      // }
    });

    $rootScope.$on("$ionicView.afterEnter", function(event, data){
       // handle event
       if(data.stateName === "app.home"){
         $ionicHistory.removeBackView();
         $ionicHistory.clearHistory();
         $ionicHistory.clearCache();
       }
    });

    $rootScope.$on('$stateChangeStart', function (event, next, nextParams, fromState) {

      // if ('data' in next && 'authorizedRoles' in next.data) {
      //   var authorizedRoles = next.data.authorizedRoles;
      //   if (!AuthService.isAuthorized(authorizedRoles)) {
      //     event.preventDefault();
      //     $state.go($state.current, {}, {reload: true});
      //     $rootScope.$broadcast(AUTH_EVENTS.notAuthorized);
      //   }
      // }

      // console.log(event);
      // console.log(next);
      // console.log(fromState);
      // console.log(fromState.name != "");

      // if(fromState.name != "" && next.name === 'app.home'){
      //   $window.location.reload();
      // }



      if (!AuthService.isAuthenticated()) {
        if (next.name !== 'app.login') {
          event.preventDefault();
          $state.go('app.login',{},{notify:false});
        }
      }
      // else{
      //   debugger;
      //   if(next.name === 'app.login' || fromState.name === ""){
      //     event.preventDefault();
      //       $state.go('app.home');
      //   }
      //
      // }
    });
  })

  // .constant('USER_DATA',{
  //   name:'',
  //   username:'',
  //   userid:''
  // })
  .constant('domainConstant', (function () {
    var resource = 'http://kittbook.com';
    return {
      home: resource,
      storyApi: resource + '/api/story',
      chapterApi: resource + '/api/chapter',
      userApi:resource+'/api/user',
      relationshipApi: resource + '/api/relationship',
      activityApi: resource+'/api/event',
      applyeventApi: resource+'/api/eventapply',
      collectivebookApi:resource+"/api/collectivebook/",
      postApi:resource+"/api/post/",
      categoryApi: resource+"/api/category/",
      searchApi: resource +"/api/search/",
      messageApi: resource + "/api/message/",
      libraryApi: resource + "/api/library/"

    };
  })())

.config(['$ionicConfigProvider', function($ionicConfigProvider) {
    $ionicConfigProvider.tabs.position('bottom'); // other values: top
}])


.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {

    // Turn off caching for demo simplicity's sake
    $ionicConfigProvider.views.maxCache(5);
    $ionicConfigProvider.backButton.previousTitleText(false);
    $ionicConfigProvider.views.transition('none');

    /*
    // Turn off back button text
    $ionicConfigProvider.backButton.previousTitleText(false);
    */

    $stateProvider.state('app', {
        url: '/app',
        abstract: true,
        templateUrl: 'templates/menu.html',
        controller: 'AppCtrl'
    })

     .state('app.collectivebook', {
        url: '/collectivebook',
        views: {
            'menuContent': {
                templateUrl: 'templates/collectiveBook.html',
                controller: 'CollectiveBookController'
            },
            'fabContent': {
                // template: '<button ng-if="hideFab" id="fab-activity" ng-click="goHome();" class="button button-fab button-fab-bottom-right expanded button-energized-900 flap"><i class="icon ion-android-home"></i></button>',
                // controller: function ($timeout,$scope,$state) {
                //     $scope.hideFab = true;
                //     $timeout(function () {
                //         document.getElementById('fab-activity').classList.toggle('on');
                //     }, 200);
                //     $scope.goHome = function(){
                //         $state.go('app.home');
                //         $scope.hideFab = false;
                //
                //     }
                // }
            }
        }
    })
    .state('app.newannouncement', {
      url: '/newannouncement',
      views: {
        'menuContent': {
          templateUrl: 'templates/newannouncement.html',
          controller: 'AnnouncementController'
          },
        'fabContent': {
//             template: '<button id="fab-activity" class="button button-fab button-fab-top-right expanded button-energized-900 flap"><i class="icon ion-paper-airplane"></i></button>',
//             controller: function ($timeout) {
//               $timeout(function () {
//                 document.getElementById('fab-activity').classList.toggle('on');
//               }, 200);
//             }
          }
      }
    })
    .state('app.newcollectivebook', {
       url: '/newcollectivebook',
       views: {
           'menuContent': {
               templateUrl: 'templates/newcollectivebook.html',
               controller: 'NewCollectiveBookController'
           },
           'fabContent': {
//                template: '<button id="fab-activity" class="button button-fab button-fab-top-right expanded button-energized-900 flap"><i class="icon ion-paper-airplane"></i></button>',
//                controller: function ($timeout) {
//                    $timeout(function () {
//                        document.getElementById('fab-activity').classList.toggle('on');
//                    }, 200);
//                }
           }
       }
   })
    .state('app.activity', {
        url: '/activity',
        views: {
            'menuContent': {
                templateUrl: 'templates/activity.html',
                controller: 'ActivityController'
            },
            'fabContent': {
//                 template: '<button id="fab-activity" class="button button-fab button-fab-top-right expanded button-energized-900 flap"><i class="icon ion-paper-airplane"></i></button>',
//                 controller: function ($timeout) {
//                     $timeout(function () {
//                         document.getElementById('fab-activity').classList.toggle('on');
//                     }, 200);
//                 }
            }
        }
    })
     .state('app.manageactivity', {
        url: '/manageactivity',
        views: {
            'menuContent': {
                templateUrl: 'templates/manageActivity.html',
                controller: 'ManageActivityController'
            },
            'fabContent': {
//                 template: '<button id="fab-activity" class="button button-fab button-fab-top-right expanded button-energized-900 flap"><i class="icon ion-paper-airplane"></i></button>',
//                 controller: function ($timeout) {
//                     $timeout(function () {
//                         document.getElementById('fab-activity').classList.toggle('on');
//                     }, 200);
//                 }
            }
        }
    })

    .state('app.home', {
        url: '/home',
        cache:false,
        views: {
            'menuContent': {
                templateUrl: 'templates/home.html',
                controller: 'StoryController'
            }

//             },
//            'tabContent':{
//              template:'<div class="tabs-striped tabs-top tabs-background-positive tabs-color-light"><div class="tabs"><a class="tab-item active" href="#"><i class="icon ion-home"></i>Test</a><a class="tab-item" href="#"><i class="icon ion-star"></i>Favorites</a><a class="tab-item" href="#"><i class="icon ion-gear-a"></i>Settings</a></div></div>'
//            }
        }
    })
        .state('app.storywithcategories', {
        url: '/storywithcategories/:categoryid',
        views: {
            'menuContent': {
                templateUrl: 'templates/storywithcategories.html',
                controller: 'StoryWithCategoriesController'
            },
            'fabContent':{
              template: '<button ng-if="hideFab" id="fab-activity" ng-click="goHome();" style="margin-bottom:20px;" class="button button-fab button-fab-bottom-right expanded button-energized-900"><i class="icon ion-android-home"></i></button>',
              controller: function ($timeout,$scope,$state) {
                  $scope.hideFab = true;
                  $timeout(function () {
                      document.getElementById('fab-activity').classList.toggle('on');
                  }, 200);
                  $scope.goHome = function(){
                      $state.go('app.home');
                      $scope.hideFab = false;

                  }
              }
            }

//             },
//            'tabContent':{
//              template:'<div class="tabs-striped tabs-top tabs-background-positive tabs-color-light"><div class="tabs"><a class="tab-item active" href="#"><i class="icon ion-home"></i>Test</a><a class="tab-item" href="#"><i class="icon ion-star"></i>Favorites</a><a class="tab-item" href="#"><i class="icon ion-gear-a"></i>Settings</a></div></div>'
//            }
        }
    })
        .state('app.search', {
        url: '/search',
        views: {
            'menuContent': {
                templateUrl: 'templates/search.html',
                controller: 'SearchController'
            },
            'fabContent':{
              template: '<button ng-if="hideFab" id="fab-activity" ng-click="goHome();" style="margin-bottom:20px;" class="button button-fab button-fab-bottom-right expanded button-energized-900"><i class="icon ion-android-home"></i></button>',
              controller: function ($timeout,$scope,$state) {
                  $scope.hideFab = true;
                  $timeout(function () {
                      document.getElementById('fab-activity').classList.toggle('on');
                  }, 200);
                  $scope.goHome = function(){
                      $state.go('app.home');
                      $scope.hideFab = false;

                  }
              }
            }

//             },
//            'tabContent':{
//              template:'<div class="tabs-striped tabs-top tabs-background-positive tabs-color-light"><div class="tabs"><a class="tab-item active" href="#"><i class="icon ion-home"></i>Test</a><a class="tab-item" href="#"><i class="icon ion-star"></i>Favorites</a><a class="tab-item" href="#"><i class="icon ion-gear-a"></i>Settings</a></div></div>'
//            }
        }
    })
//     .state('app.storywithcategories', {
//         url: '/storywithcategories/:categoryid',
//         views: {
//             'menuContent  ': {
//                 templateUrl: 'templates/storywithcategories.html',
//                 controller: 'StoryWithCategoriesController'
//             }
//         }
//     })
    .state('app.storydetail', {
        url: '/storydetail/:storyid',
        views: {
            'menuContent': {
                templateUrl: 'templates/storydetail.html',
                controller: 'StorydetailController'
            },
            'fabContent': {
                template: '<button ng-if="hideFab" id="fab-activity" ng-click="goHome();" style="margin-bottom:20px;" class="button button-fab button-fab-bottom-right expanded button-energized-900"><i class="icon ion-android-home"></i></button>',
                controller: function ($timeout,$scope,$state) {
                    $scope.hideFab = true;
                    $timeout(function () {
                        document.getElementById('fab-activity').classList.toggle('on');
                    }, 200);
                    $scope.goHome = function(){
                        $state.go('app.home');
                        $scope.hideFab = false;

                    }
                }
            }
        }
    })
    .state('app.managestory', {
        url: '/managestory/:storyid',
        views: {
            'menuContent': {
                templateUrl: 'templates/manageStory.html',
                controller: 'ManageStoryController'
            },
            'fabContent': {
              template: '<button ng-if="hideFab" id="fab-activity" ng-click="goHome();" style="margin-bottom:20px;" class="button button-fab button-fab-bottom-right expanded button-energized-900"><i class="icon ion-android-home"></i></button>',
              controller: function ($timeout,$scope,$state) {
                  $scope.hideFab = true;
                  $timeout(function () {
                      document.getElementById('fab-activity').classList.toggle('on');
                  }, 200);
                  $scope.goHome = function(){
                      $state.go('app.home');
                      $scope.hideFab = false;

                  }
              }
            }
        }
    })
    .state('app.library', {
        url: '/library/:userid',
        cache:false,
        views: {
            'menuContent': {
                templateUrl: 'templates/library.html',
                controller: 'LibraryController'
            },
            'fabContent': {
                template: '<button id="fab-library" ui-sref="app.home" class="button button-fab button-fab-bottom-right expanded button-energized-900"><i class="icon ion-ios-paper-outline"></i></button>',
                controller: function ($timeout,$state) {
                    $timeout(function () {
                        document.getElementById('fab-library').classList.toggle('on');
                    }, 200);
                    var button = document.getElementById('fab-library')
                    button.addEventListener('click',hideshow,true);
                    function hideshow() {
                        this.style.display = 'none'
                    }

                }
            }
        }
    })
   .state('app.newstory', {
        url: '/newstory',
        cache:false,
        views: {
            'menuContent': {
                templateUrl: 'templates/newstory.html',
                controller: 'NewStoryController'
            },
            'fabContent': {
              template: '<button ng-if="hideFab" id="fab-activity" ng-click="goHome();" style="margin-bottom:20px;" class="button button-fab button-fab-bottom-right expanded button-energized-900"><i class="icon ion-android-home"></i></button>',
              controller: function ($timeout,$scope,$state) {
                  $scope.hideFab = true;
                  $timeout(function () {
                      document.getElementById('fab-activity').classList.toggle('on');
                  }, 200);
                  $scope.goHome = function(){
                      $state.go('app.home');
                      $scope.hideFab = false;

                  }
              }
            }
        }
    })
    .state('app.editstory', {
         url: '/editstory/:storyid',
         views: {
             'menuContent': {
                 templateUrl: 'templates/editStory.html',
                 controller: 'EditStoryController'
             },
             'fabContent': {
               template: '<button ng-if="hideFab" id="fab-activity" ng-click="goHome();" style="margin-bottom:20px;" class="button button-fab button-fab-bottom-right expanded button-energized-900"><i class="icon ion-android-home"></i></button>',
               controller: function ($timeout,$scope,$state) {
                   $scope.hideFab = true;
                   $timeout(function () {
                       document.getElementById('fab-activity').classList.toggle('on');
                   }, 200);
                   $scope.goHome = function(){
                       $state.go('app.home');
                       $scope.hideFab = false;

                   }
               }
             }
         }
     })
      .state('app.newchapter', {
        url: '/newchapter/:storyid',
        views: {
            'menuContent': {
                templateUrl: 'templates/newchapter.html',
                controller: 'NewChapterController'
            },
            'fabContent': {
            }
        }
    })
    .state('app.categories', {
        url: '/categories',
        views: {
            'menuContent': {
                templateUrl: 'templates/categories.html',
                controller: 'CategoriesController'
            },
            'fabContent': {
              template: '<button ng-if="hideFab" id="fab-activity" ng-click="goHome();" style="margin-bottom:20px;" class="button button-fab button-fab-bottom-right expanded button-energized-900"><i class="icon ion-android-home"></i></button>',
              controller: function ($timeout,$scope,$state) {
                  $scope.hideFab = true;
                  $timeout(function () {
                      document.getElementById('fab-activity').classList.toggle('on');
                  }, 200);
                  $scope.goHome = function(){
                      $state.go('app.home');
                      $scope.hideFab = false;

                  }
              }

            }
        }
    })
.state('app.followers', {
        url: '/followers/:userid',
        views: {
            'menuContent': {
                templateUrl: 'templates/followers.html',
                controller: 'FollowersController'
            },
            'fabContent': {
//                 template: '<button id="fab-friends" class="button button-fab button-fab-bottom-right expanded button-energized-900 spin"><i class="icon ion-chatbubbles"></i></button>',
//                 controller: function ($timeout) {
//                     $timeout(function () {
//                         document.getElementById('fab-friends').classList.toggle('on');
//                     }, 900);
//                 }
            }
        }
    })
.state('app.followedusers', {
        url: '/followedusers/:userid',
        views: {
            'menuContent': {
                templateUrl: 'templates/followedUsers.html',
                controller: 'FollowedUsersController'
            },
            'fabContent': {
//                 template: '<button id="fab-friends" class="button button-fab button-fab-bottom-right expanded button-energized-900 spin"><i class="icon ion-chatbubbles"></i></button>',
//                 controller: function ($timeout) {
//                     $timeout(function () {
//                         document.getElementById('fab-friends').classList.toggle('on');
//                     }, 900);
//                 }
            }
        }
    })
     .state('app.eventdetail', {
        url: '/eventdetail/:eventid',
        views: {
            'menuContent': {
                templateUrl: 'templates/eventdetail.html',
                controller: 'EventDetailController'
            },
            'fabContent': {
//                 template: '<button id="fab-friends" class="button button-fab button-fab-top-left expanded button-energized-900 spin"><i class="icon ion-chatbubbles"></i></button>',
//                 controller: function ($timeout) {
//                     $timeout(function () {
//                         document.getElementById('fab-friends').classList.toggle('on');
//                     }, 900);
//                 }
            }
        }
    })
    .state('app.eventApply', {
        url: '/eventapply/:eventid',
        views: {
            'menuContent': {
                templateUrl: 'templates/eventapply.html',
                controller: 'EventApplyController'
            },
            'fabContent': {
                // template: '<button id="fab-friends" class="button button-fab button-fab-top-left expanded button-energized-900 spin"><i class="icon ion-chatbubbles"></i></button>',
                // controller: function ($timeout) {
                //     $timeout(function () {
                //         document.getElementById('fab-friends').classList.toggle('on');
                //     }, 900);
                // }
            }
        }
    })
    .state('app.appliedevent', {
        url: '/appliedevent/:appliedeventid',
        views: {
            'menuContent': {
                templateUrl: 'templates/appliedEvent.html',
                controller: 'AppliedEventController'
            },
            'fabContent': {
//                 template: '<button id="fab-friends" class="button button-fab button-fab-top-left expanded button-energized-900 spin"><i class="icon ion-chatbubbles"></i></button>',
//                 controller: function ($timeout) {
//                     $timeout(function () {
//                         document.getElementById('fab-friends').classList.toggle('on');
//                     }, 900);
//                 }
            }
        }
    })
        .state('app.userevent', {
        url: '/userevent',
        views: {
            'menuContent': {
                templateUrl: 'templates/userEvent.html',
                controller: 'UserEventController'
            }
        }
    })
    .state('app.userposts', {
      url: '/userposts/:userid',
      views: {
          'menuContent': {
              templateUrl: 'templates/userposts.html',
              controller: 'UserPostsController'
          }
      }
    })
    .state('app.otheruserstories', {
      url: '/otheruserstories/:userid',
      views: {
          'menuContent': {
              templateUrl: 'templates/otheruserstories.html',
              controller: 'OtherUserStoriesController'
          }
      }
    })
    .state('app.usereventdetail', {
    url: '/usereventdetail/:id',
    views: {
        'menuContent': {
            templateUrl: 'templates/usereventdetail.html',
            controller: 'UserEventDetailController'
        },
        'fabContent': {
          //   template: '<button onclick="disableFab()" id="fab-friends" class="button button-fab button-fab-bottom-right expanded button-energized-900 spin" ui-sref="app.home"><i class="icon ion-ios-home"></i></button>',
          //   controller: function ($timeout) {
          //       $timeout(function () {
          //           document.getElementById('fab-friends').classList.toggle('on');
          //       }, 900);
          //       var button = document.getElementById('fab-friends')
          //       button.addEventListener('click',hideshow,true);
          //
          //       function hideshow() {
          //           this.style.display = 'none'
          //       }
          // }
        }
    }
})
      .state('app.activeEvents', {
        url: '/activeevents',
        views: {
            'menuContent': {
                templateUrl: 'templates/activeEvents.html',
                controller: 'ManageActivityController'
            },
            'fabContent': {
//                 template: '<button id="fab-friends" class="button button-fab button-fab-top-left expanded button-energized-900 spin"><i class="icon ion-chatbubbles"></i></button>',
//                 controller: function ($timeout) {
//                     $timeout(function () {
//                         document.getElementById('fab-friends').classList.toggle('on');
//                     }, 900);
//                 }
            }
        }
    })
    .state('app.passiveevents', {
        url: '/passiveevents',
        views: {
            'menuContent': {
                templateUrl: 'templates/passiveEvents.html',
                controller: 'ManageActivityController'
            },
            'fabContent': {
//                 template: '<button id="fab-friends" class="button button-fab button-fab-top-left expanded button-energized-900 spin"><i class="icon ion-chatbubbles"></i></button>',
//                 controller: function ($timeout) {
//                     $timeout(function () {
//                         document.getElementById('fab-friends').classList.toggle('on');
//                     }, 900);
//                 }
            }
        }
    })
    .state('app.chapterdetail',{
        url:'/chapterdetail/:chapterid',
        views:{
            'menuContent':{
                templateUrl:'templates/chapterdetail.html',
                controller:'ChapterDetailController'
            },
            'fabContent': {
                template: ''
            }
        }
    })
    .state('app.allchats',{
        url:'/allchats',
        cache:false,
        views:{
            'menuContent':{
                templateUrl:'templates/allChats.html',
                controller:'AllChatsController'
            },
            'fabContent': {
                template: ''
            }
        }
    })
    .state('app.chat',{
        url:'/chat/:chatid',
        views:{
            'menuContent':{
                templateUrl:'templates/chat.html',
                controller:'ChatController'
            },
            'fabContent': {
                template: ''
            }
        }
    })
    .state('app.login', {
        url: '/login',
        views: {
            'menuContent': {
                templateUrl: 'templates/login.html',
                controller: 'LoginController'
            }
        }
    })
    .state('app.profile', {
        url: '/profile/:userid',
        cache:false,
        views: {
            'menuContent': {
                templateUrl: 'templates/profile.html',
                controller: 'ProfileController'
            }
        }
    })
      .state('app.usersstories', {
            url: '/usersstories/:userid',
            cache:false,
            views: {
                'menuContent': {
                    templateUrl: 'templates/usersStories.html',
                    controller: 'UserStoriesController'
                },
                'fabContent':{
                  template: '<button ng-if="hideFab" id="fab-activity" ng-click="goHome();" style="margin-bottom:20px;" class="button button-fab button-fab-bottom-right expanded button-energized-900"><i class="icon ion-android-home"></i></button>',
                  controller: function ($timeout,$scope,$state) {
                      $scope.hideFab = true;
                      $timeout(function () {
                          document.getElementById('fab-activity').classList.toggle('on');
                      }, 200);
                      $scope.goHome = function(){
                          $state.go('app.home');
                          $scope.hideFab = false;

                      }
                  }
                }
            }
        })
    .state('app.post', {
            url: '/post/:userid',
            views: {
                'menuContent': {
                    templateUrl: 'templates/post.html',
                    controller: 'PostController'
                }
            }
        })
    .state('app.newpost', {
            url: '/newpost',
            views: {
                'menuContent': {
                    templateUrl: 'templates/postmodal.html',
                    controller: 'PostController'
                }
            }
        })
    .state('app.about', {
            url: '/about/:userid',
            cache:false,
            views: {
                'menuContent': {
                    templateUrl: 'templates/about.html',
                    controller: 'AboutController'
                }
            }
        });


    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise(function ($injector) {
         var $state = $injector.get("$state");
         $state.go("app.login");
     });
});
