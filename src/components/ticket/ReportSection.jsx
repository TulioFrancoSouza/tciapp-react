import React, { useState } from "react";
import { useWindowWidth } from "@react-hook/window-size";
import ModalReport from "../modal/ModalReport";

const ReportSection = (props) => {
  const [timeTravelTo, setTimeTravelTo] = useState(0);
  const [timeTravelFrom, setTimeTravelFrom] = useState(0);
  const [timeArrival, setTimeArrival] = useState(0);
  const [timeDeparture, setTimeDeparture] = useState(0);
  const [showModalReport, setShowModalReport] = useState(false);

  const width = useWindowWidth();
  console.log(width);


  console.log(timeArrival);
  console.log(timeDeparture);

  const handleShowModalReport = () => {
    setShowModalReport(true);
  };
  const hideShowModalReport = () => {
    setShowModalReport(false);
  };

  return (
    <div>
      <h2 className="em:ml-5 mr-14 ml-14 font-bold text-xl text-blue-600">
        Technician Report
      </h2>
      <div className="em:block em:ml-5 em:mr-5 flex justify-start flex-wrap text-xs text-left ml-14 mr-14 mt-2 py-1">
        <div className="mr-4">
          <h2 className="font-bold">Extra expenses:</h2>
          <input
            className="mb-2 border p-1 rounded-lg border-zinc-700"
            type="text"
            size={width > 390 ? "100" : "50"} 
          />
        </div>
        <div className="mr-4">
          <h2 className="font-bold">Bought at:</h2>
          <input
            className="mb-1 border p-1 rounded-lg border-zinc-700"
            type="date"
          />
        </div>

        <div className="mr-4">
          <h2 className="font-bold">Value:</h2>
          <input
            className="mb-1 border p-1 rounded-lg border-zinc-700"
            type="text"
          />
        </div>
      </div>

      <div className="flex em:block em:ml-5 em:mr-1 items-start ml-14 mr-14 mb-10 text-sm">
        <div className="flex justify-start flex-wrap mr-5 text-left py-2">
          <div className="em:w-full border-2 px-3 py-3 rounded-lg">
            <h2 className="text-blue-600 text-md font-bold mb-4">
              Regular Tech Labour
            </h2>
            <div className="em:flex em:flex-wrap block">
              <div className="mr-1">
                <h2 className="font-bold text-xs">Travel to (min):</h2>
                <input
                  onChange={(event) => setTimeTravelTo(event.target.value)}
                  className="mb-1 w-[100px] border p-1 rounded-lg border-zinc-700"
                  type="number"
                />
              </div>
              <div className="mr-1">
                <h2 className="font-bold text-xs">Arrival:</h2>
                <input
                  onChange={(event) => setTimeArrival(event)}
                  className="mb-1 min-w-[100px] border p-1 rounded-lg border-zinc-700"
                  type="time"
                />
              </div>
              <div className="mr-1">
                <h2 className="font-bold text-xs">Departure:</h2>
                <input
                  onChange={(event) => setTimeDeparture(event.target.value)}
                  className="mb-1 min-w-[100px] border p-1 rounded-lg border-zinc-700"
                  type="time"
                />
              </div>
              <div className="mr-1">
                <h2 className="font-bold text-xs">Travel from (min):</h2>
                <input
                  onChange={(event) => {
                    setTimeTravelFrom(event.target.value);
                  }}
                  className="mb-1 w-[100px] border p-1 rounded-lg border-zinc-700"
                  type="number"
                />
              </div>

              <div className="mr-1">
                <h2 className="font-bold text-xs">Total Time(min):</h2>
                <div className="mb-1 bg-gray-200 border p-1 rounded-lg w-[100px] border-zinc-700">
                  {Number(timeTravelTo) + Number(timeTravelFrom)}
                </div>
              </div>
              <div className="mr-1">
                <h2 className="font-bold text-xs">Work Time(min):</h2>
                <div className="mb-1 bg-gray-200 border p-1 rounded-lg w-[100px] border-zinc-700">
                  100
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-start flex-wrap mr-5 text-left py-2">
          <div className="border-2 px-3 py-3 rounded-lg">
            <h2 className="text-blue-600 text-md font-bold mb-4">
              Overtime Tech Labour
            </h2>
            <div className="em:flex em:flex-wrap block">
              <div className="mr-1">
                <h2 className="font-bold text-xs">Travel to (min):</h2>
                <input
                  onChange={(event) => setTimeTravelTo(event.target.value)}
                  className="mb-1 w-[100px] border p-1 rounded-lg border-zinc-700"
                  type="number"
                />
              </div>
              <div className="mr-1">
                <h2 className="font-bold text-xs">Arrival:</h2>
                <input
                  onChange={(event) => setTimeArrival(event)}
                  className="mb-1 min-w-[100px] border p-1 rounded-lg border-zinc-700"
                  type="time"
                />
              </div>
              <div className="mr-1">
                <h2 className="font-bold text-xs">Departure:</h2>
                <input
                  onChange={(event) => setTimeDeparture(event.target.value)}
                  className="mb-1 min-w-[100px] border p-1 rounded-lg border-zinc-700"
                  type="time"
                />
              </div>
              <div className="mr-1">
                <h2 className="font-bold text-xs">Travel from (min):</h2>
                <input
                  onChange={(event) => {
                    setTimeTravelFrom(event.target.value);
                  }}
                  className="mb-1 w-[100px] border p-1 rounded-lg border-zinc-700"
                  type="number"
                />
              </div>
              <div className="mr-1">
                <h2 className="font-bold text-xs">Total Time(min):</h2>
                <div className="mb-1 bg-gray-200 border p-1 rounded-lg w-[100px] border-zinc-700">
                  {Number(timeTravelTo) + Number(timeTravelFrom)}
                </div>
              </div>
              <div className="mr-1">
                <h2 className="font-bold text-xs">Work Time(min):</h2>
                <div className="mb-1 bg-gray-200 border p-1 rounded-lg w-[100px] border-zinc-700">
                  100
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-start flex-wrap mr-5 text-left py-2">
          <div className="border-2 px-3 py-3 rounded-lg">
            <h2 className="text-blue-600 text-md font-bold mb-4">
              After Midnight Tech Labour
            </h2>
            <div className="em:flex em:flex-wrap block">
              <div className="mr-1">
                <h2 className="font-bold text-xs">Travel to (min):</h2>
                <input
                  onChange={(event) => setTimeTravelTo(event.target.value)}
                  className="mb-1 w-[100px] border p-1 rounded-lg border-zinc-700"
                  type="number"
                />
              </div>
              <div className="mr-1">
                <h2 className="font-bold text-xs">Arrival:</h2>
                <input
                  onChange={(event) => setTimeArrival(event)}
                  className="mb-1 min-w-[100px] border p-1 rounded-lg border-zinc-700"
                  type="time"
                />
              </div>
              <div className="mr-1">
                <h2 className="font-bold text-xs">Departure:</h2>
                <input
                  onChange={(event) => setTimeDeparture(event.target.value)}
                  className="mb-1 min-w-[100px] border p-1 rounded-lg border-zinc-700"
                  type="time"
                />
              </div>
              <div className="mr-1">
                <h2 className="font-bold text-xs">Travel from (min):</h2>
                <input
                  onChange={(event) => {
                    setTimeTravelFrom(event.target.value);
                  }}
                  className="mb-1 w-[100px] border p-1 rounded-lg border-zinc-700"
                  type="number"
                />
              </div>
              <div className="mr-1">
                <h2 className="font-bold text-xs">Total Time(min):</h2>
                <div className="mb-1 bg-gray-200 w-[100px] border p-1 rounded-lg border-zinc-700">
                  {Number(timeTravelTo) + Number(timeTravelFrom)}
                </div>
              </div>
              <div className="mr-1">
                <h2 className="font-bold text-xs">Work Time(min):</h2>
                <div className="mb-1 bg-gray-200 border p-1 rounded-lg w-[100px] border-zinc-700">
                  100
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="em:mr-5 h-full py-3 border-2 mt-2 rounded-lg">
          <h2 className="font-bold text-blue-600 mb-5 ml-2">Report:</h2>
          <textarea
            className="em:max-w-[335px] mb-1 mx-2 border rounded-lg border-zinc-700"
            name="report"
            rows="12"
            Cols={width > 390 ? "100" : "49"}
          />
          <div className="em:w-full em:mt-3 em:mb-5 flex justify-center items-center mt-3 mb-3">
            <button
              onClick={handleShowModalReport}
              className="min-w-[100px] drop-shadow-lg mr-4 border-lime-600 rounded-lg bg-lime-600 hover:bg-lime-900 p-2 text-white"
            >
              Send
            </button>
          </div>
        </div>
      </div>

      {showModalReport && (
        <ModalReport closeModalReport={hideShowModalReport} />
      )}
    </div>
  );
};

export default ReportSection;
