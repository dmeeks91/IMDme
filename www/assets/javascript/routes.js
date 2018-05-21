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
        location.reload();
      },
    }
  },
  {
    path: '/network',
    componentUrl: './assets/pages/network.html',
    on: {
      pageAfterIn: function (e, page) {
          loadD3();
      },
    }
  },
  {
    path: '/profile',
    componentUrl: './assets/pages/profile.html',
    on: {
      pageAfterIn: function (e, page) {
          cardObj.createCard();
      },
      pageInit: function (e, page) {
        // do something when page initialized
        //gOAuth.extendNetwork();
      }
    }
  },
  // Default route (404 page). MUST BE THE LAST
  {
    path: '(.*)',
    url: './assets/pages/404.html',
  },
];