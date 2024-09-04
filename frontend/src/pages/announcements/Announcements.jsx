// import React from 'react'
import Header from "../../components/Header";
import HeaderImage from "../../images/Technical-hard-skills-final-02.jpg";
import Card from "../../UI/Card";
import { plans } from "../../data";

import "./announcements.css";

const Announcements = () => {
  return (
    <>
      <Header title="Test yourself" image={HeaderImage}>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Atque fugiat
        odio id molestias a hic.
      </Header>
      <section className="plans">
        <div className="container plans__container">
          {plans.map(({ id, name, desc, price, features }) => {
            return (
              <Card key={id} className="plan">
                <h3>{name}</h3>
                <small>{desc}</small>
                {/* <h1>{`$${price}`}</h1>
                <h2>/mo</h2> */}

                {/* <h4>Features</h4>
                {features.map(({ feature, available }, index) => {
                  return (
                    <p key={index} className={!available ? "disabled" : ""}>
                      {feature}
                    </p>
                  );
                })} */}
                <button className="btn lg"> Choose Plan</button>
              </Card>
            );
          })}
        </div>
      </section>
    </>
  );
};

export default Announcements;
