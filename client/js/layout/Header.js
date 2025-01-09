class HeaderError extends Error {
  constructor(message, stack) {
    super(message);
    this.name = 'HeaderError';
    this.stack = stack;
  }
}

class Header {
  headerSection;
  logoLinkEl;
  logoImgEl;
  authContainer;
  navListEl;
  logoSrc;
  #authMenus = [];
  #navMenus = [];

  constructor() {
    this.headerSection = document.querySelector('#headerSection');
    this.logoLinkEl = this.headerSection.querySelector('.logo-link');
    this.logoImgEl = this.headerSection.querySelector('.logo-link img');
    this.authContainer = this.headerSection.querySelector('.auth-wrapper');
    this.navListEl = this.headerSection.querySelector('.main-nav');
    this.logoSrc = '../../assets/svg/logo.svg';
  }

  init(menus) {
    try {
      if (this.#authMenus.length === 0 && this.#navMenus.length === 0) {
        this.#authMenus = menus.auth;
        this.#navMenus = menus.navItems;

        this.updateDom();
      }
    } catch (err) {
      throw new HeaderError(err.message, err.stack);
    }
  }

  updateDom() {
    this.#renderLogo();
    this.#renderAuthNavItems();
    this.#renderNavItems();
  }

  #renderAuthNavItems() {
    // auth wrapper hidden temperary
    this.authContainer.style.display = 'none';

    const authItems = this.#authMenus.map((item) => {
      return `
      <li><a class="nav-item auth nav-hover" href="${item.link}">${item.name}</a></li>
      `;
    });

    this.authContainer.innerHTML = authItems.join('');
  }

  #renderNavItems() {
    const navItems = this.#navMenus.map((item) => {
      return `
        <li><a class="${
          item.name === 'Contact' ? 'btn btn-cta' : 'nav-item nav-hover'
        }" href="${item.link}">${item.name}</a></li>
      `;
    });

    this.navListEl.innerHTML = navItems.join('');
  }

  #renderLogo() {
    this.logoImgEl.src = this.logoSrc;
    this.logoImgEl.alt = 'Logo';
    this.logoLinkEl.href = '/';
  }
}

export default Header;
