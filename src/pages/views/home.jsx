import React from 'react'

import { Helmet } from 'react-helmet'

import TestimonialCard1 from "../components/landing/testimonial-card1";
import FeatureCard from "../components/landing/feature-card";
import Question1 from "../components/landing/question1";
import './home.css'

const Home = (props) => {
  return (
    <div className="home-container">
      <Helmet>
        <title>Scientific Ready Ape</title>
        <meta property="og:title" content="Scientific Ready Ape" />
      </Helmet>
      <div className="home-header">
        <header
          data-thq="thq-navbar"
          className="navbarContainer home-navbar-interactive"
        >
          <span className="logo">MKAEIT</span>
          <div data-thq="thq-navbar-nav" className="home-desktop-menu">
            <nav className="home-links"></nav>
            <div className="home-buttons">
              <button className="home-login buttonFlat">Login</button>
              <button className="buttonFilled">Register</button>
            </div>
          </div>
          <div data-thq="thq-burger-menu" className="home-burger-menu">
            <svg viewBox="0 0 1024 1024" className="home-icon socialIcons">
              <path d="M128 554.667h768c23.552 0 42.667-19.115 42.667-42.667s-19.115-42.667-42.667-42.667h-768c-23.552 0-42.667 19.115-42.667 42.667s19.115 42.667 42.667 42.667zM128 298.667h768c23.552 0 42.667-19.115 42.667-42.667s-19.115-42.667-42.667-42.667h-768c-23.552 0-42.667 19.115-42.667 42.667s19.115 42.667 42.667 42.667zM128 810.667h768c23.552 0 42.667-19.115 42.667-42.667s-19.115-42.667-42.667-42.667h-768c-23.552 0-42.667 19.115-42.667 42.667s19.115 42.667 42.667 42.667z"></path>
            </svg>
          </div>
          <div
            data-thq="thq-mobile-menu"
            className="home-mobile-menu1 mobileMenu"
          >
            <div className="home-nav">
              <div className="home-top">
                <span className="logo">MKAELOOP</span>
                <div data-thq="thq-close-menu" className="home-close-menu">
                  <svg
                    viewBox="0 0 1024 1024"
                    className="home-icon02 socialIcons"
                  >
                    <path d="M810 274l-238 238 238 238-60 60-238-238-238 238-60-60 238-238-238-238 60-60 238 238 238-238z"></path>
                  </svg>
                </div>
              </div>
              <nav className="home-links1">
                <span className="home-nav12 bodySmall">Home</span>
                <span className="home-nav22 bodySmall">How It Works</span>
                <span className="home-nav32 bodySmall">Testimonials</span>
                <span className="home-nav42 bodySmall">Contact</span>
                <span className="home-nav52 bodySmall">Blog</span>
              </nav>
              <div className="home-buttons1">
                <button className="buttonFlat">Login</button>
                <button className="buttonFilled">Register</button>
              </div>
            </div>
            <div>
              <svg
                viewBox="0 0 950.8571428571428 1024"
                className="home-icon04 socialIcons"
              >
                <path d="M925.714 233.143c-25.143 36.571-56.571 69.143-92.571 95.429 0.571 8 0.571 16 0.571 24 0 244-185.714 525.143-525.143 525.143-104.571 0-201.714-30.286-283.429-82.857 14.857 1.714 29.143 2.286 44.571 2.286 86.286 0 165.714-29.143 229.143-78.857-81.143-1.714-149.143-54.857-172.571-128 11.429 1.714 22.857 2.857 34.857 2.857 16.571 0 33.143-2.286 48.571-6.286-84.571-17.143-148-91.429-148-181.143v-2.286c24.571 13.714 53.143 22.286 83.429 23.429-49.714-33.143-82.286-89.714-82.286-153.714 0-34.286 9.143-65.714 25.143-93.143 90.857 112 227.429 185.143 380.571 193.143-2.857-13.714-4.571-28-4.571-42.286 0-101.714 82.286-184.571 184.571-184.571 53.143 0 101.143 22.286 134.857 58.286 41.714-8 81.714-23.429 117.143-44.571-13.714 42.857-42.857 78.857-81.143 101.714 37.143-4 73.143-14.286 106.286-28.571z"></path>
              </svg>
              <svg
                viewBox="0 0 877.7142857142857 1024"
                className="home-icon06 socialIcons"
              >
                <path d="M585.143 512c0-80.571-65.714-146.286-146.286-146.286s-146.286 65.714-146.286 146.286 65.714 146.286 146.286 146.286 146.286-65.714 146.286-146.286zM664 512c0 124.571-100.571 225.143-225.143 225.143s-225.143-100.571-225.143-225.143 100.571-225.143 225.143-225.143 225.143 100.571 225.143 225.143zM725.714 277.714c0 29.143-23.429 52.571-52.571 52.571s-52.571-23.429-52.571-52.571 23.429-52.571 52.571-52.571 52.571 23.429 52.571 52.571zM438.857 152c-64 0-201.143-5.143-258.857 17.714-20 8-34.857 17.714-50.286 33.143s-25.143 30.286-33.143 50.286c-22.857 57.714-17.714 194.857-17.714 258.857s-5.143 201.143 17.714 258.857c8 20 17.714 34.857 33.143 50.286s30.286 25.143 50.286 33.143c57.714 22.857 194.857 17.714 258.857 17.714s201.143 5.143 258.857-17.714c20-8 34.857-17.714 50.286-33.143s25.143-30.286 33.143-50.286c22.857-57.714 17.714-194.857 17.714-258.857s5.143-201.143-17.714-258.857c-8-20-17.714-34.857-33.143-50.286s-30.286-25.143-50.286-33.143c-57.714-22.857-194.857-17.714-258.857-17.714zM877.714 512c0 60.571 0.571 120.571-2.857 181.143-3.429 70.286-19.429 132.571-70.857 184s-113.714 67.429-184 70.857c-60.571 3.429-120.571 2.857-181.143 2.857s-120.571 0.571-181.143-2.857c-70.286-3.429-132.571-19.429-184-70.857s-67.429-113.714-70.857-184c-3.429-60.571-2.857-120.571-2.857-181.143s-0.571-120.571 2.857-181.143c3.429-70.286 19.429-132.571 70.857-184s113.714-67.429 184-70.857c60.571-3.429 120.571-2.857 181.143-2.857s120.571-0.571 181.143 2.857c70.286 3.429 132.571 19.429 184 70.857s67.429 113.714 70.857 184c3.429 60.571 2.857 120.571 2.857 181.143z"></path>
              </svg>
              <svg
                viewBox="0 0 602.2582857142856 1024"
                className="home-icon08 socialIcons"
              >
                <path d="M548 6.857v150.857h-89.714c-70.286 0-83.429 33.714-83.429 82.286v108h167.429l-22.286 169.143h-145.143v433.714h-174.857v-433.714h-145.714v-169.143h145.714v-124.571c0-144.571 88.571-223.429 217.714-223.429 61.714 0 114.857 4.571 130.286 6.857z"></path>
              </svg>
            </div>
          </div>
        </header>
      </div>
      <div className="home-hero"></div>
      <div className="home-hero1">
        <div className="home-container01">
          <h1 className="home-text">
            Astraightforward commitment platform for creators to ship fast,
            iterate often with a &quot;show, don&apos;t tell&quot; philosophy.
          </h1>
          <span>
            Let&apos;s face it: many of us are great at starting projects with
            enthusiasm but soon find them left half-done over-detailed in the
            Graveyard of Great Ideas - we call this the Creator&apos;s Paradox.
            Only if you could finish those great ideas...
          </span>
          <span className="home-text002">
            <span>
              <span>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non
                volutpat turpis.
                <span
                  dangerouslySetInnerHTML={{
                    __html: ' ',
                  }}
                />
              </span>
              <span>
                <span
                  dangerouslySetInnerHTML={{
                    __html: ' ',
                  }}
                />
              </span>
            </span>
            <span>
              <span>
                Mauris luctus rutrum mi ut rhoncus. Integer in dignissim tortor.
                <span
                  dangerouslySetInnerHTML={{
                    __html: ' ',
                  }}
                />
              </span>
              <span>
                <span
                  dangerouslySetInnerHTML={{
                    __html: ' ',
                  }}
                />
              </span>
            </span>
          </span>
          <div className="home-btn-group">
            <button className="home-button button">Get Started</button>
            <button className="home-button1 button">Learn More</button>
          </div>
        </div>
        <img
          alt="image"
          src="https://images.unsplash.com/photo-1483135504826-f60ad6c7924e?ixid=M3w5MTMyMXwwfDF8c2VhcmNofDIwfHxtYWtlJTIwbG9vcHxlbnwwfHx8fDE3MTQyMjI2NDl8MA&amp;ixlib=rb-4.0.3&amp;h=1500"
          className="home-image"
        />
      </div>
      <div className="home-steps">
        <h1 className="home-text009">Breaks the Creator&apos;s Paradox</h1>
        <span className="home-text010">
          <span>Time-bound, end-actionable, social commitment iterations.</span>
          <br></br>
          <span>
            Ship regularly, learn to harness the creativity of working within
            constraints.
          </span>
        </span>
        <div className="home-container02">
          <div className="home-step">
            <div className="home-container03">
              <div className="home-line"></div>
              <div className="home-container04">
                <svg viewBox="0 0 1024 1024" className="home-icon10">
                  <path d="M634 558q92-64 92-174 0-88-63-151t-151-63-151 63-63 151q0 46 27 96t65 78l36 26v98h172v-98zM512 86q124 0 211 87t87 211q0 156-128 244v98q0 18-12 30t-30 12h-256q-18 0-30-12t-12-30v-98q-128-88-128-244 0-124 87-211t211-87zM384 896v-42h256v42q0 18-12 30t-30 12h-172q-18 0-30-12t-12-30z"></path>
                </svg>
              </div>
              <div className="home-line1"></div>
            </div>
            <div className="home-container05">
              <h1 className="home-text014">Set up a Loop</h1>
              <span className="home-text015">
                <span>e.g. I will mkae 3 songs in 3 weeks</span>
                <br></br>
              </span>
            </div>
          </div>
          <div className="home-step1">
            <div className="home-container06">
              <div className="home-line2"></div>
              <div className="home-container07">
                <svg viewBox="0 0 1024 1024" className="home-icon12">
                  <path d="M746 512q26 0 45-18t19-46-19-46-45-18-45 18-19 46 19 46 45 18zM618 342q26 0 45-19t19-45-19-45-45-19-45 19-19 45 19 45 45 19zM406 342q26 0 45-19t19-45-19-45-45-19-45 19-19 45 19 45 45 19zM278 512q26 0 45-18t19-46-19-46-45-18-45 18-19 46 19 46 45 18zM512 128q158 0 271 100t113 242q0 88-63 150t-151 62h-74q-28 0-46 19t-18 45q0 22 16 42t16 44q0 28-18 46t-46 18q-160 0-272-112t-112-272 112-272 272-112z"></path>
                </svg>
              </div>
              <div className="home-line3"></div>
            </div>
            <div className="home-container08">
              <h1 className="home-text018">Start Iterating</h1>
              <span className="home-text019">
                <span>
                  Every week check-in and
                  <span
                    dangerouslySetInnerHTML={{
                      __html: ' ',
                    }}
                  />
                </span>
                <br></br>
                <span>show your Proof of Work</span>
                <br></br>
              </span>
            </div>
          </div>
          <div className="home-step2">
            <div className="home-container09">
              <div className="home-line4"></div>
              <div className="home-container10">
                <svg viewBox="0 0 1024 1024" className="home-icon14">
                  <path d="M576 736l96 96 320-320-320-320-96 96 224 224z"></path>
                  <path d="M448 288l-96-96-320 320 320 320 96-96-224-224z"></path>
                </svg>
              </div>
              <div className="home-line5"></div>
            </div>
            <div className="home-container11">
              <h1 className="home-text024">Receive feedback</h1>
              <span className="home-text025">
                <span>
                  Get feedback from your accountbalilty
                  <span
                    dangerouslySetInnerHTML={{
                      __html: ' ',
                    }}
                  />
                </span>
                <br></br>
                <span>buddy and community</span>
                <br></br>
              </span>
            </div>
          </div>
          <div className="home-step3">
            <div className="home-container12">
              <div className="home-line6"></div>
              <div className="home-container13">
                <svg viewBox="0 0 1024 1024" className="home-icon17">
                  <path d="M512 768v-128l170 170-170 172v-128q-140 0-241-101t-101-241q0-100 54-182l62 62q-30 54-30 120 0 106 75 181t181 75zM512 170q140 0 241 101t101 241q0 100-54 182l-62-62q30-54 30-120 0-106-75-181t-181-75v128l-170-170 170-172v128z"></path>
                </svg>
              </div>
              <div className="home-line7"></div>
            </div>
            <div className="home-container14">
              <h1 className="home-text030">Refine and Iterate</h1>
              <span className="home-text031">
                <span>
                  Develop your personal portfolio
                  <span
                    dangerouslySetInnerHTML={{
                      __html: ' ',
                    }}
                  />
                </span>
                <br></br>
                <span>as you iterate your creations</span>
                <br></br>
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="home-testimonial">
        <div className="home-container15">
          <h1 className="home-text036">
            <span>Best creations are made this way!</span>
            <br></br>
          </h1>
          <span className="home-text039">
            When will you stop telling yourself the tale that you&apos;ll
            &quot;make it&quot;, while other do actually #MKAEIT!?
          </span>
          <div className="home-container16">
            <TestimonialCard1
              pictureSrc="https://images.unsplash.com/photo-1557053910-d9eadeed1c58?ixid=Mnw5MTMyMXwwfDF8c2VhcmNofDF8fHdvbWFuJTIwcG9ydHJhaXR8ZW58MHx8fHwxNjI2NDUxOTgy&amp;ixlib=rb-1.2.1&amp;h=1200"
              rootClassName="rootClassName2"
            ></TestimonialCard1>
            <TestimonialCard1 rootClassName="rootClassName"></TestimonialCard1>
            <TestimonialCard1
              pictureSrc="https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?ixid=Mnw5MTMyMXwwfDF8c2VhcmNofDd8fHdvbWFuJTIwcG9ydHJhaXR8ZW58MHx8fHwxNjI2NDUxOTgy&amp;ixlib=rb-1.2.1&amp;h=1200"
              rootClassName="rootClassName1"
            ></TestimonialCard1>
          </div>
        </div>
      </div>
      <div className="home-features">
        <div className="featuresContainer">
          <div className="home-features1">
            <div className="home-container17">
              <span className="overline">
                <span>features</span>
                <br></br>
              </span>
              <h2 className="home-features-heading heading2">
                Empowering Features
              </h2>
              <span className="home-features-sub-heading bodyLarge">
                <span>
                  <span>
                    <span>
                      Discover how MkaeLoop can revolutionize your creative
                      process
                    </span>
                    <span>
                      <span
                        dangerouslySetInnerHTML={{
                          __html: ' ',
                        }}
                      />
                    </span>
                  </span>
                  <span>
                    <span>
                      <span
                        dangerouslySetInnerHTML={{
                          __html: ' ',
                        }}
                      />
                    </span>
                    <span>
                      <span
                        dangerouslySetInnerHTML={{
                          __html: ' ',
                        }}
                      />
                    </span>
                  </span>
                </span>
                <span>
                  <span>
                    <span>
                      <span
                        dangerouslySetInnerHTML={{
                          __html: ' ',
                        }}
                      />
                    </span>
                    <span>
                      <span
                        dangerouslySetInnerHTML={{
                          __html: ' ',
                        }}
                      />
                    </span>
                  </span>
                  <span>
                    <span>
                      <span
                        dangerouslySetInnerHTML={{
                          __html: ' ',
                        }}
                      />
                    </span>
                    <span>
                      <span
                        dangerouslySetInnerHTML={{
                          __html: ' ',
                        }}
                      />
                    </span>
                  </span>
                </span>
              </span>
            </div>
            <div className="home-container18">
              <FeatureCard
                heading="Visibility and Accountability"
                subHeading="Share your progress with others and stay motivated"
              ></FeatureCard>
              <FeatureCard
                heading="Time-bound Goals"
                subHeading="Set specific deadlines to keep your projects on track"
              ></FeatureCard>
              <FeatureCard
                heading="Actionable Framework"
                subHeading="Break down tasks into manageable steps for efficient execution"
              ></FeatureCard>
              <FeatureCard
                heading="Productivity and Innovation"
                subHeading="Turn deadlines into a catalyst for creativity and progress"
              ></FeatureCard>
            </div>
          </div>
        </div>
      </div>
      <div className="home-pricing">
        <div className="home-container19">
          <div className="home-container20">
            <h1>Dear creator,</h1>
            <span className="home-text058">
              <span>
                <span>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. In
                  lorem lorem, malesuada in metus vitae, scelerisque accumsan
                  ipsum.
                  <span
                    dangerouslySetInnerHTML={{
                      __html: ' ',
                    }}
                  />
                </span>
                <span>
                  <span
                    dangerouslySetInnerHTML={{
                      __html: ' ',
                    }}
                  />
                </span>
              </span>
            </span>
            <span>
              <span>
                To keep our platform ad-free and ensure it remains dedicated
                solely to dedicated creators, I ask for a one-time
                $19 contribution (or grab a trio pack and gift to friends!)
              </span>
              <br></br>
              <br></br>
              <span>
                This platform is a labor of love, and your support helps cover
                the essential maintenance costs. I promise to keep it clean,
                free from irrelevant distractions, and I will never monetize
                your data.
              </span>
              <br></br>
              <br></br>
              <span>
                Can&apos;t wait to see what you&apos;ll mkae!
                <span
                  dangerouslySetInnerHTML={{
                    __html: ' ',
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
            <div className="home-container22">
              <span className="home-text076">Solo-pack</span>
              <span className="home-text077">$19</span>
              <span className="home-text078">
                <span className="home-text079">♾️ </span>
                <span>Loops</span>
              </span>
              <span className="home-text081">♾️Life-time access</span>
              <span className="home-text082">♾️All future updates</span>
              <span className="home-text083">The loop of creation</span>
              <button className="home-button2 button">
                I&apos;mma lone ranger.
              </button>
            </div>
            <div className="home-container23">
              <span className="home-text084">Trio-pack</span>
              <span className="home-text085">$29</span>
              <span className="home-text086">♾️ Loops</span>
              <span className="home-text087">♾️ Life-time access</span>
              <span className="home-text088">♾️All future updates</span>
              <span className="home-text089">Gift of creating together</span>
              <button className="home-button3 button">Tag team!</button>
            </div>
          </div>
        </div>
      </div>
      <div className="home-banner">
        <h2 className="home-text090">
          <span>Anything unclear?</span>
          <br></br>
          <span>(or just wanna say hi)</span>
          <br></br>
        </h2>
        <button className="home-button4 button">Let me know</button>
      </div>
      <div className="home-container24">
        <div className="home-container25">
          <div className="home-pricing1"></div>
        </div>
      </div>
      <div className="home-banner1"></div>
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
                  Looking back, I&apos;ve seen that my most
                  &quot;productive&quot; (delivering) times were when I was in
                  definite bounds and contrained by an external factor (that I
                  chose).
                </span>
                <br></br>
                <br></br>
                <span>
                  Seeing this trend with so many great creators making it; I
                  said &quot;Why not? Lets MkaeIt.&quot;
                </span>
                <br></br>
              </span>
            </div>
            <div className="home-container27">
              <Question1
                answer="MkaeLoop helps creators by setting time-bound, actionable goals and emphasizing visibility and social accountability to drive productivity and innovation."
                question="How does MkaeLoop help creators?"
              ></Question1>
              <Question1
                answer="MkaeLoop follows a 'show, don't tell' philosophy, encouraging creators to ship work often and iterate quickly."
                question="What is the philosophy behind MkaeLoop?"
              ></Question1>
              <Question1
                answer="MkaeLoop simplifies the creative process by turning the constraints of deadlines into a powerful driver of productivity."
                question="How does MkaeLoop simplify the creative process?"
              ></Question1>
              <Question1
                answer="Creators can benefit from MkaeLoop by staying focused, setting clear goals, and leveraging social accountability to stay on track."
                question="How can creators benefit from using MkaeLoop?"
              ></Question1>
              <Question1
                answer="Yes, MkaeLoop is designed to help creators from various fields by providing a framework for setting goals and tracking progress effectively."
                question="Is MkaeLoop suitable for all types of creators?"
              ></Question1>
            </div>
          </div>
        </div>
      </div>
      <div className="home-footer">
        <footer className="footerContainer home-footer1">
          <div className="home-container28">
            <span className="logo">MKAEIT</span>
            <nav className="home-nav1">
              <span className="bodySmall">Home</span>
              <span className="home-nav221 bodySmall">How It Works</span>
              <span className="home-nav321 bodySmall">Testimonials</span>
              <span className="home-nav421 bodySmall">Contact</span>
              <span className="home-nav521 bodySmall">Blog</span>
            </nav>
          </div>
          <div className="home-separator"></div>
          <div className="home-container29">
            <span className="bodySmall home-text108">
              © 2024 MKAEIT, All Rights Reserved.
            </span>
            <div className="home-icon-group1">
              <svg
                viewBox="0 0 950.8571428571428 1024"
                className="home-icon19 socialIcons"
              >
                <path d="M925.714 233.143c-25.143 36.571-56.571 69.143-92.571 95.429 0.571 8 0.571 16 0.571 24 0 244-185.714 525.143-525.143 525.143-104.571 0-201.714-30.286-283.429-82.857 14.857 1.714 29.143 2.286 44.571 2.286 86.286 0 165.714-29.143 229.143-78.857-81.143-1.714-149.143-54.857-172.571-128 11.429 1.714 22.857 2.857 34.857 2.857 16.571 0 33.143-2.286 48.571-6.286-84.571-17.143-148-91.429-148-181.143v-2.286c24.571 13.714 53.143 22.286 83.429 23.429-49.714-33.143-82.286-89.714-82.286-153.714 0-34.286 9.143-65.714 25.143-93.143 90.857 112 227.429 185.143 380.571 193.143-2.857-13.714-4.571-28-4.571-42.286 0-101.714 82.286-184.571 184.571-184.571 53.143 0 101.143 22.286 134.857 58.286 41.714-8 81.714-23.429 117.143-44.571-13.714 42.857-42.857 78.857-81.143 101.714 37.143-4 73.143-14.286 106.286-28.571z"></path>
              </svg>
              <svg
                viewBox="0 0 877.7142857142857 1024"
                className="home-icon21 socialIcons"
              >
                <path d="M585.143 512c0-80.571-65.714-146.286-146.286-146.286s-146.286 65.714-146.286 146.286 65.714 146.286 146.286 146.286 146.286-65.714 146.286-146.286zM664 512c0 124.571-100.571 225.143-225.143 225.143s-225.143-100.571-225.143-225.143 100.571-225.143 225.143-225.143 225.143 100.571 225.143 225.143zM725.714 277.714c0 29.143-23.429 52.571-52.571 52.571s-52.571-23.429-52.571-52.571 23.429-52.571 52.571-52.571 52.571 23.429 52.571 52.571zM438.857 152c-64 0-201.143-5.143-258.857 17.714-20 8-34.857 17.714-50.286 33.143s-25.143 30.286-33.143 50.286c-22.857 57.714-17.714 194.857-17.714 258.857s-5.143 201.143 17.714 258.857c8 20 17.714 34.857 33.143 50.286s30.286 25.143 50.286 33.143c57.714 22.857 194.857 17.714 258.857 17.714s201.143 5.143 258.857-17.714c20-8 34.857-17.714 50.286-33.143s25.143-30.286 33.143-50.286c22.857-57.714 17.714-194.857 17.714-258.857s5.143-201.143-17.714-258.857c-8-20-17.714-34.857-33.143-50.286s-30.286-25.143-50.286-33.143c-57.714-22.857-194.857-17.714-258.857-17.714zM877.714 512c0 60.571 0.571 120.571-2.857 181.143-3.429 70.286-19.429 132.571-70.857 184s-113.714 67.429-184 70.857c-60.571 3.429-120.571 2.857-181.143 2.857s-120.571 0.571-181.143-2.857c-70.286-3.429-132.571-19.429-184-70.857s-67.429-113.714-70.857-184c-3.429-60.571-2.857-120.571-2.857-181.143s-0.571-120.571 2.857-181.143c3.429-70.286 19.429-132.571 70.857-184s113.714-67.429 184-70.857c60.571-3.429 120.571-2.857 181.143-2.857s120.571-0.571 181.143 2.857c70.286 3.429 132.571 19.429 184 70.857s67.429 113.714 70.857 184c3.429 60.571 2.857 120.571 2.857 181.143z"></path>
              </svg>
              <svg
                viewBox="0 0 602.2582857142856 1024"
                className="home-icon23 socialIcons"
              >
                <path d="M548 6.857v150.857h-89.714c-70.286 0-83.429 33.714-83.429 82.286v108h167.429l-22.286 169.143h-145.143v433.714h-174.857v-433.714h-145.714v-169.143h145.714v-124.571c0-144.571 88.571-223.429 217.714-223.429 61.714 0 114.857 4.571 130.286 6.857z"></path>
              </svg>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}

export default Home
