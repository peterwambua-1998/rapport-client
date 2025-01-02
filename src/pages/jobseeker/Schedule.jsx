import React, { useEffect, useState } from "react";
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';
import { FadeLoader } from "react-spinners";
import ErrorToast from "@/components/toasts/error";

const Schedule = () => {
  const API_BASE_URL = import.meta.env.VITE_APP_SERVER_URL;
  const [loading, setLoading] = useState(true);
  
  const [events, setEvents] = useState([
  ]);

  const handleDateClick = (info) => {
    const title = prompt('Enter event title:');
    if (title) {
      setEvents([...events, { title, start: info.dateStr, color: 'teal' }]);
    }
  };


  function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }


  const fetchData = async () => {
    try {
      setLoading(true);
      const data = await fetch(`${API_BASE_URL}/api/schedule/all`, {
        headers: {
          "Content-Type": "application/json",
        },
        method: 'GET',
        credentials: 'include',
      });

      if (!data.ok) {
        ErrorToast('errror occurred please try again...')

      }

      const sch = await data.json();
      const fData = [];
      sch.forEach((sh, i) => {

        fData.push({ id: i + 1, title: `${sh.Project.name} interview`, start: sh.InterviewDate, color: getRandomColor() })
      })
      console.log(fData);
      
      setEvents(fData)
      setLoading(false);
    } catch (error) {
      console.log(error)
      setLoading(false);
      ErrorToast('errror occurred please try again...')

    }
  };

  useEffect(() => {
    fetchData()
  }, [])

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen">
                <FadeLoader />
                <p>Loading schedule...</p>
            </div>
        )
    }


  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold text-gray-800">Event Calendar</h1>
          
        </div>
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay,listMonth",
          }}
          events={events}
          dateClick={handleDateClick}
          eventColor="blue"
          eventDisplay="block"
          height="auto"
          className="rounded-lg shadow-lg"
        />
      </div>
    </div>
  );
};

export default Schedule;
