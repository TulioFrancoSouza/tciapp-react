import React, {useState} from "react";

const SwitchTimeAfter = (props) => {


    const [timeAfterTravelTo, setTimeAfterTravelTo] = useState(props.timeAfterTravelTo);
    const [timeAfterTravelFrom, setTimeAfterTravelFrom] = useState(props.timeAfterTravelFrom);
    const [timeArrivalAfter, setTimeArrivalAfter] = useState(props.timeArrivalAfter);
    const [timeDepartureAfter, setTimeDepartureAfter] = useState(props.timeDepartureAfter);


    return ( 
    <div>    
    <div className="flex flex-wrap-reverse justify-between mt-4">   
    <div className="mr-1">
        <h2 className="font-bold text-xs">Travel to (min):</h2>
        <input
          onChange={(event) => setTimeAfterTravelTo(event.target.value)}
          className="mb-1 w-[100px] border-zinc-700"
          type="number"
          value={timeAfterTravelTo != null ? timeAfterTravelTo : 0 }
          disabled={props.enableInput}
        />
      </div>
      <div className="mr-1">
        <h2 className="font-bold text-xs">Arrival:</h2>
        <input
          onChange={(event) => { setTimeArrivalAfter(event.target.value) }}
          className="mb-1 min-w-[100px] border-zinc-700"
          type="time"
          min="08:00"
          value={timeArrivalAfter != null ? timeArrivalAfter : "00:00" }
          disabled={props.enableInput}
        />
      </div>
      <div className="mr-1">
        <h2 className="font-bold text-xs">Departure:</h2>
        <input
          onChange={(event) => setTimeDepartureAfter (event.target.value)}
          className="mb-1 min-w-[100px] border-zinc-700"
          type="time"
          max="17:00"
          required
          value={timeDepartureAfter != null ? timeDepartureAfter : "00:00" }
          disabled={props.enableInput}
        />
      </div>
      <div className="mr-1">
        <h2 className="font-bold text-xs">Travel from (min):</h2>
        <input
          onChange={(event) => {setTimeAfterTravelFrom(event.target.value);}}
          className="mb-1 w-[100px] border-zinc-700"
          type="number"
          value={timeAfterTravelFrom != null ? timeAfterTravelFrom : 0}
          disabled={props.enableInput}
        />
      </div>
    
      <div className="mr-1">
        <h2 className="font-bold text-xs">Total Time(min):</h2>
        <div className="mb-1 bg-gray-200  w-[100px] border-zinc-700">
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
export default SwitchTimeAfter;