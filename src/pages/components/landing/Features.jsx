const Features = () => (
  <>
    <h2>Common Creator Challenges:</h2>
    <FeatureCard
      heading="Unseen Potential"
      subHeading="Most creative work never reaches an audience, remaining hidden and unjudged except by the creator."
    />
    <FeatureCard
      heading="Overthinking Habit"
      subHeading="Creators often set expectations far beyond what's required, complicating what could be simple."
    />
    <FeatureCard
      heading="Permanent In-Progress"
      subHeading="Many of us struggle to complete projects, keeping our work perpetually 'in progress'."
    />
    <FeatureCard
      heading="Emotional Attachment"
      subHeading="Critique of our work can feel personal, making it hard to detach and hindering openness to feedback."
    />
  </>
);



const FeatureCard = ({
  heading = "Lorem ipsum dolor sit amet",
  subHeading = "Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  ...otherProps
}) => (
  <>
    <h3>{heading}</h3>
    <span>{subHeading}</span>
  </>
);

export default Features;
