import React from "react";

// Array of Positions
const positions = [
  "HR Manager",
  "Recruitement Officer",
  "General Manager",
  "CEO",
  "Operations Manager",
  "Supervisor",
  "Training Supervisor",
  "President",
  "Manager",
  "Director",
  "Chairperson",
  "Dean",
  "Client Representative",
].sort();

const RecepientPositionDropDown = ({ state, handleInputChange }) => {
  // console.log(state);

  return (
    <select
      name="recipient_position"
      value={state}
      onChange={handleInputChange}
      className="px-4 py-3 border rounded-md shadow focus:ring focus:outline-none bg-gray-300 font-bold flex"
    >
      <option value="" disabled>
        Select a position
      </option>
      {positions.map((position) => (
        <option key={position} value={position}>
          {position}
        </option>
      ))}
    </select>
  );
};

export default RecepientPositionDropDown;
