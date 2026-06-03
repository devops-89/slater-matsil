"use client";
import React from "react";
import ContactHerosection from "./Hero-Section";
import ContactForm from "./Contact-Form";
import FindUsHere from "./Find-Us-Here";
import Followus from "./Follow-us";
import Map from "./Map";

const ContactLayout = ({ onImageLoad }: { onImageLoad?: () => void }) => {
  return (
    <div>
      <ContactHerosection onImageLoad={onImageLoad} />
      <ContactForm />
      <FindUsHere />
      <Followus />
      <Map />
    </div>
  );
};

export default ContactLayout;
