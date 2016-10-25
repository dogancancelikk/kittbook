(function(){
angular
.module('starter')
.constant('AUTH_EVENTS', {
  notAuthenticated: 'auth-not-authenticated',
  notAuthorized: 'auth-not-authorized'
})

.constant('USER_DATA',{
  name:'',
  username:'',
  userid:''
})
.constant('USER_ROLES', {
  admin: 'admin_role',
  public: 'public_role'
});
})();
