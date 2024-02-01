(function () {
  document.addEventListener("DOMContentLoaded", function () {
    /* initialize the external events
      -----------------------------------------------------------------*/

    var containerEl = document.getElementById("external-events-list");
    new FullCalendar.Draggable(containerEl, {
      itemSelector: ".fc-event",
      eventData: function (eventEl) {
        return {
          title: eventEl.innerText.trim(),
        };
      },
    });

    //// the individual way to do it
    // var containerEl = document.getElementById('external-events-list');
    // var eventEls = Array.prototype.slice.call(
    //   containerEl.querySelectorAll('.fc-event')
    // );
    // eventEls.forEach(function(eventEl) {
    //   new FullCalendar.Draggable(eventEl, {
    //     eventData: {
    //       title: eventEl.innerText.trim(),
    //     }
    //   });
    // });

    /* initialize the calendar
      -----------------------------------------------------------------*/

    var calendarEl = document.getElementById("calendar");
    var calendar = new FullCalendar.Calendar(calendarEl, {
      headerToolbar: {
        left: "prev,next today",
        center: "title",
        right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek",
      },
      initialView: "dayGridMonth",
      initialDate: "2024-01-12",
      navLinks: true, // can click day/week names to navigate views
      editable: true,
      selectable: true,
      nowIndicator: true,
      // dayMaxEvents: true, // allow "more" link when too many events
      events: [
        {
          title: "İran-ABD Gerginliği",
          start: "2024-01-28T13:30:00",
        },
        {
          title: "İnovasyon Haftası",
          start: "2024-01-07",
          end: "2024-01-10",
        },
        {
          groupId: 999,
          title: "Ardahan'da soğuk hava",
          start: "2024-01-11T16:20:00",
        },
        {
          groupId: 999,
          title: "Belgrad Ormanı'nın kanatlı sakinleri",
          start: "2024-01-16T15:20:00",
        },
        {
          title: "Meclis Oturumu",
          start: "2024-01-24",
          end: "2024-01-26",
        },
        {
          title: "Medya Teknolojileri Hackathonu",
          start: "2024-02-01T10:30:00",
          end: "2024-02-04T12:30:00",
        },
        {
          title: "Beşiktaş Meydan Açılışı",
          start: "2024-01-30T12:10:00",
        },
        {
          title: "ABD Dışişleri Bakanı Blinken",
          start: "2024-01-12T14:30:00",
        },
        {
          title: "Cumhurbaşkanı Konuşması",
          start: "2024-01-29T17:30:00",
        },
      ],
      editable: true,
      droppable: true, // this allows things to be dropped onto the calendar
      drop: function (arg) {
        // is the "remove after drop" checkbox checked?
        if (document.getElementById("drop-remove").checked) {
          // if so, remove the element from the "Draggable Events" list
          arg.draggedEl.parentNode.removeChild(arg.draggedEl);
        }
      },
    });
    calendar.render();
  });
})();
