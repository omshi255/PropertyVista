import React from 'react'
import "../about/about.css"
import Review from "../about/Reviewform/Review"

const AboutPage = () => {
  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
        <div class="attractive-text">About us</div>
          <p>
            At <span>Real Estate Co.</span>, we strive to redefine property
            buying, selling, and renting experiences with integrity, trust, and
            innovation.
          </p>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="mission-vision">
        <div className="section-container">
          <div className="mission">
            <img src="https://libertysteelgroup.com/it/wp-content/uploads/sites/6/2020/12/Mission-1-1-300x248.jpg" alt="" className="mission-img" />
            <h2>Our Mission</h2>
            <p>
              To deliver the best real estate solutions with unparalleled
              service, ensuring that our clients achieve their dreams of
              finding the perfect property.
            </p>
          </div>
          <div className="vision">
          <img src="https://www.pngkey.com/png/detail/272-2725425_vision-vision-icon-orange-png.png" alt="" className="mission-img" />
            <h2>Our Vision</h2>
            <p>
              To be a trusted leader in the real estate industry, empowering
              individuals to make informed decisions with confidence and ease.
            </p>
          </div>
        </div>
      </section>

      {/* Meet the Team Section */}
      <section className="team-section">
        <h2>Meet Our Team</h2>
        <div className="team-container">
          <div className="team-member">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIV99IJOGUBMQBy9kccOQsAyq36yzt0BRYUw&s" alt="Team Member 1" />
            <h3>John Doe</h3>
            <p>Founder & CEO</p>
          </div>
          <div className="team-member">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhA_VuqI8DqCHBMlOg_Y6KMjEuJsX_prJX9g&s" alt="Team Member 2" />
            <h3>Jane Smith</h3>
            <p>Head of Sales</p>
          </div>
          <div className="team-member">
            <img src="https://turpart.com/wp-content/uploads/person-2.jpg" alt="Team Member 3" />
            <h3>Robert Brown</h3>
            <p>Property Consultant</p>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="reviews-section">
        <h2>What Our Clients Say</h2>
        <div className="reviews-container">
          <div className="review">
            <img src="https://www.wilsoncenter.org/sites/default/files/media/images/person/james-person-1.jpg" alt="" className="client-img" />
            <p>
              “Finding my dream home was so easy with Real Estate Co. The team
              was professional and supportive throughout the process.”
            </p>
            <span>- Sarah Johnson</span>
          </div>
          <div className="review">
          <img src="https://engineering.unl.edu/images/staff/Kayla-Person.jpg" alt="" className="client-img" />
            <p>
              “A seamless experience from start to finish. I highly recommend
              their services to anyone looking to buy or rent a property.”
            </p>
            <span>- Michael Lee</span>
          </div>
          <div className="review">
          <img src="https://assets.foxdcg.com/dpp-uploaded/images/credits/502556198884/alert_missing_persons_unit_ryan_broussard_square_2x.jpg?fit=inside%7C*:278" alt="" className="client-img" />
            <p>
              “Real Estate Co. truly cares about their clients. They made sure I
              found a property that fit all my needs.”
            </p>
            <span>- Emily Davis</span>
          </div>
        </div>
      </section>
     < Review/>
    </div>
  );
};

export default AboutPage;
