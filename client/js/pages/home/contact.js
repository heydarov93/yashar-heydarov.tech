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
  #formInputInfos = {
    name: {
      value: '',
      errorTextEl: null,
    },
    from: {
      // from is email address of the sender
      value: '',
      errorTextEl: null,
    },
    message: {
      value: '',
      errorTextEl: null,
    },
  };

  constructor() {
    // Select DOM elements
    super();
    this.contactSectionEl = document.querySelector('#contactSection');
    this.socialsContainer = this.contactSectionEl.querySelector('.socials');
    this.formEl = this.contactSectionEl.querySelector('#contactForm');

    this.formEl.addEventListener('submit', this.onSubmit.bind(this));

    // Select error text elements
    this.#formInputInfos.name.errorTextEl =
      this.formEl.querySelector('#nameErrorText');
    this.#formInputInfos.from.errorTextEl =
      this.formEl.querySelector('#emailErrorText');
    this.#formInputInfos.message.errorTextEl =
      this.formEl.querySelector('#messageErrorText');

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
    this.#formInputInfos.name.value = formData.get('name');
    this.#formInputInfos.from.value = formData.get('email');
    this.#formInputInfos.message.value = formData.get('message');

    try {
      // validate form fields
      if (!this.validateForm()) return;

      // send email to backend
      await this.sendEmail(from, name, message);

      // clear form fields
      form.reset();
      console.log('Email sent successfully');
    } catch (err) {
      console.warn('Something went wrong. Please try again later');
      throw new ContactError(err.message, err.stack);
    }
  }

  // validate form fields
  validateForm() {
    const { name, from: email, message } = this.#formInputInfos;

    // clear previous error messages
    name.errorTextEl.textContent =
      email.errorTextEl.textContent =
      message.errorTextEl.textContent =
        '';

    // check if any field is empty and show error message if so
    name.errorTextEl.textContent = !name.value?.trim()
      ? 'Please enter your name'
      : '';
    email.errorTextEl.textContent = !email.value?.trim()
      ? 'Please enter your email'
      : '';
    message.errorTextEl.textContent = !message.value?.trim()
      ? 'Please enter your message'
      : '';

    // check if any error message is present in any field and return false
    if (
      name.errorTextEl.textContent ||
      email.errorTextEl.textContent ||
      message.errorTextEl.textContent
    )
      return false;

    // check if email is valid and show error message if not
    const isValidEmail = this.#validateEmail(email.value);

    if (!isValidEmail) {
      email.errorTextEl.textContent = 'Please enter a valid email';
      return false;
    }

    // check if name is too short or too long
    if (name.value.length < 3 || name.value.length > 20) {
      name.errorTextEl.textContent =
        'Name should be between 3 and 20 characters';
      return false;
    }

    // check if message is too short or too long
    if (message.value.length < 10 || message.value.length > 1000) {
      message.errorTextEl.textContent =
        'Message should be between 10 and 1000 characters';
      return false;
    }

    return true;
  }

  // validate email
  #validateEmail(email) {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  }
}

const contactSection = new Contact();
export default contactSection;
