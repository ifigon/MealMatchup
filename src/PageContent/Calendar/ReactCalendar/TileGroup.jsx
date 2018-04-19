import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Flex from './Flex';

import { getTileClasses } from './shared/utils';
import { tileGroupProps } from './shared/propTypes';
import Tile from './Tile';
import moment from 'moment';

class TileGroup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            events: {
                '2018-04-20': [
                    {
                        status: 'in_progress', // Enums.DeliveryStatus
                        startTimestamp: 1524214800,
                        endTimestamp: 1524214800,
                        isEmergency: false,
                        spawningDeliveryRequest: '-L5QoXeC_UrL5tRRED3e',
                        receivingAgency: {
                            name: 'Seattle Union Gospel Mission',
                            contact: {
                                name: 'Chris Stack',
                                phone: '206-586-9876',
                                email: 'chrisstack@uniongospel.org'
                            }
                        },
                        donatingAgency: {
                            name: 'Local Point',
                            contact: {
                                name: 'Andrea Benson',
                                phone: '206-543-6975',
                                email: 'bensoa3@uw.edu'
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
                    {
                        status: 'in_progress', // Enums.DeliveryStatus
                        startTimestamp: 1524214800,
                        endTimestamp: 1524214800,
                        isEmergency: false,
                        spawningDeliveryRequest: '-L5QoXeC_UrL5tRRED3e',
                        receivingAgency: {
                            name: 'Seattle Union Gospel Mission',
                            contact: {
                                name: 'Chris Stack',
                                phone: '206-586-9876',
                                email: 'chrisstack@uniongospel.org'
                            }
                        },
                        donatingAgency: {
                            name: 'Local Point',
                            contact: {
                                name: 'Andrea Benson',
                                phone: '206-543-6975',
                                email: 'bensoa3@uw.edu'
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
                ],
                '2018-03-17': [
                    {
                        status: 'in_progress', // Enums.DeliveryStatus
                        startTimestamp: 1521295200,
                        endTimestamp: 1521302400,
                        isEmergency: false,
                        spawningDeliveryRequest: '-L5QoXeC_UrL5tRRED3e',
                        receivingAgency: {
                            name: 'Seattle Union Gospel Mission',
                            contact: {
                                name: 'Chris Stack',
                                phone: '206-586-9876',
                                email: 'chrisstack@uniongospel.org'
                            }
                        },
                        donatingAgency: {
                            name: 'Local Point',
                            contact: {
                                name: 'Andrea Benson',
                                phone: '206-543-6975',
                                email: 'bensoa3@uw.edu'
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
                ]
            }
        };
    }

    componentDidMount() {
        //TODO backend set state to events
    }

    render() {
        let className = this.props.className;
        let count = this.props.count;
        let dateTransform = this.props.dateTransform;
        let dateType = this.props.dateType;
        let end = this.props.end;
        let hover = this.props.hover;
        let offset = this.props.offset;
        let start = this.props.start;
        let step = this.props.step;
        let tile = this.props.tile;
        let value = this.props.value;
        let valueType = this.props.valueType;
        const tiles = [];
        let events = [];

        for (let point = start; point <= end; point += step) {
            const date = dateTransform(point);
            let today = false;
            let futureEvent = true;
            const curDay = moment().format('ddd MMM DD YYYY');
            if (date.toString().startsWith(curDay)) {
                today = true;
            }

            let dateClass = '';
            if (today) {
                dateClass = 'today';
            }

            for (var deliveryDate in this.state.events) {
                if (
                    moment(date)
                        .format('YYYY-MM-DD')
                        .toString() === deliveryDate
                ) {
                    events.push(this.state.events[deliveryDate]);
                }
                if (moment().isAfter(date)) {
                    //TODO incorporate time of day - today event may have happened
                    futureEvent = false;
                }
            }
            tiles.push(
                <Tile
                    classes={getTileClasses({
                        value,
                        valueType,
                        date,
                        dateType,
                        hover
                    })}
                    date={date}
                    point={point}
                    key={date.getTime()}
                    events={events}
                    futureEvent={futureEvent}
                    dateClass={dateClass}
                />
            );
            events = [];
        }

        return (
            <Flex className={className} count={count} offset={offset} wrap>
                {tiles}
            </Flex>
        );
    }
}

TileGroup.propTypes = {
    ...tileGroupProps,
    activeStartDate: PropTypes.instanceOf(Date),
    count: PropTypes.number,
    dateTransform: PropTypes.func.isRequired,
    offset: PropTypes.number,
    tile: PropTypes.func.isRequired,
    step: PropTypes.number
};

TileGroup.defaultProps = {
    count: 3,
    step: 1
};

export default TileGroup;
