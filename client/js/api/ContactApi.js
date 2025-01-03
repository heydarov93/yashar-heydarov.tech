import API_Config from '../config.js';
import ApiService from './ApiService.js';

class ContactApi extends ApiService {
  constructor() {
    super(API_Config.BASE_URL);
  }

  getAll() {
    return this.request('/contact');
  }
}

export default ContactApi;
