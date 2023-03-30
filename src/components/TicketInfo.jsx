import React from "react"
import Header from "./Header"
import { Link } from "react-router-dom"
import TicketDetails from "./TicketDetails";
import ReportSection from "./ReportSection";

const TickeInfo = () => {
  return (
    <div>
      <Header />
      <div>
        <Link to='/summary'>
        <button className="ml-14 max-w-[100px] border border-blue-400 rounded-lg bg-blue-400 hover:bg-blue-700 w-full p-1 text-white">
          Back
        </button>
        </Link>
      </div>
      <div>
        <TicketDetails/>
      </div>
      <div>
        <ReportSection/>
      </div>
    </div>
  );
};

export default TickeInfo;
