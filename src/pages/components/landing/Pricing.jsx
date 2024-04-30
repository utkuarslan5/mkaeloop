import React from "react";

const Pricing = () => (
  <div className="home-pricing">
    <div className="home-container19">
      <div className="home-container20">
        <h1>Dear creator,</h1>
        <span className="home-text058">
          <span>
            <span>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. In lorem
              lorem, malesuada in metus vitae, scelerisque accumsan ipsum.
              <span
                dangerouslySetInnerHTML={{
                  __html: " ",
                }}
              />
            </span>
            <span>
              <span
                dangerouslySetInnerHTML={{
                  __html: " ",
                }}
              />
            </span>
          </span>
        </span>
        <span>
          <span>
            To keep our platform ad-free and ensure it remains dedicated solely
            to dedicated creators, I ask for a one-time $19 contribution (or
            grab a trio pack and gift to friends!)
          </span>
          <br></br>
          <br></br>
          <span>
            This platform is a labor of love, and your support helps cover the
            essential maintenance costs. I promise to keep it clean, free from
            irrelevant distractions, and I will never monetize your data.
          </span>
          <br></br>
          <br></br>
          <span>
            Can&apos;t wait to see what you&apos;ll mkae!
            <span
              dangerouslySetInnerHTML={{
                __html: " ",
              }}
            />
          </span>
          <br></br>
          <br></br>
          <span>World deserves your greatness,</span>
          <br></br>
          <span>Utku 🐙</span>
          <br></br>
        </span>
      </div>
      <div className="home-container21">
        <PricingCard
          title="Solo-pack"
          price="$19"
          features={[
            "♾️ Loops",
            "♾️Life-time access",
            "♾️All future updates",
            "The loop of creation",
          ]}
          buttonText="I'mma lone ranger."
        />
        <PricingCard
          title="Trio-pack"
          price="$29"
          features={[
            "♾️ Loops",
            "♾️ Life-time access",
            "♾️All future updates",
            "Gift of creating together",
          ]}
          buttonText="Tag team!"
        />
      </div>
    </div>
  </div>
);

const PricingCard = ({ title, price, features, buttonText }) => (
  <div className="home-container22">
    <span className="home-text076">{title}</span>
    <span className="home-text077">{price}</span>
    {features.map((feature, index) => (
      <span key={index} className={`home-text078${index}`}>
        {feature}
      </span>
    ))}
    <button className="home-button2 button">{buttonText}</button>
  </div>
);

export default Pricing;
