import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';

import '@fullcalendar/core/main.css';
import '@fullcalendar/daygrid/main.css';

const Calendar = props => {
  var eventArr = [];

  const events = props.events
    .filter(event => event.dueDateInstance)
    .map(event => {
      if (event.dueDateInstance) {
        return {
          date: event.dueDateInstance.split('T')[0],
          title: event.name,
          color: event.label ? event.label : 'transparent',
          textColor: event.label ? '#fff' : '#000'
        };
      }
    });

  return (
    <div style={{ padding: 20 }}>
      <FullCalendar
        defaultView="dayGridMonth"
        weekends={true}
        plugins={[dayGridPlugin]}
        events={events}
        header={{
          right: 'today prev,next',
          left: 'title'
        }}
        eventOrder={[
          'label',
          (a, b) => {
            if (a.label && !b.label) {
              return 1;
            } else {
              return -1;
            }
          }
        ]}
      />
    </div>
  );
};

const mapStateToProps = state => {
  return {
    events: state.todos.todos,
    cards: state.cards.cards
  };
};

export default connect(
  mapStateToProps,
  {}
)(Calendar);
