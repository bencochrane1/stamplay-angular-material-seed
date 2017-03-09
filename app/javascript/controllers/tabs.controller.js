angular.module("app").controller("TabsController", ["NoteFactory", "$rootScope", function(NoteFactory, $rootScope) {

  var vm = this;

  NoteFactory.allQuestions()
  .then(function(res) {
    vm.allQuestions = res;
    console.log('all questions',res);
  })
  .catch(function(err) {
    console.error(err);
  });

}])
