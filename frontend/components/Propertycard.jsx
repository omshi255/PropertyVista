// App.js
import React, { useEffect, useState } from "react";
import "../components/Propertycard.css";

function App() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true); // Track loading state
  const [error, setError] = useState(null); // Track errors

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await fetch(
          "http://127.0.0.1:8000/api/accounts/api/properties/"
        );

        if (!response.ok) {
          console.error(
            "Response not OK:",
            response.status,
            response.statusText
          );
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Fetched data:", data); // Log fetched data for debugging
        setProperties(data);
      } catch (error) {
        console.error("Error fetching properties:", error);
        setError(error.message); // Set the error message
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchProperties();
  }, []);

  if (loading) {
    return <div>Loading properties...</div>;
  }

  if (error) {
    return <div>Error loading properties: {error}</div>;
  }
  const addToWishlist = (event, propertyId) => {
    event.stopPropagation();
    console.log(`Property with ID ${propertyId} added to wishlist!`);
    alert("added to wishlist!");
  };
  return (
    <>
       <div className="heading-container">
       <h2 class="heading-title">Find Better Places to Live, Work and Wonder...</h2>
       <h2>Find, Buy & Own Your Dream Home
       </h2>
       <div class="underline"></div>
       </div>
      <div className="property-cards-container">
        {properties.length === 0 ? (
          <p>No properties available at the moment.</p>
        ) : (
          properties.map((property) => (
            <div key={property.id} className="property-card">
              <img
                src={`http://127.0.0.1:8000${property.image}`}
                alt={property.title}
                className="property-image"
              />
              <h3>{property.title}</h3>
              <p>{property.description}</p>
              <p>
                <strong>Price:</strong> ₹{property.price}
              </p>
              <p>
                <strong>Location:</strong> {property.location}
              </p>
              <div className="flex">
                <button
                  class="button2"
                  onClick={(e) => addToWishlist(e, property.id)}
                >
                  Add To Wishlist
                </button>
                <label class="ui-like">
                  <input type="checkbox" />
                  <div class="like">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill=""
                    >
                      <g stroke-width="0" id="SVGRepo_bgCarrier"></g>
                      <g
                        stroke-linejoin="round"
                        stroke-linecap="round"
                        id="SVGRepo_tracerCarrier"
                      ></g>
                      <g id="SVGRepo_iconCarrier">
                        <path d="M20.808,11.079C19.829,16.132,12,20.5,12,20.5s-7.829-4.368-8.808-9.421C2.227,6.1,5.066,3.5,8,3.5a4.444,4.444,0,0,1,4,2,4.444,4.444,0,0,1,4-2C18.934,3.5,21.773,6.1,20.808,11.079Z"></path>
                      </g>
                    </svg>
                  </div>
                </label>
              </div>
            </div>
          ))
        )}
   
      </div>
    </>
  );
}

export default App;
