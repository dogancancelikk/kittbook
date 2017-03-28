'use strict';
angular.module('starter')
.service('UploadService',function($http,$q,domainConstant){
  return({
    uploadPhoto:uploadPhoto
  });
  function uploadPhoto(image) {
    var request = $http({
        method: "post",
        url: domainConstant.uploadApi2,
        headers: {"Content-Type":"application/json"},
        data: JSON.stringify(image)
    });
    return( request.then( handleSuccess, handleError ) );
  }
  function handleSuccess(response){
    return (response.data);
  }
  function handleError(response){
    if (!angular.isObject( response.data ) ||(! response.data.message)) {
              return( $q.reject( "An unknown error occurred." ));
    }
  }
})
