import API_Config from '../config.js';
import ApiService from './ApiService.js';

class ContactApi extends ApiService {
  constructor() {
    super(API_Config.BASE_URL);
  }

  async getAll() {
    try {
      const response = await this.request('/contact');
      return response;
    } catch (err) {
      throw err;
    }
  }

  async sendEmail(from, name, message) {
    const response = await this.request('/contact/send-email', 'POST', {
      from,
      name,
      message,
    });

    return response;
  }
}

export default ContactApi;
