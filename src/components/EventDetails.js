// Added by Alvin: Component to display event details using getEventDetails()

import React, { useEffect, useState } from "react";

const EventDetails = ({ contract, eventId }) => {
  const [details, setDetails] = useState(null);

  useEffect(() => {
    const loadDetails = async () => {
      try {
        const data = await contract.methods.getEventDetails(eventId).call();

        setDetails({
          name: data[0],
          price: data[1],
          totalTickets: data[2],
          remainingTickets: data[3],
          owner: data[4],
        });
      } catch (err) {
        console.error("Failed to load event details:", err);
      }
    };

    if (contract) loadDetails();
  }, [contract, eventId]);

  if (!details) return <p>Loading event details...</p>;

  return (
    <div className="event-details">
      <h3>{details.name}</h3>
      <p>Price: {details.price} wei</p>
      <p>
        Tickets: {details.totalTickets - details.remainingTickets} /{" "}
        {details.totalTickets}
      </p>
      <p>Remaining: {details.remainingTickets}</p>
      <p>Owner: {details.owner}</p>
    </div>
  );
};

export default EventDetails;
