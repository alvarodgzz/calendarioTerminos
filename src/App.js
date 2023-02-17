import "./App.css";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import "react-big-calendar/lib/css/react-big-calendar.css";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// var mongo = require('mongodb');

// var MongoClient = require('mongodb').MongoClient;
// var url = "mongodb://localhost:27017/mydb";

// MongoClient.connect(url, function(err, db) {
//   if (err) throw err;
//   console.log("Database created!");
//   db.close();
// });

const locales = {
  "en-US": require("date-fns/locale/en-US")
}
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  dateFnsLocalizer,
  locales
})

const events = [
  {
    title: "Event 1",
    allDay: true,
    start: new Date(2023,1,2),
    end: new Date(2023,1,7)
  },
  // {
  //   title: "Event 2",
  //   allDay: true,
  //   start: new Date(2023,1,7),
  //   end: new Date(2023,2,14)
  // },
  // {
  //   title: "Event 3",
  //   allDay: true,
  //   start: new Date(2023,1,16),
  //   end: new Date(2023,1,27)
  // }
]


function App() {
  const [newEvent, setNewEvent] = useState({title: "", start: "", notification: "", efects: "", cantDias: "", end: ""})
  const [allEvents, setAllEvents] = useState([])

  // const [newNotification, setNewNotification] = useState({title: " Notification", start: "", end: ""})


  // function isWeekend(date = new Date()) {
  //   return date.getDay() === 6 || date.getDay() === 0;
  // }

  // // Non functional
  // function addNotification(d) {
  //   // var originalObj = newEvent
  //   // setNewEvent({...newEvent, title: "Notificacion"})
  //   // setNewEvent({...newEvent, start: newEvent.notification})
  //   // setNewEvent({...newEvent, end: newEvent.notification})
  //   // newEvent.title += " Notificacion";
  //   setAllEvents([...allEvents, {
  //       title: "Notification",
  //       start: d,
  //       end: d
  //   }])
  //   // newEvent = originalObj
  // }

  function handleAddEvent() {
    
    // Conteo Handler 
    // Ya se agrega el plazo falta el handling de fines de semana y dias inhabiles. Pendiente tmbn mostrar notificacion y surte efectos
    var endDate = new Date(newEvent.start);
    endDate.setDate(endDate.getDate() + parseInt(newEvent.cantDias));
    newEvent.end = endDate;
    setAllEvents([...allEvents, newEvent])
  }

  return (
    <div className="App">
      <h1>Calendario</h1>
      <h2>Agrega un nuevo Evento</h2>
      <div>
        <input type="text" placeholder="Agrega Titulo" style={{width: "20%", marginRight: "10px"}} 
          value={newEvent.title} onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}
        />

        <DatePicker placeholderText="Fecha Notificación" style={{marginRight: "10px"}}
        selected={newEvent.notification} onChange={(notification) => setNewEvent({...newEvent, notification})} />

        <DatePicker placeholderText="Surte Efectos" style={{marginRight: "10px"}}
        selected={newEvent.efects} onChange={(efects) => setNewEvent({...newEvent, efects})} />

        <DatePicker placeholderText="Fecha Inicio" style={{marginRight: "10px"}}
        selected={newEvent.start} onChange={(start) => setNewEvent({...newEvent, start})} />

        <input type="int" placeholder="Cant Días" style={{width: "20%", marginRight: "10px"}} 
          value={newEvent.cantDias} onChange={(e) => setNewEvent({...newEvent, cantDias: e.target.value})}
        />

        <button style={{marginTop: "10px"}} onClick={handleAddEvent}> Agrega Evento </button>
        

      </div>
      <Calendar localizer={localizer} events={allEvents} 
      startAccessor="start" endAccessor="end" style={{height: 500, margin: "50px"}} />
    </div>
  );
}

export default App;
