class FooterError extends Error {
  constructor(message, stack) {
    super(message);
    this.name = 'FooterError';
    this.stack = stack;
  }
}

class Footer {
  footerSection;
  logoLinkEl;
  logoImgEl;
  navListEl;
  copyrightYearEl;
  logoSrc;

  #navMenus = [];

  constructor() {
    this.footerSection = document.querySelector('#footerSection');
    this.logoLinkEl = this.footerSection.querySelector('.footer-logo-link');
    this.logoImgEl = this.footerSection.querySelector('.footer-logo-link img');
    this.navListEl = this.footerSection.querySelector('.footer-nav-list');
    this.copyrightYearEl = this.footerSection.querySelector('.year');
    this.logoSrc = './assets/images/footer-logo.png';
  }

  init(menus) {
    if (this.#navMenus.length === 0) {
      try {
        // temporary make auth hidden
        // this.#navMenus = [...menus.navItems, ...menus.auth];
        this.#navMenus = menus.navItems;
        this.updateDom();
      } catch (err) {
        throw new FooterError(err.message, err.stack);
      }
    }
  }

  updateDom() {
    this.#renderLogo();
    this.#renderNavItems();
    this.#renderCopyRightYear();
  }

  #renderNavItems() {
    const navItems = this.#navMenus.map((item) => {
      return `
      <li class="footer-nav-item">
                <a href="${item.link}" class="footer-nav-link">${item.name}</a>
              </li>
      `;
    });

    this.navListEl.innerHTML = navItems.join('');
  }

  #renderLogo() {
    this.logoImgEl.src = this.logoSrc;
    this.logoImgEl.alt = 'Logo';
    this.logoLinkEl.href = '/';
  }

  #renderCopyRightYear() {
    const year = new Date().getFullYear();
    this.copyrightYearEl.textContent = year;
  }
}

export default Footer;
