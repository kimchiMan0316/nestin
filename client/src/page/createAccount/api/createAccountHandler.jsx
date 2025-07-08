import axios from 'axios';

export const createAccountHandler = ({ body }) => {
  try {
    axios.post('/api/auth/login', body);
  } catch (error) {
    console.log(error);
  }
};
