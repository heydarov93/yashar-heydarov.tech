import { formatDate } from '../../helpers/formatDate.js';
import concepts from '../../data/concepts.js';
import EducationsApi from '../../api/EducationsApi.js';
import AbstractHome from './AbstractHome.js';

class EducationError extends Error {
  constructor(message, stack) {
    super(message);
    this.name = 'EducationError';
    this.stack = stack;
  }
}

class Education extends AbstractHome {
  educationSectionEl;
  cardsContainer;
  diplomaLinkEl;
  orgWebLinkEl;
  startDateEl;
  endDateEl;
  curriculumEl;
  orgOverviewEl;
  curriculumLinkEl;
  cardsEl = [];

  #educationsApi;
  #educations = [];
  #activeCardData;
  activeCardId;

  constructor() {
    super();
    this.educationSectionEl = document.querySelector('#eduSection');
    this.diplomaLinkEl = this.educationSectionEl.querySelector(
      '.program-title .doc-link'
    );
    this.orgWebLinkEl = this.educationSectionEl.querySelector(
      '.organization-name .web-link'
    );
    this.startDateEl = this.educationSectionEl.querySelector('.start-date');
    this.endDateEl = this.educationSectionEl.querySelector('.end-date');

    this.curriculumEl = this.educationSectionEl.querySelector(
      '.curriculum-overview'
    );
    this.orgOverviewEl = this.educationSectionEl.querySelector(
      '.organization-overview'
    );
    this.curriculumLinkEl =
      this.educationSectionEl.querySelector('.curriculum-link');

    // cards
    this.cardsContainer = this.educationSectionEl.querySelector('.edu-cards');

    // initialize education api
    this.#educationsApi = new EducationsApi();
  }

  async init() {
    if (!this.#educations || this.#educations?.length === 0) {
      try {
        await this.#fetchData();
        this.updateDom();
      } catch (err) {
        throw new EducationError(err.message, err.stack);
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
      const response = await this.#educationsApi.getAll();

      if (!response.ok) {
        throw new Error(`API responded with status: ${response.status}`);
      }

      const jsonData = await response.json();

      // store data
      this.#educations = jsonData;
    } catch (err) {
      throw new EducationError(err.message, err.stack);
    }
  }

  #renderCardDetails() {
    const activeCardData = this.#activeCardData;

    const startDate = formatDate(activeCardData.startDate);
    const endDate = activeCardData.endDate
      ? formatDate(activeCardData.endDate)
      : 'Present';

    this.diplomaLinkEl.textContent = activeCardData.degree;
    this.diplomaLinkEl.href = activeCardData.diplomaLink;
    this.orgWebLinkEl.textContent = activeCardData.institution;
    this.orgWebLinkEl.href = activeCardData.website;
    this.startDateEl.textContent = startDate;
    this.endDateEl.textContent = endDate;
    this.orgOverviewEl.textContent = activeCardData.about;
    this.curriculumLinkEl.href = activeCardData.curriculumLink;
    this.#renderCurriculum();
  }

  #storeActiveCardData() {
    this.#activeCardData = this.#educations.find(
      (edu) => edu._id === this.activeCardId
    );
  }

  #renderCurriculum() {
    const coreConcepts = this.#activeCardData?.curriculum?.map((conceptId) => {
      return concepts.find((concept) => concept.id === conceptId).name;
    });

    this.curriculumEl.innerHTML = `Core subjects include ${coreConcepts.join(
      ', '
    )}`;
  }

  #renderCards() {
    let cardsHTML = '';

    // render only 3 most recent educations
    this.#educations?.slice(0, 3).forEach((edu, index) => {
      // convert dates to human readable format
      const startDate = formatDate(edu.startDate);
      const endDate = edu.endDate ? formatDate(edu.endDate) : 'Present';

      this.activeCardId = index === 0 ? edu._id : this.activeCardId;

      // build cards html
      cardsHTML += `
                      <div id="${edu._id}" class="edu-card ${
        index === 0 ? 'active-card' : ''
      }">
                  <div class="rectangle"></div>
                  <!-- Card Top -->
                  <div class="card-content">
                    <div class="organization-logo">
                      <img
                        src="${edu.logo}"
                        alt="${edu.institution} Logo"
                      />
                    </div>
                    <div class="program-info">
                      <h4 class="program-title">
                        ${edu.degree}
                      </h4>

                      <p
                        class="organization-name"
                        title="University of the People"
                      >
                        ${edu.institution}
                      </p>
                      <span class="date-range">
                        <time class="start-date" datetime="${edu.startDate}">
                          ${startDate}
                        </time>
                        -
                        <time class="end-date" datetime="${
                          edu.endDate || ''
                        }">${endDate}</time>
                      </span>
                      <span class="gpa"> ${
                        edu.gpa ? edu.gpa + ' GPA' : ''
                      }</span>
                    </div>
                  </div>
                </div>`;
    });

    this.#storeActiveCardData();
    this.cardsContainer.innerHTML = cardsHTML;
    this.cardsEl = this.cardsContainer.querySelectorAll('.edu-card');
  }

  #setCardEvents() {
    this.cardsEl.forEach((card) => {
      card.addEventListener('click', () => {
        // select active card
        // there are more active-card classes in different sections
        // so we need to select the active card only in the education section
        const activeCard =
          this.educationSectionEl.querySelector('.active-card');

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

export default Education;
