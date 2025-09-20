const BASE_URL = 'https://jsonplaceholder.typicode.com';

export default class ApiService {
  async get(endpoint: string) {
    const response = await fetch(`${BASE_URL}${endpoint}`);
    return response.json();
  }
}
