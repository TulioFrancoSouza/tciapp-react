import React, { useState,useEffect} from "react";
import { useWindowWidth } from "@react-hook/window-size";
import ModalReport from "../modal/ModalReport";
import { TicketService } from "../../service/ticket/TicketService";
import { Oval } from  'react-loader-spinner';


const ReportSection = (props) => {
  const [timeRegTravelTo, setTimeRegTravelTo] = useState(0);
  const [timeRegTravelFrom, setTimeRegTravelFrom] = useState(0);

  const [timeOverTravelTo, setTimeOverTravelTo] = useState(0);
  const [timeOverTravelFrom, setTimeOverTravelFrom] = useState(0);

  const [timeAfterTravelTo, setTimeAfterTravelTo] = useState(0);
  const [timeAfterTravelFrom, setTimeAfterTravelFrom] = useState(0);

  const [timeArrivalReg, setTimeArrivalReg] = useState("00:00");
  const [timeDepartureReg, setTimeDepartureReg] = useState("00:00");

  const [timeArrivalOver, setTimeArrivalOver] = useState("00:00");
  const [timeDepartureOver, setTimeDepartureOver] = useState("00:00");

  const [timeArrivalAfter, setTimeArrivalAfter] = useState("00:00");
  const [timeDepartureAfter, setTimeDepartureAfter] = useState("00:00");

  const [enableInput,setEnableInput] = useState(false);

  const [report, setReport] = useState("");
  const [valueExp, setValueExp ] = useState("");
  const [extraExp, setExtraExp ] = useState("");
  const [adm, setAdm] = useState(false);
  const [load,setLoad] = useState(false);

  const [showModalReport, setShowModalReport] = useState(false);
  const width = useWindowWidth();
  
  useEffect(() =>{

    async function fetchData() {
      const token = localStorage.getItem('token');
      const ticket = await TicketService.ticket(token);
          
      if(ticket[ticket.length-1].admin){
          setAdm(ticket[ticket.length-1].admin);
      }

      for (let i = 0; i < ticket.length; i++) {

        if (ticket[i].id === props.ticketId) {
          setReport(ticket[i].report);
          setExtraExp(ticket[i].extraExp)
          setValueExp(ticket[i].value);

          setTimeRegTravelTo(ticket[i].rtlTravelTo);
          setTimeRegTravelFrom(ticket[i].rtlTravelFrom);
          setTimeDepartureReg(ticket[i].rtlDeparture);
          setTimeArrivalReg(ticket[i].rtlArrival);

          setTimeOverTravelFrom(ticket[i].otlTravelFrom);
          setTimeOverTravelTo(ticket[i].otlTravelTo);
          setTimeDepartureOver(ticket[i].otlDeparture);
          setTimeArrivalOver(ticket[i].otlArrival);

          setTimeAfterTravelFrom(ticket[i].amtlTravelFrom);
          setTimeAfterTravelTo(ticket[i].amtlTravelTo);
          setTimeDepartureAfter(ticket[i].amtlDeparture);
          setTimeArrivalAfter(ticket[i].amtlArrival);
        

          if(ticket[i].status === "Review" && !ticket[ticket.length-1].admin){
            setEnableInput(true);
          }else if(ticket[i].status === "Review" && ticket[ticket.length-1].admin){
            console.log("dentro ddooo");
            setEnableInput(false);
          }else{
            setEnableInput(false);
          }
                 
          continue;
        }
      }
    }
    fetchData();
  }, [])


  function save(){
    const data ={
      technician: props.tecnitian,
      schedule: props.schedule,
      value: valueExp,
      extraExp: extraExp,
      report: report,
      rtlTravelTo: timeRegTravelTo,
      rtlArrival: timeArrivalReg,
      rtlDeparture: timeDepartureReg,
      rtlTravelFrom: timeRegTravelFrom,
      otlTravelTo: timeOverTravelTo,
      otlArrival: timeArrivalOver,
      otlDeparture: timeDepartureOver,
      otlTravelFrom: timeOverTravelFrom,
      amtlTravelTo: timeAfterTravelTo,
      amtlArrival: timeArrivalAfter,
      amtlDeparture: timeDepartureAfter,
      amtlTravelFrom: timeAfterTravelFrom,
      status: "Review"
    };
    const ticket = TicketService.ticketPatch(localStorage.getItem('token'),props.ticketId,data);
    ticket.then((response)=>{
      if(response != null){
        window.location.reload(true);
      }
    }) 
  }

  function calcTimeRegWork() {
    let arrTimeArrival = "00:00";
    let arrTimeDeparture = "00:00";
    if(timeArrivalReg != null && timeDepartureReg != null){
      arrTimeArrival = timeArrivalReg.split(":");
      arrTimeDeparture = timeDepartureReg.split(":");
    }

    let timeReg =
      arrTimeDeparture[1] -
      arrTimeArrival[1] +
      (arrTimeDeparture[0] - arrTimeArrival[0]) * 60;

    return timeReg;
  }

  calcTimeRegWork();

  function calcTimeOverWork() {
    let arrTimeArrival = "00:00";
    let arrTimeDeparture = "00:00";
    if(timeArrivalOver != null && timeDepartureOver != null){
      arrTimeArrival = timeArrivalOver.split(":");
      arrTimeDeparture = timeDepartureOver.split(":");
    }
   
    let timeOver =
      arrTimeDeparture[1] -
      arrTimeArrival[1] +
      (arrTimeDeparture[0] - arrTimeArrival[0]) * 60;

    return timeOver;
  }

  calcTimeOverWork();
  function calcTimeAfterWork() {
    let arrTimeArrival = "00:00"
    let arrTimeDeparture = "00:00"

    if(timeArrivalAfter != null && timeDepartureAfter != null){
      arrTimeArrival = timeArrivalAfter.split(":");
      arrTimeDeparture = timeDepartureAfter.split(":");
    }

    let timeAfter =
      arrTimeDeparture[1] -
      arrTimeArrival[1] +
      (arrTimeDeparture[0] - arrTimeArrival[0]) * 60;

    return timeAfter;
  }

  calcTimeAfterWork();

  const handleShowModalReport = () => {
    setShowModalReport(true);
   
  };
  const hideShowModalReport = () => {
    setShowModalReport(false);
    
  };

  const handlerTrue = () => {
    setShowModalReport(false);
    setLoad(true);
    save();
  }

  const handlerFalse = () => {
    setShowModalReport(false);
  }
  

  return (
    <div>
      <h2 className="em:ml-5 mr-14 ml-14 font-bold text-xl text-blue-600">
        Technician Report
      </h2>
      <div className="em:block em:ml-5 em:mr-5 flex justify-start flex-wrap text-xs text-left ml-14 mr-14 mt-2 py-1">
        <div className="mr-4">
          <h2 className="font-bold">Extra expenses:</h2>
          <input
            onChange={(event) => setExtraExp(event.target.value)}
            className="mb-2 border p-1 rounded-lg border-zinc-700"
            type="text"
            size={width > 390 ? "145" : "50"}
            defaultValue={extraExp}
            disabled={enableInput}
          />
        </div>

        <div className="mr-4">
          <h2 className="font-bold">Value:</h2>
          <input
            onChange={(event) => setValueExp(event.target.value)}
            className="mb-1 border p-1 rounded-lg border-zinc-700"
            type="text"
            defaultValue={valueExp}
            disabled={enableInput}
          />
        </div>
       
        {width > 390 ? (
          <div className="em:w-full em:mt-3 em:mb-5 flex justify-center items-center mt-3 mb-3">
            {load &&
                <Oval height = "20" width = "20" radius = "10" color = 'black' 
                ariaLabel = 'oval-loading' strokeWidth={2}
                strokeWidthSecondary={2} /> } 
            <button
              onClick={handleShowModalReport}
              className="min-w-[100px] drop-shadow-lg mr-4 border-lime-600 rounded-lg bg-lime-600 hover:bg-lime-900 p-2 text-white"
            >
               {adm ? "Send" : "Save"}
            </button>
          </div>
        ) : null}
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
                  onChange={(event) => setTimeRegTravelTo(event.target.value)}
                  className="mb-1 w-[100px] border p-1 rounded-lg border-zinc-700"
                  type="number"
                  value={timeRegTravelTo}
                  disabled={enableInput}
                />
              </div>
              <div className="mr-1">
                <h2 className="font-bold text-xs">Arrival:</h2>
                <input
                  onChange={(event) => { setTimeArrivalReg(event.target.value) }}
                  className="mb-1 min-w-[100px] border p-1 rounded-lg border-zinc-700"
                  type="time"
                  min="08:00"
                  value={timeArrivalReg}
                  disabled={enableInput}
                />
              </div>
              <div className="mr-1">
                <h2 className="font-bold text-xs">Departure:</h2>
                <input
                  onChange={(event) => setTimeDepartureReg(event.target.value)}
                  className="mb-1 min-w-[100px] border p-1 rounded-lg border-zinc-700"
                  type="time"
                  max="17:00"
                  required
                  value={timeDepartureReg}
                  disabled={enableInput}
                />
              </div>
              <div className="mr-1">
                <h2 className="font-bold text-xs">Travel from (min):</h2>
                <input
                  onChange={(event) => {
                    setTimeRegTravelFrom(event.target.value);
                  }}
                  className="mb-1 w-[100px] border p-1 rounded-lg border-zinc-700"
                  type="number"
                  value={timeAfterTravelFrom}
                  disabled={enableInput}
                />
              </div>

              <div className="mr-1">
                <h2 className="font-bold text-xs">Total Time(min):</h2>
                <div className="mb-1 bg-gray-200 border p-1 rounded-lg w-[100px] border-zinc-700">
                  {Number(timeRegTravelTo) + Number(timeRegTravelFrom)}
                </div>
              </div>
              <div className="mr-1">
                <h2 className="font-bold text-xs">Work Time(min):</h2>
                <div className="mb-1 bg-gray-200 border p-1 rounded-lg w-[100px] border-zinc-700">
                  {calcTimeRegWork()}
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
                  onChange={(event) => setTimeOverTravelTo(event.target.value)}
                  className="mb-1 w-[100px] border p-1 rounded-lg border-zinc-700"
                  type="number"
                  value={timeOverTravelTo}
                  disabled={enableInput}
                />
              </div>
              <div className="mr-1">
                <h2 className="font-bold text-xs">Arrival:</h2>
                <input
                  onChange={(event) => setTimeArrivalOver(event.target.value)}
                  className="mb-1 min-w-[100px] border p-1 rounded-lg border-zinc-700"
                  type="time"
                  value={timeArrivalOver}
                  disabled={enableInput}
                />
              </div>
              <div className="mr-1">
                <h2 className="font-bold text-xs">Departure:</h2>
                <input
                  onChange={(event) => setTimeDepartureOver(event.target.value)}
                  className="mb-1 min-w-[100px] border p-1 rounded-lg border-zinc-700"
                  type="time"
                  value={timeDepartureOver}
                  disabled={enableInput}
                />
              </div>
              <div className="mr-1">
                <h2 className="font-bold text-xs">Travel from (min):</h2>
                <input
                  onChange={(event) => {
                    setTimeOverTravelFrom(event.target.value);
                  }}
                  className="mb-1 w-[100px] border p-1 rounded-lg border-zinc-700"
                  type="number"
                  value={timeOverTravelFrom}
                  disabled={enableInput}
                />
              </div>
              <div className="mr-1">
                <h2 className="font-bold text-xs">Total Time(min):</h2>
                <div className="mb-1 bg-gray-200 border p-1 rounded-lg w-[100px] border-zinc-700">
                  {Number(timeOverTravelTo) + Number(timeOverTravelFrom)}
                </div>
              </div>
              <div className="mr-1">
                <h2 className="font-bold text-xs">Work Time(min):</h2>
                <div className="mb-1 bg-gray-200 border p-1 rounded-lg w-[100px] border-zinc-700">
                  {calcTimeOverWork()}
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
                  onChange={(event) => setTimeAfterTravelTo(event.target.value)}
                  className="mb-1 w-[100px] border p-1 rounded-lg border-zinc-700"
                  type="number"
                  value={timeAfterTravelTo}
                  disabled={enableInput}
                />
              </div>
              <div className="mr-1">
                <h2 className="font-bold text-xs">Arrival:</h2>
                <input
                  onChange={(event) => setTimeArrivalAfter(event.target.value)}
                  className="mb-1 min-w-[100px] border p-1 rounded-lg border-zinc-700"
                  type="time"
                  value={timeArrivalAfter}
                  disabled={enableInput}
                />
              </div>
              <div className="mr-1">
                <h2 className="font-bold text-xs">Departure:</h2>
                <input
                  onChange={(event) =>
                    setTimeDepartureAfter(event.target.value)
                  }
                  className="mb-1 min-w-[100px] border p-1 rounded-lg border-zinc-700"
                  type="time"
                  value={timeDepartureAfter}
                  disabled={enableInput}
                />
              </div>
              <div className="mr-1">
                <h2 className="font-bold text-xs">Travel from (min):</h2>
                <input
                  onChange={(event) => {
                    setTimeAfterTravelFrom(event.target.value);
                  }}
                  className="mb-1 w-[100px] border p-1 rounded-lg border-zinc-700"
                  type="number"
                  value={timeAfterTravelFrom}
                  disabled={enableInput}
                />
              </div>
              <div className="mr-1">
                <h2 className="font-bold text-xs">Total Time(min):</h2>
                <div className="mb-1 bg-gray-200 w-[100px] border p-1 rounded-lg border-zinc-700">
                  {Number(timeAfterTravelTo) + Number(timeAfterTravelFrom)}
                </div>
              </div>
              <div className="mr-1">
                <h2 className="font-bold text-xs">Work Time(min):</h2>
                <div className="mb-1 bg-gray-200 border p-1 rounded-lg w-[100px] border-zinc-700">
                  {calcTimeAfterWork()}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="em:mr-5 h-full py-3 border-2 mt-2 rounded-lg">
          <h2 className="font-bold text-blue-600 mb-5 ml-2">Report:</h2>
          <textarea
            onChange={(event) => setReport(event.target.value)}
            className="em:max-w-[335px] mb-1 mx-2 border rounded-lg border-zinc-700"
            name="report"
            rows="12"
            Cols={width > 390 ? "100" : "49"}
            defaultValue={report}
            disabled={enableInput}
          />
        </div>
        {width <= 450 ? (
          <div className="em:w-full em:mt-3 em:mb-5 flex justify-center items-center mt-3 mb-3">
            <button
              onClick={handleShowModalReport}
              className="min-w-[100px] drop-shadow-lg mr-4 border-lime-600 rounded-lg bg-lime-600 hover:bg-lime-900 p-2 text-white"
            >
              Send
            </button>
          </div>
        ) : null}
      </div>

      {showModalReport && (
        <ModalReport accept={handlerTrue} deny={handlerFalse} closeModalReport={hideShowModalReport} />
      )}
    </div>
  );
};

export default ReportSection;
