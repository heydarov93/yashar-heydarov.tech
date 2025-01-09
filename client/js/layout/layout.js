import { homeMenus, otherPageMenus } from '../data/menus.js';
import Header from './Header.js';
import Footer from './Footer.js';

class LayoutError extends Error {
  constructor(message, stack) {
    super(message);
    this.name = 'LayoutError';
    this.stack = stack;
  }
}

class Layout {
  headerSection;
  footerSection;
  #homeMenus;
  #otherPageMenus;

  constructor() {
    this.headerSection = new Header();
    this.footerSection = new Footer();
    this.#homeMenus = homeMenus;
    this.#otherPageMenus = otherPageMenus;
  }

  init(route) {
    try {
      const menus =
        route === '/' || route.startsWith('/#')
          ? this.#homeMenus
          : this.#otherPageMenus;

      this.headerSection.init(menus);
      this.footerSection.init(menus);
    } catch (error) {
      throw new LayoutError(error.message, error.stack);
    }
  }
}

const layout = new Layout();
export default layout;
