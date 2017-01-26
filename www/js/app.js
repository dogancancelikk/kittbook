// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic','starter.controllers','ionic-material', 'ionMdInput','timer',
    'angularMoment','ngCookies','ionic-modal-select','ChatModule','ngMessages','ngCordova','angularTrix','ngSanitize','ngMaterial','ionic.ion.imageCacheFactory'])


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
 .run(function ($rootScope, $state, AuthService, $cookieStore,$http) {
   $rootScope.globals = $cookieStore.get('globals') || {};
        if ($rootScope.globals.currentUser) {

            $rootScope.authenticated = true;
        }

    $rootScope.$on('$stateChangeStart', function (event, next, nextParams, fromState) {

      // if ('data' in next && 'authorizedRoles' in next.data) {
      //   var authorizedRoles = next.data.authorizedRoles;
      //   if (!AuthService.isAuthorized(authorizedRoles)) {
      //     event.preventDefault();
      //     $state.go($state.current, {}, {reload: true});
      //     $rootScope.$broadcast(AUTH_EVENTS.notAuthorized);
      //   }
      // }

      if (!AuthService.isAuthenticated()) {
        if (next.name !== 'app.login') {
          event.preventDefault();
          $state.go('app.login',{},{notify:false});
        }
      }
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
    $ionicConfigProvider.views.maxCache(0);
    $ionicConfigProvider.backButton.previousTitleText(false);

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
                // template: '<button id="fab-activity" class="button button-fab button-fab-top-right expanded button-energized-900 flap"><i class="icon ion-paper-airplane"></i></button>',
                // controller: function ($timeout) {
                //     $timeout(function () {
                //         document.getElementById('fab-activity').classList.toggle('on');
                //     }, 200);
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
            template: '<button id="fab-activity" class="button button-fab button-fab-top-right expanded button-energized-900 flap"><i class="icon ion-paper-airplane"></i></button>',
            controller: function ($timeout) {
              $timeout(function () {
                document.getElementById('fab-activity').classList.toggle('on');
              }, 200);
            }
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
               template: '<button id="fab-activity" class="button button-fab button-fab-top-right expanded button-energized-900 flap"><i class="icon ion-paper-airplane"></i></button>',
               controller: function ($timeout) {
                   $timeout(function () {
                       document.getElementById('fab-activity').classList.toggle('on');
                   }, 200);
               }
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
                template: '<button id="fab-activity" class="button button-fab button-fab-top-right expanded button-energized-900 flap"><i class="icon ion-paper-airplane"></i></button>',
                controller: function ($timeout) {
                    $timeout(function () {
                        document.getElementById('fab-activity').classList.toggle('on');
                    }, 200);
                }
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
        .state('app.search', {
        url: '/search',
        views: {
            'menuContent': {
                templateUrl: 'templates/search.html',
                controller: 'SearchController'
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
            'menuContent  ': {
                templateUrl: 'templates/storywithcategories.html',
                controller: 'StoryWithCategoriesController'
            }

//             },
//            'tabContent':{
//              template:'<div class="tabs-striped tabs-top tabs-background-positive tabs-color-light"><div class="tabs"><a class="tab-item active" href="#"><i class="icon ion-home"></i>Test</a><a class="tab-item" href="#"><i class="icon ion-star"></i>Favorites</a><a class="tab-item" href="#"><i class="icon ion-gear-a"></i>Settings</a></div></div>'
//            }
        }
    })
    .state('app.storydetail', {
        url: '/storydetail/:storyid',
        views: {
            'menuContent': {
                templateUrl: 'templates/storydetail.html',
                controller: 'StorydetailController'
            },
            'fabContent': {
                // template: '<button id="fab-activity" class="button button-fab button-fab-bottom-right expanded button-energized-900 flap"><i class="icon ion-ios-paper-outline"></i></button>',
                // controller: function ($timeout) {
                //     $timeout(function () {
                //         document.getElementById('fab-activity').classList.toggle('on');
                //     }, 200);
                // }
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

            }
        }
    })
    .state('app.library', {
        url: '/library/:userid',
        views: {
            'menuContent': {
                templateUrl: 'templates/library.html',
                controller: 'LibraryController'
            },
            'fabContent': {
                template: '<button id="fab-activity" class="button button-fab button-fab-bottom-right expanded button-energized-900 flap"><i class="icon ion-ios-paper-outline"></i></button>',
                controller: function ($timeout) {
                    $timeout(function () {
                        document.getElementById('fab-activity').classList.toggle('on');
                    }, 200);
                }
            }
        }
    })
   .state('app.newstory', {
        url: '/newstory',
        views: {
            'menuContent': {
                templateUrl: 'templates/newstory.html',
                controller: 'NewStoryController'
            },
            'fabContent': {
                // template: '<button id="fab-activity" class="button button-fab button-fab-bottom-right expanded button-energized-900 flap" ng-click="nextSlide()" ><i class="icon ion-ios-skipforward-outline"></i></button>',
                // controller: function ($timeout,$ionicSlideBoxDelegate,$scope) {
                //     $timeout(function () {
                //         document.getElementById('fab-activity').classList.toggle('on');

                //     }, 200);
//                       $scope.nextSlide = function() {
//                             $ionicSlideBoxDelegate.next();
//                             console.log($scope.data);
//                           };
//                }
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
                 // template: '<button id="fab-activity" class="button button-fab button-fab-bottom-right expanded button-energized-900 flap" ng-click="nextSlide()" ><i class="icon ion-ios-skipforward-outline"></i></button>',
                 // controller: function ($timeout,$ionicSlideBoxDelegate,$scope) {
                 //     $timeout(function () {
                 //         document.getElementById('fab-activity').classList.toggle('on');

                 //     }, 200);
 //                       $scope.nextSlide = function() {
 //                             $ionicSlideBoxDelegate.next();
 //                             console.log($scope.data);
 //                           };
 //                }
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
                template: '<button id="fab-friends" class="button button-fab button-fab-bottom-right expanded button-energized-900 spin"><i class="icon ion-chatbubbles"></i></button>',
                controller: function ($timeout) {
                    $timeout(function () {
                        document.getElementById('fab-friends').classList.toggle('on');
                    }, 900);
                }
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
                template: '<button id="fab-friends" class="button button-fab button-fab-bottom-right expanded button-energized-900 spin"><i class="icon ion-chatbubbles"></i></button>',
                controller: function ($timeout) {
                    $timeout(function () {
                        document.getElementById('fab-friends').classList.toggle('on');
                    }, 900);
                }
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
                template: '<button id="fab-friends" class="button button-fab button-fab-top-left expanded button-energized-900 spin"><i class="icon ion-chatbubbles"></i></button>',
                controller: function ($timeout) {
                    $timeout(function () {
                        document.getElementById('fab-friends').classList.toggle('on');
                    }, 900);
                }
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
                template: '<button id="fab-friends" class="button button-fab button-fab-top-left expanded button-energized-900 spin"><i class="icon ion-chatbubbles"></i></button>',
                controller: function ($timeout) {
                    $timeout(function () {
                        document.getElementById('fab-friends').classList.toggle('on');
                    }, 900);
                }
            }
        }
    })
        .state('app.userevent', {
        url: '/userevent',
        views: {
            'menuContent': {
                templateUrl: 'templates/userEvent.html',
                controller: 'UserEventController'
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
                template: '<button id="fab-friends" class="button button-fab button-fab-top-left expanded button-energized-900 spin"><i class="icon ion-chatbubbles"></i></button>',
                controller: function ($timeout) {
                    $timeout(function () {
                        document.getElementById('fab-friends').classList.toggle('on');
                    }, 900);
                }
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
                template: '<button id="fab-friends" class="button button-fab button-fab-top-left expanded button-energized-900 spin"><i class="icon ion-chatbubbles"></i></button>',
                controller: function ($timeout) {
                    $timeout(function () {
                        document.getElementById('fab-friends').classList.toggle('on');
                    }, 900);
                }
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
        views: {
            'menuContent': {
                templateUrl: 'templates/profile.html',
                controller: 'ProfileController'
            },
            'fabContent': {
            }
        }
    })
      .state('app.usersstories', {
            url: '/usersstories/:userid',
            views: {
                'menuContent': {
                    templateUrl: 'templates/usersStories.html',
                    controller: 'UserStoriesController'
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
            views: {
                'menuContent': {
                    templateUrl: 'templates/about.html',
                    controller: 'AboutController'
                }
            }
        });


    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/app/login');
});
