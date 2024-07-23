import React, { useState } from "react";

function TicketItem(props) {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleOnClick = () => {
    props.setIsEditable(false);
    props.setCurrentTicket(props.ticket);
    props.setIsOpen(true);
  };
  return (
    <>
      <div
        className="bg-gray-50 p-5 rounded-lg shadow cursor-pointer"
        onClick={handleOnClick}
      >
        <div className="flex justify-between items-center">
          <span className="text-lg font-medium">{props.ticket.title}</span>
          <div className="relative">
            <button className="bg-blue-600 text-white px-3 py-1 rounded focus:outline-none">
              <p>{props.ticket.status}</p>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default TicketItem;
