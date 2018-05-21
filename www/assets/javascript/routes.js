routes = [
  {
    path: '/',
    url: './index.html',
  },
  {
    path: '/home',
    url: './index.html'
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
          cardObj.createCard();
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