import React, { useState} from "react";
import { TicketService } from "../../service/ticket/TicketService";


const ModalConversation = ({ props ,hideModalConversation }) => {

  const [statusReport, setStatusReport] = useState(props);

  function update() {
    const data = {
      notes: [ statusReport ],
      status: props.status
    };

    const ticket = TicketService.ticketPatch(
      localStorage.getItem("token"),
      props.id,
      data
    );
    ticket.then((response) => {
      if (response != null) {
        window.location.reload(true);
      }
    });
  }



  return (
    <div
      className="w-screen h-screen drop-shadow-2xl flex justify-center items-center fixed top-0 right-0 bg-gray-400/80"
    >
      <div className="em:w-[300px] em:h-[175px] w-[1000px] h-[600px] bg-white px-5 py-5 rounded-lg">
        <div className="flex justify-end">
          <button onClick={hideModalConversation}
          className="px-1 py-1 font-bold text-lg"
          >
            X
            </button>
        </div>
        <div className="em:flex-wrap mr-5 ml-5 block">
          <div className="em:ml-1 mr-1 ml-1 py-1 mt-2 rounded-lg">
            <h2 className="font-bold text-blue-600 mb-2 ml-2">Chat:</h2>
            <div className="block w-full">
              <div className="mt-3 em:flex-wrap flex justify-center">
                <textarea
                  onChange={props.notes}
                  className="em:max-w-[10px] mb-1 mx-2 border rounded-lg border-zinc-700"
                  name="report"
                  cols="120"
                  rows="12"
                />
              </div>
              <div className="min-w-full em:flex-wrap mt-5 flex justify-start">
                <h2 className="font-bold text-blue-600 mb-2 ml-2">
                  Add message to the chat:
                </h2>
              </div>

              <div className="min-w-full em:flex-wrap flex justify-start">
                <textarea
                  onChange={(event) => setStatusReport(event.target.value)}
                  type="text"
                  className="em:max-w-[10px] mx-2 border py-2 rounded-lg border-zinc-700"
                  name="report"
                  cols="113"
                  rows="2"
                  defaultValue={statusReport}
                />
              </div>
              <div className="min-w-full mt-4 em:flex-wrap flex justify-center">
                <button className="min-w-[100px] mr-4 drop-shadow-lg border-lime-600 rounded-lg bg-lime-600 hover:bg-lime-900 p-1 text-white">
                  Send
                </button>

                <button 
                className="min-w-[100px] drop-shadow-lg border-red-600 rounded-lg bg-red-600 hover:bg-red-900 p-1 text-white"
                onClick={hideModalConversation}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalConversation;