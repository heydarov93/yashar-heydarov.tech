import HeroApi from '../../api/HeroApi.js';
import AbstractHome from './absHome.js';

class HeroError extends Error {
  constructor(message) {
    super(message);
    this.name = 'HeroError';
  }
}

class Hero extends AbstractHome {
  #data = null;
  #heroApi;
  titleEl;
  subtitleEl;
  btnCtaEl;
  imgEl;
  socialsContainer;

  constructor() {
    // Select DOM elements
    super();
    this.titleEl = document.querySelector('.hero-title');
    this.subtitleEl = document.querySelector('.hero-subtitle');
    this.btnCtaEl = document.querySelector('#heroCta');
    this.imgEl = document.querySelector('.hero-image');
    this.socialsContainer = document.querySelector('.hero-socials');

    // Initialize API
    this.#heroApi = new HeroApi();
  }

  // initializes hero section by fetching data and updating html
  async init(socials) {
    if (!this.#data) {
      try {
        await this.#fetchData();
        this.#data.socials = socials;
        this.#updateDom();
      } catch (err) {
        throw new HeroError(err.message);
      }
    }
  }

  // fetch hero related data and store it
  async #fetchData() {
    try {
      const response = await this.#heroApi.getAll();

      if (!response.ok) {
        throw new Error(`API responded with status: ${response.status}`);
      }

      const jsonData = await response.json();

      // strore data
      this.#data = jsonData[0];
    } catch (err) {
      throw new HeroError(err.message);
    }
  }

  // update hero section with dynamic data
  #updateDom() {
    if (!this.#data) return;

    // Replace keywords in the subtitle
    let parsedSubtitle = '';
    this.#data?.keywords?.forEach((kWord, index) => {
      const parsedKword = `<strong class="strong">${kWord}</strong>`;
      parsedSubtitle = this.#data.subtitle.replace(`{${index}}`, parsedKword);
    });

    // Replace line breaks in the title
    const parsedTitle = this.#data?.title?.replace(/\\n/g, '<br>');

    // Update DOM elements
    this.titleEl.innerHTML = parsedTitle;
    this.subtitleEl.innerHTML = parsedSubtitle;
    this.btnCtaEl.innerText = this.#data?.ctaText;
    this.btnCtaEl.href = this.#data?.ctaLink;
    this.btnCtaEl.removeAttribute('disabled');
    this.imgEl.src = this.#data?.image;

    this.#renderSocials(this.#data.socials);
  }

  // update social media component inside hero section
  #renderSocials(socials) {
    let socialsHTML = ``;
    socials.forEach((social) => {
      socialsHTML += `<div class="social-wrapper">
                  <a
                    class="social-link"
                    href="${social.url}"
                    target="_blank"
                  >
                    <i class="${social.icon} icon"></i>
                    <span class="social-title">${social.platform}</span></a
                  >
                </div>`;
    });

    this.socialsContainer.innerHTML = socialsHTML;
  }
}

const heroSection = new Hero();
export default heroSection;
