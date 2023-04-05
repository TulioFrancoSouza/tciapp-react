import React, { useState } from "react";
import ModalReport from "../modal/ModalReport";

const ReportSection = () => {
  const [timeTravelTo, setTimeTravelTo] = useState(0);
  const [timeTravelFrom, setTimeTravelFrom] = useState(0);
  const [timeArrival, setTimeArrival] = useState(0);
  const [showModalReport, setShowModalReport] = useState(false);

  const handleShowModalReport = () => {setShowModalReport(true)}
  const hideShowModalReport = () => {setShowModalReport(false)}
  console.log(timeArrival)

  return (
    <div>
      <div className="em:block em:ml-5 em:mr-5 flex justify-start flex-wrap text-left ml-14 mr-14 my-2 py-4">
        <div className="mr-4">
          <h2 className="font-bold">Responsible:</h2>
          <input
            className="mb-2  border p-2 rounded-lg border-zinc-700"
            type="text"
          />
        </div>
        <div className="mr-4">
          <h2 className="font-bold">Realized at:</h2>
          <input
            className="mb-2  border p-2 rounded-lg border-zinc-700"
            type="date"
          />
        </div>
        <div className="mr-4">
          <h2 className="font-bold">Travel to (min):</h2>
          <input
            onChange={(event) => setTimeTravelTo(event.target.value)}
            className="mb-2 w-[100px] border p-2 rounded-lg border-zinc-700"
            type="number"
          />
        </div>
        <div className="mr-4">
          <h2 className="font-bold">Arrival:</h2>
          <input
            onChange={(value) => setTimeArrival(value)}
            className="mb-2  border p-2 rounded-lg border-zinc-700"
            type="time"
          />
        </div>

        <div className="mr-4">
          <h2 className="font-bold">Departure:</h2>
          <input
            className="mb-2  max-w-[100px] border p-2 rounded-lg border-zinc-700"
            type="time"
          />
        </div>
        <div className="mr-4">
          <h2 className="font-bold">Travel from (min):</h2>
          <input
            onChange={(event) => {setTimeTravelFrom(event.target.value)}}
            className="mb-2 w-[100px] border p-2 rounded-lg border-zinc-700"
            type="number"
          />
        </div>
        <div className="mr-4">
          <h2 className="font-bold">Total Time(min):</h2>
          <div className="mb-2 bg-gray-200 border p-2 rounded-lg border-zinc-700">
            {Number(timeTravelTo) + Number(timeTravelFrom)}
          </div>
        </div>
        <div className="mr-4">
          <h2 className="font-bold">Work Time(min):</h2>
          <div className="mb-2 bg-gray-200 border p-2 rounded-lg border-zinc-700">
            100
          </div>
        </div>

        <div className="em:max-w-[390px] max-w-[1200px]">
          <h2 className="font-bold">Report:</h2>
          <textarea
            className="em:max-w-[335px] mb-2 border p-2 rounded-lg border-zinc-700"
            name="report"
            rows="10"
            Cols="164"
          />

          <div className="em:w-full em:mt-5 em:mb-5 flex justify-center items-center mt-8 mb-8">
            <button onClick={handleShowModalReport} className="min-w-[100px] drop-shadow-lg mr-4 border-lime-600 rounded-lg bg-lime-600 hover:bg-lime-900 p-2 text-white">
              Send
            </button>
          </div>
        </div>
      </div>
      {showModalReport && <ModalReport closeModalReport={hideShowModalReport} />}
    </div>
  );
};

export default ReportSection;
