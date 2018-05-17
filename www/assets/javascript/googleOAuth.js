  //https://developers.google.com/identity/sign-in/web
  function onSuccess(googleUser) {
    var profile = googleUser.getBasicProfile(),
        user = {
          id: profile.getId(),
          fullName: profile.getName(),
          givenName: profile.getGivenName(),
          familyName: profile.getFamilyName(),
          imgURL: profile.getImageUrl(),
          email: profile.getEmail()
        };
        $("#userImg").attr("src",user.imgURL);
        $("#userName").html(user.fullName);
        $("#my-signin2").hide();
        console.log(user);
  }
  function onFailure(error) {
    console.log(error);
  }
  function renderButton() {
    gapi.signin2.render('my-signin2', {
      'scope': 'profile email',
      'longtitle': true,
      'theme': 'dark',
      'onsuccess': onSuccess,
      'onfailure': onFailure
    });
  }

  function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });
  }