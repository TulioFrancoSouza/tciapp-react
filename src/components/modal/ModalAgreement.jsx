import React from 'react';

const ModalAgreement = ({
  handlerTrue,
  handlerFalse,
  handleSetHideModalAgreement,
}) => {
  return (
    <div
      onClick={handleSetHideModalAgreement}
      className="w-screen h-screen drop-shadow-2xl flex justify-center items-center fixed top-0 right-0 bg-gray-400/80"
    >
      <div className="em:w-[300px] em:w-[400px] bg-white px-2 py-2 rounded-lg">
        <div className="flex justify-end">
          <button onClick={handlerFalse}>X</button>
        </div>
        <div>
          <h2 className="flex justify-centser items-center">
            Please, check the agreement and conditions to accept the ticket.
          </h2>
        </div>
        <div className="mt-8 flex justify-around w-full">
          <button
            onClick={handlerTrue}
            className="px-10 py-2 rounded-lg drop-shadow-2xl bg-red-400"
          >
            Ok
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalAgreement;
