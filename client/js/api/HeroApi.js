import ApiService from './ApiService.js';
import API_Config from '../config.js';

class HeroApi extends ApiService {
  constructor() {
    super(API_Config.BASE_URL);
  }

  async getAll() {
    try {
      const response = await this.request('/hero');
      return response;
    } catch (err) {
      throw err;
    }
  }
}

export default HeroApi;
