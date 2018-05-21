routes = [
  {
    path: '/',
    url: './index.html',
  },
  {
    path: '/home',
    url: './index.html',    
    on: {
      pageAfterIn: function (e, page) {
        // do something after page gets into the view
        /* app.router.navigate("/", {
          reloadCurrent: true,
          ignoreCache: true,
        }); */
        /* if(gOAuth.user.googleID)
        {

          gOAuth.showImage();
        }
        else
        {
          renderButton();
        } */
      },
      pageInit: function (e, page) {
        // do something when page initialized
        app.router.navigate("/", {
          reloadCurrent: true,
          ignoreCache: true,
        });
      }
    },
  },
  {
    path: '/network',
    componentUrl: './assets/pages/network.html',
  },
  {
    path: '/profile',
    componentUrl: './assets/pages/profile.html',
    on: {
      pageAfterIn: function (e, page) {
          console.log(cardObj)
      },
      pageInit: function (e, page) {
        // do something when page initialized
      }
    }
  },
  // Default route (404 page). MUST BE THE LAST
  {
    path: '(.*)',
    url: './assets/pages/404.html',
  },
];