import Hero from "../components/landing/Hero.jsx";
import Features from "../components/landing/Features.jsx";
import Steps from "../components/landing/Steps.jsx";
import Testimonials from "../components/landing/Testimonal.jsx";
import Banner from "../components/landing/Banner.jsx";
import Pricing from "../components/landing/Pricing.jsx";
import FAQ from "../components/landing/FAQ.jsx";

const Landing = () => {
  return (
    <div className="home-container">
      <Hero
        header="Helping digital creators ship often and iterative to break the cycle of unfinished projects."
        subheader="We are great at staring, not so much in finishing. 
        If this resonates with you, welcome to the club."
      />
      <Steps />
      <Features />
      <Testimonials />
      <Banner />
      <Pricing />
      <FAQ />
    </div>
  );
};

export default Landing;
