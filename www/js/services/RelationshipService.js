'use strict';

angular.module('starter')
.service('RelationshipService',function ($http,domainConstant,$q) {
    return({
    getFollowers:getFollowers,
    getFollowedUsers:getFollowedUsers,
    follow:follow,
    unfollow:unfollow
    });

    function getFollowers(id) {
        var request= $http({
            method:'GET',
            url:domainConstant.relationshipApi+'/getfollowers/'+id,
            params:{
                action:'get'
            }
        });

        return(request.then(handleSuccess,handleError));

    }
    function getFollowedUsers(userId) {
      var request = $http({
          method: "get",
          url: domainConstant.relationshipApi + "/getfollowedusers/" + userId,
          params: {
              action: "get"
          }
      });
      return( request.then( handleSuccess, handleError ) );
  }
    function follow(followedby, following) {
      var request = $http({
          method: "post",
          url: domainConstant.relationshipApi + "/create",
          headers: {"Content-Type":"application/json"},
          params: {
              action: "add"
          },
          data: {
              followedby: followedby,
              following: following
          }
      });
      return( request.then( handleSuccess, handleError ) );
  }
    function unfollow(followedby, following) {
      var request = $http({
          method: "delete",
          url: domainConstant.relationshipApi + "/delete",
          headers: {"Content-Type":"application/json"},
          params: {
              action: "delete"
          },
          data: {
              followedby: followedby,
              following: following
          }
      });
      return( request.then( handleSuccess, handleError ) );
  }

    function handleError( response ) {
        // The API response from the server should be returned in a
        // nomralized format. However, if the request was not handled by the
        // server (or what not handles properly - ex. server error), then we
        // may have to normalize it on our end, as best we can.
        if (
            ! angular.isObject( response.data ) ||
            ! response.data.message
        ) {
            return( $q.reject( "An unknown error occurred." ) );
        }
        // Otherwise, use expected error message.
        return( $q.reject( response.data.message ) );
    }
    // I transform the successful response, unwrapping the application data
    // from the API response payload.
    function handleSuccess( response ) {
        return( response.data );
    }
})