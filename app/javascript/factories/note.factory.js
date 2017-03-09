angular.module("app").factory("NoteFactory", ["$stamplay", "$q", function($stamplay, $q) {


  return {
    getNotes: getNotes,
    updateNote: updateNote,
    createNote: createNote,
    deleteNote: deleteNote,
    allQuestions: allQuestions
  }


  function allQuestions() {
    var deferred = $q.defer();

    $stamplay.Object('question').get()
    .then(function(res) {
      // console.log('all questions', res);
      deferred.resolve(res.data);
    })
    .catch(function(err) {
      deferred.reject(res);
    });

    return deferred.promise;
  }


  function getNotes() {
    var q = $q.defer();
    $stamplay.Object("note").get({ populate_owner : true })
    .then(function(res) {
      q.resolve(res.data);
    })
    .catch(function(err) {
      q.reject(err);
    });
    return q.promise;
  }

  function updateNote(note) {
    console.log('upate note', note)
    var q = $q.defer();

    var data = {
      title: note.title,
      image: note.image,
      link: note.link
    }

    $stamplay.Object("note").patch(note._id, data)
    .then(function(res) {
      q.resolve(res);
    })
    .catch(function(err) {
      q.reject(res);
    });

    return q.promise;
  }

  function createNote(body, idx) {
    var q = $q.defer();

    var data = {
      image : body.image,
      link: body.link,
      title: body.title
    }

    $stamplay.Object("note").save(data)
    .then(function(note) {
      console.log('note save success: ', note)
      $stamplay.User.currentUser()
        .then(function(res) {
          if(res.hasOwnProperty("user")) {
            note.owner = res.user;
            q.resolve({ note : note, idx : idx });
          } else{
            q.resolve({ note : note, idx : idx });
          }
        })
        .catch(function(err) {
          q.reject(err);
        });
    })
    .catch(function(err) {
      console.error(err);
    });
    return q.promise;
  }

  function deleteNote(note) {
    var q = $q.defer();
    $stamplay.Object("note").remove(note._id)
      .then(function(res) {
        q.resolve(res);
      })
      .catch(function(err) {
        q.resolve(err);
      });
    return q.promise;
  }

}])
