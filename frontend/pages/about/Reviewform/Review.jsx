import React from "react";
import  Reviewform   from   "../Reviewform/Reviewform"
import Reviewlist from "../Reviewform/Reviewlist"
import "../Reviewform/Review.css"

const Reviews = () => {
  return (
    <div className="reviews-page">
      <h2>Delivering excellence, trusted by clients for exceptional service and results</h2>
      <Reviewform />
      <Reviewlist />
    </div>
  );
};

export default Reviews;
