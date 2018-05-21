  //https://developers.google.com/identity/sign-in/web
  var gOAuth = {
    castlist:[],
    user: {},
    network: [],
    projects: [],
    addIMDB: function(data) {
      var self = this;
      app.preloader.show();
      //framework7 router code
      app.request.post("/api/imdb/", data, function(data){
        //Code to start building network ... need to put in web worker
        /* self.projects = JSON.parse(data).projects;
        self.getCastList(); */
        self.logIn();     
      });
    },
    extendNetwork: function() {
      if(!gOAuth.network) return;

      var self = this;//,
          //imdbID = self.castlist[0];

      if(self.castlist.length > 0)
      {
        app.preloader.show();
        
        app.request.post(`/api/network/${self.castlist[0].id}`,{}, 
        function(data){
          self.castlist.shift();
          self.extendNetwork();
        });
      }
      else
      {
        self.logIn();
      }
    },
    getCastList: function() {
      if(!gOAuth.projects) return;

      var self = this,
          thisCast = [];

      if(self.castlist.length < 2)//self.projects.length > 0 && 
      {
        app.preloader.show();
        
        app.request.post(`/api/castList`, 
        self.projects[0], function(data){
          self.projects.shift();
          thisCast = JSON.parse(data);   
          thisCast.forEach(person => {
            if (!self.castlist.find(existing => person.id === existing.id))
            {
                if (self.castlist.length < 10) self.castlist.push(person);
            }
          });
          self.getCastList();
        });
      }
      else
      {
        self.extendNetwork();
      }
    },
    getUserProfile: function() {
      var self = this;
      app.request.get(`/api/user/profile/${self.user.googleID}`, self.user, 
        function(data){
          self.userProfile = JSON.parse(data);
          app.router.navigate("/profile/");
        });
    },
    hasUserProfile: function() {
      var self = this;
      app.request.get(`/api/gUser/${self.user.googleID}`, self.user, 
        function(data){
          self.imdb = (data === "") ? {imdbID:""} : JSON.parse(data);
          if(self.imdb.imdbID === "")
          {
            $("#needIMDB").html(`Welcome, ${self.user.givenName}!`);
            app.sheet.open('.my-sheet');
            var modalHeight = $("#my-form").height();
            $(".sheet-modal").height(modalHeight + 100);
          }
          else
          {
            //self.syncIMDB(); Takes to long let user choose to update on different screen
            self.logIn();
          }
        });
    },   
    logIn: function() { 
      app.sheet.close('.my-sheet');  
      app.preloader.hide();   
      $("#my-signin2").hide();
      $("#loginBtn").html("Log Out");
      $(".nonLogin").removeClass("disabled");
      this.getUserProfile();
    },
    logOut: function() {
      var auth2 = gapi.auth2.getAuthInstance();
        auth2.signOut().then(function () {
          /* $("#my-signin2").show();
          $("#loginBtn").html("Log In");*/
          $(".nonLogin").addClass("disabled"); 
          app.router.navigate("/home/");
          gOAuth.user = {};
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
          //self.showImage();
          self.hasUserProfile();
    },
    showImage: function() {
      $("#userImg").attr("src",this.user.imgURL);
      $("#userName").html(this.user.fullName);      
      this.hasUserProfile();
    },
    syncIMDB: function() {
      var self = this;
      app.request.post("/api/imdb/sync", self.imdb, function(data){
        self.logIn();     
      })
    },
    validateIMDB: function() {
      var self = this,
          userUrl = $("#IMDBUrl")[0].value,
          isWeb = userUrl.indexOf("https://www.imdb.com/name/") != -1,
          isMobile = userUrl.indexOf("https://m.imdb.com/name/") != -1,
          imdbID = userUrl.split("/")[userUrl.split("/").indexOf("name") + 1];

      if ((isWeb || isMobile) && imdbID.length === 9)
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
  $(window).resize();
  $("#logout-button").on("click", function(){   
      e.preventDefault();
      gOAuth.logOut(); 
  });    
  $(".modalBtn").on("click", function(e) {
      e.preventDefault();
      gOAuth.validateIMDB();
  });      
});
