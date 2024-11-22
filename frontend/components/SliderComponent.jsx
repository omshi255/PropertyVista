
import React, { useState, useEffect } from "react";
import ReactStars from "react-stars"; // For rating
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify'; // Import Toastify
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify styles
import "../components/card.css"; // For styling

const SliderCardComponent = () => {
  const [slides, setSlides] = useState([]); // State to store slide data
  const [loading, setLoading] = useState(true); // Loading state
  const [currentIndex, setCurrentIndex] = useState(0); // State to track the current slide index
  const [slidesPerView, setSlidesPerView] = useState(4); // Default to 4 slides per view

  // Fetch slider data
  useEffect(() => {
    const fetchSliderData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/accounts/api/slider/"); // Replace with your backend API URL
        setSlides(response.data); // Store data in state
      } catch (error) {
        console.error("Error fetching slider data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSliderData();
  }, []);

  // Handle window resize to adjust slides per view
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setSlidesPerView(4); // 4 slides per view for large screens
      } else if (window.innerWidth >= 768) {
        setSlidesPerView(3); // 3 slides per view for tablets
      } else {
        setSlidesPerView(1); // 1 slide per view for smaller screens (phones)
      }
    };

    handleResize(); // Initial check on component mount
    window.addEventListener("resize", handleResize); // Listen for window resize

    return () => {
      window.removeEventListener("resize", handleResize); // Cleanup on component unmount
    };
  }, []);

  const handleRatingChange = (newRating, slideId) => {
    console.log(`New rating for slide ${slideId}: ${newRating}`);
    // Add logic to update the rating in the backend (optional)
    toast.info(`Rating for "${slideId}" updated to ${newRating}`, {
      position: 'top-right',
      autoClose: 2000,
      hideProgressBar: true,
      closeButton: true,
      className: 'custom-toast', // Apply custom class for styling
      style: {
        backgroundColor: '#FFA500', // Orange background
        color: '#fff', // White text color
        fontWeight: 'bold',
      },
    });
  };

  // Handle add to wishlist click
  const handleAddToWishlist = (slide) => {
    console.log(`Added slide ${slide.title} to wishlist`);
    toast.success(`Slide ${slide.title} added to wishlist!`, {
      position: 'top-right',
      autoClose: 2000,
      hideProgressBar: true,
      closeButton: true,
    });
  };

  // Handle previous slide
  const handlePrevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex <= 0 ? slides.length - slidesPerView : prevIndex - slidesPerView
    );
  };

  // Handle next slide
  const handleNextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex + slidesPerView >= slides.length ? 0 : prevIndex + slidesPerView
    );
  };

  if (loading) {
    return <div>Loading...</div>; // Show a loading message
  }

  return (
    <div className="slider-card-container">
      <div className="heading-container">
        <h2 className="heading-title">Rate Our Properties</h2>
        <div className="underline"></div>
      </div>

      <div className="carousel-container">
        <button onClick={handlePrevSlide} className="carousel-button prev-button">
          &lt;
        </button>

        <div className="card-grid">
          {slides.slice(currentIndex, currentIndex + slidesPerView).map((slide) => (
            <div key={slide.id} className="card">
              <img
                src={slide.image_url}
                alt={slide.title}
                className="card-image"
              />
              <div className="card-content">
                <h2 className="card-title">{slide.title}</h2>
                {slide.description && (
                  <p className="card-description">{slide.description}</p>
                )}
                {slide.link && (
                  <a
                    href={slide.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="card-link"
                  >
                    View more
                  </a>
                )}
                <div className="rating-container">
                  <ReactStars
                    count={5}
                    value={slide.rating}
                    size={24}
                    color2={"#ffd700"}
                    onChange={(newRating) =>
                      handleRatingChange(newRating, slide.id)
                    }
                    className="rating"
                  />

                  <button
                    onClick={() => handleAddToWishlist(slide)}
                    className="wishlist-button"
                  >
                    Add to Wishlist
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button onClick={handleNextSlide} className="carousel-button next-button">
          &gt;
        </button>
      </div>

      {/* Toast Container */}
      <ToastContainer />
    </div>
  );
};

export default SliderCardComponent;
