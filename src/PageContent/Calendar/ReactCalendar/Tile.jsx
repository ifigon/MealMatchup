import React, { Component } from 'react';
import PropTypes from 'prop-types';
import mergeClassNames from 'merge-class-names';
// import { getDay, getISOLocalDate } from './shared/dates';
import { tileProps } from './shared/propTypes';
import EventCardSlot from '../EventCard/EventCardSlot';
// import moment from 'moment';
class Tile extends Component {
    render() {
        // let children = this.props.children;
        let classes = this.props.classes;
        let date = this.props.date;
        let dateTime = this.props.dateTime;
        let maxDate = this.props.maxDate;
        let maxDateTransform = this.props.maxDateTransform;
        let minDate = this.props.minDate;
        let minDateTransform = this.props.minDateTransform;
        let onClick = this.props.onClick;
        let onMouseOver = this.props.onMouseOver;
        let style = this.props.style;
        let tileClassName = this.props.tileClassName;
        let tileContent = this.props.tileContent;
        let tileDisabled = this.props.tileDisabled;
        let view = this.props.view;
        // let today = this.props.today;
        // let events = this.props.events;
        return (
            <button
                className={mergeClassNames(
                    classes,
                    tileClassName instanceof Function
                        ? tileClassName({ date, view })
                        : tileClassName
                )}
                disabled={
                    (minDate && minDateTransform(minDate) > date) ||
                    (maxDate && maxDateTransform(maxDate) < date) ||
                    (tileDisabled && tileDisabled({ date, view }))
                }
                onClick={onClick && (() => onClick(date))}
                onMouseOver={onMouseOver && (() => onMouseOver(date))}
                onFocus={onMouseOver && (() => onMouseOver(date))}
                style={style}
                type="button"
            >
                <time dateTime={dateTime} className={this.props.dateClass}>
                    {date.getDate()}
                </time>
                {typeof tileContent === 'function'
                    ? tileContent({ date, view })
                    : tileContent}
                <EventCardSlot
                    events={this.props.events}
                    today={this.props.today}
                    futureEvent={this.props.futureEvent}
                />
            </button>
        );
    }
}

Tile.propTypes = {
    ...tileProps,
    children: PropTypes.node.isRequired,
    dateTime: PropTypes.string.isRequired,
    maxDateTransform: PropTypes.func.isRequired,
    minDateTransform: PropTypes.func.isRequired
};

export default Tile;
