import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

import Header from "../components/Header";
import ReportSection from "../components/ticket/ReportSection";
import TicketRejectSection from "../components/ticket/TicketRejectSection";
import UpdateSection from "../components/ticket/UpdateSection";

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

  const [showUpdateSection, setShowUpdateSection] = useState(false);

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
          <button className="em:ml-5 em:mr-5 ml-14 max-w-[100px] border border-blue-400 rounded-lg bg-blue-400 hover:bg-blue-700 w-full p-1 text-white">
            Back
          </button>
        </Link>
      </div>
      <div>
        <div className="em:ml-5 em:mr-5 flex justify-start flex-wrap text-left ml-14 mr-14 my-2 py-4">
          <div className="mr-4">
            <h2 className="font-bold">Ticket:</h2>
            <div className="mb-2 bg-gray-200 border p-2 rounded-lg border-zinc-700">
              {ticketValue.id}
            </div>
          </div>
          <div className="mr-4">
            <h2 className="font-bold">Client:</h2>
            <div className="mb-2 bg-gray-200 border p-2 rounded-lg border-zinc-700">
              {ticketValue.client}
            </div>
          </div>
          <div className="mr-4">
            <h2 className="font-bold">Title:</h2>
            <div className="mb-2 bg-gray-200 border p-2 rounded-lg border-zinc-700">
              {ticketValue.title}
            </div>
          </div>
          <div className="mr-4">
            <h2 className="font-bold">Contact:</h2>
            <div className="mb-2 bg-gray-200 border p-2 rounded-lg border-zinc-700">
              {ticketValue.contact}
            </div>
          </div>
          <div className="mr-4">
            <h2 className="font-bold">Phone:</h2>
            <div className="mb-2 bg-gray-200 border p-2 rounded-lg border-zinc-700">
              {ticketValue.phone}
            </div>
          </div>
          <div className="mr-4">
            <h2 className="font-bold">Address:</h2>
            <div className="mb-2 bg-gray-200 border p-2 rounded-lg border-zinc-700">
              {ticketValue.address}
            </div>
          </div>
        </div>

        <div className="em:ml-5 em:mr-5 flex justify-start flex-wrap text-left ml-14 mr-14 my-2 py-4">
          <div className="mr-4">
            <h2 className="font-bold">Created at:</h2>
            <div className="mb-2 bg-gray-200 border p-2 rounded-lg border-zinc-700">
              {ticketValue.createdAt}
            </div>
          </div>
          <div className="mr-4">
            <h2 className="font-bold">Type:</h2>
            <div className="mb-2 bg-gray-200 border p-2 rounded-lg border-zinc-700">
              {ticketValue.type}
            </div>
          </div>
          <div className="mr-4">
            <h2 className="font-bold">SLA:</h2>
            <div className="mb-2 bg-gray-200 border p-2 rounded-lg border-zinc-700">
              {ticketValue.sla}
            </div>
          </div>
        </div>

        <div className="em:ml-5 em:mr-5 w-[1200] ml-14 mr-14 ">
          <h2 className="font-bold">Description:</h2>
          <div className="mb-2 bg-gray-200 border p-2 rounded-lg border-zinc-700">
            {ticketValue.description}
          </div>
        </div>

        <div className="em:ml-5 em:mr-5 flex justify-between flex-end items-center flex-wrap text-left ml-14 mr-14 my-2 py-4">
          <div className="flex justify-center items-c enter">
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
          <div className="em:mt-5">
            <h3 className="font-bold">Responsible:</h3>
            <input
              onChange={(event) => setTicketResponsible(event.target.value)}
              className="mb-2 border p-2 rounded-lg border-zinc-700"
            />
          </div>
          <div>
            <h3 className="font-bold">Schedule:</h3>
            <input
              onChange={(event) => setTicketSchedule(event.target.value)}
              className="mb-2 border p-2 rounded-lg border-zinc-700"
              type="datetime-local"
            />
          </div>

          <div className="em:mt-5 em:mb-3 em:w-full em:justify-center flex justify-between items-center">
            {showReportSection === false ? (
              <>
                <button
                  onClick={handleAcceptTicket}
                  className="min-w-[100px] mr-4 drop-shadow-lg border-lime-600 rounded-lg bg-lime-600 hover:bg-lime-900 p-2 text-white"
                >
                  Accept
                </button>
                <button
                  onClick={showRejectSectionTrue}
                  className="min-w-[100px] drop-shadow-lg border-red-600 rounded-lg bg-red-600 hover:bg-red-900 p-2 text-white"
                >
                  Reject
                </button>
              </>
            ) : null}

            {showReportSection === true ? (
              <button
                onClick={() => setShowUpdateSection(true)}
                className="min-w-[100px] drop-shadow-lg border-blue-600 rounded-lg bg-blue-600 hover:bg-blue-900 p-2 text-white"
              >
                Update
              </button>
            ) : null}
          </div>
        </div>
        {showUpdateSection ? (
          <UpdateSection
            handleHideUpdateSection={handleSetHideModalTicketRespSchedule}
            handleTicketResp={setTicketResponsible}
            handleTcketSched={setTicketSchedule}
          />
        ) : null}
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
          hideModalTicketRespSchedule={handleSetHideModalTicketRespSchedule}
        />
      ) : null}
    </div>
  );
};

export default TickeInfo;
