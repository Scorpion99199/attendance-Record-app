import React, { useState } from 'react';
import axios from 'axios';

const MarkAttendanceForm = () => {
  const [classId, setClassId] = useState('');
  const [date, setDate] = useState('');
  const [attendanceStatus, setAttendanceStatus] = useState('');

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // Send the form data to the backend API for marking attendance
    const formData = { classId, date, attendanceStatus };

    try {
      // Make a POST request to the backend API to mark attendance
      const response = await axios.post('/api/attendance', formData);

      // Handle the response as needed
      console.log(response.data);

      // Reset the form fields
      setClassId('');
      setDate('');
      setAttendanceStatus('');
    } catch (error) {
      // Handle any errors
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <div>
        <label htmlFor="classId">Class ID:</label>
        <input
          type="text"
          id="classId"
          value={classId}
          onChange={(event) => setClassId(event.target.value)}
        />
      </div>
      <div>
        <label htmlFor="date">Date:</label>
        <input
          type="text"
          id="date"
          value={date}
          onChange={(event) => setDate(event.target.value)}
        />
      </div>
      <div>
        <label htmlFor="attendanceStatus">Attendance Status:</label>
        <input
          type="text"
          id="attendanceStatus"
          value={attendanceStatus}
          onChange={(event) => setAttendanceStatus(event.target.value)}
        />
      </div>
      <button type="submit">Mark Attendance</button>
    </form>
  );
};

export default MarkAttendanceForm;
