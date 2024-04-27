import React from 'react'

import PropTypes from 'prop-types'

import './question1.css'

const Question1 = (props) => {
  return (
    <div className="question1-container">
      <span className="question1-text heading3">{props.question}</span>
      <span className="bodySmall">{props.answer}</span>
    </div>
  )
}

Question1.defaultProps = {
  question: 'What types of cars do you sell?',
  answer:
    "Join our commitment platform today to break the Creator's Paradox and ship fast. Embrace time-bound, end-actionable commitments to iterate often within constraints. Receive feedback, refine your work, and connect with a community of creators. Explore our solo and trio packs for contributions to support maintenance costs.",
}

Question1.propTypes = {
  question: PropTypes.string,
  answer: PropTypes.string,
}

export default Question1
