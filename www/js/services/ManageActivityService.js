'use strict';
angular.module('starter')
.service('ManageActivityService',function($q,domainConstant,$http){
      return({
       getActivityWithId:getActivityWithId,
        addActivity:addActivity,
        getActivity:getActivity,
        addWriter:addWriter,
        setInactiveToEvent:setInactiveToEvent
    })

      function getActivityWithId(id){
      var request=$http({
        method:'GET',
        url:domainConstant.eventApi+'/get/'+id,
        params:{
          action:'get'
        }
      });
      return(request.then(handleSuccess,handleError));
      }

     function getActivity(){
      var request=$http({
        method:'GET',
        url:domainConstant.eventApi+'/get/',
        params:{
          action:'get'
        }
      });
      return(request.then(handleSuccess,handleError));
      }

      function getNotStartedEvents(){
        var request = $http({
          method: 'GET',
          url : domainConstant.activityApi +'/getNotStartedEvents/',
          params:{
            action:'get'
          }
        });
        return(request.then(handleSuccess,handleError));
      }
      function getStartedEvents(){
        var request = $http({
          method: 'GET',
          url : domainConstant.activityApi +'/getStartedEvents/',
          params:{
            action:'get'
          }
        });
        return(request.then(handleSuccess,handleError));
      }

    function addActivity(name,about,startDate,endDate,type,collectiveBookID){
      var request=$http({
        method:'POST',
        url:domainConstant.activityApi+'/create',
        headers: {"Content-Type":"application/json"},
        params:{
          action:'add'
        },
        data: {
          id:0,
          name:name,
          status:1,
          image:"http://www.aie.edu.au/Images/sydney-campus-01.jpg",
          about:about,
          startDate:startDate,
          endDate:endDate,
          collectiveBookID:collectiveBookID,
          type:type,
          authorID:1,
          isActive:1

        }
      });
      return (request.then(handleSuccess,handleError));
    }

    function addWriter(storyID,userID){
      var request=$http({
        method:'POST',
        url:domainConstant.activityApi+'/addwriter',
        headers:{"Content-Type":"application/json"},
        params:{
          action:'add'
        },
        data:{
          storyID:storyID,
          userID:userID
        }
      });
      return(request.then(handleSuccess,handleError));
    }

    function setInactiveToEvent(id){
      var request=$http({
        method:'PUT',
        url:domainConstant.activityApi+'/inactivate',
        headers:{"Content-Type":"application/json"},
        params:{
          action:'put'
        },
        data:{
          id:id
        }
      });

      return(request.then(handleSuccess,handleError));
    }
   function handleSuccess(response){
          return (response.data);
    }

    function handleError(response){

      if (!angular.isObject( response.data ) ||! response.data.message) {
       return( $q.reject( "An unknown error occurred." ) );
     }
    }

});
