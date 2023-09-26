import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

import Header from "../components/Header";
import ReportSection from "../components/ticket/ReportSection";
import TicketRejectSection from "../components/ticket/TicketRejectSection";

import Modal from "../components/modal/Modal";
import ModalAgreement from "../components/modal/ModalAgreement";
import ModalTicketRespSchedule from "../components/modal/ModalTicketRespSchedule";
import ModalConversation from "../components/modal/ModalConversation";

import { Tickets } from "../tickets";
import { TicketService } from "../service/ticket/TicketService";
import dateFormat from "dateformat";
import { Oval } from "react-loader-spinner";

const TickeInfo = (props) => {
  const navigate = useNavigate();
  const ticketData = Tickets;
  const { tId } = useParams();

  const [showRejectSection, setshowRejectSection] = useState(false);
  const [showReportSection, setshowReportSection] = useState(false);
  const [showModal, setshowModal] = useState(false);
  const [showModalAgreement, setshowModalAgreement] = useState(false);
  const [checkAgreement, setCheckAgreement] = useState(false);
  const [ticketResponsible, setTicketResponsible] = useState("");
  const [ticketSchedule, setTicketSchedule] = useState("");
  const [ticketDate, setTicketDate] = useState("");
  const [ticketTime, setTicketTime] = useState("");
  const [showModalTicketRespSchedule, setShowModalTicketRespSchedule] =
    useState(false);
  const [showModalConversation, setShowModalConversation] = useState(false);
  const [load, setLoad] = useState("");

  const [ticketValue, setTicketValue] = useState("");
  const [ticket, setTicket] = useState("");
  const [enableInput, setEnableInput] = useState(false);
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const token = localStorage.getItem("token");
      const ticket = await TicketService.ticket(token, tId);
      setTicket(ticket);
      for (let i = 0; i < ticket.length; i++) {
        if (ticket[i].id === tId) {
          setTicketValue(ticket[i]);
          setTicketResponsible(ticket[i].technician);
          setTicketSchedule(ticket[i].schedule);
          if (
            ticket[i].status === "Review" ||
            ticket[i].status === "Accepted" ||
            ticket[i].status === "Closed"
          ) {
            setCheckAgreement(true);
            setEnableInput(true);
            showReportSectionTrue(true);
          } else if (
            ticket[i].status === "Review" &&
            i === ticket.length &&
            ticket[i].admin
          ) {
            showReportSectionTrue(true);
            setEnableInput(false);
            setCheckAgreement(true);
          } else {
            setCheckAgreement(false);
            setEnableInput(false);
          }

          let notesInline = "";
          ticket[i].note.map((row) => {
            return (notesInline = notesInline + row.note + "<br>");
          });

          setNotes(notesInline);
          continue;
        }
      }
    }
    fetchData();
  }, [ticketData, tId]);

  function save() {
    let dateSchedule;
    if (ticketDate !== "") {
      dateSchedule = ticketDate;
    } else {
      dateSchedule = ticketSchedule;
    }

    const data = {
      send: true,
      technician: ticketResponsible,
      schedule: dateSchedule,
      status: "Accepted",
    };

    const ticket = TicketService.ticketPatch(
      localStorage.getItem("token"),
      ticketValue.id,
      data
    );
    return ticket;
  }

  function update() {
    setLoad(true);
    const data = {
      technician: ticketResponsible,
      schedule: dateFormat(ticketDate, "yyyy-mm-dd HH:MM:ss"),
      status: ticketValue.status,
    };

    const ticket = TicketService.ticketPatch(
      localStorage.getItem("token"),
      ticketValue.id,
      data
    );
    ticket.then((response) => {
      if (response != null) {
        window.location.reload(true);
      }
    });
  }

  const handleSetShowModalAgreement = () => setshowModalAgreement(true);
  const handleSetHideModalAgreement = () => setshowModalAgreement(false);

  const handleSetHideModalTicketRespSchedule = () => {
    setShowModalTicketRespSchedule(false);
  };

  const handlerTrue = () => {
    setShowModalTicketRespSchedule(false);
    save();
    navigate("/summary");
  };

  const handlerFalse = () => {
    setShowModalTicketRespSchedule(false);
  };

  const handlesetCheckAgreement = () => setCheckAgreement(true);

  const handleHideModal = () => setshowModal(false);
  const handleShowModal = () => setshowModal(true);

  const handleHideModalConversation = () => setShowModalConversation(false);
  const handleShowModalConversation = () => setShowModalConversation(true);

  const showReportSectionTrue = () => setshowReportSection(true);

  const showRejectSectionTrue = () => setshowRejectSection(true);

  function hidenRejectSection() {
    setshowRejectSection(false);
  }

  function handleAcceptTicket() {
    if (!checkAgreement) {
      handleSetShowModalAgreement();
    } else if (ticketResponsible === "" || ticketSchedule === "") {
      setShowModalTicketRespSchedule(true);
    } else {
      handleShowModal();
    }
  }

  return (
    <div>
      <Header />
      <div>
        <Link to="/summary">
          <button className="ml-5 md: h-8 mr-8 ml-0 max-w-[100px] border border-blue-400 rounded-lg bg-blue-400 hover:bg-blue-700 w-full p-0 text-white">
            Back
          </button>
        </Link>
      </div>
      <div className="px-5 md:px-5 mt-5 text-sm">
        <h2 className="ml-0 mr-0 md:font-bold text-xl text-blue-600">
          Ticket Information
        </h2>
        <div className="ml-0 mr-0 md:flex text-left py-2">
          <div className="md:flex flex-col w-full ">
            <div className="flex-col md: flex w-full justify-between">
              {" "}
              <div className="flex w-full">
                {" "}
                <div className="w-1/2">
                  <h2 className="font-bold">Ticket:</h2>
                  <div className="mb-2 bg-gray-100 border min-w-[75px] px-2 py-1 rounded-lg border-zinc-700">
                    {ticketValue.id}
                  </div>
                </div>
                <div className="w-1/2 ml-2">
                  <h2 className="font-bold">Client:</h2>
                  <div className="mb-2 bg-gray-100 border min-w-[200px] px-2 py-1 rounded-lg border-zinc-700">
                    {ticketValue.client}
                  </div>
                </div>
              </div>
              <div className="">
                <h2 className="font-bold">Title:</h2>
                <div className="md:  px-2 mb-2 bg-gray-100 border py-1 rounded-lg border-zinc-700">
                  {ticketValue.title}
                </div>
              </div>
              <div className="">
                <h2 className="font-bold">Created at:</h2>
                <div className="mb-2 bg-gray-100 border px-2 py-1 rounded-lg border-zinc-700">
                  {ticketValue.createdAt}
                </div>
              </div>
              <div>
                <h2 className="font-bold">Address:</h2>
                <div className="mb-2 bg-gray-100 border  px-2 py-1 rounded-lg border-zinc-700">
                  {ticketValue.address}
                </div>
              </div>
            </div>
            <div className="flex">
              <div className="mr-4">
                <h2 className="font-bold">Type:</h2>
                <div className="mb-2 bg-gray-100 border px-2 py-1 rounded-lg border-zinc-700">
                  {ticketValue.type}
                </div>
              </div>
              <div className="mr-4">
                <h2 className="font-bold">Contact:</h2>
                <div className="mb-2 bg-gray-100 border min-w-[100x] px-2 py-1 rounded-lg border-zinc-700">
                  {ticketValue.contact} John Smith
                </div>
              </div>
              <div className="mr-1">
                <h2 className="font-bold">Phone:</h2>
                <div className="mb-2 bg-gray-100 border px-2 py-1 rounded-lg border-zinc-700">
                  {ticketValue.phone}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="ml-0 mr-0 md:w-[1200]">
          <h2 className="font-bold">Description:</h2>
          <div className="h-20 mb-2 bg-gray-100 border px-2 py-1 rounded-lg border-zinc-700">
            {ticketValue.description}
          </div>
        </div>

        <div className="ml-0 mr-0 md:flex justify-between flex-end items-center flex-wrap text-left py-2">
          <div className="flex flex-col em:block flex-row justify-start w-full">
            <div className="em:mt-0 mr-5 w-full">
              <h3 className="font-bold">Technician:</h3>
              <input
                onChange={(event) => setTicketResponsible(event.target.value)}
                className="w-1/2 mb-2 border px-2 py-1 rounded-lg border-zinc-700"
                defaultValue={ticketResponsible}
                //disabled={enableInput}
              />
            </div>
            <div className="w-full">
              <h3 className="font-bold">Date:</h3>
              <input
                onChange={(event) => setTicketDate(event.target.value)}
                className="w-1/2 mb-2 border px-2 py-1 rounded-lg border-zinc-700"
                type="date"
                defaultValue={dateFormat(ticketValue.schedule, "yyyy-mm-dd")}
                //disabled={enableInput}
              />
            </div>
            <div className="w-full">
              <h3 className="font-bold">Time(optional):</h3>
              <input
                onChange={(event) => setTicketTime(event.target.value)}
                className="w-1/2 mb-2 border px-2 py-1 rounded-lg border-zinc-700"
                type="time"
                defaultValue={
                  ticketValue.schedule != null
                    ? dateFormat(ticketValue.schedule, "HH:MM:ss")
                    : "00:00:00"
                }
                //disabled={enableInput}
              />
            </div>
          </div>

          <div className="md:mt-3 flex justify-between items-center w-full">
            <div className="flex">
              <input
                onClick={handlesetCheckAgreement}
                className="mr-3"
                type="checkbox"
                value="agreed"
                disabled={showReportSection === true ? true : false}
                defaultChecked={checkAgreement}
              />
              <span className="mr-2">
                I agree with the terms and conditions.
              </span>
              <Link to="/terms">
                <p className="underline">Read the agreement</p>
              </Link>
            </div>
            <div className="em:mt-5 em:mb-3 em:w-full em:justify-center flex justify-between items-center">
              {showReportSection === false ? (
                <>
                  <button
                    onClick={handleAcceptTicket}
                    className="min-w-[100px] mr-4 drop-shadow-lg border-lime-600 rounded-lg bg-lime-600 hover:bg-lime-900 p-1 text-white"
                  >
                    Accept
                  </button>
                  <button
                    onClick={showRejectSectionTrue}
                    className="min-w-[100px] mr-4 drop-shadow-lg border-red-600 rounded-lg bg-red-600 hover:bg-red-900 p-1 text-white"
                  >
                    Reject
                  </button>
                </>
              ) : null}
              {load && (
                <Oval
                  height="20"
                  width="20"
                  radius="10"
                  color="black"
                  ariaLabel="oval-loading"
                  strokeWidth={2}
                  strokeWidthSecondary={2}
                />
              )}
              {showReportSection === true ? (
                <>
                  <button
                    className="mt-2 md:mt-0 min-w-[100px] h-8 drop-shadow-lg border-blue-600 rounded-lg bg-blue-600 hover:bg-blue-900 p-1 text-white"
                    onClick={update}
                  >
                    Update
                  </button>
                </>
              ) : null}
            </div>
          </div>
        </div>
        <div>
          <hr className="md:mt-3 mb-6 h-0.5 border-t-0 bg-gray-300 opacity-100 dark:opacity-50" />
        </div>
        <div className="ml-0 mr-0 md:h-full py-3 border-2 mt-2 rounded-lg">
          <div className="w-full flex justify-between mb-2">
            <h2 className="font-bold text-blue-600 mb-5 ml-2">Chat:</h2>
            <button
              onClick={handleShowModalConversation}
              className="min-w-[100px] h-8 p-1 drop-shadow-lg mr-3 border-blue-600 rounded-lg bg-blue-600 hover:bg-blue-900 text-white"
            >
              Open chat
            </button>
          </div>

          <div
            //onChange={setNotes}
            //value={notes}
            className="em:max-w-[100px] mb-1 mx-2 border rounded-lg border-zinc-700"
            style={{ width: "99%" }}
            name="report"
            // rows="12"
            // disabled="disabled"
            dangerouslySetInnerHTML={{ __html: notes }}
          ></div>
        </div>
      </div>

      {showRejectSection ? (
        <TicketRejectSection event={hidenRejectSection} />
      ) : null}
      {showReportSection ? (
        <ReportSection
          tecnitian={ticketResponsible}
          ticketId={ticketValue.id}
          ticket={ticket}
          schedule={ticketSchedule}
        />
      ) : null}
      {showModal && (
        <Modal
          handlerTrue={handlerTrue}
          handlerFalse={handlerFalse}
          showReport={showReportSectionTrue}
          hideModal={handleHideModal}
        />
      )}
      {showModalAgreement ? (
        <ModalAgreement hideModalAgreement={handleSetHideModalAgreement} />
      ) : null}
      {showModalTicketRespSchedule ? (
        <ModalTicketRespSchedule
          hideTicketRespSchedule={handleSetHideModalTicketRespSchedule}
        />
      ) : null}
      {showModalConversation ? (
        <ModalConversation
          notes={ticketValue}
          hideModalConversation={handleHideModalConversation}
        />
      ) : null}
    </div>
  );
};

export default TickeInfo;
