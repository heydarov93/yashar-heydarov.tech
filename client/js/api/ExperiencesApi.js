import ApiService from './ApiService.js';
import API_Config from '../config.js';

class ExperiencesApi extends ApiService {
  constructor() {
    super(API_Config.BASE_URL);
  }

  async getAll() {
    try {
      const response = await this.request('/experiences');
      return response;
    } catch (err) {
      throw err;
    }
  }

  async getOne(id) {
    try {
      const response = await this.request(`/experiences/${id}`);
      return response;
    } catch (err) {
      throw err;
    }
  }
}

export default ExperiencesApi;
