import "./App.css";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import "react-big-calendar/lib/css/react-big-calendar.css";
import React, { useState, useEffect } from "react";
import DatePicker, { getDefaultLocale } from "react-datepicker";
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

const notifications = []
const efects = []

function App() {
  const [newEvent, setNewEvent] = useState({title: "", start: "", notification: "", efects: "", cantDias: "", end: ""})
  const [allEvents, setAllEvents] = useState(events)

  const [newNotification, setNewNotification] = useState({title: "", start: "", notification: "", efects: "", cantDias: "", end: ""})
  const [allNotifications, setAllNotifications] = useState(notifications)

  const [newEfect, setNewEfect] = useState({title: "", start: "", notification: "", efects: "", cantDias: "", end: ""})
  const [allEfects, setAllEfects] = useState(efects)


  // function isWeekend(date = new Date()) {
  //   return date.getDay() === 6 || date.getDay() === 0;
  // }


  function handleAddNotification() {
    
    var notDate = new Date(newEvent.notification);

    newNotification.title = newEvent.title + " N";
    newNotification.start = notDate;
    newNotification.end = notDate;

    setAllEvents([
      ...allEvents, 
      newNotification
    ])

    setNewNotification({
      ...newEvent,
      title: newEvent.title + " N",
      start: notDate,
      end: notDate,
      cantDias: "1"
    })
    console.log(newNotification);
  }

  function handleAddEfects() {
    var efectDate = new Date(newEvent.efects);

    newEfect.title = newEvent.title + " Ef";
    newEfect.start = efectDate;
    newEfect.end = efectDate;

    setAllEvents([
      ...allEvents, 
      newEfect
    ])

    setNewEfect({
      ...newEvent,
      title: newEvent.title + " Ef",
      start: efectDate,
      end: efectDate,
      cantDias: "1"
    })
    console.log(newEfect);
  }

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

        <h3>Titulo de Termino</h3>
        {/* TITULO Termino */}
        <input type="text" placeholder="Agrega Titulo" style={{width: "20%", marginRight: "10px"}} 
          value={newEvent.title} onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}
        />

        <h3>Fecha de Notificación</h3>
        {/* NOTIFICACION */}
        <DatePicker placeholderText="Fecha Notificación" style={{marginRight: "10px"}}
        selected={newEvent.notification} onChange={(notification) => setNewEvent({...newEvent, notification})} />
        <button style={{marginTop: "10px"}} onClick={handleAddNotification}> Agrega Notificación </button>

        <h3>Fecha que Surte Efectos</h3>
        {/* EFECTOS */}
        <DatePicker placeholderText="Surte Efectos" style={{marginRight: "10px"}}
        selected={newEvent.efects} onChange={(efects) => setNewEvent({...newEvent, efects})} />
        <button style={{marginTop: "10px"}} onClick={handleAddEfects}> Agrega Efectos </button>

        <h3>Fecha Inicio de Conteo</h3>
        <DatePicker placeholderText="Fecha Inicio" style={{marginRight: "10px"}}
        selected={newEvent.start} onChange={(start) => setNewEvent({...newEvent, start})} />


        <h3>Cantidad de días</h3>
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
