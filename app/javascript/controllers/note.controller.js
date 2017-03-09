angular.module("app").controller("NoteController", ["NoteFactory", "$rootScope", function(NoteFactory, $rootScope) {

  var vm = this;

  vm.saveNote = saveNote;
  vm.createNote = createNote;
  vm.deleteNote = deleteNote;

  vm.new = {
    image: 'https://stamplay.com/images/full-logo-no-neck.png',
    title: '',
    link: ''
  };

  NoteFactory.getNotes()
    .then(function(notes) {
      vm.notes = notes;
      console.log(notes)
    })
    .catch(function(err) {
      console.log(err);
    });

  function saveNote(note) {
    NoteFactory.updateNote(note)
    .then(function(res) {
      note.editing = false;
      console.log('note saved', res);
    })
    .catch(function(err) {
      console.error(err);
    });
  }

  function createNote() {
    var length = vm.notes.length;
    var body = vm.new;
    if(body.title.length < 1) return;
    var owner = $rootScope.user ? $rootScope.user.email : "anonymous"
    var item = {  image : vm.new.image, link: vm.new.link, title: vm.new.title, owner : { email : owner }  };
    vm.new = {};
    vm.notes.push(item);

    NoteFactory.createNote(body, length)
    .then(function(res) {
      console.log('note created ', res);
      vm.notes[res.idx] = res.note;
    })
    .catch(function(err) {
      console.error(err);
    });
  }

  function deleteNote(note, idx) {

    vm.notes.splice(idx, 1);
    NoteFactory.deleteNote(note)
    .then(function(res) {
      console.info('note deleted', res);
    })
    .catch(function(err) {
      console.error(err);
    });
  }  

}])
