import React, { useEffect, useContext, useState } from "react";
import { FcAbout } from "react-icons/fc";
import { Link } from "react-router-dom";
import { SearchContext } from "../../context/SearchContext";
import { TicketService } from "../../service/ticket/TicketService";
import { Oval } from "react-loader-spinner";

const TicketTable = () => {
  const { query } = useContext(SearchContext);
  const [data, setData] = useState([]);
  const [load, setLoad] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setLoad(true);
      const token = localStorage.getItem("token");
      const ticket = await TicketService.ticket(token);
      const processTicket = ticket.filter((item) => item.id !== "0");
      setData(processTicket);
      setLoad(false);
    }
    fetchData();
  }, []);

  return (
    <div className="w-full mt-5 overflow-x-auto md:flex justify-center mt-10 px-5">
      <table className="max-w-sm md:max-w-none w-[100%] ">
        <thead className="w-[100%]">
          <tr className="w-[100%]">
            <th className="py-2 w-[16%] text-start">Ticket</th>
            <th className="py-2 w-[16%] text-start">Client</th>
            <th className="py-2 w-[16%] text-start">Title</th>
            <th className="py-2 w-[16%] text-start">Address</th>
            <th className="py-2 w-[16%]">Assign to</th>
            <th className="py-2 w-[16%]">Status</th>
          </tr>
        </thead>
        <tbody>
          {load && (
            <tr>
              <td>
                {
                  <Oval
                    height="20"
                    width="20"
                    radius="10"
                    color="black"
                    ariaLabel="oval-loading"
                    strokeWidth={2}
                    strokeWidthSecondary={2}
                  />
                }
              </td>
            </tr>
          )}

          {!load &&
            data
              .filter(
                (item) =>
                  item.id.includes(query) ||
                  item.client.toLowerCase().includes(query.toLowerCase()) ||
                  item.title.toLowerCase().includes(query.toLowerCase()) ||
                  item.address.toLowerCase().includes(query.toLowerCase()) ||
                  item.assignto.toLowerCase().includes(query.toLowerCase()) ||
                  item.status.toLowerCase().includes(query.toLowerCase())
              )
              .map((ticket) => (
                <tr
                  key={ticket.id}
                  className="border-t-2 border-b-2 border-gray-300 w-[100%]"
                  hidden={ticket.id === 0 ? true : false}
                >
                  <td className="py-2 w-[16%]">{ticket.id}</td>
                  <td className="py-2 w-[16%]">{ticket.client}</td>
                  <td className="py-2 max-w-[16%] w-[16%]">{ticket.title}</td>
                  <td className="py-2 w-[16%] text-start">{ticket.address}</td>
                  <td className="py-2 w-[16%] text-center">
                    {ticket.assignto}
                  </td>
                  <td className="py-2 w-[16%] text-center">{ticket.status}</td>
                  <td className="py-2">
                    <Link to={`/ticketinfo/${ticket.id}`}>
                      <FcAbout />
                    </Link>
                  </td>
                </tr>
              ))}
        </tbody>
      </table>
    </div>
  );
};

export default TicketTable;
