import { ApiClient } from '../../config/api';


const user = async (token) => {
    try {

      let config = {
        headers: {
          Authorization: token,
        }
      }
      const { data } = await ApiClient.get('/user',config);
      if (!data) throw new Error('Error.');
      return data;
    } catch (error) {
      console.error(error);
      throw new Error(
        'Error.'
      );
    }
  };
  

  export const UserService = {
    user
  };
  