import ApiService from './ApiService.js';
import API_Config from '../config.js';

class EducationsApi extends ApiService {
  constructor() {
    super(API_Config.BASE_URL);
  }

  async getAll() {
    try {
      const response = await this.request('/edu');
      return response;
    } catch (err) {
      throw err;
    }
  }

  async getOne(id) {
    try {
      const response = await this.request(`/edu/${id}`);
      return response;
    } catch (err) {
      throw err;
    }
  }
}

export default EducationsApi;
