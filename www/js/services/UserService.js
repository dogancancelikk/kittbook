'use strict';
angular.module('starter')

.service('UserService',function($http,domainConstant,$q){
	return({
		getUserDetail:getUserDetail,
		getByFacebookId:getByFacebookId,
		create:create
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
		function getByFacebookId(facebookId) {
				var request = $http({
						method: "get",
						url: domainConstant.userApi + "/findbyfacebookid/" + facebookId
				});
				return( request.then( handleSuccess, handleError('Error getting user by facebookId') ) );
		}
		function create(user) {
				var request = $http({
						method: "post",
						url: domainConstant.userApi + "/create",
						headers: {"Content-Type":"application/json"},
						data: {
								id: 0,
								userName: user.userName,
								password: user.password,
								name: user.name,
								surname: user.surname,
								email: user.email,
								facebookID: user.facebookID,
								googleID: user.googleID
						}
				});
				return( request.then( handleSuccess, handleError ) );
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
