import ApiService from './ApiService.js';
import API_Config from '../config.js';

class ProjectsApi extends ApiService {
  constructor() {
    super(API_Config.BASE_URL);
  }

  async getAll() {
    try {
      const response = await this.request('/projects');
      return response;
    } catch (err) {
      throw err;
    }
  }

  async getOne(id) {
    try {
      const response = await this.request(`/projects/${id}`);
      return response;
    } catch (err) {
      throw err;
    }
  }
}

export default ProjectsApi;
