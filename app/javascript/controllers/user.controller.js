angular.module("app").controller("UserController", ["UserFactory", "$rootScope", "$stateParams", "$mdSidenav", "$mdDialog", function(UserFactory, $rootScope, $stateParams, $mdSidenav, $mdDialog) {

  var vm = this;

  vm.login = login;
  vm.logout = logout;
  vm.toggleLeft = toggleLeft;
  vm.showLogin = showLogin;
  vm.showSignup = showSignup;
  vm.signup = signup;
 
  function signup() {
    UserFactory.signup(vm.user);
  }

  vm.user = {
    email: '',
    password: ''
  }


  function showSignup(ev) {
    // Appending dialog to document.body to cover sidenav in docs app
    var emailData = $mdDialog.prompt()
      .title('Sign Up')
      .textContent('Please enter your email')
      .placeholder('Enter your email')
      .ariaLabel('Email address')
      .initialValue('')
      .targetEvent(ev)
      .clickOutsideToClose(true)
      .ok('Next')
      .cancel('Cancel')

    $mdDialog.show(emailData)
    .then(function(result) {
      vm.user.email = result;
      console.log(vm.email)

      var passwordData = $mdDialog.prompt()
        .title('Sign Up')
        .textContent('Please enter your password')
        .placeholder('Enter your password')
        .ariaLabel('Password')
        .initialValue('')
        .clickOutsideToClose(true)
        .targetEvent(ev)
        .ok('Sign Up')
        .cancel('Cancel')

        $mdDialog.show(passwordData)
        .then(function(password) {
          vm.user.password = password;

          console.log('vm user:', vm.user)
          signup();

        })
        .catch(function(err) {
          console.error(err);
        });

    })
    .catch(function(err) {
      console.error(err);
    });

  }

  function showLogin(ev) {
    // Appending dialog to document.body to cover sidenav in docs app
    var emailData = $mdDialog.prompt()
      .title('Log In')
      .textContent('Please enter your email')
      .placeholder('Enter your email')
      .ariaLabel('Email address')
      .initialValue('')
      .targetEvent(ev)
      .clickOutsideToClose(true)
      .ok('Next')
      .cancel('Cancel')

    $mdDialog.show(emailData)
    .then(function(result) {
      vm.user.email = result;
      console.log(vm.email)

      var passwordData = $mdDialog.prompt()
        .title('Log In')
        .textContent('Please enter your password')
        .placeholder('Enter your password')
        .ariaLabel('Password')
        .initialValue('')
        .clickOutsideToClose(true)
        .targetEvent(ev)
        .ok('Log In')
        .cancel('Cancel')

        $mdDialog.show(passwordData)
        .then(function(password) {
          vm.user.password = password;

          console.log('vm user:', vm.user)
          login();

        })
        .catch(function(err) {
          console.error(err);
        });

    })
    .catch(function(err) {
      console.error(err);
    });

  }

  function login() {
    console.log('vm user', vm.UserFactory)
    UserFactory.login(vm.user)
    .then(function(res) {
      console.log('sign in success', res);
    })
    .catch(function(err) {
      console.error(err);
    });
  };  

  function logout() {
    UserFactory.logout();
  };

  // Update title using rootscope
  vm.updateTitle = function() {
      $rootScope.title = $stateParams.title;
  }

  // Run updateTitle on each state change
  $rootScope.$on('$stateChangeSuccess', vm.updateTitle);

  function toggleLeft() {
    $mdSidenav('left').toggle();
  }



}])
