angular.module("app").factory("UserFactory", ["$stamplay", "$q", "$rootScope", function($stamplay, $q, $rootScope){
  return {

    login: login,
    signup: signup,
    logout: logout
  }

  function login(credentials) {
    var q = $q.defer();

    var data = {
      email : credentials.email,
      password : credentials.password
    }

    $stamplay.User.login(data)
    .then(function(res) {
      $rootScope.user = res;
      $rootScope.$apply()
      q.resolve(res);
    })
    .catch(function(err) {
      q.reject(err);
    });

    return q.promise;
  }


  function signup(credentials) {
    var q = $q.defer();

    var data = {
      email : credentials.email,
      password : credentials.password
    }

    $stamplay.User.signup(data)
    .then(function(res) {
      $rootScope.user = res;
      $rootScope.$apply()
      q.resolve(res);
    })
    .catch(function(err) {
      q.reject(err);
    });

    return q.promise;
  }

  function logout() {
    $stamplay.User.logout();
  }  

}])
