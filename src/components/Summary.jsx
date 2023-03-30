import React from "react";
import Header from "./Header";
import TicketTable from "./TicketTable";

const Summary = () => {
  return (
    <div className="w-full h-full">
      <Header />
      <TicketTable/>
    </div>
  );
};

export default Summary;
