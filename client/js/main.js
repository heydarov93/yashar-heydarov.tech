import Layout from './layout/Layout.js';
import HomePage from './pages/home/index.js';
import Auth from './pages/auth/index.js';

const path = window.location.pathname;

function displayHomePage() {
  // Initialize and display common layout (e.g. Header, Footer)
  const layout = new Layout();
  layout.init(path);

  // Initialize and display Home page
  const homePage = new HomePage();
  homePage.init();
}

function displayAuthPage() {
  // Initialize Authentication page (login or register)
  const auth = new Auth();
  auth.init(path);
}

const routes = {
  '/': displayHomePage,
  '/login.html': displayAuthPage,
  '/register.html': displayAuthPage,
};

// Get the display function of the reuqested url
const render = routes[path];

// Render requested page
render();
