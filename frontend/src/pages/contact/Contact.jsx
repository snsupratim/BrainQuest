// import React from 'react'
import "./contact.css";
import Header from "../../components/Header";
import HeaderImage from "../../images/Technical-hard-skills-final-02.jpg";
import { MdEmail } from "react-icons/md";
import { BsMessenger } from "react-icons/bs";
import { IoLogoWhatsapp } from "react-icons/io";

const Contact = () => {
  return (
    <>
      <Header image={HeaderImage} title="Get In Touch">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sequi
        dignissimos esse tenetur libero exercitationem cumque ut sunt dolorum
        quibusdam!
      </Header>
      <section className="contact">
        <div className="container contact__container">
          <div className="contact__wrapper">
            <a
              href="mailto:snsupratim@gmail.com"
              target="_blank"
              rel="noreferrer noopener"
            >
              <MdEmail />
            </a>

            <a
              href="mailto:snsupratim@gmail.com"
              target="_blank"
              rel="noreferrer noopener"
            >
              <BsMessenger />
            </a>

            <a
              href="https://wa.me/+918420945255"
              target="_blank"
              rel="noreferrer noopener"
            >
              <IoLogoWhatsapp />
            </a>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
