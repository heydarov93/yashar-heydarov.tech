import ApiService from './ApiService.js';
import API_Config from '../config.js';

class TechStackApi extends ApiService {
  constructor() {
    super(API_Config.BASE_URL);
  }

  async getAll() {
    try {
      const response = await this.request('/tech-stack');
      return response;
    } catch (err) {
      throw err;
    }
  }

  async getMain() {
    try {
      const response = await this.request('/tech-stack/main');
      return response;
    } catch (err) {
      throw err;
    }
  }

  async getSecondary() {
    try {
      const response = await this.request('/tech-stack/secondary');
      return response;
    } catch (err) {
      throw err;
    }
  }
}

export default TechStackApi;
