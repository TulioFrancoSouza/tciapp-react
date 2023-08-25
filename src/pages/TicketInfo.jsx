import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

import Header from "../components/Header";
import ReportSection from "../components/ticket/ReportSection";
import TicketRejectSection from "../components/ticket/TicketRejectSection";

import Modal from "../components/modal/Modal";
import ModalAgreement from "../components/modal/ModalAgreement";
import ModalTicketRespSchedule from "../components/modal/ModalTicketRespSchedule";

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
  const [ticketTime, setTicketTime] = useState("");
  const [showModalTicketRespSchedule, setShowModalTicketRespSchedule] =
    useState(false);
  const [load, setLoad] = useState("");

  const [ticketValue, setTicketValue] = useState("");
  const [enableInput, setEnableInput] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const token = localStorage.getItem("token");
      const ticket = await TicketService.ticket(token);

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
          continue;
        }
      }
    }
    fetchData();
  }, [ticketData, tId]);

  function save() {
    const data = {
      technician: ticketValue.technician,
      schedule: ticketSchedule,
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
      schedule: ticketSchedule,
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
          <button className="em:ml-8 em:mr-8 ml-14 max-w-[100px] border border-blue-400 rounded-lg bg-blue-400 hover:bg-blue-700 w-full p-0 text-white">
            Back
          </button>
        </Link>
      </div>
      <div className="mt-5 text-sm">
        <h2 className="em:ml-8 mr-14 ml-14 font-bold text-xl text-blue-600">
          Ticket Information
        </h2>
        <div className="em:ml-8 em:mr-8 block em:justify-start justify-between flex-wrap text-left ml-14 mr-14 py-2">
          <div className="flex justify-between">
            <div className="mr-4">
              <h2 className="font-bold">Ticket:</h2>
              <div className="mb-2 bg-gray-100 border min-w-[75px] px-2 py-1 rounded-lg border-zinc-700">
                {ticketValue.id}
              </div>
            </div>
            <div className="mr-4">
              <h2 className="font-bold">Client:</h2>
              <div className="mb-2 bg-gray-100 border min-w-[200px] px-2 py-1 rounded-lg border-zinc-700">
                {ticketValue.client}
              </div>
            </div>
            <div className="mr-4">
              <h2 className="font-bold">Address:</h2>
              <div className="mb-2 bg-gray-100 border min-w-[500px] px-2 py-1 rounded-lg border-zinc-700">
                {ticketValue.address}
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

          <div className="flex justify-between">
            <div className="mr-1">
              <h2 className="font-bold">Title:</h2>
              <div className="mb-2 bg-gray-100 border min-w-[1000px] px-2 py-1 rounded-lg border-zinc-700">
                {ticketValue.title}
              </div>
            </div>
            <div className="mr-4">
              <h2 className="font-bold">Created at:</h2>
              <div className="mb-2 bg-gray-100 border px-2 py-1 rounded-lg border-zinc-700">
                {ticketValue.createdAt}
              </div>
            </div>

            <div className="mr-1">
              <h2 className="font-bold">Type:</h2>
              <div className="mb-2 bg-gray-100 border px-2 py-1 rounded-lg border-zinc-700">
                {ticketValue.type}
              </div>
            </div>
          </div>
        </div>

        <div className="em:ml-8 em:mr-8 w-[1200] ml-14 mr-14 ">
          <h2 className="font-bold">Description:</h2>
          <div className="mb-2 bg-gray-100 border px-2 py-1 rounded-lg border-zinc-700">
            {ticketValue.description}
          </div>
        </div>

        <div className="em:ml-8 em:mr-8 flex justify-between flex-end items-center flex-wrap text-left ml-14 mr-14 py-2">
          <div className="em:block flex justify-start">
            <div className="em:mt-0 mr-5">
              <h3 className="font-bold">Technician:</h3>
              <input
                onChange={(event) => setTicketResponsible(event.target.value)}
                className="mb-2 border px-2 py-1 rounded-lg border-zinc-700"
                defaultValue={ticketResponsible}
                disabled={enableInput}
              />
            </div>
            <div>
              <h3 className="font-bold">Date:</h3>
              <input
                onChange={(event) => setTicketSchedule(event.target.value)}
                className="mb-2 border px-2 py-1 rounded-lg border-zinc-700"
                type="date"
                defaultValue={dateFormat(
                  ticketValue.schedule,
                  "yyyy-mm-dd HH:MM:ss"
                )}
                disabled={enableInput}
              />
            </div>
            <div className="ml-4">
              <h3 className="font-bold">Time(optional):</h3>
              <input
                onChange={(event) => setTicketTime(event.target.value)}
                className="mb-2 border px-2 py-1 rounded-lg border-zinc-700"
                type="time"
                defaultValue={dateFormat(
                  ticketValue.schedule,
                  "yyyy-mm-dd HH:MM:ss"
                )}
                disabled={enableInput}
              />
            </div>
          </div>

          <div className="em:mt-3 flex justify-center items-c enter">
            <input
              onClick={handlesetCheckAgreement}
              className="mr-3"
              type="checkbox"
              value="agreed"
              disabled={showReportSection === true ? true : false}
              defaultChecked={checkAgreement}
            />
            <span className="mr-2">I agree with the terms and conditions.</span>
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
                  className="min-w-[100px] drop-shadow-lg border-red-600 rounded-lg bg-red-600 hover:bg-red-900 p-1 text-white"
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
              <button
                className="min-w-[100px] drop-shadow-lg border-blue-600 rounded-lg bg-blue-600 hover:bg-blue-900 p-1 text-white"
                onClick={update}
              >
                Update
              </button>
            ) : null}
          </div>
        </div>
        <div>
          <hr className="em:ml-5 em:mr-5 my-6 h-0.5 ml-14 mr-14 border-t-0 bg-gray-300 opacity-100 dark:opacity-50" />
        </div>
      </div>

      <div className="em:flex-wrap mr-14 ml-14 block">
        <div className="em:ml-1 mr-1 ml-1  py-3 border-2 mt-2 rounded-lg">
          <h2 className="font-bold text-blue-600 mb-5 ml-2">Notes:</h2>
          <div className="block min-w-full">
            <div className="min-w-full em:flex-wrap flex justify-between">
              <input
                //onChange={(event) => setStatusReport(event.target.value)}
                className="em:max-w-[10px] mx-2 border rounded-lg border-zinc-700"
                name="report"
                size="158"
                rows="12"
                // defaultValue={statusReport}
                disabled={enableInput}
              />

              <button
                onClick={save}
                className="min-w-[100px] mr-4 drop-shadow-lg border-lime-600 rounded-lg bg-lime-600 hover:bg-lime-900 p-1 text-white"
              >
                Send
              </button>
            </div>

            <div className="mt-3 em:flex-wrap block">
              <textarea
                //onChange={statusReport}
                className="em:max-w-[10px] mb-1 mx-2 border rounded-lg border-zinc-700"
                name="report"
                cols="172"
                rows="12"
                disabled={enableInput}
              />
            </div>
          </div>
        </div>
      </div>

      {showRejectSection ? (
        <TicketRejectSection event={hidenRejectSection} />
      ) : null}
      {showReportSection ? (
        <ReportSection
          tecnitian={ticketResponsible}
          ticketId={ticketValue.id}
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
    </div>
  );
};

export default TickeInfo;
