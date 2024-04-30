import React from "react";
import PropTypes from "prop-types";
import "./styles/testimonial.css";
const Testimonials = () => (
  <div className="home-testimonial">
    <div className="home-container15">
      <h1 className="home-text036">
        <span>Best creations are made this way!</span>
        <br></br>
      </h1>
      <span className="home-text039">
        When will you stop telling yourself the tale that you&apos;ll &quot;make
        it&quot;, while other do actually #MKAEIT!?
      </span>
      <div className="home-container16">
        <TestimonialCard
          pictureSrc="https://pbs.twimg.com/profile_images/1589756412078555136/YlXMBzhp_400x400.jpg"
          quote="I'm Launching 12 Startups in 12 Months. We creatives have one common problem: finishing things.. And then there's our other problem: fear of failure. It's killing good ideas. So I've decided to take things into my own hands. I want to change my habits and force myself to finish what I start. (Quoted from his blog, now he makes $180k/m)"
          name="Pieter Levels"
          pictureAlt="profile"
          role="@levelsio, Bootstrapped entrepreneur"
        />
        <TestimonialCard rootClassName="rootClassName" />
        <TestimonialCard
          pictureSrc="https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?ixid=Mnw5MTMyMXwwfDF8c2VhcmNofDd8fHdvbWFuJTIwcG9ydHJhaXR8ZW58MHx8fHwxNjI2NDUxOTgy&amp;ixlib=rb-1.2.1&amp;h=1200"
          rootClassName="rootClassName1"
        />
      </div>
    </div>
  </div>
);

const TestimonialCard = ({
  pictureSrc = "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?ixid=Mnw5MTMyMXwwfDF8c2VhcmNofDd8fHdvbWFuJTIwcG9ydHJhaXR8ZW58MHx8fHwxNjI2NDUxOTgy&amp;ixlib=rb-1.2.1&amp;h=1200",
  rootClassName = "rootClassName",
  quote = "Lorem ipsum dolor sit amet",
  name = "Lorem ipsum",
  pictureAlt = "Lorem ipsum",
  role = "Lorem ipsum",
}) => {
  return (
    <div className={`testimonial-card1-testimonial-card ${rootClassName} `}>
      <svg
        viewBox="0 0 950.8571428571428 1024"
        className="testimonial-card1-icon"
      >
        <path
          d="M438.857 182.857v402.286c0 161.143-131.429 292.571-292.571 292.571h-36.571c-20 0-36.571-16.571-36.571-36.571v-73.143c0-20 16.571-36.571 36.571-36.571h36.571c80.571 0 146.286-65.714 146.286-146.286v-18.286c0-30.286-24.571-54.857-54.857-54.857h-128c-60.571 0-109.714-49.143-109.714-109.714v-219.429c0-60.571 49.143-109.714 109.714-109.714h219.429c60.571 0 109.714 49.143 109.714 109.714zM950.857 182.857v402.286c0 161.143-131.429 292.571-292.571 292.571h-36.571c-20 0-36.571-16.571-36.571-36.571v-73.143c0-20 16.571-36.571 36.571-36.571h36.571c80.571 0 146.286-65.714 146.286-146.286v-18.286c0-30.286-24.571-54.857-54.857-54.857h-128c-60.571 0-109.714-49.143-109.714-109.714v-219.429c0-60.571 49.143-109.714 109.714-109.714h219.429c60.571 0 109.714 49.143 109.714 109.714z"
          className=""
        ></path>
      </svg>
      <div className="testimonial-card1-testimonial">
        <span className="testimonial-card1-text">{quote}</span>
        <span className="testimonial-card1-text1">{name}</span>
        <span className="testimonial-card1-text2">{role}</span>
        <img
          alt={pictureAlt}
          src={pictureSrc}
          className="testimonial-card1-image"
        />
      </div>
    </div>
  );
};

TestimonialCard.propTypes = {
  pictureSrc: PropTypes.string,
  rootClassName: PropTypes.string,
  quote: PropTypes.string,
  name: PropTypes.string,
  pictureAlt: PropTypes.string,
  role: PropTypes.string,
};

export default Testimonials;
