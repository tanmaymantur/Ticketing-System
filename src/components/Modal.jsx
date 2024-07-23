import React, { useState } from "react";

function Modal(props) {
  const generateId = () => Math.random().toString(36).substr(2, 9);

  const [isOpen, setIsOpen] = useState(false);
  const [isEditingTitle, setIsEditingTitle] = useState(props.isEditingTitle);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [assignedDropdownOpen, setAssignedDropdownOpen] = useState(false);
  const [assignedValue, setAssignedValue] = useState(props.ticket.assignedTo);
  const [isEditingDescription, setIsEditingDescription] = useState(
    props.isEditingDescription
  );
  const [ticket, setTicket] = useState(
    props.ticket || {
      title: "Add Title",
      description: "Add description.",
      comments: [
        //   { id: 1, text: "First comment", file: null },
        //   { id: 2, text: "Second comment", file: null },
      ],
      newComment: "",
      newCommentFile: null,
      status: "open",
      id: generateId(),
    }
  );

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };
  const toggleAssignedDropdown = (value) => {
    setAssignedValue(value);
    setAssignedDropdownOpen(!assignedDropdownOpen);
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = (action) => {
    if (action === "save") {
      props.addTickets(ticket);
    }
    props.setIsOpen(false);
    setIsEditingTitle(false);
    setIsEditingDescription(false);
    props.setCurrentTicket(null);
  };

  const handleTitleChange = (e) => {
    setTicket({ ...ticket, title: e.target.value });
  };

  const handleDescriptionChange = (e) => {
    setTicket({ ...ticket, description: e.target.value });
  };

  const handleNewCommentChange = (e) => {
    setTicket({ ...ticket, newComment: e.target.value });
  };

  const handleNewCommentFileChange = (e) => {
    setTicket({ ...ticket, newCommentFile: e.target.files[0] });
  };

  const addComment = () => {
    if (ticket.newComment.trim()) {
      setTicket({
        ...ticket,
        comments: [
          ...ticket.comments,
          {
            id: Date.now(),
            text: ticket.newComment,
            file: ticket.newCommentFile,
          },
        ],
        newComment: "",
        newCommentFile: null,
      });
    }
  };

  const handleStatusChange = (status) => {
    toggleDropdown();
    setTicket({ ...ticket, status: status });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-75">
      <div className="w-full max-w-3xl p-8 bg-white rounded-lg shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold">
            {isEditingTitle ? (
              <input
                type="text"
                value={ticket.title}
                onChange={handleTitleChange}
                onBlur={() => setIsEditingTitle(false)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                autoFocus
              />
            ) : (
              <span onClick={() => setIsEditingTitle(true)}>
                {ticket.title}
              </span>
            )}
          </h2>
          <div className="flex justify-between">
            {props.role === "admin" && (
              <button
                className="mx-6 bg-blue-600 hover:bg-blue-900 text-white px-3 py-1 rounded focus:outline-none"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleAssignedDropdown(assignedValue);
                }}
              >
                <p>{assignedValue}</p>
              </button>
            )}
            <button
              className="mx-6 bg-blue-600 hover:bg-blue-900 text-white px-3 py-1 rounded focus:outline-none"
              onClick={(e) => {
                e.stopPropagation();
                toggleDropdown();
              }}
            >
              <p>{ticket.status}</p>
            </button>
            {dropdownOpen && (
              <div className="absolute mt-2 w-48 bg-white border rounded shadow-lg z-10">
                <ul>
                  <li
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleStatusChange("Open")}
                  >
                    Open
                  </li>
                  <li
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleStatusChange("In Progress")}
                  >
                    In Progress
                  </li>
                  <li
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleStatusChange("Closed")}
                  >
                    Closed
                  </li>
                </ul>
              </div>
            )}
            {props.role === "admin" && assignedDropdownOpen && (
              <div className="absolute mt-2 w-48 bg-white border rounded shadow-lg z-10">
                <ul>
                  <li
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => toggleAssignedDropdown("tech")}
                  >
                    tech
                  </li>
                  <li
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => toggleAssignedDropdown("tech1")}
                  >
                    tech1
                  </li>
                  <li
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => toggleAssignedDropdown("tech2")}
                  >
                    tech2
                  </li>
                </ul>
              </div>
            )}
            <button
              onClick={closeModal}
              className="text-gray-500 hover:text-gray-700"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
        <div className="mb-4">
          <label className="block mb-1 text-sm font-medium text-gray-700">
            Description
          </label>
          {isEditingDescription ? (
            <textarea
              value={ticket.description}
              onChange={handleDescriptionChange}
              onBlur={() => setIsEditingDescription(false)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              rows="4"
            ></textarea>
          ) : (
            <p onClick={() => setIsEditingDescription(true)}>
              {ticket.description}
            </p>
          )}
        </div>
        <div className="mb-4">
          <label className="block mb-1 text-sm font-medium text-gray-700">
            Comments
          </label>
          <div className="space-y-2 mb-4">
            {ticket.comments.map((comment) => (
              <div
                key={comment.id}
                className="px-3 py-2 bg-gray-100 rounded-md"
              >
                <p>{comment.text}</p>
                {comment.file && (
                  <a
                    href={URL.createObjectURL(comment.file)}
                    download={comment.file.name}
                    className="block mt-2 text-blue-500 hover:underline"
                  >
                    {comment.file.name}
                  </a>
                )}
              </div>
            ))}
          </div>
          <textarea
            value={ticket.newComment}
            onChange={handleNewCommentChange}
            placeholder="Add a comment"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            rows="2"
          ></textarea>
          <input
            type="file"
            onChange={handleNewCommentFileChange}
            className="block w-full text-gray-900 border border-gray-300 rounded-md cursor-pointer mt-2"
          />
          <button
            type="button"
            onClick={addComment}
            className="px-4 py-2 mt-2 text-white bg-blue-600 rounded hover:bg-blue-900"
          >
            Add Comment
          </button>
        </div>
        <div className="flex justify-end">
          {props.role !== "tech" && (
            <button
              type="button"
              onClick={() => closeModal("save")}
              className="px-4 py-2 mr-2 text-white bg-blue-600 rounded hover:bg-blue-900"
            >
              Save
            </button>
          )}
          <button
            type="button"
            onClick={closeModal}
            className="px-4 py-2 mr-2 text-gray-700 bg-gray-200 rounded hover:bg-gray-400"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
