'use strict';
import layout from './layout/layout.js';
import HomePage from './pages/home/index.js';

const route = window.location.pathname;

layout.init(route);

if (route === '/' || route.startsWith('/#')) {
  HomePage();
}
