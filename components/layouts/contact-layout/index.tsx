import React from "react";
import ContactHerosection from "./Hero-Section";
import dynamic from "next/dynamic";

const ContactForm = dynamic(() => import("./Contact-Form"));
const FindUsHere = dynamic(() => import("./Find-Us-Here"));
const Followus = dynamic(() => import("./Follow-us"));
const Map = dynamic(() => import("./Map"));

const ContactLayout = ({ apiData }: { apiData?: any }) => {
  return (
    <div>
      <ContactHerosection apiData={apiData} />
      <ContactForm />
      <FindUsHere />
      <Followus />
      <Map />
    </div>
  );
};

export default ContactLayout;
