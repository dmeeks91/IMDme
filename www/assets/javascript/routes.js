routes = [
  {
    path: '/',
    url: './index.html',
  },
  {
    path: '/login',
    url: './index.html',
  },
  {
    path: '/contact',
    componentUrl: './assets/pages/contact.html',
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