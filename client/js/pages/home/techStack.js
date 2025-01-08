import TechStackApi from '../../api/TechStacksApi.js';
import AbstractHome from './AbstractHome.js';

class TechStackError extends Error {
  constructor(message, stack) {
    super(message);
    this.name = 'TechStackError';
    this.stack = stack;
  }
}

class TechStack extends AbstractHome {
  techStackSectionEl;
  mainLogosContainer;
  secondaryLogosContainer;
  #mainStack = [];
  #secondaryStack = [];
  #techStackApi;

  constructor() {
    super();
    this.techStackSectionEl = document.querySelector('#techStackSection');
    this.mainLogosContainer = this.techStackSectionEl.querySelector(
      '.main-logos .logos-wrapper'
    );
    this.secondaryLogosContainer = this.techStackSectionEl.querySelector(
      '.secondary-logos .logos-wrapper'
    );

    this.#techStackApi = new TechStackApi();
  }

  async init() {
    if (
      !this.#mainStack ||
      !this.#secondaryStack ||
      this.#mainStack?.length === 0 ||
      this.#secondaryStack?.length === 0
    ) {
      try {
        await this.#fetchData();
        this.updateDom();
      } catch (err) {
        throw new TechStackError(err.message, err.stack);
      }
    }
  }

  async #fetchData() {
    try {
      const response = await this.#techStackApi.getAll();

      if (!response.ok)
        throw new Error(`API responded with status: ${response.status}`);
      const techStack = await response.json();
      this.#mainStack = techStack.main;
      this.#secondaryStack = techStack.secondary;
    } catch (err) {
      throw new TechStackError('Error fetching tech stack data', err.stack);
    }
  }

  updateDom() {
    this.#renderLogos();
  }

  #renderLogos() {
    const mainLogosHTML = this.#buildLogosHTML(this.#mainStack);
    const secondaryLogosHTML = this.#buildLogosHTML(this.#secondaryStack);

    this.mainLogosContainer.innerHTML = mainLogosHTML;
    this.secondaryLogosContainer.innerHTML = secondaryLogosHTML;
  }

  #buildLogosHTML(logos) {
    let logosHTML = '';
    logos.forEach((logo) => {
      logosHTML += `<div class="tech-logo-wrapper">
                  <img
                    class="tech-logo"
                    src="${logo.logoPath}"
                    alt="${logo.name} logo"
                  />
                  <p class="logo-name">${logo.name}"</p>
                </div>`;
    });

    return logosHTML;
  }
}

const techStackSection = new TechStack();

export default techStackSection;
