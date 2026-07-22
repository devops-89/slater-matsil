"use client";
import React from "react";
import ContactHerosection from "./Hero-Section";
import dynamic from "next/dynamic";

const ContactForm = dynamic(() => import("./Contact-Form"), { ssr: true });
const FindUsHere = dynamic(() => import("./Find-Us-Here"), { ssr: true });
const Followus = dynamic(() => import("./Follow-us"), { ssr: true });
const Map = dynamic(() => import("./Map"), { ssr: false }); // Map doesn't need SSR

const ContactLayout = () => {
  return (
    <div>
      <ContactHerosection />
      <ContactForm />
      <FindUsHere />
      <Followus />
      <Map />
    </div>
  );
};

export default ContactLayout;
