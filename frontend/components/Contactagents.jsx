import React, { useState, useEffect } from "react";
import "../components/Contactagent.css";

const AgentCards = () => {
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAgents = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/accounts/api/agents/");
        if (!response.ok) {
          throw new Error("Error fetching agents data");
        }
        const data = await response.json();
        setAgents(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAgents();
  }, []);

  if (loading) return <div>Loading agents...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="heading-container">
    <h2 class="heading-title">Contact Property Agents From Your Area</h2>
    <div class="underline"></div>
    <div className="agent-cards-container">
      {agents.length === 0 ? (
        <p>No agents found</p>
      ) : (
        agents.map((agent) => (
          <div key={agent.email} className="agent-card">
           <img
  src={`http://127.0.0.1:8000/${agent.property_image}`} // Assuming the backend returns the relative image path
  alt={agent.name}
  className="agent-image"
/>
            <div className="agent-info">
              <h3>{agent.name}</h3>
              <p>{agent.property_location}</p>
              <p>{agent.property_description}</p>
              <div className="agent-rating">
                <span>Rating: {agent.rating || "N/A"}</span>
              </div>
              <div className="contact-info">
                <p><strong>Email:</strong> {agent.email}</p>
                <p><strong>Phone:</strong> {agent.phone_number}</p>
              </div>
              <button className="contact-button">Contact Agent</button>
            </div>
          </div>
        ))
      )}
    </div>
</div>
  );
};

export default AgentCards;
