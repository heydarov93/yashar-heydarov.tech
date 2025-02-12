class ApiService {
  #baseUrl;

  constructor(baseUrl) {
    this.#baseUrl = baseUrl;
  }

  async request(endpoint, method = 'GET', data = null, headers = {}) {
    const options = {
      method: method,
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
    };

    if (data) options.body = JSON.stringify(data);

    const response = await fetch(`${this.#baseUrl}${endpoint}`, options);

    return response;
  }
}

export default ApiService;
