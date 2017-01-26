'use strict';

angular
.module('starter')
.service('UserEventService',function($http,$q,domainConstant){
  return({
    sendTextEvent:sendTextEvent,
    getAppliedByEvent:getAppliedByEvent,
    createApplyWriterEvent:createApplyWriterEvent,
    applyCount:applyCount
  })

  function sendTextEvent(event) {
      event.id = 0;
      var request = $http({
          method: "post",
          url: domainConstant.applyeventApi + "/create",
          headers: {"Content-Type":"application/json"},
          data: JSON.stringify(event)

      });
      return(request.then(handleSuccess, handleError));
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
