import axios from 'axios';

export default {
  environments: {
    get: async () => {
      const response = await axios.get('/api/environment');
      return response.data;
    }
  },
  user: {
    login: async (data) => {
      const response = await axios.post('/api/auth', data);
      return response.data;
    }
  }
};
