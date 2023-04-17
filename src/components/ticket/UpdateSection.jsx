import React from "react";

const UpdateSection = ({ handleHideUpdateSection, handleTicketResp, handleTicketSched }) => {
  return (
    <div>
      <div className="em:ml-5 em:mr-5 w-[1200] ml-14 mr-14 flex justify-between items-center">
        <div className="em:mt-5">
          <h2 className="font-bold min-w-[550px]">Reason:</h2>
          <input
            type="text"
            className="w-full mb-2 border p-2 rounded-lg border-zinc-700"
          />
        </div>
        <div className="em:mt-5">
          <h3 className="font-bold">Responsible:</h3>
          <input
            onChange={handleTicketResp}
            className="mb-2 border p-2 rounded-lg border-zinc-700"
          />
        </div>
        <div>
          <h3 className="font-bold">Schedule:</h3>
          <input
            onChange={handleTicketSched}
            className="mb-2 border p-2 rounded-lg border-zinc-700"
            type="datetime-local"
          />
        </div>
        <div>
          <button 
          onClick={handleHideUpdateSection}
          className="min-w-[100px] drop-shadow-lg border-lime-600 rounded-lg bg-lime-600 hover:bg-lime-900 p-2 text-white">
            Confirm
          </button>
        </div>
        <div>
          <button 
          onClick={handleHideUpdateSection}
          className="min-w-[100px] drop-shadow-lg border-red-600 rounded-lg bg-red-600 hover:bg-red-900 p-2 text-white">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateSection;
