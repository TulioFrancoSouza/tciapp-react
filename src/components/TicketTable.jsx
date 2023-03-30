import React from "react";
import { FcAbout } from "react-icons/fc";
import { Link } from "react-router-dom";

const TicketTable = () => {
  return (
    <div className="flex justify-center w-full h-full p-3">
      <table className="table-auto w-full mr-4 ml-4">
        <thead>
          <tr className="border-t-2 border-b border-gray-300 text-center">
            <th className="py-2">Ticket</th>
            <th>Client</th>
            <th>Title</th>
            <th>Address</th>
            <th>SLA</th>
            <th>Assign to</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-t-2 border-b-2 border-gray-300 text-center">
            <td className="py-2">17458</td>
            <td className="py-2">1488 - Cineplex St. Catherine</td>
            <td className="py-2">PC is not working</td>
            <td className="py-2">1458 Saint Catherine Street, Montreal.</td>
            <td className="py-2">12 hours</td>
            <td className="py-2">-</td>
            <td className="py-2">Pending</td>
            <td className="py-2">
              <Link to="/ticketinfo">
                <FcAbout />
              </Link>
            </td>
          </tr>
          <tr className="border-t-2 border-b-2 border-gray-300 text-center">
            <td className="py-2">14899</td>
            <td className="py-2">1722 - Cineplex Ottawa</td>
            <td className="py-2">Server is down</td>
            <td className="py-2">1458 Saint Catherine Street, Montreal.</td>
            <td className="py-2">12 hours</td>
            <td className="py-2">-</td>
            <td className="py-2">Pending</td>
            <td className="py-2">
              <FcAbout />
            </td>
          </tr>
          <tr className="border-t-2 border-b-2 border-gray-300 text-center">
            <td className="py-2">14955</td>
            <td className="py-2">1856 - Cineplex Downtown</td>
            <td className="py-2">Printer broken</td>
            <td className="py-2">1458 Saint Catherine Street, Montreal.</td>
            <td className="py-2">12 hours</td>
            <td className="py-2">-</td>
            <td className="py-2">Pending</td>
            <td className="py-2">
              <FcAbout />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default TicketTable;
