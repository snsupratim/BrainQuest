// import React from 'react'
import "./about.css";
import HeaderImage from "../../images/What-is-Technical-SEO.jpg";
import Header from "../../components/Header";
import StoryImage from "../../images/Technical-hard-skills-final-02.jpg";
import VisionImage from "../../images/What-is-Technical-SEO.jpg";
import MissionImage from "../../images/Technical-hard-skills-final-02.jpg";

const About = () => {
  return (
    <>
      <Header title="About Us" image={HeaderImage}>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempora
        explicabo animi aliquid ipsam deserunt in rem velit doloremque ipsa
        commodi.
      </Header>

      <section className="about__story">
        <div className="container about__story-container">
          <div className="about__section-img">
            <img src={StoryImage} alt="STORY" />
          </div>
          <div className="about__section-content">
            <h1>Our Story</h1>
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nam,
              unde delectus illum eius doloribus ipsum cumque provident nemo
              reprehenderit? Omnis harum sint esse laboriosam quibusdam eaque
              repellat illo aut.
            </p>
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Maiores
              aperiam consequuntur, cumque numquam fuga officia architecto velit
              itaque omnis!
            </p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit
              distinctio et vel earum nisi vero.
            </p>
          </div>
        </div>
      </section>

      {/* vision */}
      <section className="about__vision">
        <div className="container about__vision-container">
          <div className="about__section-content">
            <h1>Our Vision</h1>
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nam,
              unde delectus illum eius doloribus ipsum cumque provident nemo
              reprehenderit? Omnis harum sint esse laboriosam quibusdam eaque
              repellat illo aut.
            </p>
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Maiores
              aperiam consequuntur, cumque numquam fuga officia architecto velit
              itaque omnis!
            </p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit
              distinctio et vel earum nisi vero.
            </p>
          </div>
          <div className="about__section-img">
            <img src={VisionImage} alt="vision" />
          </div>
        </div>
      </section>

      {/* mission */}
      <section className="about__mission">
        <div className="container about__mission-container">
          <div className="about__section-img">
            <img src={MissionImage} alt="mission" />
          </div>
          <div className="about__section-content">
            <h1>Our Mission</h1>
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nam,
              unde delectus illum eius doloribus ipsum cumque provident nemo
              reprehenderit? Omnis harum sint esse laboriosam quibusdam eaque
              repellat illo aut.
            </p>
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Maiores
              aperiam consequuntur, cumque numquam fuga officia architecto velit
              itaque omnis!
            </p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit
              distinctio et vel earum nisi vero.
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
