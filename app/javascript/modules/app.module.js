angular.module("app", [
  "ui.router",
  "ngStamplay",
  "ngMaterial"
])
.config(["$urlRouterProvider", "$stateProvider", "$mdThemingProvider",
  function($urlRouterProvider, $stateProvider, $mdThemingProvider) {

    $mdThemingProvider.theme('default')
    .primaryPalette('blue')
    .accentPalette('pink');

    $stateProvider
    .state("home", {
      url : "/",
      templateUrl : "./views/home.html",
      controller : "NoteController as vm"
    })
    .state("tabs", {
      url : "/tabs",
      templateUrl : "./views/tabs.html",
      controller : "TabsController as vm"
    })    

    $urlRouterProvider.otherwise("/");

}])
.run(["$rootScope", function($rootScope) {

  Stamplay.init("YOUR_APP_ID");

  Stamplay.User.currentUser()
    .then(function(res) {
      if(res.hasOwnProperty("user")) {
        $rootScope.user = res.user;
        $rootScope.$apply();
      } else {
        $rootScope.user = false;
        $rootScope.$apply();
      }

    })

}])
