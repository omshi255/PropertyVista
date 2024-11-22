
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import the Toastify CSS
import "../Reviewform/Review.css";

const ReviewForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    review_text: "",
    rating: 5,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://127.0.0.1:8000/api/accounts/reviews/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success("Review submitted successfully!");
        setFormData({ name: "", email: "", review_text: "", rating: 5 });
      } else {
        toast.error("Failed to submit the review. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting review:", error);
      toast.error("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="review-form">
      <h2>Leave a Review</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Review:
          <textarea
            name="review_text"
            value={formData.review_text}
            onChange={handleChange}
            required
          ></textarea>
        </label>
        <label>
          Rating:
          <select
            name="rating"
            value={formData.rating}
            onChange={handleChange}
          >

            {[1, 2, 3, 4, 5].map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </select>
        </label>
        <button type="submit">Submit Review</button>
      </form>

      {/* Toastify Container */}
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar  />
    </div>
  );
};

export default ReviewForm;
