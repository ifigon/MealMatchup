import React, { Component } from 'react';
import './FoodLogsContainer.css';
import FoodLogItem from './FoodLogItem';
import arrow from '../../icons/filter_arrow.svg';

class FoodLogsContainer extends Component {
    constructor(props){
        super(props);

        this.state = {
            deliveries:[]
        };
    }
    componentDidMount(){
        //TODO: [backend] query completed deliveries
        this.setState({
            deliveries: [
                {   
                    status: 'completed',  // Enums.DeliveryStatus
                    startTimestamp: 1521295200000,  // (ms)
                    endTimestamp: 1521302400000,  // (ms)
                    timezone: 'America/Los_Angeles',  // same as spawningDeliveryRequest's
                    isEmergency: false,
                    spawningDeliveryRequest: '-L5QoXeC_UrL5tRRED3e',
                    donatingAgency: { //uid replaced by info
                        name: 'Local Point'
                    }, 
                    daContact: { //uid replaced by info
                        email: 'andrea@uw.edu',
                        name: 'Andrea Benson',
                        phone: '206-666-6666',
                    }, 
                    delivererGroup: {
                        name: 'UW Green Greeks' //uid replace by info
                    },
                    deliverers: [
                        {
                            email: 'd1@test.com',
                            name: 'deliverer1',
                            phone: '111-111-111'
                        },
                        {
                            email: 'd2@test.com',
                            name: 'deliverer2',
                            phone: '111-111-111'
                        }
                    ],
                    description: {
                        foodItems:[
                            {
                                food: 'salad',
                                quantity: '5',
                                unit: 'lb'
                            },
                            {
                                food: 'banana',
                                quantity: '50',
                                unit: 'lb'
                            }
                        ]
                    },
                    notes: '4/9, mon x4, 1-3p, none requested',
                    raContact: {
                        email: 'refigerator@uniongospel.org',
                        name: 'Bob Vance',
                        phone: '111-222-3333',
                    },
                    receivingAgency: { //uid replaced by info
                        name: 'Seattle Union Gospel'
                    },
                    pickedUpInfo: {
                        temperature: 29,  // in F
                        signature: 'John Smith',
                        timestamp: 1523174874685
                    },
                    deliveredInfo: {
                        signature: 'Ellen Blake',
                        timestamp: 1523174892769
                    }
                },
                {   
                    status: 'completed',  // Enums.DeliveryStatus
                    startTimestamp: 1521295200000,  // (ms)
                    endTimestamp: 1521302400000,  // (ms)
                    timezone: 'America/Los_Angeles',  // same as spawningDeliveryRequest's
                    isEmergency: false,
                    spawningDeliveryRequest: '-L5QoXeC_UrL5tRRED3e',
                    donatingAgency: { //uid replaced by info
                        name: 'Local Point'
                    }, 
                    daContact: { //uid replaced by info
                        email: 'andrea@uw.edu',
                        name: 'Andrea Benson',
                        phone: '206-666-6666',
                    }, 
                    delivererGroup: {
                        name: 'UW Green Greeks' //uid replace by info
                    },
                    deliverers: [
                        {
                            email: 'd1@test.com',
                            name: 'deliverer1',
                            phone: '111-111-111'
                        },
                        {
                            email: 'd2@test.com',
                            name: 'deliverer2',
                            phone: '111-111-111'
                        }
                    ],
                    description: {
                        foodItems:[
                            {
                                food: 'salad',
                                quantity: '5',
                                unit: 'lb'
                            },
                            {
                                food: 'banana',
                                quantity: '50',
                                unit: 'lb'
                            },
                            {
                                food: 'apple',
                                quantity: '50',
                                unit: 'lb'
                            },
                            {
                                food: 'orange',
                                quantity: '50',
                                unit: 'lb'
                            },
                            {
                                food: 'pineapple',
                                quantity: '50',
                                unit: 'lb'
                            },
                            {
                                food: 'carrot',
                                quantity: '2',
                                unit: 'lb'
                            },
                            {
                                food: 'watermelon',
                                quantity: '32',
                                unit: 'cases'
                            },
                            {
                                food: 'cupcakes',
                                quantity: '200',
                                unit: 'lb'
                            },
                            {
                                food: 'grapes',
                                quantity: '2',
                                unit: 'loaves'
                            }
                        ]
                    },
                    notes: '4/9, mon x4, 1-3p, none requested',
                    raContact: {
                        email: 'refigerator@uniongospel.org',
                        name: 'Bob Vance',
                        phone: '111-222-3333',
                    },
                    receivingAgency: { //uid replaced by info
                        name: 'Seattle Union Gospel'
                    },
                    pickedUpInfo: {
                        temperature: 29,  // in F
                        signature: 'John Smith',
                        timestamp: 1523174874685
                    },
                    deliveredInfo: {
                        signature: 'Ellen Blake',
                        timestamp: 1523174892769
                    }
                }
            ]
        });
    }
    render(){
        return(
            <div className="food-container ">
                {/* TODO: Filter feature */}
                {
                    this.state.deliveries.map((completedDelivery, i) => {
                        return (
                            <FoodLogItem delivery={completedDelivery} key={i}/>
                        );
                    })
                }
            </div>
        );
    }
}
export default FoodLogsContainer;