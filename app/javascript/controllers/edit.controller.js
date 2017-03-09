angular.module("app").controller("EditController", ["NoteFactory", "note", function(NoteFactory, note) {

  var vm = this;
  vm.note = note.note.body;

  vm.submit = function() {
    note.note.body = vm.note;
  }


}]);
