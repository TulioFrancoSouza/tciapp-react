import React, { useState } from "react";
import Header from "../components/Header";
import { Link } from "react-router-dom";
import ReportSection from "../components/ticket/ReportSection";
import TicketRejectSection from "../components/ticket/TicketRejectSection";
import Modal from "../components/modal/Modal";

const TickeInfo = () => {
  const [showRejectSection, setshowRejectSection] = useState(false);
  const [showReportSection, setshowReportSection] = useState(false);
  const [showModal, setshowModal] = useState(false);

  const hidenModal = () => setshowModal(false);
  const showReportSectionTrue = () => setshowReportSection(true);
  const showRejectSectionTrue = () => setshowRejectSection(true);
  function hidenRejectSection() {
    setshowRejectSection(false);
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
              14898
            </div>
          </div>
          <div className="mr-4">
            <h2 className="font-bold">Client:</h2>
            <div className="mb-2 bg-gray-200 border p-2 rounded-lg border-zinc-700">
              1477 - Cineplex Dorval
            </div>
          </div>
          <div className="mr-4">
            <h2 className="font-bold">Title:</h2>
            <div className="mb-2 bg-gray-200 border p-2 rounded-lg border-zinc-700">
              PC not working
            </div>
          </div>
          <div className="mr-4">
            <h2 className="font-bold">Contact:</h2>
            <div className="mb-2 bg-gray-200 border p-2 rounded-lg border-zinc-700">
              John Smith
            </div>
          </div>
          <div className="mr-4">
            <h2 className="font-bold">Phone:</h2>
            <div className="mb-2 bg-gray-200 border p-2 rounded-lg border-zinc-700">
              514-355-9288
            </div>
          </div>
          <div className="mr-4">
            <h2 className="font-bold">Address:</h2>
            <div className="mb-2 bg-gray-200 border p-2 rounded-lg border-zinc-700">
              1455 Saint Catherine Street, Montreal, H3R.
            </div>
          </div>
        </div>

        <div className="em:ml-5 em:mr-5 flex justify-start flex-wrap text-left ml-14 mr-14 my-2 py-4">
          <div className="mr-4">
            <h2 className="font-bold">Created at:</h2>
            <div className="mb-2 bg-gray-200 border p-2 rounded-lg border-zinc-700">
              08:00 a.m 03-14-2023
            </div>
          </div>
          <div className="mr-4">
            <h2 className="font-bold">Type:</h2>
            <div className="mb-2 bg-gray-200 border p-2 rounded-lg border-zinc-700">
              Normal
            </div>
          </div>
          <div className="mr-4">
            <h2 className="font-bold">SLA:</h2>
            <div className="mb-2 bg-gray-200 border p-2 rounded-lg border-zinc-700">
              12 hours
            </div>
          </div>
        </div>

        <div className="em:ml-5 em:mr-5 w-[1200] ml-14 mr-14 ">
          <h2 className="font-bold">Description:</h2>
          <div className="mb-2 bg-gray-200 border p-2 rounded-lg border-zinc-700">
            The kiosk pc is not working since a tech came last week.
          </div>
        </div>

        <div className="em:ml-5 em:mr-5 flex justify-between flex-end items-center flex-wrap text-left ml-14 mr-14 my-2 py-4">
          <div className="flex justify-center items-center">
            <input className="mr-3" type="checkbox" />
            <span className="mr-2">I agree with the terms and conditions.</span>
            <Link to="/terms">
              <p className="underline">Read the agreement</p>
            </Link>
          </div>

          <div className="em:mt-5">
            <h3 className="font-bold">Responsible:</h3>
            <input className="mb-2 border p-2 rounded-lg border-zinc-700" />
          </div>
          <div>
            <h3 className="font-bold">Schedule:</h3>
            <input
              className="mb-2 border p-2 rounded-lg border-zinc-700"
              type="datetime-local"
            />
          </div>

          <div className="em:mt-5 em:mb-3 em:w-full em:justify-center flex justify-between items-center">
            <button
              onClick={() => {
                setshowModal(true);
              }}
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
          </div>
        </div>
      </div>
      {showRejectSection ? (
        <TicketRejectSection event={hidenRejectSection} />
      ) : null}
      {showReportSection ? <ReportSection /> : null}
      {showModal && <Modal showReport={showReportSectionTrue} hideModal={hidenModal}/>}
    </div>
  );
};

export default TickeInfo;
