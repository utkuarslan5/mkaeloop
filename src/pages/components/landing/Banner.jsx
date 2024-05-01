const Banner = ({ header, subheader, buttonText }) => (
  <div className="home-banner">
    <h2 className="home-text090">
      <span>{header}</span>
      <br></br>
      <span>{subheader}</span>
      <br></br>
    </h2>
    <button className="home-button4 button">{buttonText}</button>
  </div>
);

export default Banner