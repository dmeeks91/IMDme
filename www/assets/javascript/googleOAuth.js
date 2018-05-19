  //https://developers.google.com/identity/sign-in/web
  var gOAuth = {
    user: {},
    addIMDB: function(data) {
      var self = this;
      app.request.post("api/user", data, function(userInfo){
        
      })
    },
    logIn: function() {      
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
      var self = this;
      app.request.get(`/api/gUser/${self.user.googleID}`, self.user, 
        function(data){
          if(data === "")
          {
            app.sheet.open('.my-sheet');
          }
          else
          {
            self.logIn();
          }
        });
    },   
    notify:  function() {
      return app.notification.create({
        title: 'Invalid URL Entered',
        subtitle: 'Please enter a valid IMDB url and try again',
        closeOnClick: true,
        closeButton: true
      })
    },  
    setGoogleDetails: function(googleUser) {      
      var self = gOAuth;
          profile = googleUser.getBasicProfile();
          self.user = {
              googleID: profile.getId(),
              fullName: profile.getName(),
              givenName: profile.getGivenName(),
              familyName: profile.getFamilyName(),
              imgURL: profile.getImageUrl(),
              email: profile.getEmail()
            };
        $("#userImg").attr("src",self.user.imgURL);
        $("#userName").html(self.user.fullName);

        self.hasUserProfile();
    },
    validatIMDB: function() {
      var self = this,
          tempUrl = "https://www.imdb.com/name/",
          userUrl = $("#IMDBUrl")[0].value,
          imdbID = userUrl.replace(tempUrl,"").replace("/","");

      if (userUrl.indexOf(tempUrl) === 0 && imdbID.length === 9)
      {
          self.user.imdbID = imdbID;
          self.addIMDB({googleID: self.user.googleID, imdbID: self.user.imdbID});
      }
      else
      {
          self.notify().open();
      }    
      
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
      'onsuccess': gOAuth.setGoogleDetails,
      'onfailure': onFailure
    });
  }

$(document).ready(function() {
  $("#loginBtn").on("click", function(){   
      gOAuth.logOut(); 
  });    
  $(".modalBtn").on("click", function(e) {
      e.preventDefault();
      gOAuth.validatIMDB();
  });
});
