import React, { useState } from "react";
import { jsPDF } from "jspdf";

function App() {
  const [role, setRole] = useState("");
  const [eventName, setEventName] = useState("");
  const [events, setEvents] = useState([
    { id: 1, name: "Tech Symposium", status: "Pending" }
  ]);

  const [students] = useState([
    { id: 1, name: "Arun Kumar" },
    { id: 2, name: "Divya R" },
    { id: 3, name: "Karthik S" },
    { id: 4, name: "Sneha P" }
  ]);

  const [seating, setSeating] = useState([]);

  const generateHallTicket = (student) => {
    const doc = new jsPDF();
    doc.text("Integrated Academic System", 20, 20);
    doc.text("Hall Ticket", 20, 40);
    doc.text(`Name: ${student.name}`, 20, 60);
    doc.text("Exam: Semester Exam 2026", 20, 80);
    doc.save(`${student.name}_HallTicket.pdf`);
  };

  const allocateSeating = () => {
    let shuffled = [...students].sort(() => 0.5 - Math.random());
    setSeating(shuffled);
  };

  const approveEvent = (id) => {
    setEvents(events.map(e =>
      e.id === id ? { ...e, status: "Approved" } : e
    ));
  };

  const addEvent = () => {
    if (!eventName) return;
    setEvents([
      ...events,
      { id: events.length + 1, name: eventName, status: "Pending" }
    ]);
    setEventName("");
  };

  if (!role) {
    return (
      <div className="container">
        <h1>Integrated Academic & Examination Management System</h1>
        <h3>Select Role</h3>
        <button onClick={() => setRole("Student")}>Student</button>
        <button onClick={() => setRole("Admin")}>Admin</button>
        <button onClick={() => setRole("Seating Manager")}>Seating Manager</button>
        <button onClick={() => setRole("Club Coordinator")}>Club Coordinator</button>
      </div>
    );
  }

  return (
    <div className="container">
      <h2>{role} Dashboard</h2>
      <button className="logout" onClick={() => setRole("")}>Logout</button>

      {role === "Student" && (
        <>
          <h3>Hall Tickets</h3>
          {students.map((s) => (
            <div key={s.id}>
              {s.name}
              <button onClick={() => generateHallTicket(s)}>Download</button>
            </div>
          ))}

          <h3>Approved Events</h3>
          {events.filter(e => e.status === "Approved").map(e => (
            <p key={e.id}>{e.name}</p>
          ))}
        </>
      )}

      {role === "Admin" && (
        <>
          <h3>Event Approvals</h3>
          {events.map((e) => (
            <div key={e.id}>
              {e.name} - {e.status}
              {e.status === "Pending" && (
                <button onClick={() => approveEvent(e.id)}>Approve</button>
              )}
            </div>
          ))}
        </>
      )}

      {role === "Seating Manager" && (
        <>
          <h3>Seating Allocation</h3>
          <button onClick={allocateSeating}>Generate Seating</button>
          {seating.map((s, index) => (
            <p key={s.id}>Seat {index + 1}: {s.name}</p>
          ))}
        </>
      )}

      {role === "Club Coordinator" && (
        <>
          <h3>Create Event</h3>
          <input
            type="text"
            placeholder="Enter Event Name"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
          />
          <button onClick={addEvent}>Submit</button>
        </>
      )}
    </div>
  );
}

export default App;
