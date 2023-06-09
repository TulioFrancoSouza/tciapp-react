import React from "react";

const TicketRejectSection = (props) => {
  return (
    <div>
      <div className="w-[1200] ml-14 mr-14 ">
        <h2 className="font-bold">Reason:</h2>
        <div className="mb-2 border p-2 rounded-lg border-zinc-700">
          It is no possible attend this day. I suggest reschedule to the next
          Monday.
        </div>

        <div className="flex justify-end items-center mt-8 mb-8">
          <button className="min-w-[100px] mr-4 drop-shadow-lg border-lime-600 rounded-lg bg-lime-600 hover:bg-lime-900 p-2 text-white">
            Send
          </button>
          <button
            onClick={props.event}
            className="min-w-[100px] drop-shadow-lg border-red-600 rounded-lg bg-red-600 hover:bg-red-900 p-2 text-white"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default TicketRejectSection;
