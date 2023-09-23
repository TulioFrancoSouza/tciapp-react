import React, { useState, useEffect } from "react";
import { FcEmptyTrash } from "react-icons/fc";
import { useWindowWidth } from "@react-hook/window-size";
import ModalReport from "../modal/ModalReport";
import { TicketService } from "../../service/ticket/TicketService";
import { Oval } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import dateFormat from "dateformat";

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


  const [enableInput, setEnableInput] = useState(false);

  const [report, setReport] = useState("");
  const [statusReport, setStatusReport] = useState("");
  const [schedule, setSchedule] = useState("");
  
  const [adm, setAdm] = useState(false);
  const [load, setLoad] = useState(false);

  const [showModalReport, setShowModalReport] = useState(false);
  const width = useWindowWidth();
  const navigate = useNavigate();


  const [extraExpensesContent, setExtraExpensesContent] = useState("");
  const [travelInContent, setTravelInContent] = useState("");
  const [travelOutContent, setTravelOutContent] = useState("");

 const [travelInType, setTravelInType] = useState("");
 const [travelOutType, setTravelOutType] = useState("");
 const [travelLaborTimeStart, setTravelLaborTimeStart] = useState("");
 const [travelLaborTimeEnd, setTravelLaborTimeEnd] = useState("");
 const [travelLaborTimeType, setTravelLaborTimeType] = useState("");

  const [travelInOut, setTravelInOut] = useState([]);

  const handleSetExtraExpenses = (e) => {
    setExtraExpensesContent(e.target.value);
  };

  const handleSetTravelIn = (e) => {
    setTravelInContent(e.target.value);
  };

  const handleSetTravelOut = (e) => {
    setTravelOutContent(e.target.value);
  };

  const handleSetTravelInType = (e) => {
    setTravelInType(e.target.value);
  };

  const handleSetTravelOutType = (e) => {
    setTravelOutType(e.target.value);
  };


  const handleSetLaborTimeStart = (e) => {
    setTravelLaborTimeStart(e.target.value);
  };
  const handleSetLaborTimeEnd = (e) => {
    setTravelLaborTimeEnd(e.target.value);
  };

  const handleSetLaborTimeType = (e) => {
    setTravelLaborTimeType(e.target.value);
  };

  const [extraExpenses, setExtraExpenses] = useState([{description:""}]);

  const addExtraExpenses = (description) => {
    const newExtraExpenses = [
      ...extraExpenses,
      {
        id: String(Math.random().toFixed(2)),
        description: extraExpensesContent ,
      }
    ];
    
    const data = {
      extraExp: newExtraExpenses
    }

    TicketService.ticketPatch(
      localStorage.getItem("token"),
      props.ticketId,
      data
    );
    setExtraExpenses(newExtraExpenses);
  };


  const addTravelInOut = (eType) => {

   let resolveTravelInOutType = null;
   let travelGo = null;
   let travelEnd = null;
   
   switch(eType) {
    case "TravelIn":
      resolveTravelInOutType = travelInType !== "" ? travelInType + "In" : "RegularIn" ;
      travelGo = travelInContent;
      break;
    case "TravelOut":
      resolveTravelInOutType = travelOutType !== "" ? travelOutType + "Out" : "RegularOut";
      travelGo = travelOutContent;
      break;
    case "LaborTime":
        resolveTravelInOutType = travelLaborTimeType !== "" ? travelLaborTimeType + "Labor" : "RegularLabor";
        travelGo = travelLaborTimeStart;
        travelEnd = travelLaborTimeEnd;
        break;
    default:
      console.log("void");
    }


    const newTravelInOut = [
      ...travelInOut.filter(row=>row.type !== resolveTravelInOutType),
      {
        id: String(Math.random().toFixed(2)),
        time: travelGo,
        timeEnd: travelEnd,
        type: resolveTravelInOutType ,
      } 
    ];

    console.log(newTravelInOut);
    let rtlTravelFrom = null;
    let otlTravelFrom = null;
    let amtlTravelFrom = null;
    let rtlTravelTo = null;
    let otlTravelTo = null;
    let amtlTravelTo = null;

    let amtlDeparture = null;
    let amtlArrival = null;

    let otlDeparture = null;
    let otlArrival = null;

    let rtlDeparture = null;
    let rtlArrival = null;

    newTravelInOut.map((row)=>{
      if(eType === "TravelIn"){
        rtlTravelFrom = row.type === "RegularIn" ? row.time : null;
        otlTravelFrom = row.type === "OvertimeIn" ? row.time : null;
        amtlTravelFrom = row.type === "After mid-nightIn" ? row.time : null;
      }
      if(eType === "TravelOut"){
        rtlTravelTo = row.type === "RegularOut" ? row.time : null;
        otlTravelTo = row.type === "OvertimeOut" ? row.time : null;
        amtlTravelTo = row.type === "After mid-nightOut" ? row.time : null;
      }

      if(eType === "LaborTime"){
        rtlArrival = row.type === "RegularLabor" ? row.time : null;
        rtlDeparture = row.type === "RegularLabor" ? row.timeEnd : null;

        otlArrival = row.type === "OvertimeLabor" ? row.time : null;
        otlDeparture = row.type === "OvertimeLabor" ? row.timeEnd : null;

        amtlArrival = row.type === "After mid-nightLabor" ? row.time : null;
        amtlDeparture = row.type === "After mid-nightLabor" ? row.timeEnd : null;

      }
      
      return ""
    })
    
    setTimeAfterTravelTo(amtlTravelTo);
    setTimeAfterTravelFrom(amtlTravelFrom);
    setTimeArrivalAfter(amtlArrival);
    setTimeDepartureAfter(amtlDeparture);

    setTimeRegTravelTo(rtlTravelTo);
    setTimeRegTravelFrom(rtlTravelFrom);
    setTimeDepartureReg(rtlDeparture);
    setTimeArrivalReg(rtlArrival);

    setTimeOverTravelFrom(otlTravelFrom);
    setTimeOverTravelTo(otlTravelTo);
    setTimeDepartureOver(otlDeparture);
    setTimeArrivalOver(otlArrival)

    const data = {
      rtlTravelFrom: rtlTravelFrom,
      amtlTravelFrom:amtlTravelFrom,
      otlTravelFrom: otlTravelFrom,
      rtlTravelTo: rtlTravelTo,
      amtlTravelTo: amtlTravelTo,
      otlTravelTo: otlTravelTo,
      amtlDeparture: amtlDeparture,
      amtlArrival: amtlArrival,
      otlDeparture: otlDeparture,
      otlArrival: otlArrival,
      rtlDeparture: rtlDeparture,
      rtlArrival: rtlArrival
    }

    TicketService.ticketPatch(
      localStorage.getItem("token"),
      props.ticketId,
      data
    );

    setTravelInOut(newTravelInOut);
  };


  const removeExtraExpenses = (idx) => {
    const newExtraExpenses = []
    extraExpenses.map((row,index) => index !== idx ? newExtraExpenses.push(row) : [])      
 
    const data = {
      extraExp: newExtraExpenses
    }

    TicketService.ticketPatch(
      localStorage.getItem("token"),
      props.ticketId,
      data
    );
    console.log(newExtraExpenses);
    setExtraExpenses(newExtraExpenses);
  };


  const removeTravelInOut = (travel) => {
    const newTravelInOut = []
    travelInOut.map((row) => row.type !== travel.type ? newTravelInOut.push(row) : [])
    // const data = {
    //   extraExp: newTravelInOut
    // }

    // TicketService.ticketPatch(
    //   localStorage.getItem("token"),
    //   props.ticketId,
    //   data
    // );
    setTravelInOut(newTravelInOut);
  };



  const removeLaborTime = (trv) => {
    const newTravelInOut = []
    travelInOut
      .map((row) => { if(row.type !== trv.type){
                            newTravelInOut.push(row)
                            //console.log(row);
                          }
                          return "";
          }) 
    if(trv.type==="After mid-nightLabor"){
      setTimeArrivalAfter("");
      setTimeDepartureAfter("");
      console.log(trv);
    }
    
    // const data = {
    //   extraExp: newTravelInOut
    // }

    // TicketService.ticketPatch(
    //   localStorage.getItem("token"),
    //   props.ticketId,
    //   data
    // );
    
    setTravelInOut(newTravelInOut);
  };

  const handleInsertExtraExpense = (e) => {
    e.preventDefault();
    if (!extraExpensesContent) return;
    addExtraExpenses(extraExpensesContent);
    setExtraExpensesContent("");

  }

  const handleRemoveExtraExpense = (e,index) => {
    e.preventDefault();
    removeExtraExpenses(index);
  }

  const handleInsertTravelInOut = (e,eType) => {
    e.preventDefault();
   // if (!travelInContent || !travelOutContent) return;
    addTravelInOut(eType);
    setTravelInContent('');
    setTravelOutContent('');
  }

  const handleRemoveTravelInOut = (e,index) => {
    e.preventDefault();
    removeTravelInOut(index);
  }

  const handleRemoveLabourTime = (e,travel) => {
    e.preventDefault();
    removeLaborTime(travel);
  }


  useEffect(() => {
    async function fetchData() {
      const token = localStorage.getItem("token");
      const ticket = await TicketService.ticket(token);


      if (ticket[ticket.length - 1].admin) {
        setAdm(ticket[ticket.length - 1].admin);
      }

      for (let i = 0; i < ticket.length; i++) {
        if (ticket[i].id === props.ticketId) {
          setReport(ticket[i].report);
          setStatusReport(ticket[i].statusReport);
          setSchedule(ticket[i].schedule);
          
         const travel = []

         if(ticket[i].rtlTravelFrom != null ){
          travel.push({
            id: String(Math.random().toFixed(2)),
            time: ticket[i].rtlTravelFrom,
            type: "RegularIn"
           })
         }
         if(ticket[i].rtlTravelTo != null ){
          travel.push({
            id: String(Math.random().toFixed(2)),
            time: ticket[i].rtlTravelTo,
            type: "RegularOut"
           })
         }
         if(ticket[i].otlTravelFrom != null ){
          travel.push({
            id: String(Math.random().toFixed(2)),
            time: ticket[i].otlTravelFrom,
            type: "OvertimeIn"
           })
         }

         if(ticket[i].otlTravelTo != null ){
          travel.push({
            id: String(Math.random().toFixed(2)),
            time: ticket[i].otlTravelTo,
            type: "OvertimeOut"
           })
         }

         if(ticket[i].amtlTravelFrom != null ){
          travel.push({
            id: String(Math.random().toFixed(2)),
            time: ticket[i].amtlTravelFrom,
            type: "After mid-nightIn"
           })
         }

         if(ticket[i].amtlTravelTo != null || ticket[i].amtlTravelTo !== ""){
          travel.push({
            id: String(Math.random().toFixed(2)),
            time: ticket[i].amtlTravelTo,
            type: "After mid-nightOut"
           })
         }



         if(ticket[i].amtlArrival != null && ticket[i].amtlArrival !== "" ){
          travel.push({
            id: String(Math.random().toFixed(2)),
            time: ticket[i].amtlArrival,
            timeEnd: ticket[i].amtlDeparture,
            type: "After mid-nightLabor"
           })
         }


         if(ticket[i].rtlArrival != null ){
          travel.push({
            id: String(Math.random().toFixed(2)),
            time: ticket[i].rtlArrival,
            timeEnd: ticket[i].rtlDeparture,
            type: "RegularLabor"
           })
         }

         if(ticket[i].otlArrival != null ){
          travel.push({
            id: String(Math.random().toFixed(2)),
            time: ticket[i].otlArrival,
            timeEnd: ticket[i].otlDeparture,
            type: "OvertimeLabor"
           })
         }

          setTravelInOut(travel);

          const extraExp = ticket[i].extraExp != null ?  ticket[i].extraExp : [] ;


          setExtraExpenses(extraExp);
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

         

          if (
            ticket[i].status === "Review" &&
            !ticket[ticket.length - 1].admin
          ) {
            setEnableInput(true);
          } else if (
            ticket[i].status === "Review" &&
            ticket[ticket.length - 1].admin
          ) {
            setEnableInput(false);
          } else {
            setEnableInput(false);
          }

          continue;
        }
      }
    }
    fetchData();
  }, [props.ticketId]);

  function save(send) {
    let status = "";
    if (!adm ) {  
        status = "Review";
    } else {
        status = "Closed"      
    }

    const data = {
      send:send,
      technician: props.technician,
      schedule: props.schedule,
      extraExp: extraExpenses,
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
      status: status,
    };
    
    const ticket = TicketService.ticketPatch(
      localStorage.getItem("token"),
      props.ticketId,
      data
    );
    ticket.then((response) => {
      if (response != null) {
        window.location.reload(true);
      }
    });
    navigate("/summary");
  }

  function calcTimeRegWork() {
    let arrTimeArrival = "00:00";
    let arrTimeDeparture = "00:00";
    if (timeArrivalReg != null && timeDepartureReg != null) {
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
    if (timeArrivalOver != null && timeDepartureOver != null) {
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
    let arrTimeArrival = "00:00";
    let arrTimeDeparture = "00:00";

    if (timeArrivalAfter != null && timeDepartureAfter != null) {
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
    if(adm===true){
      save(true);
    }else{
      save(false);
    }
    
  };

  const handlerFalse = () => {
    setShowModalReport(false);
  };

  return (
    <div>
      <div>
        <hr className="em:ml-5 em:mr-5 my-6 h-0.5 ml-14 mr-14 border-t-0 bg-gray-300 opacity-100 dark:opacity-50" />
      </div>
      <h2 className="em:ml-5 mr-14 ml-14 mt-5 font-bold text-xl text-blue-600">
        Technician Report
      </h2>

      <div className="block em:block border-2 rounded-lg em:ml-5 em:mr-1 items-start ml-14 mr-14 mt-5 mb-2 text-sm">
        <div className="em:flex-wrap block">
          <h2 className="text-blue-600 text-md ml-2 mt-2 font-bold mb-4">
            Extra expenses
          </h2>
          <h2 className="font-bold ml-2">Description:</h2>

          <div className="em:block em:ml-1 em:mr-5 mb-2 flex justify-start flex-wrap text-xs text-left ml-2 mr-1 mt-2 py-1">
            <div className="em:flex-wrap mr-2 block">
              <input
                onChange={handleSetExtraExpenses}
                className="min-w-[1075px] mb-2 border py-1 rounded-lg border-zinc-700"
                type="text"
                placeholder=" Insert an item description + Price. e.g 'Switch Cisco 12.000 + $1.250,50"
              />
            </div>

            <div className="flex em:flex-wrap align-middle">
              <button 
              className="min-w-[100px] mr-4 drop-shadow-lg h-[80%] align-baseline border-lime-600 rounded-lg bg-lime-600 hover:bg-lime-900 px-1 text-white"
              onClick={handleInsertExtraExpense}
              >
                Add
              </button>
            </div>
          </div>
          <div className="flex justify-start items-center ml-2 mb-10 w-full h-full">
            <table
              className="align-middle border-spacing-2 table-fixed mt-5">
              <thead>
                <tr className="border-t-2 border-b p-2 border-gray-300 text-left">
                  <th className="w-[1150px]">Item</th>
                  <th className="w-[50px]"></th>
                </tr>
                { extraExpenses != null && extraExpenses.length > 0 && extraExpenses.map((extraExpense,index) => (
                  <tr key={Object.keys(extraExpense)[index]} className="border-t-2 text-left p-2 border-gray-300">
                    <td value={extraExpense}>{extraExpense.description}</td>
                    <td>
                      <div>
                        <FcEmptyTrash onClick={(e) => handleRemoveExtraExpense(e,index)}/>
                      </div>
                    </td>
                  </tr>
                ))}
              </thead>
            </table>
          </div>
        </div>
      </div>

      <div className="em:ml-5 mr-14 ml-14 h-full py-3 border-2 mt-2 rounded-lg">
        <h2 className="font-bold text-blue-600 mb-2 ml-2">Time report:</h2>
        <div className="block mr-5 text-left py-2">
          <div className="block m-auto">
            <h2 className="text-center font-bold text-blue-600">Date</h2>
            <div className="text-center">
              <input
                defaultValue={dateFormat(schedule,"yyyy-mm-dd")}
                type="date"
                className="mb-2 border px-2 py-1 rounded-lg border-zinc-700"
              ></input>
            </div>
          </div>
          <div className="flex flex-wrap justify-between text-center ml-4 mr-4 mb-4 columns-3">
            <div className="block border-2 mt-2 mb-2 rounded-lg	p-2 min-w-[300px] ml-10">
              <h2 className="font-bold">Travel in</h2>
              <h3>(minutes)</h3>

              <div>
                <input
                  onChange={handleSetTravelIn}
                  value={travelInContent}
                  type="number"
                  className="mb-2 border px-1 py-1 rounded-lg border-zinc-700"
                  title="Insert minutes spent in travel in. Only numbers allowed."
                ></input>
                <div>
                  <h3 className="font-bold">Type</h3>
                  <select onChange={handleSetTravelInType} className="mb-2 border px-2 py-1 mt-2 text-center rounded-lg border-zinc-700">
                    <option>Regular</option>
                    <option>Overtime</option>
                    <option>After mid-night</option>
                  </select>
                </div>
                <div>
                  <button 
                    onClick={(e) => handleInsertTravelInOut(e,"TravelIn")}
                    className="min-w-[100px] drop-shadow-lg mt-2 border-lime-600 rounded-lg bg-lime-600 hover:bg-lime-900 p-1 text-white">
                    Add
                  </button>
                  <div className="flex justify-evenly items-center w-full h-full">
                    <table className="block align-middle table-auto mt-5">
                      <thead>
                        <tr className="border-t-2 border-b border-gray-300 text-center">
                          <th className="w-[75px]">Time</th>
                          <th className="w-[px]">Type</th>
                          <th></th>
                        </tr>
                        {travelInOut.filter(travel=>travel.type.match("In")).map((travel,index) => (
                                                    <tr key={Object.keys(travel)[index]}  className="border-t-2 text-center border-gray-300">
                                                    <td>{travel.time}</td>
                                                    <td>{travel.type.replace("In","")}</td>
                                                    <td>
                                                      <button>
                                                        <FcEmptyTrash onClick={(e) => handleRemoveTravelInOut(e,travel)}/>
                                                      </button>
                                                    </td>
                                                  </tr>

                        ))}
                      </thead>
                    </table>
                  </div>
                </div>
              </div>
            </div>

            <div className="block border-2 mt-2 mb-2 rounded-lg	p-2 min-w-[300px]">
              <h2 className="font-bold">Labour time (minutes)</h2>
              <div className="flex justify-evenly">
                <div>
                  <h3>Start</h3>
                  <input
                    onChange={handleSetLaborTimeStart}
                    type="time"
                    className="mb-2 border px-5 py-1 rounded-lg border-zinc-700"
                  ></input>
                </div>

                <div>
                  <h3>End</h3>

                  <input
                    onChange={handleSetLaborTimeEnd}
                    type="time"
                    className="mb-2 border px-5 py-1 rounded-lg border-zinc-700"
                  ></input>
                </div>
              </div>

              <div>
                <div>
                  <h3 className="font-bold">Type</h3>
                  <select onChange = {handleSetLaborTimeType} 
                          className="mb-2 border px-2 py-1 mt-2 text-center rounded-lg border-zinc-700">
                    <option>Regular</option>
                    <option>Overtime</option>
                    <option>After mid-night</option>
                  </select>
                </div>
                <div>
                  <button 
                    onClick={(e) => handleInsertTravelInOut(e,"LaborTime")}
                    className="min-w-[100px] drop-shadow-lg mt-2 border-lime-600 rounded-lg bg-lime-600 hover:bg-lime-900 p-1 text-white">
                    Add
                  </button>
                  <div className="flex justify-evenly items-center w-full h-full">
                    <table className="align-middle border-spacing-2 text-center table-fixed mt-5">
                      <thead>
                        <tr className="border-t-2 border-b p-2 border-gray-300 text-center">
                          <th className="w-[75px]">Start</th>
                          <th className="w-[75px]">End</th>
                          <th className="w-[75px]">Type</th>
                          <th></th>
                        </tr>
                        {travelInOut.filter(travel=>travel.type.match("Labor")).map((travel,index) => (
                                                    <tr key={Object(travel)[index]}  className="border-t-2 text-center border-gray-300">
                                                    <td>{travel.time}</td>
                                                    <td>{travel.timeEnd}</td>
                                                    <td>{travel.type.replace("Labor","")}</td>
                                                    <td>
                                                      <button>
                                                        <FcEmptyTrash onClick={(e) => handleRemoveLabourTime(e,travel)}/>
                                                      </button>
                                                    </td>
                                                  </tr>

                        ))}
                      </thead>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            <div className="block border-2 mt-2 mb-2 rounded-lg	p-2 min-w-[300px] mr-10">
              <h2 className="font-bold">Travel out</h2>
              <h3>(minutes)</h3>

              <div>
                <input
                  onChange={handleSetTravelOut}
                  value={travelOutContent}
                  type="number"
                  className="mb-2 border px-1 py-1 rounded-lg border-zinc-700"
                ></input>
                <div>
                  <h3 className="font-bold">Type</h3>
                  <select onChange={handleSetTravelOutType} className="mb-2 border px-2 py-1 mt-2 rounded-lg text-center border-zinc-700">
                    <option>Regular</option>
                    <option>Overtime</option>
                    <option>After mid-night</option>
                  </select>
                </div>
                <div>
                  <button  onClick={(e) => handleInsertTravelInOut(e,"TravelOut")} className="min-w-[100px] mt-2 drop-shadow-lg border-lime-600 rounded-lg bg-lime-600 hover:bg-lime-900 p-1 text-white">
                    Add
                  </button>
                  <div className="flex justify-evenly items-center w-full h-full">
                    <table className="block align-middle table-auto mt-5">
                      <thead>
                        <tr className="border-t-2 border-b border-gray-300 text-center">
                          <th className="w-[75px]">Time</th>
                          <th className="w-[px]">Type</th>
                          <th></th>
                        </tr>
                        {travelInOut.filter(travel=>travel.type.match("Out")).map((travel,index) => (
                                                    <tr key={Object(travel)[index]} className="border-t-2 text-center border-gray-300">
                                                    <td>{travel.time}</td>
                                                    <td>{travel.type.replace("Out","")}</td>
                                                    <td>
                                                      <button>
                                                        <FcEmptyTrash onClick={(e) => handleRemoveTravelInOut(e,travel)}/>
                                                      </button>
                                                    </td>
                                                  </tr>
                        ))}
                      </thead>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showModalReport && (
        <ModalReport
          accept={handlerTrue}
          deny={handlerFalse}
          closeModalReport={hideShowModalReport}
        />
      )}

      <div className="em:ml-5 mr-14 ml-14 h-full py-3 border-2 mt-2 rounded-lg">
        <h2 className="font-bold text-blue-600 mb-5 ml-2">Report:</h2>
        <textarea
          onChange={(event) => setReport(event.target.value)}
          className="em:max-w-[100px] mb-1 mx-2 border rounded-lg border-zinc-700"
          placeholder=" Write your report here..."
          name="report"
          rows="12"
          cols={width > 390 ? "150" : "49"}
          defaultValue={report}
          disabled={enableInput}
        />
      </div>

      {width > 390 ? (
        <div className="em:w-full em:mt-3 em:mb-5 flex justify-center items-center mt-3 mb-3">
          {load && (
            <Oval
              height="20"
              width="20"
              radius="10"
              color="black"
              ariaLabel="oval-loading"
              strokeWidth={2}
              strokeWidthSecondary={2}
            />
          )}
          <button
            onClick={handleShowModalReport}
            className="min-w-[100px] drop-shadow-lg mr-4 mb-10 mt-4 border-lime-600 rounded-lg bg-lime-600 hover:bg-lime-900 p-2 text-white"
          >
            {adm ? "Send report" : "Save"}
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default ReportSection;
