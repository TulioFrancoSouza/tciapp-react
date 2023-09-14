import React, {useState} from "react";

const SwitchTimeOver = (props) => {

    const [timeOverTravelTo, setTimeOverTravelTo] = useState(props.timeOverTravelTo);
    const [timeOverTravelFrom, setTimeOverTravelFrom] = useState(props.timeOverTravelFrom);
    const [timeArrivalOver, setTimeArrivalOver] = useState(props.timeArrivalOver);
    const [timeDepartureOver, setTimeDepartureOver] = useState(props.timeDepartureOver);

    return ( 
    <div>    
    <div className="flex flex-wrap-reverse justify-between mt-4">   
    <div className="mr-1">
        <h2 className="font-bold text-xs">Travel to (min):</h2>
        <input
          onChange={(event) => setTimeOverTravelTo(event.target.value)}
          className="mb-1 w-[100px] border-zinc-700"
          type="number"
          value={timeOverTravelTo != null ? timeOverTravelTo : 0 }
          disabled={props.enableInput}
        />
      </div>
      <div className="mr-1">
        <h2 className="font-bold text-xs">Arrival:</h2>
        <input
          onChange={(event) => { setTimeArrivalOver(event.target.value) }}
          className="mb-1 min-w-[100px]  border-zinc-700"
          type="time"
          min="08:00"
          value={timeArrivalOver != null ? timeArrivalOver : "00:00" }
          disabled={props.enableInput}
        />
      </div>
      <div className="mr-1">
        <h2 className="font-bold text-xs">Departure:</h2>
        <input
          onChange={(event) => setTimeDepartureOver (event.target.value)}
          className="mb-1 min-w-[100px]  border-zinc-700"
          type="time"
          max="17:00"
          required
          value={timeDepartureOver != null ? timeDepartureOver : "00:00" }
          disabled={props.enableInput}
        />
      </div>
      <div className="mr-1">
        <h2 className="font-bold text-xs">Travel from (min):</h2>
        <input
          onChange={(event) => {setTimeOverTravelFrom(event.target.value);}}
          className="mb-1 w-[100px] border-zinc-700"
          type="number"
          value={timeOverTravelFrom != null ? timeOverTravelFrom : 0}
          disabled={props.enableInput}
        />
      </div>
    
      <div className="mr-1">
        <h2 className="font-bold text-xs">Total Time(min):</h2>
        <div className="mb-1 bg-gray-200 w-[100px] border-zinc-700">
          {Number(props.timeAfterTravelTo) + Number(props.timeAfterTravelFrom)}
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
export default SwitchTimeOver;