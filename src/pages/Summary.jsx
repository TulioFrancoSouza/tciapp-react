import React from "react";
import Header from "../components/Header";
import TicketTable from "../components/summary/TicketTable.tsx";

const Summary = () => {
  return (
    <div className="w-full h-full">
      <Header />
      <TicketTable />
    </div>
  );
};

export default Summary;
