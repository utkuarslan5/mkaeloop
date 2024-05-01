const Hero = ({ header, subheader, text, image }) => (
  <>
    <h1>{header}</h1>
    <span>{subheader}</span>
    <span>{text}</span>
    {image && <img alt={image.alt || "Image failed to load"} src={image.src} />}
  </>
);

export default Hero;
