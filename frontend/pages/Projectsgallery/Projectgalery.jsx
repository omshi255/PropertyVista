

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../Projectsgallery/Projectgalery.css';

const PropertyInteriorCards = () => {
  const [interiors, setInteriors] = useState([]);
  const [favorites, setFavorites] = useState(() => {
    const savedFavorites = localStorage.getItem("favorites");
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });

  useEffect(() => {
    const fetchInteriors = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/accounts/api/property-interiors/');
        setInteriors(response.data);
      } catch (error) {
        console.error('Error fetching property interiors:', error);
      }
    };

    fetchInteriors();
  }, []);

  const handleAddToFavorites = (interiorId) => {
    const isFavorite = favorites.includes(interiorId);
    let updatedFavorites;

    if (isFavorite) {
      // Remove from favorites
      updatedFavorites = favorites.filter((id) => id !== interiorId);
      toast.info("Removed from Favorites!", {
        position: 'bottom-right',
        autoClose: 2000,
      });
    } else {
      // Add to favorites
      updatedFavorites = [...favorites, interiorId];
      toast.success("Added to Favorites!", {
        position: 'bottom-right',
        autoClose: 2000,
      });
    }

    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  return (
    <>
    <div className="property-list-heading">
    <h2 className="property-list-title">
    Marble and hardwood flooring Interior for an upscale feel
    </h2>
    <div className="property-list-underline"></div>
  </div>
    <div className="interior-container">
      {interiors.map((interior) => (
        <div key={interior.id} className="interior-card">
          <img
            src={`http://127.0.0.1:8000${interior.image}`}
            alt={interior.title}
            className="interior-image"
          />
          <div className="interior-details">
            <h3 className="interior-title">{interior.title}</h3>
            <p className="interior-description">{interior.description}</p>
            <p className="interior-price">${interior.price}</p>
            <button
              className={`favorite-button ${favorites.includes(interior.id) ? "favorite-active" : ""}`}
              onClick={() => handleAddToFavorites(interior.id)}
            >
              {favorites.includes(interior.id) ? "Remove from Favorites" : "Add to Favorites"}
            </button>
          </div>
        </div>
      ))}
      {/* Toast container for notifications */}
      <ToastContainer />
    </div>
    </>
  );
};

export default PropertyInteriorCards;
