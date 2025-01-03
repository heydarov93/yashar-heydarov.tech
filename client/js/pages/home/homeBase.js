import ContactApi from '../../api/ContactApi.js';

class HomeBaseError extends Error {
  constructor(message) {
    super(message);
    this.name = 'HomeBase';
  }
}

class HomeBase {
  #contact = null;
  #contactApi;

  constructor() {
    this.#contactApi = new ContactApi();
  }

  async init() {
    if (!this.#contact) {
      try {
        const response = await this.#contactApi.getAll();
        this.#contact = await response.json();
      } catch (err) {
        throw new HomeBaseError(err.message);
      }
    }
  }

  getContact() {
    if (!this.#contact) {
      throw new Error('HomeBase has not been initialized. Call init() first.');
    }
    return this.#contact;
  }
}

const homeBase = new HomeBase();
export default homeBase;
