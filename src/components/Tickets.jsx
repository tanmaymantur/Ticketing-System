import React, { useEffect } from "react";
import TicketItem from "./TicketItem";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Tickets = () => {
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <header className="text-2xl p-5 bg-slate-200 rounded  font-bold mb-5 text-center text-blue-900">
        Tickets Management
      </header>
      <div className="h-[80vh] bg-slate-200 p-6 rounded-lg shadow-lg">
        <div className="space-y-5">
          <TicketItem title="Ticket 1" />
          <TicketItem title="Ticket 2" />
        </div>
      </div>
    </div>
  );
};

export default Tickets;
