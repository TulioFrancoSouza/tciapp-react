import React from "react";
import { FcAbout } from "react-icons/fc";
import { Link } from "react-router-dom";
import { SearchContext } from "../../context/SearchContext";
import { TicketService } from "../../service/ticket/TicketService"
import { Oval } from 'react-loader-spinner';


interface SummaryComponentState {
  data: any;
  load: boolean;
}

class TicketTable extends React.Component<{}, SummaryComponentState> {
  static contextType = SearchContext;
  context!: React.ContextType<typeof SearchContext>;

  constructor(props) {
    super(props);

    this.state = {
      data: [],
      load: false
    }
  }
  

  delay(delay) {
    return new Promise(res => setTimeout(res, delay));
  }


  async componentDidMount() {

    let ticket: Array<{}> = [];
    let token = localStorage.getItem('token');
    this.setState({ load: true });
    ticket = await TicketService.ticket(token);
    const processTicket = ticket.filter((item: any) => item.id !== "0");
    this.setState({ data: processTicket });
    this.setState({ load: false }); 

    const interval = setInterval(async () => {
      const newTicket: any = []
      for (var tk of await this.state.data) {
        const id = tk.id;
        if (tk.status === "Pending" || tk.status === "Accepted") {
          const ticket = await TicketService.ticket(token, id);
          tk = ticket[0];
          console.log(ticket[0]);
          await this.delay(10000);
        }
        newTicket.push(tk);
      }
      if (newTicket.length > 0) {
        this.setState({ data: newTicket });
      }
    }, 30000);
    return () => clearInterval(interval);

  }

  render() {
    return (
      <div className="flex justify-center items-center text-sm w-full h-full">
        <table className="em:ml-8 em:mr-8 em:text-xs table-auto w-full mr-14 ml-14">
          <thead>
            <tr className="border-t-2 border-b border-gray-300 text-center">
              <th className="py-2">Ticket</th>
              <th>Client</th>
              <th>Title</th>
              <th className="em:hidden">Address</th>
              <th>Assign to</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>{this.state.load &&
              <Oval height="20" width="20" color='black'
                ariaLabel='oval-loading' strokeWidth={2}
                strokeWidthSecondary={2} />}</td></tr>
            {!this.state.load && this.state.data.filter(
              (item) =>
                item.id.includes(this.context.query) ||
                String(item.client).toLowerCase().includes(String(this.context.query).toLowerCase()) ||
                String(item.title).toLowerCase().includes(String(this.context.query).toLowerCase()) ||
                String(item.address).toLowerCase().includes(String(this.context.query).toLowerCase()) ||
                String(item.assignto).toLowerCase().includes(String(this.context.query).toLowerCase()) ||
                String(item.status).toLowerCase().includes(String(this.context.query).toLowerCase())
            ).map((ticket: any, index) => (
              <tr key={ticket.id} className="border-t-2 border-b-2 border-gray-300 text-left" hidden={ticket.id === 0 ? true : false} >
                <td className="py-2">{ticket.id}</td>
                <td className="py-2">{ticket.client}</td>
                <td className="py-2">{ticket.title}</td>
                <td className="em:hidden py-2">{ticket.address}</td>
                <td className="py-2">{ticket.assignto}</td>
                <td className="py-2">{ticket.status}</td>
                <td className="py-2">
                  <Link to={`/ticketinfo/${ticket.id}`} >
                    <FcAbout />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
};

export default TicketTable;


