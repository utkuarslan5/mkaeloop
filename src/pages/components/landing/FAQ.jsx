import React from "react";
import PropTypes from "prop-types";
import "./styles/question.css";

export const FAQ = () => (
  <div className="home-faq">
    <div className="faqContainer">
      <div className="home-faq1">
        <div className="home-container26">
          <span className="overline">
            <span>FAQ</span>
            <br></br>
          </span>
          <h2 className="home-text098 heading2">Common questions</h2>
          <span className="home-text099 bodyLarge">
            <span>
              MKAEIT grow out of my frustration with staring at dozens of
              unfinished porjects in various mediums.
            </span>
            <br></br>
            <br></br>
            <span>
              Looking back, I&apos;ve seen that my most &quot;productive&quot;
              (delivering) times were when I was in definite bounds and
              contrained by an external factor (that I chose).
            </span>
            <br></br>
            <br></br>
            <span>
              Seeing this trend with so many great creators making it; I said
              &quot;Why not? Lets MkaeIt.&quot;
            </span>
            <br></br>
          </span>
        </div>
        <div className="home-container27">
          <Question
            answer="MkaeLoop helps creators by setting time-bound, actionable goals and emphasizing visibility and social accountability to drive productivity and innovation."
            question="How does MkaeLoop help creators?"
          ></Question>
          <Question
            answer="MkaeLoop follows a 'show, don't tell' philosophy, encouraging creators to ship work often and iterate quickly."
            question="What is the philosophy behind MkaeLoop?"
          ></Question>
          <Question
            answer="MkaeLoop simplifies the creative process by turning the constraints of deadlines into a powerful driver of productivity."
            question="How does MkaeLoop simplify the creative process?"
          ></Question>
          <Question
            answer="Creators can benefit from MkaeLoop by staying focused, setting clear goals, and leveraging social accountability to stay on track."
            question="How can creators benefit from using MkaeLoop?"
          ></Question>
          <Question
            answer="Yes, MkaeLoop is designed to help creators from various fields by providing a framework for setting goals and tracking progress effectively."
            question="Is MkaeLoop suitable for all types of creators?"
          ></Question>
        </div>
      </div>
    </div>
  </div>
);

const Question = ({
  question = "What types of cars do you sell?",
  answer = "Join our commitment platform today to break the Creator's Paradox and ship fast. Embrace time-bound, end-actionable commitments to iterate often within constraints. Receive feedback, refine your work, and connect with a community of creators. Explore our solo and trio packs for contributions to support maintenance costs.",
}) => {
  return (
    <div className="question1-container">
      <span className="question1-text heading3">{question}</span>
      <span className="bodySmall">{answer}</span>
    </div>
  );
};

Question.propTypes = {
  question: PropTypes.string,
  answer: PropTypes.string,
};

export default FAQ;
