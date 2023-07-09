import React, { useEffect,useContext,useState } from "react";
import { FcAbout } from "react-icons/fc";
import { Link } from "react-router-dom";
import { Tickets } from "../../tickets";
import { SearchContext } from "../../context/SearchContext";
import { TicketService } from "../../service/ticket/TicketService"

const TicketTable = () => {
  const { query } = useContext(SearchContext);
  const [ data, setData ] = useState([]);

  useEffect(() =>{

    async function fetchData() {
      const token = localStorage.getItem('token');
      const ticket = await TicketService.ticket(token);
      setData(ticket);
    }
    fetchData();
  }, [])

  return (
    <div className="flex justify-center items-center text-sm w-full h-full">
      <table className="em:ml-8 em:mr-8 em:text-xs table-auto w-full mr-14 ml-14">
        <thead>
          <tr className="border-t-2 border-b border-gray-300 text-center">
            <th className="py-2">Ticket</th>
            <th>Client</th>
            <th>Title</th>
            <th className="em:hidden">Address</th>
            <th>SLA</th>
            <th>Assign to</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {data.filter(
            (item) =>
              item.id.includes(query) ||
              item.client.toLowerCase().includes(query.toLowerCase()) ||
              item.title.toLowerCase().includes(query.toLowerCase()) ||
              item.address.toLowerCase().includes(query.toLowerCase()) ||
              item.assignto.toLowerCase().includes(query.toLowerCase()) ||
              item.status.toLowerCase().includes(query.toLowerCase())
          ).map((ticket) => (
            <tr className="border-t-2 border-b-2 border-gray-300 text-center">
              <td className="py-2">{ticket.id}</td>
              <td className="py-2">{ticket.client}</td>
              <td className="py-2">{ticket.title}</td>
              <td className="em:hidden py-2">{ticket.address}</td>
              <td className="py-2">{ticket.sla}</td>
              <td className="py-2">{ticket.assignto}</td>
              <td className="py-2">{ticket.status}</td>
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
