import ContactApi from '../../api/ContactApi.js';
import Notification from '../../components/Notification.js';
import { sanitizeInput } from '../../helpers/sanitizeInput.js';
import AbstractHome from './AbstractHome.js';

class ContactError extends Error {
  constructor(message, errorData = null) {
    super(message);
    this.name = 'ContactError';
    this.errorData = errorData;
  }
}

class Contact extends AbstractHome {
  #data = null;
  #contactApi;
  contactSectionEl;
  socialsContainer;
  formEl;
  submitBtn;
  #formNotification;
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
    this.submitBtn = this.contactSectionEl.querySelector('.form-btn');

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

    // create notification popup (instance) in order to notify user
    // about status of the sending message
    // but don't show it yet
    this.#formNotification = new Notification();
  }

  // initializes contact section and updates html
  async init(contactData) {
    if (!this.#data) {
      try {
        this.#data = contactData;
        this.updateDom();
      } catch (err) {
        throw new ContactError(err.message);
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

      if (!response.ok) {
        const errorData = await response.json();
        throw new ContactError('Validation failed', {
          status: response.status,
          errors: errorData.errors,
        });
      }

      return response;
    } catch (err) {
      // if the error is a ContactError, rethrow it
      if (err instanceof ContactError) {
        throw err;
      }

      throw new ContactError(err.message);
    }
  }

  // onSubmit handler for contact form
  async onSubmit(event) {
    event.preventDefault();

    // clear all previous error messages
    this.#clearErrorMessages();

    // make button disabled on submit
    // prevents double submission
    this.submitBtn.disabled = true;

    // get all data from inputs and store them inside instance
    const form = event.target;
    const formData = new FormData(form);
    this.#formInputInfos.name.value = sanitizeInput(
      formData.get('name')?.trim()
    );
    this.#formInputInfos.from.value = sanitizeInput(
      formData.get('email')?.trim()
    );
    this.#formInputInfos.message.value = sanitizeInput(
      formData.get('message')?.trim()
    );

    const { name, from, message } = this.#formInputInfos;
    try {
      // validate form fields
      if (!this.validateForm()) throw new Error();

      // send email to backend
      await this.sendEmail(from.value, name.value, message.value);

      // show pop up with status information
      this.#formNotification.show('Email sent successfully!', 'success');

      // clear form fields
      form.reset();
    } catch (err) {
      // First, hide the notification
      // This prevents UI bugs in case of multiple sequential clicks
      this.#formNotification.hide();

      // show pop up with status information
      this.#formNotification.show(
        'Something went wrong. Please try again.',
        'error'
      );

      // if validation fails in the server show errors
      // with the relative messages from backend
      if (err instanceof ContactError && err?.errorData?.errors) {
        err.errorData.errors.forEach((errInfo) => {
          this.#formInputInfos[errInfo.inputName].errorTextEl.innerHTML +=
            errInfo.message + '<br>';
        });
      }
    } finally {
      // at the end make button useful again
      this.submitBtn.disabled = false;
    }
  }

  // validate form fields
  validateForm() {
    const { name, from: email, message } = this.#formInputInfos;

    // check if name is too short or too long
    if (name.value.length < 3 || name.value.length > 30)
      name.errorTextEl.innerHTML +=
        'Name should be between 3 and 30 characters!</br>';

    // allow letters and whitespace in name, but not whitespace-only
    if (!/^[A-Za-z\s]+$/.test(name.value))
      name.errorTextEl.innerHTML +=
        'Name should contain only letters and spaces!</br>';

    // check if email is valid and show error message if not
    const isValidEmail = this.#validateEmail(email.value);

    if (!isValidEmail) email.errorTextEl.textContent = 'Invalid email address.';

    // check if message is too short or too long
    if (message.value.length < 10 || message.value.length > 2500)
      message.errorTextEl.textContent =
        'Message should be between 10 and 2500 characters!';

    // check if any error message is present in any field and return false
    if (
      name.errorTextEl.textContent ||
      email.errorTextEl.textContent ||
      message.errorTextEl.textContent
    )
      return false;

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

  // clear error messages of the inputs
  #clearErrorMessages() {
    Object.keys(this.#formInputInfos).forEach(
      (key) => (this.#formInputInfos[key].errorTextEl.textContent = '')
    );
  }
}

const contactSection = new Contact();
export default contactSection;
