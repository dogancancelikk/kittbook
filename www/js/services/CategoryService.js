'use strict';
angular.module('starter')
.service('CategoryService',function($http,domainConstant,$q){
  return({
    getCategories:getCategories
  });
  
  function getCategories() {
      var request = $http({
          method: "get",
          url: domainConstant.categoryApi + "/get",
          params: {
              action: "get"
          }
      });
      return( request.then( handleSuccess, handleError ) );
  }
   function handleSuccess(response){
        return(response.data);
    }
  function handleError(response){
    if (!angular.isObject( response.data ) ||
              ! response.data.message
              ) {
              return( $q.reject( "An unknown error occurred." ) );
            }
  }
  
  
});