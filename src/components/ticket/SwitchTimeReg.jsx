import React, {useState} from "react";

const SwitchTimeReg = (props) => {

  const [timeRegTravelTo, setTimeRegTravelTo] = useState(0);
  const [timeRegTravelFrom, setTimeRegTravelFrom] = useState(0);
  const [timeArrivalReg, setTimeArrivalReg] = useState("00:00");
  const [timeDepartureReg, setTimeDepartureReg] = useState("00:00");

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
          value={props.timeRegTravelTo != null ? props.timeRegTravelTo : 0 }
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
          value={props.timeArrivalReg != null ? props.timeArrivalReg : "00:00" }
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
          value={props.timeDepartureReg != null ? props.timeDepartureReg : "00:00" }
          disabled={props.enableInput}
        />
      </div>
      <div className="mr-1">
        <h2 className="font-bold text-xs">Travel from (min):</h2>
        <input
          onChange={(event) => {setTimeRegTravelFrom(event.target.value);}}
          className="mb-1 w-[100px] border-zinc-700"
          type="number"
          value={props.timeRegTravelFrom != null ? props.timeRegTravelFrom : 0}
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