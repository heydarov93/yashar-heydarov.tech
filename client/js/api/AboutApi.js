import ApiService from './ApiService.js';
import API_Config from '../config.js';

class AboutApi extends ApiService {
  constructor() {
    super(API_Config.BASE_URL);
  }

  async getAll() {
    try {
      const response = await this.request('/about');
      return response;
    } catch (error) {
      console.error('Error fetching About data:', error);
      throw error;
    }
  }
}

export default AboutApi;
