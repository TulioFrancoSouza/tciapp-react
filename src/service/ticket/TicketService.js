import { ApiClient } from '../../config/api';

const ticket = async (token) => {
    try {

      let config = {
        headers: {
          Authorization: token,
        }
      }
      const { data } = await ApiClient.get('/ticket',config);
      if (!data) throw new Error('Error.');
      return data;
    } catch (error) {
      console.error(error);
      throw new Error(
        'Error.'
      );
    }
  };
  

  export const TicketService = {
    ticket
  };
  