"use client";
import React from "react";
import HeroSection from "./Hero-Section";
import ContactForm from "./Contact-Form";
import FindUsHere from "./Find-Us-Here";
import Followus from "./Follow-us";

const ContactLayout = () => {
  return (
    <div>
      <HeroSection />
      <ContactForm />
      <FindUsHere />
      <Followus />
    </div>
  );
};

export default ContactLayout;
