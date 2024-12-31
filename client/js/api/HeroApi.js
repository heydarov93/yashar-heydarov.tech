'use strict';
import ApiService from './ApiService.js';
import API_Config from '../config.js';

class HeroApi extends ApiService {
  constructor() {
    super(API_Config.BASE_URL);
  }

  getAll() {
    return this.request('/hero');
  }
}

export default HeroApi;
