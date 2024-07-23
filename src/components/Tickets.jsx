import React, { useEffect, useState } from "react";
import TicketItem from "./TicketItem";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Modal from "./Modal";
import { logout } from "../redux/authSlice";

const dataTickets = [
  {
    id: Date.now(),
    title: "Headphone issue",
    description: "Headphone unclear sound",
    comments: [
      { id: 1, text: "Please check the headphon sound and fix", file: null },
    ],
    newComment: "",
    newCommentFile: null,
    status: "Open",
    createdBy: "user",
    assignedTo: "tech",
  },
  {
    id: Date.now(),
    title: "Network issue",
    description: "Network goes down",
    comments: [
      { id: 1, text: "Please check the Network on PC-98", file: null },
    ],
    newComment: "",
    newCommentFile: null,
    status: "Open",
    createdBy: "user1",
    assignedTo: "tech",
  },
  {
    id: Date.now(),
    title: "Network issue",
    description: "Network goes down",
    comments: [
      { id: 1, text: "Please check the Network on PC-98", file: null },
    ],
    newComment: "",
    newCommentFile: null,
    status: "Open",
    createdBy: "user2",
    assignedTo: "tech2",
  },
];

const Tickets = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentTicket, setCurrentTicket] = useState(null);
  const [isEditable, setIsEditable] = useState(true);
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const user = useSelector((state) => state.auth.user);
  let sampleTickets;
  if (user?.role === "user") {
    sampleTickets = dataTickets.filter(
      (ticket) => ticket.createdBy === user.name
    );
  }
  if (user?.role === "tech") {
    sampleTickets = dataTickets.filter(
      (ticket) => ticket.assignedTo === user.name
    );
  }
  if (user?.role === "admin") {
    sampleTickets = dataTickets;
  }
  const [tickets, setTickets] = useState(sampleTickets);
  if (!isAuthenticated) {
    return null;
  }
  //Authenticated data mimicing api
  const addTickets = (ticket) => {
    const ticketExists = tickets.find((t) => t.id === ticket.id);

    if (ticketExists) {
      // Replace the existing ticket
      setTickets(tickets.map((t) => (t.id === ticket.id ? ticket : t)));
    } else {
      // Add the new ticket
      setTickets([...tickets, ticket]);
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <header className="flex justify-between items-center p-5 bg-slate-200 rounded font-bold mb-5">
        <h1 className="text-2xl text-blue-900">Tickets Management</h1>
        {user.role !== "tech" && (
          <button
            onClick={() => setIsOpen(true)}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Add Ticket
          </button>
        )}
      </header>
      <div className="h-[80vh] bg-slate-200 p-6 rounded-lg shadow-lg m-5 flex flex-col justify-between">
        <div className="space-y-5">
          {tickets.map((ticket) => (
            <TicketItem
              setCurrentTicket={setCurrentTicket}
              setIsOpen={setIsOpen}
              ticket={ticket}
              setIsEditable={setIsEditable}
              role={user.role}
            />
          ))}
        </div>
        <div className="flex justify-end">
          <button
            onClick={handleLogout}
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
          >
            LogOut
          </button>
        </div>
      </div>
      {isOpen && (
        <Modal
          isEditingDescription={user.role === "tech" ? false : isEditable}
          isEditingTitle={user.role === "tech" ? false : isEditable}
          setIsOpen={setIsOpen}
          addTickets={addTickets}
          ticket={currentTicket}
          setCurrentTicket={setCurrentTicket}
          role={user.role}
        />
      )}
    </div>
  );
};

export default Tickets;
