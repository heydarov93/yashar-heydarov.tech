import AbstractHome from './absHome.js';
import AboutApi from '../../api/AboutApi.js';

class AboutError extends Error {
  constructor(message, stack) {
    super(message);
    this.name = 'AboutError';
    this.stack = stack;
  }
}

class About extends AbstractHome {
  #data = null;
  #aboutApi;
  sectionEL;
  imgEl;
  titleEl;
  socialsContainer;
  descriptionContainer;
  constructor() {
    super();

    this.sectionEL = document.querySelector('#aboutSection');
    this.imgEl = this.sectionEL.querySelector('.about-img');
    this.titleEl = this.sectionEL.querySelector('.about-title');
    this.descriptionContainer = this.sectionEL.querySelector(
      '.description-container'
    );
    this.socialsContainer = this.sectionEL.querySelector('.socials-bar');

    // initialize api
    this.#aboutApi = new AboutApi();
  }

  async init(socials) {
    try {
      // fetch data and store it inside #data
      await this.#fetchData();

      // add socials into #data
      this.#data.socials = socials;

      // update dom
      this.#updateDom();
    } catch (err) {
      throw new AboutError(err.message, err.stack);
    }
  }

  async #fetchData() {
    try {
      const response = await this.#aboutApi.getAll();

      if (!response.ok)
        throw new AboutError(`API responded with status: ${response.status}`);

      const jsonData = await response.json();

      // store data
      this.#data = jsonData[0];
    } catch (err) {
      throw new AboutError(err.message, err.stack);
    }
  }

  #updateDom() {
    this.imgEl.src = this.#data.image;
    this.titleEl.innerText = this.#data.title;

    this.#renderSocials(this.#data?.socials);
    this.#renderDescription(this.#data?.description);
  }

  // update social media component inside About section
  #renderSocials(socials) {
    if (!socials) return;

    let socialsHTML = ``;
    socials.forEach((social) => {
      socialsHTML += `<a
                  class="social-link"
                  href="${social.url}"
                  target="_blank"
                >
                  <i class="${social.icon} icon"></i>
                </a>`;
    });

    this.socialsContainer.innerHTML = socialsHTML;
  }

  // update descriptions component inside hero section
  #renderDescription(texts) {
    if (!texts) return;

    let descHTML = ``;
    texts.forEach((text) => {
      descHTML += `<p class="about-description">
                    ${text}
                  </p>`;
    });

    this.descriptionContainer.innerHTML = descHTML;
  }
}

const aboutSection = new About();

export default aboutSection;
