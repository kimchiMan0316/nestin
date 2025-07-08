import axios from 'axios';

export const loginHandler = async ({ body }) => {
  try {
    const req = await axios.post('/auth.login', body);
    console.log(req);
  } catch (error) {
    return false;
  }
};
