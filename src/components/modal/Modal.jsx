import React from "react";

const ModalReport = ({ showReport, hideModal }) => {
  return (
    <div onClick={hideModal} className="w-screen h-screen drop-shadow-2xl flex justify-center items-center fixed top-0 right-0 bg-gray-400/80">
      <div className="em:w-[300px] em:h-[175px] w-[400px] h-[200px] bg-white px-5 py-5 rounded-lg">
        <div className='flex justify-end'>
          <button onClick={hideModal}>X</button>
        </div>
        <div>
          <h2 className="flex justify-center items-center">
            Do you want to accept this ticket?
          </h2>
        </div>
        <div className='mt-8 flex justify-around w-full'>
          <button onClick={showReport} className="px-10 py-2 rounded-lg drop-shadow-2xl bg-lime-400">
            Yes
          </button>
          <button onclick={hideModal} className="px-10 py-2 rounded-lg drop-shadow-2xl bg-red-400">No</button>
        </div>
      </div>
    </div>
  );
};

export default ModalReport;
