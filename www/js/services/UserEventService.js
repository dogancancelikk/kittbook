'use strict';

angular
.module('starter')
.service('UserEventService',function($http,$q,domainConstant){
  return({
    createApplyEvent:createApplyEvent,
    getAppliedByEvent:getAppliedByEvent,
    createApplyWriterEvent:createApplyWriterEvent,
    applyCount:applyCount
  })

  function createApplyEvent(activityID,text,title,about,userID){
    var request=$http({
            method:'POST',
            url:domainConstant.applyeventApi+'/create',
            headers: {"Content-Type":"application/json"},
            params:{
              action:'add'
            },
            data: {
             id:0,
             activityID:activityID,
              text:text,
              title:title,
              about:about,
              userID:userID,
              status:1

            }
    });
       return (request.then(handleSuccess,handleError));
  }
  function createApplyWriterEvent(eventID,userID){
    var request=$http({
            method:'POST',
            url:domainConstant.applyeventApi+'/create',
            headers: {"Content-Type":"application/json"},
            params:{
              action:'add'
            },
            data: {
             id:0,
             activityID:eventID,
             userID:userID,
             status:1
            }
    });
       return (request.then(handleSuccess,handleError));
  }

  function getAppliedByEvent(id){
    var request=$http({
        method:"GET",
        url:domainConstant.applyeventApi+ '/getbyevent/'+id,
        params:{
            action:"get"
        }
    });
    return(request.then(handleSuccess,handleError));
  }
  
  function applyCount(activityid){
    var request=$http({
      method:"GET",
      url:domainConstant.applyeventApi+'/getbyevent/'+activityid,
      params:{
        action:"get"
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
