import React from "react";
import Header from "../components/Header";
import { Link } from "react-router-dom";

const Agreement = () => {
  return (
    <div>
      <Header />
      <div>
        <Link to="/ticketinfo">
          <button className="ml-14 mt-8 max-w-[100px] border border-blue-400 rounded-lg bg-blue-400 hover:bg-blue-700 w-full p-1 text-white">
            Back
          </button>
        </Link>
      </div>

      <div className="ml-14 mr-14 mt-4">
        <h1 className="text-3xl text-center font-bold">Terms and Conditions</h1>
        <h2 className="mt-8 text-2xl">Techini-Connection</h2>
        <p className="bg-white p-4 text-justify">
          These Terms of Service along with any other terms and policies
          referenced herein, and are incorporated herein by reference and form
          an integral part hereof, as amended from time to time (these “Terms”)
          constitute a legally binding agreement as of the Effective Date (as
          defined below), governing your access to, and the use of
          www.monday.com and any related website owned or operated by monday.com
          (the “Sites”), and the use of, and registration with, monday.com
          Service (defined below) through the Sites, a mobile application or
          through any other means. These Terms are between monday.com Ltd. (6
          Yitzhak Sadeh St., Tel-Aviv 6777506, Israel) (“monday.com”, “us”, “we”
          or “our”) and you, either individually, or on behalf of your employer
          or any other entity which you represent (“you” or “your”). monday.com
          may use its affiliates, including monday.com Inc. (246 5th Avenue,
          Suite 305 New York, NY 10001, USA) and third party service providers
          to process and/or collect payment from you.In case you represent your
          employer or another entity, you hereby represent that (i) you have
          full legal authority to bind your employer or such entity (as
          applicable) to these Terms; and (ii) after reading and understanding
          these Terms, you agree to these Terms on behalf of your employer or
          the respective entity (as applicable), and these Terms shall bind your
          employer or such entity (as the case may be). PLEASE NOTE THAT YOU ARE
          DEEMED AS AN AUTHORIZED REPRESENTATIVE OF YOUR EMPLOYER OR AN ENTITY
          (AS APPLICABLE): (I) IF YOU ARE USING YOUR EMPLOYER OR AN ENTITY’S
          EMAIL ADDRESS IN REGISTERING INTO THE SERVICE; AND (II) IF YOU ARE AN
          ADMIN (AS DEFINED BELOW). AS ELABORATED IN SECTION 2 BELOW, THERE ARE
          VARIOUS TYPES OF USERS FOR THE SERVICE, THUS, EXCEPT WHERE INDICATED
          OTHERWISE “YOU” SHALL REFER TO CUSTOMER AND ALL TYPES OF USERS. YOU
          ACKNOWLEDGE THAT THESE TERMS ARE BINDING, AND YOU AFFIRM AND SIGNIFY
          YOUR CONSENT TO THESE TERMS, BY EITHER: (I) CLICKING ON A BUTTON OR
          CHECKING A CHECKBOX FOR THE ACCEPTANCE OF THESE TERMS; OR (II)
          REGISTERING TO, USING OR ACCESSING THE SERVICE, SITES OR monday.com
          MOBILE APPLICATION, WHICHEVER IS EARLIER (THE “EFFECTIVE DATE”). IF
          YOU DO NOT AGREE TO COMPLY WITH, AND BE BOUND BY, THESE TERMS OR DO
          NOT HAVE AUTHORITY TO BIND YOUR EMPLOYER OR ANY OTHER ENTITY (AS
          APPLICABLE), PLEASE DO NOT ACCEPT THESE TERMS OR ACCESS OR USE THE
          SERVICE OR THE SITES OR monday.com MOBILE APPLICATION.
        </p>

        <h2 className="mt-8 text-2xl">1. Our service</h2>
        <p className="bg-white p-4 text-justify">
          The monday.com platform is a cloud-based visual work management tool
          that transforms the way teams work together, with the aim to build a
          culture of transparency, ownership and accountability, inclusive of
          any and all functionalities, application programming interface and
          tools offered as part of monday.com platform, offered online and via a
          mobile application (the “Service”). Specific Terms may apply to You or
          to some of the Service, such specific terms are incorporated herein by
          reference and form an integral part hereof.
        </p>

        <h2 className="mt-8 text-2xl">
          2. Modification or Discontinuation of the Service.
        </h2>
        <p className="bg-white p-4 text-justify">
          We may add, modify or discontinue any feature, functionality or any
          other tool, within the Service and/or Sites, at our own discretion and
          without further notice, however, if we make any material adverse
          change in the core functionality of the Service, then we will notify
          you by posting an announcement on the Sites and/or via the Service or
          by sending you an email.
        </p>
      </div>
    </div>
  );
};

export default Agreement;
