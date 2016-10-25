angular.module('starter')

.service('CollectiveBookService', function($q,$http,domainConstant) {
    return({
       getCollectiveBookWithStatus:getCollectiveBookWithStatus
    })

    function getCollectiveBookWithStatus(status){
      var request=$http({
        method:'GET',
        url:domainConstant.collectivebookApi+status,
        params:{
          action:'get'
        }
      });
      return(request.then(handleSuccess,handleError));

    }

   function handleSuccess(response){
          return (response.data);
    }

    function handleError(response){
      if (!angular.isObject( response.data ) ||
                ! response.data.message
                ) {
                return( $q.reject( "An unknown error occurred." ) );
     }
    }

});
