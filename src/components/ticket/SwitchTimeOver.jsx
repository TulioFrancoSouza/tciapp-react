import React from "react";

const SwitchTimeOver = (props) => {

    return ( 
    <div>    
    <div className="flex flex-wrap-reverse">   
    <div className="mr-1">
        <h2 className="font-bold text-xs">Travel to (min):</h2>
        <input
          onChange={(event) => props.setTimeOverTravelTo(event.target.value)}
          className="mb-1 w-[100px] border-zinc-700"
          type="number"
          value={props.timeAfterTravelTo != null ? props.timeAfterTravelTo : 0 }
          disabled={props.enableInput}
        />
      </div>
      <div className="mr-1">
        <h2 className="font-bold text-xs">Arrival:</h2>
        <input
          onChange={(event) => { props.setTimeArrivalOver(event.target.value) }}
          className="mb-1 min-w-[100px]  border-zinc-700"
          type="time"
          min="08:00"
          value={props.timeArrivalAfter != null ? props.timeArrivalAfter : "00:00" }
          disabled={props.enableInput}
        />
      </div>
      <div className="mr-1">
        <h2 className="font-bold text-xs">Departure:</h2>
        <input
          onChange={(event) => props.setTimeDepartureOver (event.target.value)}
          className="mb-1 min-w-[100px]  border-zinc-700"
          type="time"
          max="17:00"
          required
          value={props.timeDepartureAfter != null ? props.timeDepartureAfter : "00:00" }
          disabled={props.enableInput}
        />
      </div>
      <div className="mr-1">
        <h2 className="font-bold text-xs">Travel from (min):</h2>
        <input
          onChange={(event) => {props.setTimeOverTravelFrom(event.target.value);}}
          className="mb-1 w-[100px] border-zinc-700"
          type="number"
          value={props.timeAfterTravelFrom != null ? props.timeAfterTravelFrom : 0}
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