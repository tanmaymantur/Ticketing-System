import React, { useState } from "react";

function TicketItem({ title }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };
  return (
    <div className="bg-gray-50 p-5 rounded-lg shadow">
      <div className="flex justify-between items-center">
        <span className="text-lg font-medium">{title}</span>
        <div className="relative">
          <button
            className="bg-blue-900 text-white px-3 py-1 rounded focus:outline-none"
            onClick={toggleDropdown}
          >
            Change Status
          </button>
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg z-10">
              <ul>
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                  Open
                </li>
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                  In Progress
                </li>
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                  Closed
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default TicketItem;
