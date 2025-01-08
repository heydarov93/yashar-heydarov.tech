import ContactApi from '../../api/ContactApi.js';
import AbstractHome from './AbstractHome.js';

class ContactError extends Error {
  constructor(message, stack) {
    super(message);
    this.name = 'ContactError';
    this.stack = stack;
  }
}

class Contact extends AbstractHome {
  #data = null;
  #contactApi;
  contactSectionEl;
  socialsContainer;

  constructor() {
    // Select DOM elements
    super();
    this.contactSectionEl = document.querySelector('#contactSection');
    this.socialsContainer = this.contactSectionEl.querySelector('.socials');

    // Initialize API
    this.#contactApi = new ContactApi();
  }

  // initializes hero section by fetching data and updating html
  async init(contactData) {
    if (!this.#data) {
      try {
        this.#data = contactData;
        this.updateDom();
      } catch (err) {
        throw new ContactError(err.message, err.stack);
      }
    }
  }

  // fetch hero related data and store it
  //   async #fetchData() {
  //     try {
  //         const response = await this.#contactApi.getAll();

  //       if (!response.ok) {
  //         throw new Error(`API responded with status: ${response.status}`);
  //       }

  //       const jsonData = await response.json();

  //       // store data
  //       this.#data = jsonData[0];
  //     } catch (err) {
  //       throw new ContactError(err.message, err.stack);
  //     }
  //   }

  // update hero section with dynamic data
  updateDom() {
    if (!this.#data) return;

    this.#renderSocials();
  }

  // update social media component inside hero section
  #renderSocials() {
    let socialsHTML = ``;
    this.#data?.socials?.forEach((social) => {
      socialsHTML += `<li>
                  <a
                    class="social-link"
                    href="${social.url}"
                    target="_blank"
                  >
                    <span class="icon-wrapper">
                      <i class="${social.icon} icon"></i>
                    </span>
                    <p class="social-info">
                      <span class="social-label">${social.platform}:</span>
                      <span class="social-username">
                        ${social.username}
                      </span>
                    </p>
                  </a>
                </li>`;
    });

    this.socialsContainer.innerHTML = socialsHTML;
  }
}

const contactSection = new Contact();
export default contactSection;
