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

  function setIsAuthenticated(value){
    isAuthenticated = value;
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
    $rootScope.globals = {};
  //  $cookieStore.remove('globals');
    localStorage.setItem('globals',{});
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
    var authdata = Base64.encode(user.userName + ':' + user.password);
    $rootScope.globals = {
      currentUser:{
        id:user.id,
        name:user.name,
        surname:user.surname,
        username:user.userName,
        image:user.image,
        libraryid:user.libraryID
      }
    };
  //  $cookieStore.put('globals', $rootScope.globals);

        localStorage.setItem('globals', JSON.stringify($rootScope.globals));
        debugger;
        isAuthenticated=true;
      localStorage.setItem('currentUser', JSON.stringify(currentUser));

    storeUserCredentials(loginDegeri.idDegeri+'.yourServerToken',user);

  }

  var logout = function() {
    destroyUserCredentials();
  };

  loadUserCredentials();
  return {
    setIsAuthenticated:setIsAuthenticated,
    kullaniciIdDegeri:function(){return kullaniciIdDegeri;},
    login: login,
    logout: logout,
    isAuthenticated: function() {return isAuthenticated;},
    username: function() {return username;},
    role: function() {return role;},
    nameSurname:function(){return nameSurname;}
  };
});

// Base64 encoding service used by AuthenticationService
var Base64 = {

  keyStr: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=',

  encode: function(input) {
    var output = "";
    var chr1, chr2, chr3 = "";
    var enc1, enc2, enc3, enc4 = "";
    var i = 0;

    do {
      chr1 = input.charCodeAt(i++);
      chr2 = input.charCodeAt(i++);
      chr3 = input.charCodeAt(i++);

      enc1 = chr1 >> 2;
      enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
      enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
      enc4 = chr3 & 63;

      if (isNaN(chr2)) {
        enc3 = enc4 = 64;
      } else if (isNaN(chr3)) {
        enc4 = 64;
      }

      output = output +
        this.keyStr.charAt(enc1) +
        this.keyStr.charAt(enc2) +
        this.keyStr.charAt(enc3) +
        this.keyStr.charAt(enc4);
      chr1 = chr2 = chr3 = "";
      enc1 = enc2 = enc3 = enc4 = "";
    } while (i < input.length);

    return output;
  },

  decode: function(input) {
    var output = "";
    var chr1, chr2, chr3 = "";
    var enc1, enc2, enc3, enc4 = "";
    var i = 0;

    // remove all characters that are not A-Z, a-z, 0-9, +, /, or =
    var base64test = /[^A-Za-z0-9\+\/\=]/g;
    if (base64test.exec(input)) {
      window.alert("There were invalid base64 characters in the input text.\n" +
        "Valid base64 characters are A-Z, a-z, 0-9, '+', '/',and '='\n" +
        "Expect errors in decoding.");
    }
    input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

    do {
      enc1 = this.keyStr.indexOf(input.charAt(i++));
      enc2 = this.keyStr.indexOf(input.charAt(i++));
      enc3 = this.keyStr.indexOf(input.charAt(i++));
      enc4 = this.keyStr.indexOf(input.charAt(i++));

      chr1 = (enc1 << 2) | (enc2 >> 4);
      chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
      chr3 = ((enc3 & 3) << 6) | enc4;

      output = output + String.fromCharCode(chr1);

      if (enc3 != 64) {
        output = output + String.fromCharCode(chr2);
      }
      if (enc4 != 64) {
        output = output + String.fromCharCode(chr3);
      }

      chr1 = chr2 = chr3 = "";
      enc1 = enc2 = enc3 = enc4 = "";

    } while (i < input.length);

    return output;
  }

};
