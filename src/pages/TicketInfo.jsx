import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

import Header from "../components/Header";
import ReportSection from "../components/ticket/ReportSection";
import TicketRejectSection from "../components/ticket/TicketRejectSection";

import Modal from "../components/modal/Modal";
import ModalAgreement from "../components/modal/ModalAgreement";
import ModalTicketRespSchedule from "../components/modal/ModalTicketRespSchedule";

import { Tickets } from "../tickets";

const TickeInfo = () => {
  const ticketData = Tickets;
  const { tId } = useParams();

  const [ticketValue, setTicketValue] = useState("");

  useEffect(() => {
    for (let i = 0; i < ticketData.length; i++) {
      if (ticketData[i].id === tId) {
        setTicketValue(ticketData[i]);
        continue;
      }
    }
  }, [ticketData, tId]);

  const [showRejectSection, setshowRejectSection] = useState(false);
  const [showReportSection, setshowReportSection] = useState(false);
  const [showModal, setshowModal] = useState(false);
  const [showModalAgreement, setshowModalAgreement] = useState(false);
  const [checkAgreement, setCheckAgreement] = useState(false);
  const [ticketResponsible, setTicketResponsible] = useState("");
  const [ticketSchedule, setTicketSchedule] = useState("");
  const [showModalTicketRespSchedule, setShowModalTicketRespSchedule] =
    useState(false);

  console.log(ticketResponsible);
  console.log(ticketSchedule);

  const handleSetShowModalAgreement = () => setshowModalAgreement(true);
  const handleSetHideModalAgreement = () => setshowModalAgreement(false);

  const handleSetHideModalTicketRespSchedule = () =>
    setShowModalTicketRespSchedule(false);

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
        <div className="em:ml-8 em:mr-8 flex em:justify-start justify-between flex-wrap text-left ml-14 mr-14 py-2">
          <div className="mr-4">
            <h2 className="font-bold">Ticket:</h2>
            <div className="mb-2 bg-gray-100 border px-2 py-1 rounded-lg border-zinc-700">
              {ticketValue.id}
            </div>
          </div>
          <div className="mr-4">
            <h2 className="font-bold">Client:</h2>
            <div className="mb-2 bg-gray-100 border px-2 py-1 rounded-lg border-zinc-700">
              {ticketValue.client}
            </div>
          </div>
          <div className="mr-4">
            <h2 className="font-bold">Title:</h2>
            <div className="mb-2 bg-gray-100 border px-2 py-1 rounded-lg border-zinc-700">
              {ticketValue.title}
            </div>
          </div>
          <div className="mr-4">
            <h2 className="font-bold">Contact:</h2>
            <div className="mb-2 bg-gray-100 border px-2 py-1 rounded-lg border-zinc-700">
              {ticketValue.contact}
            </div>
          </div>
          <div className="mr-4">
            <h2 className="font-bold">Phone:</h2>
            <div className="mb-2 bg-gray-100 border px-2 py-1 rounded-lg border-zinc-700">
              {ticketValue.phone}
            </div>
          </div>
          <div className="mr-4">
            <h2 className="font-bold">Address:</h2>
            <div className="mb-2 bg-gray-100 border px-2 py-1 rounded-lg border-zinc-700">
              {ticketValue.address}
            </div>
          </div>

          <div className="mr-4">
            <h2 className="font-bold">Created at:</h2>
            <div className="mb-2 bg-gray-100 border px-2 py-1 rounded-lg border-zinc-700">
              {ticketValue.createdAt}
            </div>
          </div>

          <div className="mr-4">
            <h2 className="font-bold">Type:</h2>
            <div className="mb-2 bg-gray-100 border px-2 py-1 rounded-lg border-zinc-700">
              {ticketValue.type}
            </div>
          </div>
          <div className="mr-4">
            <h2 className="font-bold">SLA:</h2>
            <div className="mb-2 bg-gray-100 border px-2 py-1 rounded-lg border-zinc-700">
              {ticketValue.sla}
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
              />
            </div>
            <div>
              <h3 className="font-bold">Schedule:</h3>
              <input
                onChange={(event) => setTicketSchedule(event.target.value)}
                className="mb-2 border px-2 py-1 rounded-lg border-zinc-700"
                type="datetime-local"
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

            {showReportSection === true ? (
              <button className="min-w-[100px] drop-shadow-lg border-blue-600 rounded-lg bg-blue-600 hover:bg-blue-900 p-1 text-white">
                Update
              </button>
            ) : null}
          </div>
        </div>
        <div>
          <hr class="em:ml-5 em:mr-5 my-6 h-0.5 ml-14 mr-14 border-t-0 bg-gray-300 opacity-100 dark:opacity-50" />
        </div>
      </div>
      {showRejectSection ? (
        <TicketRejectSection event={hidenRejectSection} />
      ) : null}
      {showReportSection ? <ReportSection /> : null}
      {showModal && (
        <Modal showReport={showReportSectionTrue} hideModal={handleHideModal} />
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
