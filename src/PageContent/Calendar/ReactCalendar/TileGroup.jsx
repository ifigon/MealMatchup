import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Flex from './Flex';
import { getTileClasses } from './shared/utils';
import { tileGroupProps } from './shared/propTypes';
import Tile from './Tile';
import moment from 'moment';
import { AccountType, InputFormat } from '../../../Enums';
import { accountsRef, deliveriesRef, deliveryIndicesRef, donatingAgenciesRef } from '../../../FirebaseConfig';

class TileGroup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            deliveries: {},  // {dId: {deliveryObj}}
            eventsByDate: {},  // {'YYYY-MM-DD': [dId, dId, ...]}
        };

        if (props.account.accountType === AccountType.DONATING_AGENCY_MEMBER) {
            this.indexPath = `${props.donatingAgency.umbrella}/${props.account.agency}`;
        } else {
            this.indexPath = `${props.account.umbrella}/${props.account.uid}`;
        }
    }

    componentDidMount() {
        // start at 00:00 of the first day of the month view
        // end at 23:59 of the last day of the month view
        let dateTransform = this.props.dateTransform;
        let start = moment(dateTransform(this.props.start));
        let end = moment(dateTransform(this.props.end)).add({ hours: 23, minutes: 59 });

        // add listeners on this agency's delivery index and each delivery
        let myDsRef = deliveryIndicesRef.child(this.indexPath)
            .orderByKey().startAt(`${start.valueOf()}`).endAt(`${end.valueOf()}`);
        myDsRef.on('child_added', (snap) => this.processDeliveries(snap.val()));
        myDsRef.on('child_changed', (snap) => this.processDeliveries(snap.val()));
    }

    processDeliveries(deliveryIds) {
        for (let dId in deliveryIds) {
            // add listener if we don't have one for this delivery already
            if (!this.state.deliveries[dId]) {
                this.addDeliveryListener(dId);
            }
        }
    }

    addDeliveryListener(dId) {
        deliveriesRef.child(dId).on('value', async (snap) => {
            let delivery = snap.val();
            delivery.id = dId;

            let daPromise = this.genAgencyPromise(donatingAgenciesRef, delivery.donatingAgency);
            let daContactPromise = this.genContactPromise(delivery.daContact);
            let raPromise = this.genAgencyPromise(accountsRef, delivery.receivingAgency);
            let dgPromise = this.genAgencyPromise(accountsRef, delivery.delivererGroup);

            delivery.donatingAgency = await daPromise;
            delivery.daContact = await daContactPromise;
            delivery.receivingAgency = await raPromise;
            delivery.delivererGroup = await dgPromise;
            delivery.updatedTime = moment().valueOf();

            this.setState(prevState => {
                let deliveries = prevState.deliveries;
                deliveries[dId] = delivery;

                let eventsByDate = prevState.eventsByDate;
                let dateKey = moment(delivery.startTimestamp).format(InputFormat.DATE);
                if (!eventsByDate[dateKey]) {
                    eventsByDate[dateKey] = [];
                }
                eventsByDate[dateKey].push(dId);

                return { deliveries: deliveries, eventsByDate: eventsByDate };
            })
        })
    }

    genAgencyPromise(ref, id) {
        return ref.child(id).once('value').then(snap => snap.val().name);
    }

    genContactPromise(id) {
        return accountsRef.child(id).once('value').then(snap => {
            let acc = snap.val();
            return {
                id: id,
                name: acc.name,
                phone: acc.phone,
                email: acc.email,
            };
        });
    }

    componentWillUnmount() {
        for (let dId in this.state.deliveries) {
            deliveriesRef.child(dId).off();
        }
        deliveryIndicesRef.child(this.indexPath).off();
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
        // let tile = this.props.tile;
        let value = this.props.value;
        let valueType = this.props.valueType;
        const tiles = [];
        let currentMonthIndex = this.props.currentMonthIndex;

        // loop over each day point
        for (let point = start; point <= end; point += step) {
            const date = dateTransform(point);
            let dateMoment = moment(date);

            // rendering related
            let dateClass = '';
            let classes = getTileClasses({ value, valueType, date, dateType, hover });
            if (dateMoment.isSame(moment(), 'day')) {
                dateClass = 'today';
            }
            if (dateMoment.month() !== currentMonthIndex) {
                classes.push('not-this-month');
            }

            // get deliveries for this day
            let dIds = this.state.eventsByDate[dateMoment.format(InputFormat.DATE)];
            let deliveries;
            if (dIds) {
                deliveries = dIds.map(dId => this.state.deliveries[dId]);
            }

            tiles.push(
                <Tile
                    classes={classes}
                    date={date}
                    point={point}
                    key={date.getTime()}
                    deliveries={deliveries}
                    dateClass={dateClass}
                    account={this.props.account}
                />
            );
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
