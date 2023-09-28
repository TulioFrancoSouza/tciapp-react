import React, { useState } from 'react';
import { TicketService } from '../../service/ticket/TicketService';

const ModalConversation = (props) => {
  const [ticket, setTicket] = useState(props.notes);
  const [ticketNote, setTicketNote] = useState('');

  function update() {
    const notesAndName = props.notes.technician + ' - ' + ticketNote;

    const data = {
      send: true,
      note: [{ note: notesAndName }],
      status: props.notes.status,
    };

    const ticket = TicketService.ticketPatch(
      localStorage.getItem('token'),
      props.notes.id,
      data
    );

    ticket.then((response) => {
      if (response != null) {
        window.location.reload(true);
      }
    });
  }

  return (
    <div className="w-screen h-screen drop-shadow-2xl flex justify-center items-center fixed top-0 right-0 bg-gray-400/80">
      <div className="w-[80%] px-1 py-1 md:w-[1000px] bg-white px-3 py-3 rounded-lg">
        <div className="flex justify-end">
          <button
            onClick={props.hideModalConversation}
            className="px-1 py-1 font-bold text-lg"
          >
            X
          </button>
        </div>
        <div className="md:flex-wrap mr-5 ml-5 block">
          <div className="ml-0 mr-0 md:ml-1 mr-1 ml-1 py-1 mt-2 rounded-lg">
            <h2 className="font-bold text-blue-600 mb-1 ml-2">Chat:</h2>
            <div className="block w-full">
              <div className="mt-3 em:flex-wrap flex justify-center">
                <textarea
                  onChange={props.notes}
                  defaultValue={props.notes.note.map((row) => {
                    let note = '';
                    return (note = note + row.note + '\n');
                  })}
                  className="md:max-w-[100%] mb-1 mx-2 border rounded-lg border-gray-300"
                  name="report"
                  cols="120"
                  rows="12"
                  disabled="disabled"
                />
              </div>
              <div className="min-w-full em:flex-wrap mt-5 flex justify-start">
                <h2 className="font-bold text-blue-600 mb-2 ml-2">
                  Add message to the chat:
                </h2>
              </div>

              <div className="min-w-full em:flex-wrap flex justify-start">
                <textarea
                  onChange={(event) => setTicketNote(event.target.value)}
                  type="text"
                  className="em:max-w-[100%] mx-2 border py-2 rounded-lg border-gray-300"
                  name="report"
                  cols="113"
                  rows="2"
                  defaultValue={JSON.stringify(ticket.notes)}
                />
              </div>
              <div className="min-w-full mt-4 em:flex-wrap flex justify-center">
                <button
                  onClick={update}
                  className="min-w-[100px] mr-4 drop-shadow-lg border-lime-600 rounded-lg bg-lime-600 hover:bg-lime-900 p-1 text-white"
                >
                  Send
                </button>

                <button
                  className="min-w-[100px] drop-shadow-lg border-red-600 rounded-lg bg-red-600 hover:bg-red-900 p-1 text-white"
                  onClick={props.hideModalConversation}
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
