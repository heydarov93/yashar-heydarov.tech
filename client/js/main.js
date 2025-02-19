import Layout from './layout/Layout.js';
import HomePage from './pages/home/index.js';

const route = window.location.pathname;

// Initialize common layout (e.g. Header, Footer)
const layout = new Layout();
layout.init(route);

if (route === '/' || route.startsWith('/#')) {
  const homePage = new HomePage();
  homePage.init();
}
