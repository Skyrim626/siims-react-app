import React, { useState } from "react";
import Loader from "../components/common/Loader";

const TestingPage = () => {
  const [loading, setLoading] = useState(false);

  const simulateRequest = () => {
    setLoading(true);

    // Simulate a network request or some processing
    setTimeout(() => {
      setLoading(false);
    }, 3000); // Simulate a 3 second delay
  };

  return (
    <div>
      <button onClick={simulateRequest}>Send Request</button>

      {/* Loader component */}
      <Loader loading={loading} />
    </div>
  );
};

export default TestingPage;
