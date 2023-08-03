import React, { useState,useEffect} from "react";
import { useWindowWidth } from "@react-hook/window-size";
import ModalReport from "../modal/ModalReport";
import { TicketService } from "../../service/ticket/TicketService";
import { Oval } from  'react-loader-spinner';
import { useNavigate } from "react-router-dom";
import SwitchTimeReg  from "./SwitchTimeReg";
import SwitchTimeAfter  from "./SwitchTimeAfter";
import SwitchTimeOver  from "./SwitchTimeOver";


const ReportSection = (props) => {

  const [timeTravelTo, setTimeTravelTo] = useState(0);
  const [timeTravelFrom, setTimeTravelFrom] = useState(0);
  const [timeArrival, setTimeArrival] = useState("00:00");
  const [timeDeparture, setTimeDeparture] = useState("00:00");

  
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

  const childProps = {
    timeRegTravelTo,
    timeRegTravelFrom,
    timeOverTravelTo,
    timeOverTravelFrom,
    timeAfterTravelTo,
    timeAfterTravelFrom,
    timeArrivalReg,
    timeDepartureReg,
    timeArrivalOver,
    timeDepartureOver,
    timeArrivalAfter,
    timeDepartureAfter
  };

  const [showTimeReg, setShowTimeReg] = useState(false);
  const [showTimeAfter, setShowTimeAfter] = useState(false);
  const [showTimeOver, setShowTimeOver] = useState(false);

  const [enableInput,setEnableInput] = useState(false);
  const [regularChecked, setRegularChecked] = useState(false);
  const [afterChecked, setAfterChecked] = useState(false);
  const [overChecked, setOverChecked] = useState(false);


  const [report, setReport] = useState("");
  const [statusReport, setStatusReport] = useState("");
  const [valueExp, setValueExp ] = useState("");
  const [extraExp, setExtraExp ] = useState("");
  const [adm, setAdm] = useState(false);
  const [load,setLoad] = useState(false);

  const [showModalReport, setShowModalReport] = useState(false);
  const width = useWindowWidth();
  const navigate = useNavigate();
  
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
          setStatusReport(ticket[i].statusReport);

          if(ticket[i].rtlTravelTo ){
            setShowTimeReg(true);
            setRegularChecked(true);
          }else{
            setShowTimeReg(false);
            setRegularChecked(false);
          }

          if(ticket[i].amtlTravelTo){
            setShowTimeAfter(true);
            setAfterChecked(true);
          }else{
            setShowTimeAfter(false);
            setAfterChecked(false);
          }

          if(ticket[i].otlTravelTo){
            setShowTimeOver(true);
            setOverChecked(true);
          }else{
            setShowTimeOver(false);
            setOverChecked(false);
          }
          
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
            setEnableInput(false);
          }else{
            setEnableInput(false);
          }
                 
          continue;
        }
      }
    }
    fetchData();
  }, [props.ticketId])


  function save(){
    let status = ""
    if(!adm){
      status="Review"
    }else{
      status="Closed"
    }
    const data ={
      technician: props.tecnitian,
      schedule: props.schedule,
      value: valueExp,
      extraExp: extraExp,
      report: report,
      statusReport: statusReport,
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
      status: status
    };
    const ticket = TicketService.ticketPatch(localStorage.getItem('token'),props.ticketId,data);
    ticket.then((response)=>{
      if(response != null){
        window.location.reload(true);
      }
    })
    navigate('/summary');
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

  const handlerTravelReg = (event) => {
     if(event.target.checked){
        setShowTimeReg(true);
        setTimeRegTravelTo(timeTravelTo);
        setTimeRegTravelFrom(timeTravelFrom);
        setTimeArrivalReg(timeArrival);
        setTimeDepartureReg(timeDeparture);
     }else{
        setShowTimeReg(false);
     }
  }

  const handlerTravelAfter = (event) => {
    if(event.target.checked){
      setShowTimeAfter(true);
      setTimeAfterTravelTo(timeTravelTo);
      setTimeAfterTravelFrom(timeTravelFrom);
      setTimeArrivalAfter(timeArrival);
      setTimeDepartureAfter(timeDeparture);
    }else{
      setShowTimeAfter(false);
    }
    
  }
  
  const handlerTravelOver = (event) => {
    if(event.target.checked){
     setShowTimeOver(true);
     setTimeOverTravelTo(timeTravelTo);
     setTimeOverTravelFrom(timeTravelFrom);
     setTimeArrivalOver(timeArrival);
     setTimeDepartureOver(timeDeparture);
    }else{
      setShowTimeOver(false);
    }
    
  }

  return (
    <div>
      <h2 className="em:ml-5 mr-14 ml-14 font-bold text-xl text-blue-600">
        Technician Report
      </h2>
     
      <div className="flex em:block border-2 em:ml-5 em:mr-1 items-start ml-14 mr-14 mb-10 text-sm">
      
      <div className="flex em:flex-wrap block">
      <div className="em:block em:ml-1 em:mr-5 flex justify-start flex-wrap text-xs text-left ml-10 mr-1 mt-2 py-1">
        
        <div className="flex em:flex-wrap block">
          <div className="mr-4 ">
            <h2 className="font-bold">Extra expenses:</h2>
            <input
              onChange={(event) => setExtraExp(event.target.value)}
              className="mb-2 border p-1 rounded-lg border-zinc-700"
              type="text"
              defaultValue={extraExp}
              disabled={enableInput}
            />
          </div>
        </div>

        <div className="flex em:flex-wrap block">
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
        </div>

        <div className="flex em:flex-wrap block">
        <div className="em:ml-1 mr-1 ml-1  py-3 border-2 mt-2 rounded-lg">  
         <h2 className="font-bold text-blue-600 mb-5 ml-2">Status Report:</h2>
          <div className="block">
              <div className="flex em:flex-wrap block">
                <input
                    //onChange={(event) => setStatusReport(event.target.value)}
                    className="em:max-w-[10px] mb-1 mx-2 border rounded-lg border-zinc-700"
                    name="report"
                    rows="12"
                    cols={width > 390 ? "30" : "29"}
                   // defaultValue={statusReport}
                    disabled={enableInput}
                  />
                      
              <button
                onClick={save}
                className="max-w-[70%] max-h-[50%] drop-shadow-lg mr-4 border-lime-600 rounded-lg bg-lime-600 hover:bg-lime-900 p-2 text-white">
                  Add
                </button>
            </div>
          
          <div className="flex em:flex-wrap block">
          <textarea
            //onChange={statusReport}
            className="em:max-w-[10px] mb-1 mx-2 border rounded-lg border-zinc-700"
            name="report"
            rows="12"
            cols={width > 390 ? "30" : "29"}
            defaultValue={statusReport}
            disabled={enableInput}
          />
           </div>
          </div>
          </div>
        </div>       
       </div>
      </div>
        <div className="flex justify-start flex-wrap mr-5 text-left py-2">
          <div className="em:w-full border-2 px-3 py-3 rounded-lg">
            <h2 className="text-blue-600 text-md font-bold mb-4">
              Travel
            </h2>

            <div className="flex em:flex-wrap block">
              <div className="mr-1">
                <h2 className="font-bold text-xs">Travel to (min):</h2>
                <input
                  onChange={(event) => setTimeTravelTo(event.target.value)}
                  className="mb-1 w-[100px] border p-1 rounded-lg border-zinc-700"
                  type="number"
                  value={timeTravelTo != null ? timeTravelTo : 0 }
                  disabled={enableInput}
                />
              </div>
              <div className="mr-1">
                <h2 className="font-bold text-xs">Arrival:</h2>
                <input
                  onChange={(event) => { setTimeArrival(event.target.value) }}
                  className="mb-1 min-w-[100px] border p-1 rounded-lg border-zinc-700"
                  type="time"
                  min="08:00"
                  value={timeArrival != null ? timeArrival : "00:00" }
                  disabled={enableInput}
                />
              </div>
              <div className="mr-1">
                <h2 className="font-bold text-xs">Departure:</h2>
                <input
                  onChange={(event) => setTimeDeparture(event.target.value)}
                  className="mb-1 min-w-[100px] border p-1 rounded-lg border-zinc-700"
                  type="time"
                  max="17:00"
                  required
                  value={timeDeparture != null ? timeDeparture : "00:00" }
                  disabled={enableInput}
                />
              </div>
              <div className="mr-1">
                <h2 className="font-bold text-xs">Travel from (min):</h2>
                <input
                  onChange={(event) => {setTimeTravelFrom(event.target.value);}}
                  className="mb-1 w-[100px] border p-1 rounded-lg border-zinc-700"
                  type="number"
                  value={timeTravelFrom != null ? timeTravelFrom : 0}
                  disabled={enableInput}
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
                  {calcTimeRegWork()}
                </div>
              </div>

              <div className="flex flex-wrap block">
              <div className="flex em:flex-wrap">
                <h2 className="font-bold text-xs">Regular Tech Labour:</h2>
                <input
                  onChange={(event) => handlerTravelReg(event)}
                  className="mb-1 ml-1"
                  type="checkbox"
                  disabled={enableInput}
                  defaultChecked={regularChecked}
                />
              </div>

              <div className="flex em:flex-wrap">
                <h2 className="font-bold text-xs">After Midnight Tech Labour:</h2>
                <input
                  onChange={(event) => handlerTravelAfter(event)}
                  className="mb-1 ml-1"
                  type="checkbox"
                  disabled={enableInput}
                  defaultChecked={afterChecked}
                />
              </div>

              <div className="flex em:flex-wrap">
                <h2 className="font-bold text-xs">Overtime Tech Labour:</h2>
                <input
                  onChange={(event) => {handlerTravelOver(event);}}
                  className="mb-1 ml-1"
                  type="checkbox"
                  disabled={enableInput}
                  defaultChecked={overChecked}
                />
              </div>
          </div>
          {/* <div className="flex flex-wrap-reverse"> 
              <button
                onClick={handlerTravel}
                className="max-w-[70%] max-h-[50%] drop-shadow-lg mr-4 border-lime-600 rounded-lg bg-lime-600 hover:bg-lime-900 p-2 text-white">
                  Add
                </button>
            </div> */}
        </div>
           { showTimeReg && <SwitchTimeReg {...childProps}  />} 
           { showTimeAfter && <SwitchTimeAfter {...childProps} />}    
           { showTimeOver && <SwitchTimeOver {...childProps} />}     

          </div> 
        </div>
                
      </div>
            

      {showModalReport && (
        <ModalReport accept={handlerTrue} deny={handlerFalse} closeModalReport={hideShowModalReport} />
      )}

      

      <div className="em:ml-5 mr-14 ml-14 h-full py-3 border-2 mt-2 rounded-lg">
        <h2 className="font-bold text-blue-600 mb-5 ml-2">Report:</h2>
          <textarea
            onChange={(event) => setReport(event.target.value)}
            className="em:max-w-[100px] mb-1 mx-2 border rounded-lg border-zinc-700"
            name="report"
            rows="12"
            cols={width > 390 ? "100" : "49"}
            defaultValue={report}
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
  );
};

export default ReportSection;
