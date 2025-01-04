import ExperiencesApi from '../../api/ExperiencesApi.js';
import { formatDate } from '../../helpers/formatDate.js';
import AbstractHome from './AbstractHome.js';

class ExperienceError extends Error {
  constructor(message, stack) {
    super(message);
    this.name = 'ExperiencesError';
    this.stack = stack;
  }
}

class Experience extends AbstractHome {
  experienceSectionEl;
  jobTitleEl;
  startDateEl;
  endDateEl;
  jobTypeEl;
  companyNameEl;
  companyDescriptionEl;
  responsibilityListEl;
  btnSeeMore;
  cardsContainer;
  cardsEl = [];

  #experienceApi;
  #data = [];
  #activeCardData;
  activeCardId;

  constructor() {
    super();
    this.experienceSectionEl = document.querySelector('#experienceSection');
    this.jobTitleEl = this.experienceSectionEl.querySelector('.job-title');
    this.startDateEl = this.experienceSectionEl.querySelector('.start-date');
    this.endDateEl = this.experienceSectionEl.querySelector('.end-date');
    this.jobTypeEl = this.experienceSectionEl.querySelector('.job-type');
    this.companyNameEl =
      this.experienceSectionEl.querySelector('.company-name');
    this.companyDescriptionEl = this.experienceSectionEl.querySelector(
      '.company-description'
    );
    this.responsibilityListEl = this.experienceSectionEl.querySelector(
      '.responsibility-list'
    );
    this.btnSeeMore = this.experienceSectionEl.querySelector('.see-more');
    // cards
    this.cardsContainer =
      this.experienceSectionEl.querySelector('.experience-cards');

    // initialize experience api
    this.#experienceApi = new ExperiencesApi();
  }

  async init() {
    if (!this.#data || this.#data?.length === 0) {
      try {
        await this.#fetchData();
        this.updateDom();
      } catch (err) {
        throw new ExperienceError(err.message, err.stack);
      }
    }
  }

  updateDom() {
    this.#renderCards();
    this.#setCardEvents();
    this.#renderCardDetails();
  }

  async #fetchData() {
    try {
      const response = await this.#experienceApi.getAll();

      if (!response.ok) {
        throw new Error(`API responded with status: ${response.status}`);
      }

      const jsonData = await response.json();

      // store data
      this.#data = jsonData;
    } catch (err) {
      throw new ExperienceError(err.message, err.stack);
    }
  }

  #renderCardDetails() {
    const activeCardData = this.#activeCardData;

    const startDate = formatDate(activeCardData.startDate);
    const endDate = activeCardData.endDate
      ? formatDate(activeCardData.endDate)
      : 'Present';

    this.jobTitleEl.textContent =
      activeCardData.jobTitle + ' - ' + activeCardData.companyName;
    this.startDateEl.textContent = startDate;
    this.endDateEl.textContent = endDate;
    this.jobTypeEl.textContent = activeCardData.jobType;
    this.companyNameEl.textContent = activeCardData.companyName;
    this.companyDescriptionEl.textContent = activeCardData.companySummary;
    this.#renderResponsibilities();

    this.btnSeeMore.href = `/experiences/${this.activeCardId}`;
  }

  #renderResponsibilities() {
    let responsibilitiesHTML = '';
    const respArray = this.#activeCardData.responsibilities;

    // render only 3 responsibilities for home page
    respArray?.slice(0, 2)?.forEach((resp) => {
      // build responsibilities html
      responsibilitiesHTML += `<li>${resp}</li>`;
    });

    // add three dots to show there are more
    responsibilitiesHTML += `<li>...</li>`;
    this.responsibilityListEl.innerHTML = responsibilitiesHTML;
  }

  #storeActiveCardData() {
    this.#activeCardData = this.#data.find(
      (exp) => exp._id === this.activeCardId
    );
  }

  #renderCards() {
    let cardsHTML = '';

    // render only 3 most recent experiences
    this.#data?.slice(0, 3).forEach((exp, index) => {
      // convert dates to human readable format
      const startDate = formatDate(exp.startDate);
      const endDate = exp.endDate ? formatDate(exp.endDate) : 'Present';

      this.activeCardId = index === 0 ? exp._id : this.activeCardId;

      // build cards html
      cardsHTML += `
      <div id="${exp._id}" class="experience-card ${
        index === 0 ? 'active-card' : ''
      }">
                  <div class="rectangle"></div>
                  <!-- Card Top -->
                  <div class="card-top">
                    <div class="company-logo">
                      <img
                        src="${exp.companyLogo}"
                        alt="Company Logo"
                      />
                    </div>
                    <div class="job-info">
                      <h4 class="job-title">${exp.jobTitle}</h4>
                      <p class="company-name">${exp.companyName}</p>
                      <time class="date-range">${startDate} - ${endDate}</time>
                    </div>
                  </div>
                  <!-- Card Bottom -->
                  <div class="card-bottom">
                    <h5 class="responsibilities-title">
                      Responsibilities and Achievements
                    </h5>
                    <p class="responsibilities-description">
                      ${exp.responsibilities[0].slice(0, 55)}...
                    </p>
                  </div>
                </div>`;
    });

    this.#storeActiveCardData();
    this.cardsContainer.innerHTML = cardsHTML;
    this.cardsEl = this.cardsContainer.querySelectorAll('.experience-card');
  }

  #setCardEvents() {
    this.cardsEl.forEach((card) => {
      card.addEventListener('click', () => {
        // select active card
        const activeCard = document.querySelector('.active-card');

        // do nothing if clicked card is already active
        if (card.id === this.activeCardId) return;

        // remove active class from previous card
        activeCard.classList.remove('active-card');

        // add active class to clicked card
        card.classList.add('active-card');

        // update active card id
        this.activeCardId = card.id;

        // store active card data
        this.#storeActiveCardData();

        // render card details
        this.#renderCardDetails();
      });
    });
  }
}

const experienceSection = new Experience();
export default experienceSection;
