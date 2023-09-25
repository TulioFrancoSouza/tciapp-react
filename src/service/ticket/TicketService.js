import { ApiClient } from "../../config/api";

const ticket = async (token,id) => {
  try {
    let config = {
      headers: {
        Authorization: token,
      },
      params:{id:id}
    };
    const { data } = await ApiClient.get("/ticket", config);
    if (!data) throw new Error("Error.");
    return data;
  } catch (error) {
    console.error(error);
    throw new Error("Error.");
  }
};

const ticketPatch = async (token, id,dataBody) => {
  try {
    let config = {
      headers: {
        Authorization: token,
      }
    };
    const { data } = await ApiClient.patch(`/ticket/${id}`, dataBody,config);
    if (!data) throw new Error("Error.");
    return data;
  } catch (error) {
    console.error(error);
    throw new Error("Error.");
  }
};

export const TicketService = {
  ticket,
  ticketPatch
};
