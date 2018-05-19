routes = [
  {
    path: '/',
    url: './index.html',
  },
  {
    path: '/home',
    url: './index.html',
  },
  {
    path: '/feed',
    componentUrl: './assets/pages/feed.html',
  },
  {
    path: '/profile',
    componentUrl: './assets/pages/profile.html',
  },
  // Default route (404 page). MUST BE THE LAST
  {
    path: '(.*)',
    url: './assets/pages/404.html',
  },
];