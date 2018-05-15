import React, { Component } from 'react';
import './PendingAccounts.css';

class PendingAccountsListItem extends Component {
    render() {
        // dummy data
        let data = {
            R8BAHrxdkfQoAmfWvGa1OJmjQP43: {
                name: 'Local Point',
                address: {
                    street1: '1201 NE Campus Pkwy',
                    street2: '',
                    city: 'Seattle',
                    state: 'WA',
                    zipcode: 98105,
                    officeNo: '220'
                },
                timezone: 'America/Los_Angeles', // moment.tz.guess()
                isVerified: true,
                isActivated: true,
                primaryContact: 'dhA03LwTp3cibXVUcb3nQqO34wj1', // uid-key of a donating-agency-member
                members: [
                    'dhA03LwTp3cibXVUcb3nQqO34wj1', // uid-key of donating-agency-member
                    'fbCm3Yrbi4e12WgpVz3gq25VKea2'
                ]
            },
            uGOFJ8NqHjbZhKAYzSZFRs1dSKD3: {
                accountType: 'receiving_agency',
                umbrella: 'RheaQY1WxJT03sTPQICFZ4STpfm1', // uid-key of an umbrella
                name: 'Seattle Union Gospel Mission',
                email: 'seauniongospel@test.org',
                address: {
                    street1: '124 Sesame St.',
                    street2: '',
                    city: 'Seattle',
                    state: 'WA',
                    zipcode: 98115,
                    officeNo: '110A'
                },
                timezone: 'America/Los_Angeles', // moment.tz.guess()
                isVerified: true,
                isActivated: true,
                primaryContact: {
                    name: 'Chris Stack',
                    email: 'chrisstack@uniongospel.org',
                    phone: '206-586-9876',
                    position: 'Manager'
                },
                secondaryContact: {
                    // could be null
                    name: 'Dave Stack',
                    email: 'davestack@uniongospel.org',
                    phone: '206-586-9876',
                    position: 'Volunteer'
                },
                availabilities: {
                    // Indices 0-6 represents Sunday - Saturday
                    // Using timestamps for start/end hours to eliminate potential
                    // timezone problems. Only the day of week, hour, and minute
                    // parts of the timestamp is valid.
                    0: {
                        // Sunday 10:00 - 14:00
                        startTimestamp: '1523206800000',
                        endTimestamp: '1523221200000'
                    },
                    2: {
                        // Tuesday 13:00 - 17:00
                        startTimestamp: '1523390400000',
                        endTimestamp: '1523404800000'
                    },
                    3: {
                        // Wednesday 13:00 - 17:00
                        startTimestamp: '1523476800000',
                        endTimestamp: '1523491200000'
                    },
                    4: {
                        // Thursday 13:00 - 17:00
                        startTimestamp: '1523563200000',
                        endTimestamp: '1523577600000'
                    },
                    6: {
                        // Saturday 10:00 - 14:00
                        startTimestamp: '1523739600000',
                        endTimestamp: '1523725200000'
                    }
                },
                acceptEmergencyPickups: true,
                emergencyQuantity: {
                    // could be null
                    min: 10, // in lbs
                    max: 100 // in lbs
                },
                deliveryNotes: 'Park in the lot near the south entrance.', // add in Settings
                notifications: [
                    {
                        type: 'recurring_pickup_request', // Enums.NotificationType
                        content: '-K9HdKlCLjjk_ka82K0s/-L5QoXeC_UrL5tRRED3e' // {daId}/{deliveryRequestId}
                    }
                ]
            },
            RheaQY1WxJT03sTPQICFZ4STpfm1: {
                accountType: 'deliverer_group',
                umbrella: 'RheaQY1WxJT03sTPQICFZ4STpfm1', // uid-key of an umbrella
                name: 'Phi Sigma Ro',
                email: 'phisigmaro@uw.edu',
                address: {
                    street1: '124 Sesame St.',
                    street2: '',
                    city: 'Seattle',
                    state: 'WA',
                    zipcode: 98115
                },
                timezone: 'America/Los_Angeles', // moment.tz.guess()
                isVerified: true,
                isActivated: true,
                numVolunteers: 50,
                primaryContact: {
                    name: 'Andy Duncan',
                    email: 'andyd@uw.edu',
                    phone: '206-487-2859',
                    position: 'President'
                },
                notifications: [
                    {
                        type: 'recurring_pickup_request', // Enums.NotificationType
                        content: '-K9HdKlCLjjk_ka82K0s/-L5QoXeC_UrL5tRRED3e' // {daId}/{deliveryRequestId}
                    }
                ]
            }
        };
        return (
            <div className="pending-accounts-item-wrapper">
                <div className="group-value value">Type of Group</div>
                <div className="agency-value value">Agency Name</div>
                <div className="contact-value value">Primary Contact</div>
                <div className="status-button">View</div>
            </div>
        );
    }
}

export default PendingAccountsListItem;
