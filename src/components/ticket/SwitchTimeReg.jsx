import React, {useState} from "react";

const SwitchTimeReg = (props) => {

  const [timeRegTravelTo, setTimeRegTravelTo] = useState(props.timeRegTravelTo);
  const [timeRegTravelFrom, setTimeRegTravelFrom] = useState(props.timeRegTravelFrom);
  const [timeArrivalReg, setTimeArrivalReg] = useState(props.timeArrivalReg);
  const [timeDepartureReg, setTimeDepartureReg] = useState(props.timeDepartureReg);

  console.log(props);

  return ( 
    <div>
    <div className="flex flex-wrap-reverse" data-attribute="hidden">   
    <div className="mr-1">
        <h2 className="font-bold text-xs">Travel to (min):</h2>
        <input
          onChange={(event) => setTimeRegTravelTo(event.target.value)}
          className="mb-1 w-[100px]  border-zinc-700"
          type="number"
          value={timeRegTravelTo != null ? timeRegTravelTo : 0 }
          disabled={props.enableInput}
        />
      </div>
      <div className="mr-1">
        <h2 className="font-bold text-xs">Arrival:</h2>
        <input
          onChange={(event) => { setTimeArrivalReg(event.target.value) }}
          className="mb-1 min-w-[100px]   border-zinc-700"
          type="time"
          min="08:00"
          value={timeArrivalReg != null ? timeArrivalReg : "00:00" }
          disabled={props.enableInput}
        />
      </div>
      <div className="mr-1">
        <h2 className="font-bold text-xs">Departure:</h2>
        <input
          onChange={(event) => setTimeDepartureReg(event.target.value)}
          className="mb-1 min-w-[100px]  border-zinc-700"
          type="time"
          max="17:00"
          required
          value={timeDepartureReg != null ? timeDepartureReg : "00:00" }
          disabled={props.enableInput}
        />
      </div>
      <div className="mr-1">
        <h2 className="font-bold text-xs">Travel from (min):</h2>
        <input
          onChange={(event) => {setTimeRegTravelFrom(event.target.value);}}
          className="mb-1 w-[100px] border-zinc-700"
          type="number"
          value={timeRegTravelFrom != null ? timeRegTravelFrom : 0}
          disabled={props.enableInput}
        />
      </div>
      
      <div className="mr-1">
        <h2 className="font-bold text-xs">Total Time(min):</h2>
        <div className="mb-1 bg-gray-200 w-[100px] border-zinc-700">
          {Number(props.timeRegTravelTo) + Number(props.timeRegTravelFrom)}
        </div>
      </div>
      <div className="mr-1">
        <h2 className="font-bold text-xs">Work Time(min):</h2>
        <div className="mb-1 bg-gray-200  w-[100px] border-zinc-700">
          {/* {props.calcTimeRegWork()} */}
        </div>
      </div>
    </div>
    </div>
    );
};
export default SwitchTimeReg;