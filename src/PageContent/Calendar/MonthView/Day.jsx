import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Tile from '../Tile';

import {
    getBeginOfDay,
    getDay,
    getEndOfDay,
    getISOLocalDate,
    isWeekend
} from '../shared/dates';
import { tileProps } from '../shared/propTypes';

class Day extends Component {
    constructor(props) {
        super(props);
        this.state = {
            events: {
                '2018-04-12': {
                    status: 'in_progress', // Enums.DeliveryStatus
                    startTimestamp: 1521295200,
                    endTimestamp: 1521302400,
                    isEmergency: false,
                    spawningDeliveryRequest: '-L5QoXeC_UrL5tRRED3e',
                    donatingAgency: {
                        agency: '-K9HdKlCLjjk_ka82K0s', // autogen-key of a donating-agency
                        primaryContact: 'dhA03LwTp3cibXVUcb3nQqO34wj1' // uid-key of a donating-agency-member
                    },
                    receivingAgency: {
                        agency: 'uGOFJ8NqHjbZhKAYzSZFRs1dSKD3', // uid-key of receiving-agency
                        primaryContact: {
                            name: 'Bob',
                            email: 'bob@uniongospel.org',
                            phone: '098-765-4321'
                        }
                    },
                    // delivererGroup is null if isEmergency=true
                    delivererGroup: {
                        group: 'R8BAHrxdkfQoAmfWvGa1OJmjQP43', // uid-key of deliverer-group
                        deliverers: [
                            {
                                name: 'Alice',
                                email: 'alice@uw.edu',
                                phone: '123-789-4560'
                            },
                            {
                                name: 'Chris',
                                email: 'chris@uw.edu',
                                phone: '456-123-0789'
                            }
                        ]
                    },
                    description: {
                        foodItems: [
                            {
                                food: 'Baked beans',
                                quantity: 15,
                                unit: 'lb' // Enums.FoodUnit
                            },
                            {
                                food: 'Bread',
                                quantity: 4,
                                unit: 'loaves' // Enums.FoodUnit
                            }
                        ],
                        updatedBy: {
                            // key: timestamp
                            // value: name of a donating-agency-member
                            1523173058189: 'Andrea Benson',
                            1523173817016: 'Chris Doe'
                        }
                    },
                    notes: 'Enter through the back door.',
                    pickedUpInfo: {
                        temperature: 29, // in F
                        signature: 'John Smith',
                        timestamp: 1523174874685
                    },
                    deliveredInfo: {
                        signature: 'Ellen Blake',
                        timestamp: 1523174892769
                    }
                },
                '2018-04-19': {
                    status: 'in_progress', // Enums.DeliveryStatus
                    startTimestamp: 1521295200,
                    endTimestamp: 1521302400,
                    isEmergency: false,
                    spawningDeliveryRequest: '-L5QoXeC_UrL5tRRED3e',
                    donatingAgency: {
                        agency: '-K9HdKlCLjjk_ka82K0s', // autogen-key of a donating-agency
                        primaryContact: 'dhA03LwTp3cibXVUcb3nQqO34wj1' // uid-key of a donating-agency-member
                    },
                    receivingAgency: {
                        agency: 'uGOFJ8NqHjbZhKAYzSZFRs1dSKD3', // uid-key of receiving-agency
                        primaryContact: {
                            name: 'Bob',
                            email: 'bob@uniongospel.org',
                            phone: '098-765-4321'
                        }
                    },
                    // delivererGroup is null if isEmergency=true
                    delivererGroup: {
                        group: 'R8BAHrxdkfQoAmfWvGa1OJmjQP43', // uid-key of deliverer-group
                        deliverers: [
                            {
                                name: 'Alice',
                                email: 'alice@uw.edu',
                                phone: '123-789-4560'
                            },
                            {
                                name: 'Chris',
                                email: 'chris@uw.edu',
                                phone: '456-123-0789'
                            }
                        ]
                    },
                    description: {
                        foodItems: [
                            {
                                food: 'Baked beans',
                                quantity: 15,
                                unit: 'lb' // Enums.FoodUnit
                            },
                            {
                                food: 'Bread',
                                quantity: 4,
                                unit: 'loaves' // Enums.FoodUnit
                            }
                        ],
                        updatedBy: {
                            // key: timestamp
                            // value: name of a donating-agency-member
                            1523173058189: 'Andrea Benson',
                            1523173817016: 'Chris Doe'
                        }
                    },
                    notes: 'Enter through the back door.',
                    pickedUpInfo: {
                        temperature: 29, // in F
                        signature: 'John Smith',
                        timestamp: 1523174874685
                    },
                    deliveredInfo: {
                        signature: 'Ellen Blake',
                        timestamp: 1523174892769
                    }
                }
            }
        };
    }

    render() {
        // console.log(typeof this.state.events);
        let curClasses = this.props.classes;
        let currentMonthIndex = this.props.currentMonthIndex;
        let date = this.props.date;
        console.log('date' + date);

        const className = 'react-calendar__month-view__days__day';
        let eventsToday = null;

        for (var checkEvent in this.state.events) {
            console.log('stateevent' + checkEvent);
            if (checkEvent === '2018-04-19') {
                eventsToday = this.state.events[eventsToday];
            }
        }

        return (
            <Tile
                classes={[
                    ...curClasses,
                    className,
                    isWeekend(date) ? `${className}--weekend` : null,
                    date.getMonth() !== currentMonthIndex
                        ? `${className}--neighboringMonth`
                        : null
                ]}
                date={date}
                dateTime={`${getISOLocalDate(date)}T00:00:00.000`}
                maxDateTransform={getEndOfDay}
                minDateTransform={getBeginOfDay}
                view="month"
                events={eventsToday}
            >
                {getDay(date)}
            </Tile>
        );
    }
}

Day.propTypes = {
    currentMonthIndex: PropTypes.number.isRequired,
    ...tileProps
};

export default Day;
