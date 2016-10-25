'use strict';
angular.module('starter')

.service('UserService',function($http,domainConstant,$q){
	return({
		getUserDetail:getUserDetail
	});

    function getUserDetail(id){
        var request=$http({
            method:"GET",
            url:domainConstant.userApi+ '/get/'+id,
            params:{
                action:"get"
            }
        });
        return(request.then(handleSuccess,handleError));
    }

    function handleSuccess(response){
        return(response.data);
    }
    //Angular.isObject
    //Determines if a reference is an Object.
    // Unlike typeof in JavaScript, nulls are not considered to be objects. Note that JavaScript arrays are objects.

    function handleError(response){
      if (!angular.isObject( response.data ) ||
                ! response.data.message
                ) {
                return( $q.reject( "An unknown error occurred." ) );
              }
            }
})
