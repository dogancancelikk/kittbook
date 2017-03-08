//AuthService Authorization ve Authentication kontrolünün yapıldığı servistir
//Token Based Authentication yapar

//Hesap servisi ile satın al butonuna basıldığında json dosyasına verilerin yerleştirilmesi amaçlandı

angular.module('starter')

.service('AuthService', function($q, $http,domainConstant,$cookieStore,$rootScope) {

  var LOCAL_TOKEN_KEY = 'yourTokenKey';
  var globals ={};
  var username = '';
  var isAuthenticated = false;
  var role = '';
  var authToken;
  var kullaniciIdDegeri;
  var nameSurname='';
  var userCredentialsObject = {};
  var currentUser = {};

  function loadUserCredentials() {
    var token = window.localStorage.getItem(LOCAL_TOKEN_KEY);
    if (token) {
      useCredentials(token);
    }
  }
  //Token window.localStorage kullanılarak LOCAL_TOKEN_KEY e aktarıldı
  function storeUserCredentials(token) {
    window.localStorage.setItem(LOCAL_TOKEN_KEY, token);
    useCredentials(token);
  }

  function useCredentials(token) {
    kullaniciIdDegeri = token.split('.')[0];
    isAuthenticated = true;
    authToken = token;
    // role = USER_ROLES.admin;

    // if (username == 'admin') {
    //   role = USER_ROLES.admin
    // }
    // if (username == 'user') {
    //   role = USER_ROLES.public
    // }

    // Set the token as header for your requests!
    // $http.defaults.headers.common['X-Auth-Token'] = token;
  }

  function destroyUserCredentials() {
    authToken = undefined;
    kullaniciIdDegeri = '';
    isAuthenticated = false;

    window.localStorage.removeItem(LOCAL_TOKEN_KEY);
  }

  function login(username,password) {
      var request = $http({
          method: 'post',
          url: domainConstant.userApi + '/authenticate',
          headers: {"Content-Type":"application/json"},
          data: { userName: username, password: password}
      });
      return( request.then( handleSuccess, handleError ) );
  }

  function handleError( response ) {
    if ( ! angular.isObject( response.data ) || ! response.data.message ) {
        return( $q.reject( response ) );
      }
        return( $q.reject( response.data.message ) );
  }

  function handleSuccess( response ) {
    var loginDegeri= {};
    var user = response.data.user;
    username=user.userName;
    nameSurname=user.name +" "+ user.surname;
    loginDegeri.kullaniciAdi=user.name;
    loginDegeri.sifre=user.password;
    loginDegeri.idDegeri=user.id;

      currentUser={
        id:user.id,
        name:user.name,
        surname:user.surname,
        username:user.userName,
        image:user.image,
        libraryid:user.libraryID
      }

      localStorage.setItem('currentUser', JSON.stringify(currentUser));
    // var oldItems = JSON.parse(localStorage.getItem('itemsArray')) || {};
    // oldItems.push($rootScope.globals.currentUser);
    // window.localStorage.setItem('itemsArray', JSON.stringify(oldItems));


    //Token Based Authentication a göre kullanıcının id si token a eklenecek
    storeUserCredentials(loginDegeri.idDegeri+'.yourServerToken',user);

  }

  // Giriş yapılmak istenen değerin veritabanında varlığı sorgulanıyor ve Token yüklenmesi sağlanıyor.
  // var login = function(name, pw) {
  // return $q(function(resolve, reject) {
  //     var loginDegeri= {};
  //
  //      $http.get(domainConstant.userApi+"/get").success(function(kullanicilar){
  //
  //           angular.forEach(kullanicilar,function(kullanici){
  //             if(kullanici.userName==name && kullanici.password==pw){
  //               username=kullanici.userName;
  //               nameSurname=kullanici.name +" "+ kullanici.surname;
  //               loginDegeri.kullaniciAdi=kullanici.name;
  //               loginDegeri.sifre=kullanici.password;
  //               loginDegeri.idDegeri=kullanici.id;
  //               $rootScope.globals={
  //                 currentUser:{
  //                   id:kullanici.id,
  //                   name:kullanici.name,
  //                   surname:kullanici.surname,
  //                   username:kullanici.userName,
  //                   image:kullanici.image,
  //                   libraryid:kullanici.libraryID
  //                 }
  //               }
  //
  //               $cookieStore.put('globals', $rootScope.globals);
  //               //Token Based Authentication a göre kullanıcının id si token a eklenecek
  //               storeUserCredentials(loginDegeri.idDegeri+'.yourServerToken');
  //               resolve('Login Success');
  //             }
  //           },function(err){
  //             reject('Login Failed');
  //           });
  //       });
  //   });
  // };
  //Çıkış yap butonuna basıldığında bu fonksiyon çağrılır ve token yok edilir.
  var logout = function() {
    destroyUserCredentials();
  };

  // var isAuthorized = function(authorizedRoles) {
  //   if (!angular.isArray(authorizedRoles)) {
  //     authorizedRoles = [authorizedRoles];
  //   }
  //   return (isAuthenticated && authorizedRoles.indexOf(role) !== -1);
  // };

  loadUserCredentials();
  return {
    kullaniciIdDegeri:function(){return kullaniciIdDegeri;},
    login: login,
    logout: logout,
    // isAuthorized: isAuthorized,
    isAuthenticated: function() {return isAuthenticated;},
    username: function() {return username;},
    role: function() {return role;},
    nameSurname:function(){return nameSurname;}
  };
});
  //constants.js dosyasında belirtilen Authorization verilerine göre uygulamada
  //yetkisiz giriş yapılmak istenen yer olursa 401 Hatası verilmesi amaçlandı
// .factory('AuthInterceptor', function ($rootScope, $q, AUTH_EVENTS) {
//   return {
//     responseError: function (response) {
//       $rootScope.$broadcast({
//         401: AUTH_EVENTS.notAuthenticated,
//         403: AUTH_EVENTS.notAuthorized
//       }[response.status], response);
//       return $q.reject(response);
//     }
//   };
// });

// .config(function ($httpProvider) {
//   $httpProvider.interceptors.push('AuthInterceptor');
// });
