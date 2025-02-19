import ProjectsApi from '../../api/ProjectsApi.js';
import AbstractHome from './AbstractHome.js';
import roles from '../../data/roles.js';

class PortfolioError extends Error {
  constructor(message, stack) {
    super(message);
    this.name = 'PortfolioError';
    this.stack = stack;
  }
}

class Portfolio extends AbstractHome {
  portfolioSectionEl;
  cardsContainer;
  viewMoreWrapper;

  #projects = [];
  #projectsApi;

  constructor() {
    super();
    this.portfolioSectionEl = document.querySelector('#portfolioSection');
    this.cardsContainer =
      this.portfolioSectionEl.querySelector('.portfolio-cards');
    this.viewMoreWrapper =
      this.portfolioSectionEl.querySelector('#viewMoreWrapper');

    // initialize projects api
    this.#projectsApi = new ProjectsApi();
  }

  async init() {
    if (!this.#projects || this.#projects?.length === 0) {
      try {
        await this.#fetchData();
        this.updateDom();
      } catch (err) {
        throw new PortfolioError(err.message, err.stack);
      }
    }
  }

  async updateDom() {
    this.#renderCards();

    // if there are more than 6 projects, display view more button
    if (this.#projects.length > 6) this.viewMoreWrapper.style.display = 'flex';
    else this.viewMoreWrapper.style.display = 'none';
  }

  async #fetchData() {
    try {
      const response = await this.#projectsApi.getAll();

      if (!response.ok) {
        throw new Error(`API responded with status: ${response.status}`);
      }

      const projects = await response.json();

      // store data
      this.#projects = projects;
    } catch (err) {
      throw new PortfolioError(err.message, err.stack);
    }
  }

  #renderCards() {
    let cardsHTML = '';

    this.#projects.slice(0, 6).forEach((project) => {
      const role = roles.find((role) => role.id === project.roleId);

      cardsHTML += `
      <div class="portfolio-card">
                <div class="card-img">
                  <img
                    class="project-img"
                    src="${project.image}"
                    alt="${project.title}"
                  />
                </div>
                <div class="card-content">
                  <div>
                    <span class="card-subtitle">${role.role}</span>
                    <h4 class="card-title">${project.title}</h4>
                    <p class="card-text">
                      ${project.description}
                    </p>
                  </div>
                  <div class="card-btns">
                    <a href="${project.liveLink}" class="btn btn-cta card-btn">
                      <span class="live-icon"></span> Live
                    </a>
                    <a href="${project.codeLink}" class="btn btn-cta card-btn">
                      <i class="fa-solid fa-code"></i> View Code
                    </a>
                  </div>
                </div>
              </div>`;
    });

    // add cards to the container
    this.cardsContainer.innerHTML = cardsHTML;
  }
}

export default Portfolio;
