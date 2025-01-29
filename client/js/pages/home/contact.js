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
  formEl;

  constructor() {
    // Select DOM elements
    super();
    this.contactSectionEl = document.querySelector('#contactSection');
    this.socialsContainer = this.contactSectionEl.querySelector('.socials');
    this.formEl = this.contactSectionEl.querySelector('#contactForm');

    this.formEl.addEventListener('submit', this.onSubmit.bind(this));

    // Initialize API
    this.#contactApi = new ContactApi();
  }

  // initializes contact section and updates html
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

  // update contact section
  updateDom() {
    if (!this.#data) return;

    this.#renderSocials();
  }

  // update social media component inside contact section
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

  // send email
  async sendEmail(from, name, message) {
    try {
      const response = await this.#contactApi.sendEmail(from, name, message);

      if (!response.ok)
        throw new ContactError(`Email not sent: ${response.status}`);
    } catch (err) {
      throw new ContactError(err.message, err.stack);
    }
  }

  // onSubmit handler for contact form
  async onSubmit(event) {
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);
    const from = formData.get('email');
    const name = formData.get('name');
    const message = formData.get('message');

    try {
      await this.sendEmail(from, name, message);
      form.reset();
      console.log('Email sent successfully');
    } catch (err) {
      console.warn('Something went wrong. Please try again later');
      throw new ContactError(err.message, err.stack);
    }
  }
}

const contactSection = new Contact();
export default contactSection;
