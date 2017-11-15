import React from 'react';
import PropTypes from 'prop-types';

import moment from 'moment';

import { getEventContent } from '../../utils/appeals-v2-helpers';
import CurrentStatus from './CurrentStatus';

function formatDate(date) {
  return moment(date, 'YYYY-MM-DD').format('MMMM d, YYYY');
}

/**
 * Timeline is in charge of the past events and current status.
 */
class Timeline extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false
    };
  }

  getPastEvents = () => {
    return this.props.events.map((event, index) => {
      const { title, description, liClass } = getEventContent(event);
      return (
        <li key={index} role="presentation" className={`process-step ${liClass}`}>
          <h3>{title || 'Title here'}</h3>
          <span className="appeal-event-date">on {formatDate(event.date)}</span>
          <p>{description}</p>
        </li>
      );
    });
  }

  toggleExpanded = () => {
    this.setState((prevState) => ({ expanded: !prevState.expanded }));
  }

  render() {
    const eventList = this.state.expanded ? this.getPastEvents() : [];
    const dateRange = this.props.events[0] ? `${formatDate(this.props.events[0].date)} - ${formatDate(this.props.events[this.props.events.length - 1].date)}` : '';

    // Add the expander
    const expanderClassName = this.state.expanded ? 'section-expanded' : 'section-unexpanded';
    eventList.push(
      <li key={eventList.length} className={`process-step ${expanderClassName}`}>
        {/* Giving this a margin top to help center the text to the li bullet */}
        <button onClick={this.toggleExpanded} className="va-button-link">
          <h4 style={{ color: 'inherit' }}>{this.state.expanded ? 'Hide past events' : 'See past events'}</h4>
        </button>
        <div className="appeal-event-date">{dateRange}</div>
      </li>
    );

    // Add the current status
    const { title, description } = this.props.currentStatus;
    eventList.push(<CurrentStatus key={eventList.length} title={title} description={description}/>);

    return (
      // May not want this as an ol...
      <ol className="process form-process appeal-timeline">{eventList}</ol>
    );
  }
}

Timeline.propTypes = {
  events: PropTypes.arrayOf(PropTypes.shape({
    type: PropTypes.string,
    date: PropTypes.string,
    details: PropTypes.object
  })),
  currentStatus: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired
  }).isRequired
};

export default Timeline;
