"use client";
import React from "react";
import HeroSection from "./Hero-Section";
import ContactForm from "./Contact-Form";
import FindUsHere from "./Find-Us-Here";

const ContactLayout = () => {
  return (
    <div>
      <HeroSection />
      <ContactForm />
      <FindUsHere />
    </div>
  );
};

export default ContactLayout;
