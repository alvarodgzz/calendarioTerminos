import "./App.css";
import { Calendar, dateFnsLocalizer, momentLocalizer } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import "react-big-calendar/lib/css/react-big-calendar.css";
import React, { useState, useEffect } from "react";
import DatePicker, { getDefaultLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { addDays } from "date-fns";
import moment from "moment"
import 'moment/locale/es'; 

// var mongo = require('mongodb');

// var MongoClient = require('mongodb').MongoClient;
// var url = "mongodb://localhost:27017/mydb";

// MongoClient.connect(url, function(err, db) {
//   if (err) throw err;
//   console.log("Database created!");
//   db.close();
// });

const locales = {
  "es": require("date-fns/locale/es")
}
// const localizer = dateFnsLocalizer({
//   format,
//   parse,
//   startOfWeek,
//   getDay,
//   dateFnsLocalizer,
//   locales
// })

const localizer = momentLocalizer(moment) 

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

var disableDates = [
  "1/1/2023", 
  "2/6/2023", 
  "3/20/2023", 
  "3/21/2023",
  "4/5/2023",
  "4/6/2023",
  "4/7/2023",
  "5/1/2023",
  "5/5/2023",
  "7/16/2023",
  "7/17/2023",
  "7/18/2023",
  "7/19/2023",
  "7/20/2023",
  "7/21/2023",
  "7/22/2023",
  "7/23/2023",
  "7/24/2023",
  "7/25/2023",
  "7/26/2023",
  "7/27/2023",
  "7/28/2023",
  "7/29/2023",
  "7/30/2023",
  "7/31/2023",
  "9/14/2023",
  "9/15/2023",
  "9/16/2023",
  "10/12/2023",
  "20/31/2023",
  "11/1/2023",
  "11/2/2023",
  "11/20/2023",
  "12/15/2023",
  "12/16/2023",
  "12/17/2023",
  "12/18/2023",
  "12/19/2023",
  "12/20/2023",
  "12/21/2023",
  "12/22/2023",
  "12/23/2023",
  "12/24/2023",
  "12/25/2023",
  "12/26/2023",
  "12/27/2023",
  "12/28/2023",
  "12/29/2023",
  "12/30/2023",
  "12/31/2023",
  "1/1/2023"
];

function App() {
  const [newEvent, setNewEvent] = useState({title: "", start: "", notification: "", efects: "", cantDias: "", end: ""})
  const [allEvents, setAllEvents] = useState(events)

  const [newNotification, setNewNotification] = useState({title: "", start: "", notification: "", efects: "", cantDias: "", end: ""})
  const [allNotifications, setAllNotifications] = useState(notifications)

  const [newEfect, setNewEfect] = useState({title: "", start: "", notification: "", efects: "", cantDias: "", end: ""})
  const [allEfects, setAllEfects] = useState(efects)

  const calendarStyle = (date) => {
    if (isDisabledDay(disableDates, date))
    return {
      style: {
        backgroundColor: '#DC143C', 
        border: '1px solid gray',
        margin: 0,
        padding: 0
      }
    }

    if (date.getDay() === 0 || date.getDay() == 6)
    return {
      style: {
        backgroundColor: '#88C9E8', 
        border: '1px solid gray',
        margin: 0,
        padding: 0
      }
    }
}

  function isDisabledDay(array, value) {
    var date = new Date(value);
    var newdate= (date.getMonth() + 1) + '/' + date.getDate() + '/' +  date.getFullYear();
    // console.log(newdate)
    return (array.find(item => {return item == newdate}) || []).length > 0;
  }


  function countWeekends() {

    var start = new Date(newEvent.start);
    var end = new Date(newEvent.end);

    var weekends = 0;

    // console.log(start, end)

    while(start < end){
      // console.log(isDisabledDay(disableDates, start));
      if (start.getDay() === 0 || start.getDay() == 6 || isDisabledDay(disableDates, start)) {
          // console.log(start.getDay(), start)
          ++weekends;
      }
      start.setDate(start.getDate() + 1);
    }

    var daysToadd = weekends
    // console.log(weekends)

    // while (start.getDay() === 0 || start.getDay() == 6 || isDisabledDay(disableDates, start)) {start.setDate(start.getDate() + 1);}

    while (daysToadd > 0) {
      if (start.getDay() === 0 || start.getDay() == 6 || isDisabledDay(disableDates, start)) {
        // console.log(start.getDay(), start)
        ++weekends;
      } else {
        --daysToadd;
      }
      start.setDate(start.getDate() + 1);
    }

    // console.log(weekends)
    
    return weekends;
  }

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
    // console.log(newNotification);
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
    // console.log(newEfect);
  }

  function handleAddEvent() {
    // Conteo Handler 
    // Ya se agrega el plazo falta el handling de fines de semana y dias inhabiles. Pendiente tmbn mostrar notificacion y surte efectos
    
    var startDate = new Date(newEvent.start);
    var endDate = new Date(newEvent.start);
    var cantDias = newEvent.cantDias; 
    endDate.setDate(endDate.getDate() + parseInt(newEvent.cantDias));
    newEvent.end = endDate;
    endDate.setDate(endDate.getDate() + countWeekends());

    var cont = 1;
    var dia = 1;
    var helperTitle = newEvent.title;
    var totalEvents = [];
    while (startDate < endDate) {
      if (startDate.getDay() != 0 && startDate.getDay() != 6 && !isDisabledDay(disableDates, startDate)) {

        var currTitle = helperTitle + ' - ' + dia;

        if (dia == newEvent.cantDias - 1) {
          currTitle += " V"
        } else if (dia == newEvent.cantDias) {
          currTitle += " VF"
        }
        var currStart = new Date(newEvent.start);
        currStart.setDate(currStart.getDate() + cont - 1);

        var currEvent = {title: currTitle, start: currStart, notification: "", efects: "", cantDias: "", end: currStart}
        totalEvents.push(currEvent);

        console.log(newEvent.title);

        dia++;
      } 
      cont++;
      startDate.setDate(startDate.getDate() + 1);
    }

    console.log(totalEvents);
    setAllEvents([...allEvents, ...totalEvents]);
    
    
    // addHelper(totalEvents);
    // setNewEvent({
    //   ...newEvent,
    //   end: 
    // })
  }

  async function addHelper(totalEvents) {
    
  }

  //Clicking an existing event allows you to remove it
  function handleDeleteEvent(pEvent) {
    const r = window.confirm("Would you like to remove this event?");
    var idx = allEvents.indexOf(pEvent)
    // console.log(idx)
    if(r === true){
      allEvents.splice(idx, 1);
      return { events };  
    }
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

        {/* <button style={{marginTop: "10px"}} onClick={countWeekends}> Calcula fines </button> */}
        

      </div>
      <Calendar 
        localizer={localizer} events={allEvents} 
        startAccessor="start" 
        endAccessor="end" 
        onSelectEvent={event => handleDeleteEvent(event)}
        style={{height: 500, margin: "50px"}} 
        dayPropGetter={calendarStyle}
      />
    </div>
  );
}

export default App;
