  //https://developers.google.com/identity/sign-in/web
  var gOAuth = { 
    user: {},
    logIn: function(googleUser) {
      var profile = googleUser.getBasicProfile();
          this.user = {
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
        $("#loginBtn").html("Log Out");
        $(".nonLogin").removeClass("disabled");
    },
    logOut: function() {
      var auth2 = gapi.auth2.getAuthInstance();
        auth2.signOut().then(function () { 
          $("#userImg").attr("src","assets/images/user.png");
          $("#userName").html("");
          $("#my-signin2").show();
          $("#loginBtn").html("Log In");
          $(".nonLogin").addClass("disabled");
        });
    },
    hasUserProfile: function() {

    }
  }

  function onFailure(error) {
    console.log(error);
  }

  function renderButton() {
    gapi.signin2.render('my-signin2', {
      'scope': 'profile email',
      'longtitle': true,
      'theme': 'dark',
      'onsuccess': gOAuth.logIn,
      'onfailure': onFailure
    });
  }

$(document).ready(function() {
  $("#loginBtn").on("click", function(){   
      gOAuth.logOut(); 
  });    
});
