import React from 'react';

const ModalTicketRespSchedule = ({ hideModalTicketRespSchedule }) => {
  return (
    <div
      onClick={hideModalTicketRespSchedule}
      className="w-screen h-screen drop-shadow-2xl flex justify-center items-center fixed top-0 right-0 bg-gray-400/80"
    >
      <div className="em:w-[300px] em:h-[175px] w-[400px] h-[200px] bg-white px-3 py-3 rounded-lg">
        <div className="flex justify-end">
          <button onClick={hideModalTicketRespSchedule}>X</button>
        </div>
        <div>
          <h2 className="flex justify-centser items-center">
            Please, fill the technician and schedule before accept the ticket.
          </h2>
        </div>
        <div className="mt-8 flex justify-around w-full">
          <button
            onClick={hideModalTicketRespSchedule}
            className="px-10 py-2 rounded-lg drop-shadow-2xl bg-red-400"
          >
            Ok
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalTicketRespSchedule;
