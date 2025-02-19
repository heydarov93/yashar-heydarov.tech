import ContactApi from '../../api/ContactApi.js';

class HomeBaseError extends Error {
  constructor(message, stack) {
    super(message);
    this.name = 'HomeBase';
    this.stack;
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

        if (!response.ok)
          throw new Error(`API responded with status: ${response.status}`);

        this.#contact = await response.json();
      } catch (err) {
        throw new HomeBaseError(err.message, err.stack);
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

export default HomeBase;
