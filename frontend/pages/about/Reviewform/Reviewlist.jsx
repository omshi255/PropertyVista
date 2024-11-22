import React, { useEffect, useState } from "react";
import Reviewform from "../Reviewform/Reviewform"
import "../Reviewform/Review.css"
const ReviewList = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/acounts/api/reviews/");
      const data = await response.json();
      setReviews(data);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  return (
    <div className="review-list">
      <h2>Client Reviews</h2>
      {reviews.length === 0 ? (
        
        <p>No reviews yet. Be the first to leave a review!</p>
      ) : (
        reviews.map((review) => (
          <div key={review.id} className="review-card">
            <h3>{review.name}</h3>
            <p>{review.review_text}</p>
            <span>Rating: {review.rating} / 5</span>
          </div>
        ))
      )}
    </div>
  );
};

export default ReviewList;
