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
  // {
  //   title: "Event 1",
  //   allDay: true,
  //   start: new Date(2023,1,2),
  //   end: new Date(2023,1,7)
  // },
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
  const [allEvents, setAllEvents] = useState(events)

  function handleAddEvent() {
    var endDate = new Date(newEvent.start);
    console.log(endDate);
    endDate.setDate(endDate.getDate() + parseInt(newEvent.cantDias));
    console.log(endDate);
    newEvent.end = endDate;
    console.log(newEvent.e);
    console.log(newEvent);
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

        <DatePicker placeholderText="Fecha Inicio" style={{marginRight: "10px"}}
        selected={newEvent.start} onChange={(start) => setNewEvent({...newEvent, start})} />

        <DatePicker placeholderText="Fecha Notificación" style={{marginRight: "10px"}}
        selected={newEvent.notification} onChange={(notification) => setNewEvent({...newEvent, notification})} />

        <DatePicker placeholderText="Surte Efectos" style={{marginRight: "10px"}}
        selected={newEvent.efects} onChange={(efects) => setNewEvent({...newEvent, efects})} />

        <input type="int" placeholder="Cant Días" style={{width: "20%", marginRight: "10px"}} 
          value={newEvent.cantDias} onChange={(e) => setNewEvent({...newEvent, cantDias: e.target.value})}
        />

        {/* <DatePicker placeholderText="Fecha Fin" style={{marginRight: "10px"}}
        selected={newEvent.end} onChange={(end) => setNewEvent({...newEvent, end})} /> */}
        <button style={{marginTop: "10px"}} onClick={handleAddEvent}> Agrega Evento </button>
        

      </div>
      <Calendar localizer={localizer} events={allEvents} 
      startAccessor="start" endAccessor="end" style={{height: 500, margin: "50px"}} />
    </div>
  );
}

export default App;
